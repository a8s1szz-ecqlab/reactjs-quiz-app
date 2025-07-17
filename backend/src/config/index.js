// Backend configuration constants
const config = {
  // Server configuration
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Authentication
  ADMIN_TOKEN: process.env.ADMIN_TOKEN || 'admin_2025_reactjs_quiz',
  
  // Database
  DATA_DIR: process.env.DATA_DIR || null,
  
  // CORS
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  // Environment detection
  isDevelopment: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production'
};

// Log configuration for debugging (only in development)
if (config.isDevelopment) {
  console.log('Backend Configuration:', {
    PORT: config.PORT,
    NODE_ENV: config.NODE_ENV,
    ADMIN_TOKEN: config.ADMIN_TOKEN ? '***' : 'NOT SET',
    DATA_DIR: config.DATA_DIR || 'default',
    FRONTEND_URL: config.FRONTEND_URL,
    isDevelopment: config.isDevelopment
  });
}

module.exports = config;
