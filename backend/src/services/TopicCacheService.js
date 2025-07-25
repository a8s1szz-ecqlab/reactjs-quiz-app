const RemoteTopicService = require('./RemoteTopicService');

/**
 * Enhanced topic cache service with background refresh and preloading
 */
class TopicCacheService {
  constructor() {
    this.remoteService = new RemoteTopicService();
    this.preloadedTopics = new Set();
    this.refreshInterval = 10 * 60 * 1000; // 10 minutes
    this.backgroundRefreshEnabled = false;
    this.refreshTimer = null;
  }

  /**
   * Initialize the cache service
   */
  async init() {
    try {
      await this.preloadPopularTopics();
      this.startBackgroundRefresh();
      console.log('TopicCacheService initialized successfully');
    } catch (error) {
      console.error('TopicCacheService initialization failed:', error.message);
      throw error;
    }
  }

  /**
   * Get topic data with intelligent caching
   * @param {string} topicId - Topic identifier
   * @param {Object} options - Options
   * @returns {Promise<Object>} Topic data
   */
  async getTopic(topicId, options = {}) {
    try {
      // Track access for popularity
      this._trackAccess(topicId);
      
      return await this.remoteService.getTopic(topicId, options);
    } catch (error) {
      console.error(`TopicCacheService error for ${topicId}:`, error.message);
      throw error;
    }
  }

  /**
   * Get all topics with caching
   * @param {Object} options - Options
   * @returns {Promise<Array>} Array of topics
   */
  async getAllTopics(options = {}) {
    return await this.remoteService.getAllTopics(options);
  }

  /**
   * Preload popular topics to cache
   */
  async preloadPopularTopics() {
    const popularTopics = ['reactjs', 'microservice', 'sap-commerce-cloud'];
    
    console.log('Preloading popular topics...');
    
    const preloadPromises = popularTopics.map(async (topicId) => {
      try {
        await this.remoteService.getTopic(topicId, { useCache: false });
        this.preloadedTopics.add(topicId);
        console.log(`Preloaded topic: ${topicId}`);
      } catch (error) {
        console.warn(`Failed to preload topic ${topicId}:`, error.message);
      }
    });

    await Promise.allSettled(preloadPromises);
    console.log(`Preloaded ${this.preloadedTopics.size} topics`);
  }

  /**
   * Start background refresh of cached topics
   */
  startBackgroundRefresh() {
    if (this.backgroundRefreshEnabled) {
      return;
    }

    this.backgroundRefreshEnabled = true;
    
    this.refreshTimer = setInterval(async () => {
      try {
        await this._refreshCachedTopics();
      } catch (error) {
        console.error('Background refresh failed:', error.message);
      }
    }, this.refreshInterval);

    console.log(`Background refresh started (interval: ${this.refreshInterval}ms)`);
  }

  /**
   * Stop background refresh
   */
  stopBackgroundRefresh() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
    
    this.backgroundRefreshEnabled = false;
    console.log('Background refresh stopped');
  }

  /**
   * Refresh cached topics in background
   */
  async _refreshCachedTopics() {
    console.log('Starting background cache refresh...');
    
    const topicsToRefresh = Array.from(this.preloadedTopics);
    let refreshed = 0;

    for (const topicId of topicsToRefresh) {
      try {
        await this.remoteService.getTopic(topicId, { 
          forceRefresh: true, 
          useCache: false 
        });
        refreshed++;
      } catch (error) {
        console.warn(`Background refresh failed for ${topicId}:`, error.message);
      }
    }

    console.log(`Background refresh completed: ${refreshed}/${topicsToRefresh.length} topics updated`);
  }

  /**
   * Track topic access for popularity metrics
   * @param {string} topicId - Topic identifier
   */
  _trackAccess(topicId) {
    // Simple tracking - could be enhanced with proper analytics
    const now = Date.now();
    const key = `access_${topicId}`;
    
    if (!this.accessStats) {
      this.accessStats = new Map();
    }

    const current = this.accessStats.get(key) || { count: 0, lastAccess: now };
    this.accessStats.set(key, {
      count: current.count + 1,
      lastAccess: now,
      topicId: topicId
    });
  }

  /**
   * Get access statistics
   * @returns {Object} Access statistics
   */
  getAccessStats() {
    if (!this.accessStats) {
      return { totalAccess: 0, topicStats: [] };
    }

    const stats = Array.from(this.accessStats.values())
      .sort((a, b) => b.count - a.count);

    return {
      totalAccess: stats.reduce((sum, stat) => sum + stat.count, 0),
      topicStats: stats,
      mostPopular: stats[0]?.topicId || null,
      preloadedTopics: Array.from(this.preloadedTopics)
    };
  }

  /**
   * Warm up cache for specific topics
   * @param {Array} topicIds - Array of topic IDs to warm up
   */
  async warmUpCache(topicIds = []) {
    console.log(`Warming up cache for topics: ${topicIds.join(', ')}`);
    
    const warmupPromises = topicIds.map(async (topicId) => {
      try {
        await this.remoteService.getTopic(topicId, { forceRefresh: true });
        console.log(`Cache warmed up for: ${topicId}`);
      } catch (error) {
        console.warn(`Cache warmup failed for ${topicId}:`, error.message);
      }
    });

    await Promise.allSettled(warmupPromises);
  }

  /**
   * Clear all caches
   */
  clearCache() {
    this.remoteService.clearCache();
    this.preloadedTopics.clear();
    this.accessStats?.clear();
    console.log('All caches cleared by TopicCacheService');
  }

  /**
   * Get comprehensive cache statistics
   * @returns {Object} Cache statistics
   */
  async getCacheStats() {
    const remoteStats = this.remoteService.getCacheStats();
    const accessStats = this.getAccessStats();
    
    return {
      ...remoteStats,
      accessStats: accessStats,
      backgroundRefresh: {
        enabled: this.backgroundRefreshEnabled,
        interval: this.refreshInterval,
        preloadedTopics: Array.from(this.preloadedTopics)
      },
      service: {
        initialized: true,
        uptime: process.uptime(),
        memory: process.memoryUsage()
      }
    };
  }

  /**
   * Health check for the cache service
   * @returns {Promise<Object>} Health status
   */
  async healthCheck() {
    const remoteHealth = await this.remoteService.healthCheck();
    
    return {
      ...remoteHealth,
      cache: {
        backgroundRefreshEnabled: this.backgroundRefreshEnabled,
        preloadedTopicsCount: this.preloadedTopics.size,
        accessStatsAvailable: !!this.accessStats
      }
    };
  }

  /**
   * Shutdown the service gracefully
   */
  shutdown() {
    this.stopBackgroundRefresh();
    console.log('TopicCacheService shutdown completed');
  }
}

module.exports = TopicCacheService;
