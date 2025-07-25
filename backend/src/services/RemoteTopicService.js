const HttpClient = require('../utils/httpClient');
const CacheUtils = require('../utils/cacheUtils');
const TopicValidator = require('../data/remote/topicValidator');
const config = require('../config');

/**
 * Service for fetching topic data from remote URLs
 */
class RemoteTopicService {
  constructor(options = {}) {
    // Use passed options or fall back to global config
    const effectiveConfig = {
      timeout: options.timeout || config.TOPICS_FETCH_TIMEOUT || 10000,
      retryAttempts: options.retryAttempts || config.TOPICS_RETRY_ATTEMPTS || 3,
      retryDelay: options.retryDelay || config.TOPICS_RETRY_DELAY || 1000,
      baseUrl: options.baseUrl || config.TOPICS_BASE_URL,
      fallbackMode: options.fallbackMode !== undefined ? options.fallbackMode : (config.TOPICS_FALLBACK_MODE !== 'false')
    };

    this.httpClient = new HttpClient({
      timeout: effectiveConfig.timeout,
      retryAttempts: effectiveConfig.retryAttempts,
      retryDelay: effectiveConfig.retryDelay
    });
    
    this.cache = new CacheUtils();
    this.baseUrl = effectiveConfig.baseUrl;
    this.fallbackMode = effectiveConfig.fallbackMode;
    
    // In-memory cache for faster access
    this.memoryCache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Get topic data by ID
   * @param {string} topicId - Topic identifier
   * @param {Object} options - Options for fetching
   * @returns {Promise<Object>} Topic data
   */
  async getTopic(topicId, options = {}) {
    const { forceRefresh = false, useCache = true } = options;
    
    try {
      // Check memory cache first
      if (!forceRefresh && useCache && this.memoryCache.has(topicId)) {
        const cached = this.memoryCache.get(topicId);
        if (Date.now() - cached.timestamp < this.cacheTimeout) {
          console.log(`Memory cache hit for topic: ${topicId}`);
          return cached.data;
        } else {
          this.memoryCache.delete(topicId);
        }
      }

      // Check file cache
      if (!forceRefresh && useCache) {
        const cachedData = this.cache.get(topicId);
        if (cachedData) {
          this._setMemoryCache(topicId, cachedData);
          return cachedData;
        }
      }

      // Fetch from remote
      const remoteData = await this._fetchFromRemote(topicId);
      
      if (remoteData) {
        // Validate and sanitize
        const validation = TopicValidator.validate(remoteData);
        if (!validation.success) {
          console.warn(`Topic validation failed for ${topicId}:`, validation.errors);
          
          if (this.fallbackMode) {
            return await this._getFallbackTopic(topicId);
          } else {
            throw new Error(`Invalid topic data: ${validation.errors.join(', ')}`);
          }
        }

        const sanitizedData = TopicValidator.sanitize(remoteData);
        
        // Cache the data
        this.cache.set(topicId, sanitizedData);
        this._setMemoryCache(topicId, sanitizedData);
        
        console.log(`Successfully fetched topic from remote: ${topicId}`);
        return sanitizedData;
      }

      // If remote fetch failed and fallback is enabled
      if (this.fallbackMode) {
        console.log(`Remote fetch failed for ${topicId}, using fallback`);
        return await this._getFallbackTopic(topicId);
      }

      throw new Error(`Topic not found: ${topicId}`);

    } catch (error) {
      console.error(`Error fetching topic ${topicId}:`, error.message);
      
      // Try fallback on any error if enabled
      if (this.fallbackMode) {
        try {
          return await this._getFallbackTopic(topicId);
        } catch (fallbackError) {
          console.error(`Fallback also failed for ${topicId}:`, fallbackError.message);
        }
      }
      
      throw error;
    }
  }

  /**
   * Get all available topics metadata
   * @param {Object} options - Options for fetching
   * @returns {Promise<Array>} Array of topic metadata
   */
  async getAllTopics(options = {}) {
    const topicIds = ['reactjs', 'microservice', 'sap-commerce-cloud'];
    const topics = [];

    for (const topicId of topicIds) {
      try {
        const topic = await this.getTopic(topicId, options);
        topics.push({
          id: topic.id,
          name: topic.name,
          description: topic.description,
          icon: topic.icon,
          questionCount: topic.questions?.length || 0,
          timeLimit: topic.timeLimit,
          passingScore: topic.passingScore,
          version: topic.version,
          lastUpdated: topic.lastUpdated
        });
      } catch (error) {
        console.error(`Failed to load topic ${topicId}:`, error.message);
        // Continue with other topics
      }
    }

    return topics;
  }

  /**
   * Fetch topic data from remote URL
   * @param {string} topicId - Topic identifier
   * @returns {Promise<Object>} Topic data
   */
  async _fetchFromRemote(topicId) {
    if (!this.baseUrl) {
      throw new Error('TOPICS_BASE_URL not configured');
    }

    const url = `${this.baseUrl}/${topicId}.json`;
    console.log(`Fetching topic from remote: ${url}`);

    try {
      const response = await this.httpClient.get(url);
      return response.data;
    } catch (error) {
      if (error.statusCode === 404) {
        console.log(`Topic not found at remote URL: ${url}`);
        return null;
      }
      throw error;
    }
  }

  /**
   * Get fallback topic data from local files
   * @param {string} topicId - Topic identifier
   * @returns {Promise<Object>} Topic data
   */
  async _getFallbackTopic(topicId) {
    try {
      // Dynamically require local topic files
      let localTopic;
      
      switch (topicId) {
        case 'reactjs':
          localTopic = require('../data/topics/reactjs');
          break;
        case 'microservice':
          localTopic = require('../data/topics/microservice');
          break;
        case 'sap-commerce-cloud':
          localTopic = require('../data/topics/sap-commerce-cloud');
          break;
        default:
          throw new Error(`No fallback available for topic: ${topicId}`);
      }

      console.log(`Using fallback data for topic: ${topicId}`);
      
      // Add metadata for fallback
      const fallbackData = {
        ...localTopic,
        version: '1.0.0',
        lastUpdated: new Date().toISOString(),
        source: 'fallback'
      };

      return fallbackData;
    } catch (error) {
      throw new Error(`Fallback failed for topic ${topicId}: ${error.message}`);
    }
  }

  /**
   * Set data in memory cache
   * @param {string} topicId - Topic identifier
   * @param {Object} data - Topic data
   */
  _setMemoryCache(topicId, data) {
    this.memoryCache.set(topicId, {
      data: data,
      timestamp: Date.now()
    });
  }

  /**
   * Clear all caches
   */
  clearCache() {
    this.memoryCache.clear();
    this.cache.clearAll();
    console.log('All topic caches cleared');
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache statistics
   */
  getCacheStats() {
    const fileStats = this.cache.getStats();
    const memoryStats = {
      memoryCacheSize: this.memoryCache.size,
      memoryCacheKeys: Array.from(this.memoryCache.keys())
    };

    return {
      ...fileStats,
      ...memoryStats,
      configuration: {
        baseUrl: this.baseUrl,
        fallbackMode: this.fallbackMode,
        cacheTimeout: this.cacheTimeout
      }
    };
  }

  /**
   * Health check for the remote service
   * @returns {Promise<Object>} Health status
   */
  async healthCheck() {
    const status = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      configuration: {
        baseUrl: this.baseUrl,
        fallbackMode: this.fallbackMode,
        timeout: this.httpClient.timeout
      },
      tests: {}
    };

    try {
      // Test remote connectivity
      if (this.baseUrl) {
        const testStart = Date.now();
        try {
          await this._fetchFromRemote('reactjs');
          status.tests.remoteConnectivity = {
            status: 'pass',
            responseTime: Date.now() - testStart
          };
        } catch (error) {
          status.tests.remoteConnectivity = {
            status: 'fail',
            error: error.message,
            responseTime: Date.now() - testStart
          };
          if (!this.fallbackMode) {
            status.status = 'unhealthy';
          }
        }
      } else {
        status.tests.remoteConnectivity = {
          status: 'skip',
          reason: 'No base URL configured'
        };
      }

      // Test fallback availability
      if (this.fallbackMode) {
        try {
          await this._getFallbackTopic('reactjs');
          status.tests.fallbackAvailability = { status: 'pass' };
        } catch (error) {
          status.tests.fallbackAvailability = {
            status: 'fail',
            error: error.message
          };
          status.status = 'unhealthy';
        }
      }

      // Test cache functionality
      try {
        const testKey = 'health-check-test';
        const testData = { test: true, timestamp: Date.now() };
        this.cache.set(testKey, testData);
        const retrieved = this.cache.get(testKey);
        this.cache.remove(testKey);
        
        status.tests.cacheOperations = {
          status: retrieved && retrieved.test ? 'pass' : 'fail'
        };
      } catch (error) {
        status.tests.cacheOperations = {
          status: 'fail',
          error: error.message
        };
      }

    } catch (error) {
      status.status = 'unhealthy';
      status.error = error.message;
    }

    return status;
  }
}

module.exports = RemoteTopicService;
