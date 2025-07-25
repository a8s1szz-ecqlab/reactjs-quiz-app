// Topic Management Index
// This file imports all individual topic files and provides a unified interface
// Enhanced with remote topic loading capabilities

const { topicService, getTopicData } = require('../../services/TopicService');

// Local fallback topics
const reactjsTopic = require('./reactjs');
const microserviceTopic = require('./microservice');
const sapCommerceCloudTopic = require('./sap-commerce-cloud');

// Local topic registry for fallback
const localTopics = {
  reactjs: reactjsTopic,
  microservice: microserviceTopic,
  'sap-commerce-cloud': sapCommerceCloudTopic
};

/**
 * Initialize topic system
 */
async function initializeTopics() {
  try {
    console.log('Initializing topic system...');
    // The TopicService initializes itself, no explicit init needed
    console.log('✅ Topic system initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize topic system:', error);
    return false;
  }
}

/**
 * Get all available topics (local + remote)
 */
async function getAllTopics() {
  try {
    const topics = await topicService.getAvailableTopics();
    return topics;
  } catch (error) {
    console.error('Error getting all topics:', error);
    // Return local topics as fallback
    return Object.keys(localTopics).map(key => ({
      id: key,
      name: localTopics[key].name || key,
      questions: localTopics[key].questions || [],
      timeLimit: localTopics[key].timeLimit || 20,
      source: 'local'
    }));
  }
}

/**
 * Get a specific topic by ID
 */
async function getTopic(topicId) {
  try {
    const topicData = await getTopicData(topicId);
    return {
      id: topicId,
      ...topicData,
      source: 'remote'
    };
  } catch (error) {
    console.warn(`Failed to get topic ${topicId} from service, trying local fallback:`, error.message);
    
    // Try local fallback
    if (localTopics[topicId]) {
      return {
        id: topicId,
        ...localTopics[topicId],
        source: 'local'
      };
    }
    
    throw new Error(`Topic ${topicId} not found in remote or local sources`);
  }
}

/**
 * Get questions from a topic
 */
async function getTopicQuestions(topicId, limit = null) {
  try {
    const questions = await topicService.getTopicQuestions(topicId, limit);
    return questions;
  } catch (error) {
    console.error(`Error getting questions for topic ${topicId}:`, error);
    
    // Try local fallback
    if (localTopics[topicId] && localTopics[topicId].questions) {
      let questions = localTopics[topicId].questions;
      if (limit && limit > 0 && questions.length > limit) {
        // Shuffle and take limited number
        questions = shuffleArray([...questions]).slice(0, limit);
      }
      return questions;
    }
    
    throw error;
  }
}

/**
 * Get default questions (fallback to reactjs)
 */
async function getDefaultQuestions() {
  try {
    return await getTopicQuestions('reactjs');
  } catch (error) {
    console.error('Error getting default questions:', error);
    return localTopics.reactjs?.questions || [];
  }
}

/**
 * Get random questions (legacy compatibility)
 */
async function getRandomQuestions(count = 50, topic = 'reactjs') {
  return await getTopicQuestions(topic, count);
}

/**
 * Get topic by ID (legacy compatibility)
 */
async function getTopicById(topicId) {
  return await getTopic(topicId);
}

/**
 * Get questions by topic (legacy compatibility)
 */
async function getQuestionsByTopic(topic) {
  return await getTopicQuestions(topic);
}

/**
 * Shuffle array utility
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Warm up cache with specific topics (simplified)
 */
async function warmUpCache(topicIds = []) {
  console.log('Warming up cache for topics:', topicIds);
  // With TopicService, caching is handled internally
  return true;
}

/**
 * Get cache statistics (simplified)
 */
async function getCacheStats() {
  return {
    memoryCache: {
      size: 0,
      hits: 0,
      misses: 0
    },
    fileCache: {
      size: 0,
      files: 0
    },
    topics: Object.keys(localTopics).length
  };
}

/**
 * Get system health status
 */
async function getHealthStatus() {
  try {
    const topics = await getAllTopics();
    return {
      status: 'healthy',
      topicsAvailable: topics.length,
      localTopics: Object.keys(localTopics).length,
      remoteEnabled: !!topicService.remoteService,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
      localTopics: Object.keys(localTopics).length,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Clear cache (simplified)
 */
function clearCache() {
  console.log('Cache clear requested (handled by TopicService)');
}

/**
 * Shutdown topic system
 */
function shutdown() {
  console.log('Topic system shutdown');
}

// Available topics constant
const AVAILABLE_TOPICS = Object.keys(localTopics);

// Export functions
module.exports = {
  // Core functions
  initializeTopics,
  getAllTopics,
  getTopic,
  getTopicQuestions,
  
  // Legacy compatibility functions
  getDefaultQuestions,
  getRandomQuestions,
  getTopicById,
  getQuestionsByTopic,
  AVAILABLE_TOPICS,
  
  // Cache management
  warmUpCache,
  getCacheStats,
  clearCache,
  
  // System management
  getHealthStatus,
  shutdown,
  
  // Direct topic access
  localTopics,
  
  // Legacy compatibility
  getCacheService: () => topicService
};
