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
  
  // Remote Topics Configuration
  TOPICS_BASE_URL: process.env.TOPICS_BASE_URL || 'https://cdn.example.com/quiz-topics',
  TOPICS_FETCH_TIMEOUT: parseInt(process.env.TOPICS_FETCH_TIMEOUT) || 10000,
  TOPICS_FALLBACK_MODE: process.env.TOPICS_FALLBACK_MODE === 'true' || true,
  TOPICS_RETRY_ATTEMPTS: parseInt(process.env.TOPICS_RETRY_ATTEMPTS) || 3,
  TOPICS_RETRY_DELAY: parseInt(process.env.TOPICS_RETRY_DELAY) || 1000,
  
  // Remote service configuration
  remote: {
    enabled: process.env.REMOTE_TOPICS_ENABLED === 'true',
    baseUrl: process.env.TOPICS_BASE_URL || 'https://cdn.example.com/quiz-topics',
    timeout: parseInt(process.env.TOPICS_FETCH_TIMEOUT) || 10000,
    fallbackMode: process.env.TOPICS_FALLBACK_MODE !== 'false',
    retryAttempts: parseInt(process.env.TOPICS_RETRY_ATTEMPTS) || 3,
    retryDelay: parseInt(process.env.TOPICS_RETRY_DELAY) || 1000
  },
  
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
    TOPICS_BASE_URL: config.TOPICS_BASE_URL,
    TOPICS_FETCH_TIMEOUT: config.TOPICS_FETCH_TIMEOUT,
    TOPICS_FALLBACK_MODE: config.TOPICS_FALLBACK_MODE,
    TOPICS_RETRY_ATTEMPTS: config.TOPICS_RETRY_ATTEMPTS,
    REMOTE_TOPICS_ENABLED: config.remote.enabled,
    FRONTEND_URL: config.FRONTEND_URL,
    isDevelopment: config.isDevelopment
  });
}

module.exports = config;
