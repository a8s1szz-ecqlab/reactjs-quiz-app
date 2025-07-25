const { getTopicById, initializeTopics, isInitialized } = require('../data/topics');

/**
 * Middleware to preload topics and handle async topic operations
 */
class TopicLoaderMiddleware {
  constructor() {
    this.loadingStates = new Map();
    this.loadedTopics = new Set();
  }

  /**
   * Initialize topic system if not already done
   */
  async initializeSystem(req, res, next) {
    try {
      if (!isInitialized()) {
        console.log('Initializing topic system...');
        await initializeTopics();
      }
      next();
    } catch (error) {
      console.error('Topic system initialization failed:', error.message);
      res.status(500).json({
        error: 'Topic system initialization failed',
        message: error.message,
        fallbackAvailable: true
      });
    }
  }

  /**
   * Preload topic data for API endpoints
   */
  preloadTopic() {
    return async (req, res, next) => {
      const topicId = req.params.topicId || req.query.topic || req.body.topicId;
      
      if (!topicId) {
        return next();
      }

      const loadingKey = `loading_${topicId}`;
      
      try {
        // Check if topic is currently being loaded
        if (this.loadingStates.has(loadingKey)) {
          console.log(`Topic ${topicId} is already being loaded, waiting...`);
          await this.loadingStates.get(loadingKey);
        } else {
          // Start loading the topic
          const loadingPromise = this._loadTopic(topicId);
          this.loadingStates.set(loadingKey, loadingPromise);
          
          await loadingPromise;
          
          // Clean up loading state
          this.loadingStates.delete(loadingKey);
        }

        // Add topic info to request object
        req.topicLoaded = true;
        req.topicId = topicId;
        
        next();
      } catch (error) {
        console.error(`Topic preloading failed for ${topicId}:`, error.message);
        
        // Clean up loading state
        this.loadingStates.delete(loadingKey);
        
        // Continue with fallback
        req.topicLoaded = false;
        req.topicError = error.message;
        req.topicId = topicId;
        
        next();
      }
    };
  }

  /**
   * Validate topic exists before proceeding
   */
  validateTopic() {
    return async (req, res, next) => {
      const topicId = req.params.topicId || req.query.topic || req.body.topicId;
      
      if (!topicId) {
        return res.status(400).json({
          error: 'Topic ID is required',
          message: 'Please provide a valid topic identifier'
        });
      }

      try {
        const topic = await getTopicById(topicId);
        
        if (!topic) {
          return res.status(404).json({
            error: 'Topic not found',
            message: `Topic '${topicId}' does not exist`,
            availableTopics: ['reactjs', 'microservice', 'sap-commerce-cloud']
          });
        }

        // Add topic data to request
        req.topic = topic;
        req.topicId = topicId;
        
        next();
      } catch (error) {
        console.error(`Topic validation failed for ${topicId}:`, error.message);
        
        res.status(500).json({
          error: 'Topic validation failed',
          message: error.message,
          topicId: topicId
        });
      }
    };
  }

  /**
   * Add loading state information to response
   */
  addLoadingInfo() {
    return (req, res, next) => {
      // Add loading state to response headers
      if (req.topicLoaded !== undefined) {
        res.set('X-Topic-Loaded', req.topicLoaded.toString());
      }
      
      if (req.topicError) {
        res.set('X-Topic-Error', req.topicError);
      }
      
      if (req.topic?.source) {
        res.set('X-Topic-Source', req.topic.source);
      }

      // Add to response body if JSON
      const originalJson = res.json;
      res.json = function(body) {
        if (body && typeof body === 'object') {
          body.topicMeta = {
            loaded: req.topicLoaded,
            source: req.topic?.source || 'unknown',
            error: req.topicError || null,
            cached: req.topic?.cached || false
          };
        }
        return originalJson.call(this, body);
      };

      next();
    };
  }

  /**
   * Handle topic loading errors gracefully
   */
  errorHandler() {
    return (error, req, res, next) => {
      console.error('Topic middleware error:', error.message);

      // Check if it's a topic-related error
      if (error.message.includes('Topic') || error.message.includes('topic')) {
        return res.status(500).json({
          error: 'Topic service error',
          message: error.message,
          fallbackAvailable: true,
          timestamp: new Date().toISOString()
        });
      }

      // Pass to next error handler
      next(error);
    };
  }

  /**
   * Internal method to load a topic
   * @private
   */
  async _loadTopic(topicId) {
    console.log(`Loading topic: ${topicId}`);
    
    try {
      const topic = await getTopicById(topicId);
      
      if (topic) {
        this.loadedTopics.add(topicId);
        console.log(`Topic ${topicId} loaded successfully from ${topic.source || 'unknown'} source`);
        return topic;
      } else {
        throw new Error(`Topic ${topicId} not found`);
      }
    } catch (error) {
      console.error(`Failed to load topic ${topicId}:`, error.message);
      throw error;
    }
  }

  /**
   * Get middleware statistics
   */
  getStats() {
    return {
      loadingStates: this.loadingStates.size,
      loadedTopics: Array.from(this.loadedTopics),
      loadedCount: this.loadedTopics.size
    };
  }

  /**
   * Clear middleware state
   */
  clear() {
    this.loadingStates.clear();
    this.loadedTopics.clear();
    console.log('Topic loader middleware state cleared');
  }
}

// Create singleton instance
const topicLoader = new TopicLoaderMiddleware();

module.exports = {
  // Middleware functions
  initializeSystem: topicLoader.initializeSystem.bind(topicLoader),
  preloadTopic: topicLoader.preloadTopic.bind(topicLoader),
  validateTopic: topicLoader.validateTopic.bind(topicLoader),
  addLoadingInfo: topicLoader.addLoadingInfo.bind(topicLoader),
  errorHandler: topicLoader.errorHandler.bind(topicLoader),
  
  // Utility functions
  getStats: topicLoader.getStats.bind(topicLoader),
  clear: topicLoader.clear.bind(topicLoader),
  
  // Access to instance for testing
  instance: topicLoader
};
