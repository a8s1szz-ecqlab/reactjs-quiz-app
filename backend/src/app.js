const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const quizRoutes = require('./routes/quiz');
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');
const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');

const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
const getAllowedOrigins = () => {
  const defaultOrigins = [
    'http://localhost:5173',
    'http://localhost:3000', 
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000'
  ];

  // Get origins from environment variables
  const envOrigins = [];
  
  // Primary frontend URL
  if (process.env.FRONTEND_URL) {
    envOrigins.push(process.env.FRONTEND_URL);
  }
  
  // Additional origins (comma-separated)
  if (process.env.ALLOWED_ORIGINS) {
    const additionalOrigins = process.env.ALLOWED_ORIGINS.split(',')
      .map(origin => origin.trim())
      .filter(origin => origin.length > 0);
    envOrigins.push(...additionalOrigins);
  }
  
  // In production, only use environment origins if provided, otherwise use defaults
  if (process.env.NODE_ENV === 'production' && envOrigins.length > 0) {
    return envOrigins;
  }
  
  // In development or when no env origins provided, combine defaults with env origins
  return [...defaultOrigins, ...envOrigins];
};

const allowedOrigins = getAllowedOrigins();

// CORS origin function to handle dynamic origins
const corsOrigin = (origin, callback) => {
  // Allow requests with no origin (mobile apps, Postman, etc.)
  if (!origin) return callback(null, true);
  
  // Check if origin is in allowed list
  if (allowedOrigins.includes(origin)) {
    return callback(null, true);
  }
  
  // Allow any onrender.com subdomain in production
  if (process.env.NODE_ENV === 'production' && origin.endsWith('.onrender.com')) {
    return callback(null, true);
  }
  
  callback(new Error('Not allowed by CORS'));
};

app.use(cors({
  origin: corsOrigin,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'student-id', 'attempt-id']
}));

// Additional CORS headers for maximum compatibility
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, student-id, attempt-id');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/health', healthRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'ReactJS Quiz Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// Root endpoint redirect
app.get('/', (req, res) => {
  res.redirect('/api/health');
});

// 404 handler
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

module.exports = app;
