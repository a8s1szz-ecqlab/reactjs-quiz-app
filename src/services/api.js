// API configuration - use proxy in development, backend URL in production
const isDevelopment = import.meta.env.DEV;

// Get API base URL with better fallback handling
const getApiBaseUrl = () => {
  if (isDevelopment) {
    return '/api';
  }
  
  // In production, try multiple sources for the API URL
  const envApiUrl = import.meta.env.VITE_API_URL;
  const defaultApiUrl = 'https://reactjs-quiz-backend.onrender.com/api';
  
  // Log for debugging
  console.log('Environment API URL:', envApiUrl);
  console.log('Default API URL:', defaultApiUrl);
  
  return envApiUrl || defaultApiUrl;
};

const API_BASE_URL = getApiBaseUrl();

// Log the final API URL for debugging
console.log('Final API_BASE_URL:', API_BASE_URL);

// API service for communicating with the backend
class QuizApiService {
  // Helper method to handle fetch requests with proper error handling
  static async fetchWithErrorHandling(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Start a quiz for a specific attempt ID
  static async startQuiz(attemptId) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/quiz/start/${attemptId}`, {
        method: 'GET',
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to start quiz');
      }

      return data.data;
    } catch (error) {
      console.error('Error starting quiz:', error);
      throw new Error(`Failed to start quiz: ${error.message}`);
    }
  }

  // Submit quiz answers and get results
  static async submitQuiz(attemptId, answers, totalTime, timeLeft) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/quiz/submit`, {
        method: 'POST',
        body: JSON.stringify({
          attemptId,
          answers,
          totalTime,
          timeLeft
        }),
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to submit quiz');
      }

      return data.data;
    } catch (error) {
      console.error('Error submitting quiz:', error);
      throw new Error(`Failed to submit quiz: ${error.message}`);
    }
  }

  // Validate quiz attempt
  static async validateQuizAttempt(attemptId) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/student/attempt/${attemptId}/validate`, {
        method: 'GET',
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to validate quiz attempt');
      }

      return data.data;
    } catch (error) {
      console.error('Error validating quiz attempt:', error);
      throw new Error(`Failed to validate quiz attempt: ${error.message}`);
    }
  }

  // Validate identifier (admin token, student ID, or attempt ID)
  static async validateIdentifier(identifier) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/auth/validate`, {
        method: 'POST',
        body: JSON.stringify({ identifier }),
      });
      
      return data;
    } catch (error) {
      console.error('Error validating identifier:', error);
      throw error;
    }
  }

  // Get quiz statistics
  static async getQuizStats() {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/quiz/stats`, {
        method: 'GET',
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get quiz stats');
      }

      return data.data;
    } catch (error) {
      console.error('Error getting quiz stats:', error);
      throw new Error(`Failed to get quiz stats: ${error.message}`);
    }
  }

  // Health check
  static async healthCheck() {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/health`, {
        method: 'GET',
      });

      return data;
    } catch (error) {
      console.error('Error checking backend health:', error);
      throw new Error(`Backend health check failed: ${error.message}`);
    }
  }
}

export default QuizApiService;
