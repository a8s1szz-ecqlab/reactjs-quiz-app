const path = require('path');
const fs = require('fs').promises;
const RemoteTopicService = require('./RemoteTopicService');
const config = require('../config');

/**
 * Main service for managing topics from both local and remote sources
 */
class TopicService {
  constructor() {
    this.remoteService = config.remote?.enabled ? new RemoteTopicService(config.remote) : null;
    this.localTopicsPath = path.join(__dirname, '../data/topics');
    
    if (config.remote?.enabled) {
      console.log('✅ Remote topic service enabled');
    } else {
      console.log('📁 Using local topics only (remote service disabled)');
    }
  }

  /**
   * Get available local topics
   */
  async getAvailableTopics() {
    try {
      const topics = [];
      
      // Scan local topics directory
      const files = await fs.readdir(this.localTopicsPath);
      
      for (const file of files) {
        if (file.endsWith('.js')) {
          const topicId = file.replace('.js', '');
          try {
            const topicData = require(path.join(this.localTopicsPath, file));
            topics.push({
              id: topicId,
              name: topicData.name || topicId,
              description: topicData.description || '',
              questions: topicData.questions || [],
              timeLimit: topicData.timeLimit || 20,
              difficulty: topicData.difficulty || 'intermediate',
              source: 'local'
            });
          } catch (error) {
            console.warn(`Failed to load local topic ${topicId}:`, error.message);
          }
        }
      }
      
      return topics;
    } catch (error) {
      console.error('Error getting available topics:', error);
      return [];
    }
  }

  /**
   * Get questions for a specific topic
   */
  async getTopicQuestions(topicId, limit = null) {
    try {
      let topicData = null;
      
      // Try remote first if enabled
      if (this.remoteService) {
        try {
          topicData = await this.remoteService.getTopic(topicId);
          console.log(`Loaded topic ${topicId} from remote source`);
        } catch (error) {
          console.warn(`Failed to load topic ${topicId} from remote, falling back to local:`, error.message);
        }
      }
      
      // Fallback to local if remote failed or disabled
      if (!topicData) {
        topicData = await this.getLocalTopic(topicId);
        console.log(`Loaded topic ${topicId} from local source`);
      }
      
      if (!topicData || !topicData.questions) {
        throw new Error(`Topic ${topicId} not found or has no questions`);
      }
      
      // Apply limit if specified
      let questions = topicData.questions;
      if (limit && limit > 0 && questions.length > limit) {
        // Shuffle and take limited number
        questions = this.shuffleArray([...questions]).slice(0, limit);
      }
      
      return questions;
    } catch (error) {
      console.error(`Error getting questions for topic ${topicId}:`, error);
      throw error;
    }
  }

  /**
   * Get local topic data
   */
  async getLocalTopic(topicId) {
    try {
      const topicPath = path.join(this.localTopicsPath, `${topicId}.js`);
      
      // Check if file exists
      try {
        await fs.access(topicPath);
      } catch (error) {
        throw new Error(`Local topic ${topicId} not found`);
      }
      
      // Load topic data
      const topicData = require(topicPath);
      return topicData;
    } catch (error) {
      console.error(`Error loading local topic ${topicId}:`, error);
      throw error;
    }
  }

  /**
   * Get complete topic data including metadata
   */
  async getTopicData(topicId) {
    try {
      let topicData = null;
      
      // Try remote first if enabled
      if (this.remoteService) {
        try {
          topicData = await this.remoteService.getTopic(topicId);
          console.log(`Loaded topic ${topicId} from remote source`);
        } catch (error) {
          console.warn(`Failed to load topic ${topicId} from remote, falling back to local:`, error.message);
        }
      }
      
      // Fallback to local if remote failed or disabled
      if (!topicData) {
        topicData = await this.getLocalTopic(topicId);
        console.log(`Loaded topic ${topicId} from local source`);
      }
      
      if (!topicData) {
        throw new Error(`Topic ${topicId} not found`);
      }
      
      return topicData;
    } catch (error) {
      console.error(`Error getting topic data for ${topicId}:`, error);
      throw error;
    }
  }

  /**
   * Shuffle array utility
   */
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * Validate topic data structure
   */
  validateTopicData(topicData) {
    if (!topicData || typeof topicData !== 'object') {
      throw new Error('Invalid topic data: must be an object');
    }
    
    if (!topicData.questions || !Array.isArray(topicData.questions)) {
      throw new Error('Invalid topic data: questions must be an array');
    }
    
    if (topicData.questions.length === 0) {
      throw new Error('Invalid topic data: questions array is empty');
    }
    
    // Validate each question
    for (let i = 0; i < topicData.questions.length; i++) {
      const question = topicData.questions[i];
      
      if (!question.question || typeof question.question !== 'string') {
        throw new Error(`Invalid question at index ${i}: missing or invalid question text`);
      }
      
      if (!question.options || !Array.isArray(question.options)) {
        throw new Error(`Invalid question at index ${i}: options must be an array`);
      }
      
      if (question.options.length < 2) {
        throw new Error(`Invalid question at index ${i}: must have at least 2 options`);
      }
      
      if (typeof question.correctAnswer !== 'number' || 
          question.correctAnswer < 0 || 
          question.correctAnswer >= question.options.length) {
        throw new Error(`Invalid question at index ${i}: correctAnswer must be a valid option index`);
      }
    }
    
    return true;
  }
}

// Create singleton instance
const topicService = new TopicService();

// Export functions for backward compatibility
async function getAvailableTopics() {
  return topicService.getAvailableTopics();
}

async function getTopicQuestions(topicId, limit = null) {
  return topicService.getTopicQuestions(topicId, limit);
}

async function getTopicData(topicId) {
  return topicService.getTopicData(topicId);
}

module.exports = {
  TopicService,
  topicService,
  getAvailableTopics,
  getTopicQuestions,
  getTopicData
};
