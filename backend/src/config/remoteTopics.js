/**
 * Remote Topic Configuration
 * Centralized configuration for remote topic data sources
 */

// Base configuration from environment variables
const config = {
  // Remote topic service configuration
  remote: {
    // Base URL for remote topic data
    baseUrl: process.env.REMOTE_TOPICS_BASE_URL || 'https://api.example.com/topics',
    
    // Backup URLs for failover
    fallbackUrls: [
      process.env.REMOTE_TOPICS_FALLBACK_URL_1 || 'https://backup1.example.com/topics',
      process.env.REMOTE_TOPICS_FALLBACK_URL_2 || 'https://backup2.example.com/topics'
    ].filter(Boolean),
    
    // HTTP client configuration
    timeout: parseInt(process.env.REMOTE_TOPICS_TIMEOUT) || 10000, // 10 seconds
    retryAttempts: parseInt(process.env.REMOTE_TOPICS_RETRY_ATTEMPTS) || 3,
    retryDelay: parseInt(process.env.REMOTE_TOPICS_RETRY_DELAY) || 1000, // 1 second
    maxRetryDelay: parseInt(process.env.REMOTE_TOPICS_MAX_RETRY_DELAY) || 10000, // 10 seconds
    
    // Headers for remote requests
    headers: {
      'User-Agent': 'ReactJS-Quiz-App/1.0.0',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(process.env.REMOTE_TOPICS_API_KEY && {
        'Authorization': `Bearer ${process.env.REMOTE_TOPICS_API_KEY}`
      }),
      ...(process.env.REMOTE_TOPICS_CUSTOM_HEADERS && 
        JSON.parse(process.env.REMOTE_TOPICS_CUSTOM_HEADERS)
      )
    }
  },

  // Caching configuration
  cache: {
    // Cache directory
    directory: process.env.CACHE_DIRECTORY || './cache/topics',
    
    // Cache TTL (Time To Live) in milliseconds
    ttl: parseInt(process.env.CACHE_TTL) || (60 * 60 * 1000), // 1 hour
    
    // Maximum cache size (number of topics)
    maxSize: parseInt(process.env.CACHE_MAX_SIZE) || 100,
    
    // Cache cleanup interval
    cleanupInterval: parseInt(process.env.CACHE_CLEANUP_INTERVAL) || (5 * 60 * 1000), // 5 minutes
    
    // Enable/disable file-based cache
    enableFileCache: process.env.CACHE_ENABLE_FILE !== 'false',
    
    // Enable/disable memory cache
    enableMemoryCache: process.env.CACHE_ENABLE_MEMORY !== 'false',
    
    // Cache statistics tracking
    enableStats: process.env.CACHE_ENABLE_STATS !== 'false'
  },

  // Validation configuration
  validation: {
    // Strict validation mode
    strict: process.env.VALIDATION_STRICT === 'true',
    
    // Required fields for topics
    requiredFields: ['id', 'title', 'questions'],
    
    // Required fields for questions
    requiredQuestionFields: ['id', 'question', 'options', 'correctAnswer'],
    
    // Maximum number of questions per topic
    maxQuestionsPerTopic: parseInt(process.env.MAX_QUESTIONS_PER_TOPIC) || 200,
    
    // Minimum number of questions per topic
    minQuestionsPerTopic: parseInt(process.env.MIN_QUESTIONS_PER_TOPIC) || 10
  },

  // Service configuration
  service: {
    // Background refresh interval for cached topics
    backgroundRefreshInterval: parseInt(process.env.BACKGROUND_REFRESH_INTERVAL) || (10 * 60 * 1000), // 10 minutes
    
    // Enable/disable background refresh
    enableBackgroundRefresh: process.env.ENABLE_BACKGROUND_REFRESH !== 'false',
    
    // Health check interval
    healthCheckInterval: parseInt(process.env.HEALTH_CHECK_INTERVAL) || (2 * 60 * 1000), // 2 minutes
    
    // Preload popular topics on startup
    preloadTopics: (process.env.PRELOAD_TOPICS || 'reactjs,microservice,sap-commerce-cloud').split(','),
    
    // Fallback to local topics on remote failure
    enableLocalFallback: process.env.ENABLE_LOCAL_FALLBACK !== 'false',
    
    // Maximum concurrent remote requests
    maxConcurrentRequests: parseInt(process.env.MAX_CONCURRENT_REQUESTS) || 5
  },

  // Logging configuration
  logging: {
    // Log level (error, warn, info, debug)
    level: process.env.LOG_LEVEL || 'info',
    
    // Enable/disable request logging
    logRequests: process.env.LOG_REQUESTS !== 'false',
    
    // Enable/disable cache logging
    logCache: process.env.LOG_CACHE !== 'false',
    
    // Enable/disable performance logging
    logPerformance: process.env.LOG_PERFORMANCE !== 'false'
  },

  // Development configuration
  development: {
    // Enable/disable mock responses
    enableMockResponses: process.env.ENABLE_MOCK_RESPONSES === 'true',
    
    // Mock response delay
    mockDelay: parseInt(process.env.MOCK_DELAY) || 1000,
    
    // Enable/disable debug mode
    debugMode: process.env.DEBUG_MODE === 'true',
    
    // Force refresh cache on every request (for testing)
    forceRefresh: process.env.FORCE_REFRESH === 'true'
  }
};

