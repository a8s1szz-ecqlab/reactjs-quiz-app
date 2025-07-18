import config from '../config';

// API service for communicating with the backend
const API_BASE_URL = config.API_URL;

// Log the final API URL for debugging
if (config.isDevelopment) {
  console.log('Final API_BASE_URL:', API_BASE_URL);
}

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

  // Start an exam for a specific attempt ID
  static async startQuiz(attemptId) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/quiz/start/${attemptId}`, {
        method: 'GET',
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to start exam');
      }

      return data.data;
    } catch (error) {
      console.error('Error starting exam:', error);
      throw new Error(`Failed to start exam: ${error.message}`);
    }
  }

  // Submit exam answers and get results
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
        throw new Error(data.message || 'Failed to submit exam');
      }

      return data; // Return the full response object since frontend expects data.data format
    } catch (error) {
      console.error('Error submitting exam:', error);
      throw new Error(`Failed to submit exam: ${error.message}`);
    }
  }

  // Validate exam attempt
  static async validateQuizAttempt(attemptId) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/student/attempt/${attemptId}/validate`, {
        method: 'GET',
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to validate exam attempt');
      }

      return data.data;
    } catch (error) {
      console.error('Error validating exam attempt:', error);
      throw new Error(`Failed to validate exam attempt: ${error.message}`);
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

  // Get exam statistics
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

  // Get student profile
  static async getStudentProfile(studentId) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/student/profile/${studentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'student-id': studentId
        }
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get student profile');
      }

      return data.data;
    } catch (error) {
      console.error('Error getting student profile:', error);
      throw new Error(`Failed to get student profile: ${error.message}`);
    }
  }

  // Get student attempts
  static async getStudentAttempts(studentId) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/student/profile/${studentId}/attempts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'student-id': studentId
        }
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get student attempts');
      }

      return data.data;
    } catch (error) {
      console.error('Error getting student attempts:', error);
      throw new Error(`Failed to get student attempts: ${error.message}`);
    }
  }

  // Get attempt results for a student
  static async getAttemptResults(attemptId, studentId) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/student/attempt/${attemptId}/results`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'student-id': studentId
        }
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get attempt results');
      }

      return data.data;
    } catch (error) {
      console.error('Error getting attempt results:', error);
      throw new Error(`Failed to get attempt results: ${error.message}`);
    }
  }

  // Admin API methods
  // Get dashboard stats
  static async getDashboardStats(adminToken) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/admin/dashboard/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': adminToken
        }
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get dashboard stats');
      }

      return data.data;
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      throw new Error(`Failed to get dashboard stats: ${error.message}`);
    }
  }

  // Get all students
  static async getStudents(adminToken) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/admin/students`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': adminToken
        }
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get students');
      }

      return data.data;
    } catch (error) {
      console.error('Error getting students:', error);
      throw new Error(`Failed to get students: ${error.message}`);
    }
  }

  // Get quiz attempts
  static async getQuizAttempts(adminToken) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/admin/quiz-attempts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': adminToken
        }
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get quiz attempts');
      }

      return data.data;
    } catch (error) {
      console.error('Error getting quiz attempts:', error);
      throw new Error(`Failed to get quiz attempts: ${error.message}`);
    }
  }

  // Create student
  static async createStudent(adminToken, studentData) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/admin/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': adminToken
        },
        body: JSON.stringify(studentData)
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to create student');
      }

      return data.data;
    } catch (error) {
      console.error('Error creating student:', error);
      throw new Error(`Failed to create student: ${error.message}`);
    }
  }

  // Update student
  static async updateStudent(adminToken, studentId, studentData) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/admin/students/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': adminToken
        },
        body: JSON.stringify(studentData)
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to update student');
      }

      return data.data;
    } catch (error) {
      console.error('Error updating student:', error);
      throw new Error(`Failed to update student: ${error.message}`);
    }
  }

  // Delete student
  static async deleteStudent(adminToken, studentId) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/admin/students/${studentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': adminToken
        }
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to delete student');
      }

      return data.data;
    } catch (error) {
      console.error('Error deleting student:', error);
      throw new Error(`Failed to delete student: ${error.message}`);
    }
  }

  // Assign quiz attempt
  static async assignQuizAttempt(adminToken, assignmentData) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/admin/quiz-attempts/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': adminToken
        },
        body: JSON.stringify(assignmentData)
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to assign quiz attempt');
      }

      return data.data;
    } catch (error) {
      console.error('Error assigning quiz attempt:', error);
      throw new Error(`Failed to assign quiz attempt: ${error.message}`);
    }
  }

  // Delete student (hard delete)
  static async hardDeleteStudent(adminToken, studentId) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/admin/students/${studentId}/hard`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': adminToken
        }
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to hard delete student');
      }

      return data.data;
    } catch (error) {
      console.error('Error hard deleting student:', error);
      throw new Error(`Failed to hard delete student: ${error.message}`);
    }
  }

  // Delete quiz attempt
  static async deleteQuizAttempt(adminToken, attemptId) {
    try {
      const data = await this.fetchWithErrorHandling(`${API_BASE_URL}/admin/quiz-attempts/${attemptId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': adminToken
        }
      });
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to delete quiz attempt');
      }

      return data.data;
    } catch (error) {
      console.error('Error deleting quiz attempt:', error);
      throw new Error(`Failed to delete quiz attempt: ${error.message}`);
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
