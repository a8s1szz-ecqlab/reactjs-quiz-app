const fs = require('fs');
const path = require('path');

/**
 * File-based cache utilities for topic data
 */
class CacheUtils {
  constructor(cacheDir = path.join(__dirname, '../data/cache')) {
    this.cacheDir = cacheDir;
    this.ensureCacheDir();
  }

  /**
   * Ensure cache directory exists
   */
  ensureCacheDir() {
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  /**
   * Generate cache key for a topic
   * @param {string} topicId - Topic identifier
   * @returns {string} Cache file path
   */
  getCacheKey(topicId) {
    return path.join(this.cacheDir, `${topicId}.json`);
  }

  /**
   * Get cached data for a topic
   * @param {string} topicId - Topic identifier
   * @param {number} maxAge - Maximum age in milliseconds (default: 5 minutes)
   * @returns {Object|null} Cached data or null if not found/expired
   */
  get(topicId, maxAge = 5 * 60 * 1000) {
    try {
      const cacheFile = this.getCacheKey(topicId);
      
      if (!fs.existsSync(cacheFile)) {
        return null;
      }

      const stats = fs.statSync(cacheFile);
      const now = new Date();
      const fileAge = now.getTime() - stats.mtime.getTime();

      if (fileAge > maxAge) {
        // Cache expired, remove file
        fs.unlinkSync(cacheFile);
        return null;
      }

      const data = fs.readFileSync(cacheFile, 'utf8');
      const parsed = JSON.parse(data);
      
      console.log(`Cache hit for topic: ${topicId}`);
      return parsed;
    } catch (error) {
      console.error(`Cache read error for topic ${topicId}:`, error.message);
      return null;
    }
  }

  /**
   * Set cached data for a topic
   * @param {string} topicId - Topic identifier
   * @param {Object} data - Data to cache
   * @returns {boolean} Success status
   */
  set(topicId, data) {
    try {
      const cacheFile = this.getCacheKey(topicId);
      const cacheData = {
        ...data,
        cachedAt: new Date().toISOString(),
        cacheKey: topicId
      };
      
      fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2));
      console.log(`Cache updated for topic: ${topicId}`);
      return true;
    } catch (error) {
      console.error(`Cache write error for topic ${topicId}:`, error.message);
      return false;
    }
  }

  /**
   * Remove cached data for a topic
   * @param {string} topicId - Topic identifier
   * @returns {boolean} Success status
   */
  remove(topicId) {
    try {
      const cacheFile = this.getCacheKey(topicId);
      
      if (fs.existsSync(cacheFile)) {
        fs.unlinkSync(cacheFile);
        console.log(`Cache cleared for topic: ${topicId}`);
      }
      
      return true;
    } catch (error) {
      console.error(`Cache remove error for topic ${topicId}:`, error.message);
      return false;
    }
  }

  /**
   * Clear all cached data
   * @returns {boolean} Success status
   */
  clearAll() {
    try {
      const files = fs.readdirSync(this.cacheDir);
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          fs.unlinkSync(path.join(this.cacheDir, file));
        }
      }
      
      console.log('All cache cleared');
      return true;
    } catch (error) {
      console.error('Cache clear all error:', error.message);
      return false;
    }
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache statistics
   */
  getStats() {
    try {
      const files = fs.readdirSync(this.cacheDir).filter(f => f.endsWith('.json'));
      const stats = {
        totalCachedTopics: files.length,
        cacheDirectory: this.cacheDir,
        cachedTopics: []
      };

      for (const file of files) {
        const filePath = path.join(this.cacheDir, file);
        const fileStats = fs.statSync(filePath);
        const topicId = path.basename(file, '.json');
        
        stats.cachedTopics.push({
          topicId,
          size: fileStats.size,
          lastModified: fileStats.mtime,
          age: Date.now() - fileStats.mtime.getTime()
        });
      }

      return stats;
    } catch (error) {
      console.error('Cache stats error:', error.message);
      return { error: error.message };
    }
  }
}

module.exports = CacheUtils;