// Validation functions
const validateConfig = () => {
  const errors = [];

  // Validate URLs
  if (!config.remote.baseUrl) {
    errors.push('Remote base URL is required');
  }

  // Validate timeouts
  if (config.remote.timeout < 1000) {
    errors.push('Timeout must be at least 1000ms');
  }

  // Validate cache TTL
  if (config.cache.ttl < 60000) {
    errors.push('Cache TTL must be at least 60 seconds');
  }

  // Validate retry attempts
  if (config.remote.retryAttempts < 0 || config.remote.retryAttempts > 10) {
    errors.push('Retry attempts must be between 0 and 10');
  }

  return errors;
};

// Helper functions
const getRemoteUrl = (topicId) => {
  return `${config.remote.baseUrl}/${topicId}.json`;
};

const getFallbackUrl = (topicId, index = 0) => {
  if (index >= config.remote.fallbackUrls.length) {
    return null;
  }
  return `${config.remote.fallbackUrls[index]}/${topicId}.json`;
};

const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

// Initialize configuration
const initializeConfig = () => {
  const errors = validateConfig();
  
  if (errors.length > 0) {
    console.warn('Configuration validation warnings:');
    errors.forEach(error => console.warn(`- ${error}`));
  }

  // Log configuration in development
  if (isDevelopment() && config.logging.level === 'debug') {
    console.log('Remote Topic Configuration:', JSON.stringify(config, null, 2));
  }

  console.log(`Remote topic service configured with base URL: ${config.remote.baseUrl}`);
  console.log(`Cache enabled: memory=${config.cache.enableMemoryCache}, file=${config.cache.enableFileCache}`);
  console.log(`Background refresh: ${config.service.enableBackgroundRefresh ? 'enabled' : 'disabled'}`);
};

// Export configuration and utilities
module.exports = {
  config,
  validateConfig,
  getRemoteUrl,
  getFallbackUrl,
  isProduction,
  isDevelopment,
  initializeConfig,
  
  // Environment helpers
  env: {
    isProduction: isProduction(),
    isDevelopment: isDevelopment(),
    nodeEnv: process.env.NODE_ENV || 'development'
  },
  
  // Quick access to commonly used values
  defaults: {
    timeout: config.remote.timeout,
    cacheTtl: config.cache.ttl,
    retryAttempts: config.remote.retryAttempts,
    preloadTopics: config.service.preloadTopics
  }
};
