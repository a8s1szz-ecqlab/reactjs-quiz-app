// Configuration constants
const getApiBaseUrl = () => {
  const isDevelopment = import.meta.env.DEV;
  
  if (isDevelopment) {
    return '/api';
  }
  
  // In production, try multiple sources for the API URL
  const envApiUrl = import.meta.env.VITE_API_URL;
  const defaultApiUrl = 'https://reactjs-quiz-backend.onrender.com/api';
  
  return envApiUrl || defaultApiUrl;
};

export const config = {
  // API configuration
  API_URL: getApiBaseUrl(),
  
  // Admin authentication
  ADMIN_TOKEN: import.meta.env.VITE_ADMIN_TOKEN || 'admin_2025_reactjs_quiz',
  
  // Environment detection
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD
};

// Log configuration for debugging (only in development)
if (config.isDevelopment) {
  console.log('App Configuration:', {
    API_URL: config.API_URL,
    ADMIN_TOKEN: config.ADMIN_TOKEN ? '***' : 'NOT SET',
    isDevelopment: config.isDevelopment
  });
}

export default config;
