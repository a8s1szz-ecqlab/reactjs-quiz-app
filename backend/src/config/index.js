// Backend configuration constants
const config = {
  // Server configuration
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Authentication
  ADMIN_TOKEN: process.env.ADMIN_TOKEN || 'admin_2025_programming_quiz',
  
  // Database configuration
  DATABASE_TYPE: process.env.DATABASE_TYPE || 'lowdb', // 'lowdb' or 'supabase'
  DATA_DIR: process.env.DATA_DIR || null,
  
  // Supabase configuration
  SUPABASE_URL: process.env.SUPABASE_URL || null,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || null,
  
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
    DATABASE_TYPE: config.DATABASE_TYPE,
    ADMIN_TOKEN: config.ADMIN_TOKEN ? '***' : 'NOT SET',
    DATA_DIR: config.DATA_DIR || 'default',
    SUPABASE_URL: config.SUPABASE_URL ? config.SUPABASE_URL : 'NOT SET',
    FRONTEND_URL: config.FRONTEND_URL,
    isDevelopment: config.isDevelopment
  });
}

module.exports = config;
