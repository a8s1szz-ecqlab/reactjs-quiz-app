const RemoteTopicService = require('../services/RemoteTopicService');
const { getAvailableTopics } = require('../services/TopicService');
const config = require('../config');

// Health check for remote topic system
const checkTopicHealth = async (req, res) => {
  try {
    const healthData = {
      timestamp: new Date().toISOString(),
      system: 'Topic Management System',
      version: '1.0.0',
      status: 'healthy',
      checks: {}
    };

    // Check local topics
    try {
      const localTopics = await getAvailableTopics();
      healthData.checks.localTopics = {
        status: 'healthy',
        count: localTopics.length,
        available: localTopics.map(topic => topic.name || topic.id)
      };
    } catch (error) {
      healthData.checks.localTopics = {
        status: 'unhealthy',
        error: error.message
      };
      healthData.status = 'degraded';
    }

    // Check remote topic service if enabled
    if (config.remote?.enabled) {
      try {
        const remoteService = new RemoteTopicService(config.remote);
        
        // Test connectivity by trying to fetch a known topic
        const testTopicUrl = `${config.remote.baseUrl}/microservice.json`;
        const response = await remoteService.httpClient.get(testTopicUrl, {
          timeout: 3000
        });

        if (response.statusCode >= 200 && response.statusCode < 300) {
          healthData.checks.remoteService = {
            status: 'healthy',
            baseUrl: config.remote.baseUrl,
            httpStatus: response.statusCode
          };
        } else {
          healthData.checks.remoteService = {
            status: 'unhealthy',
            baseUrl: config.remote.baseUrl,
            httpStatus: response.statusCode,
            error: `HTTP ${response.statusCode}`
          };
          healthData.status = 'degraded';
        }
      } catch (error) {
        healthData.checks.remoteService = {
          status: 'unhealthy',
          baseUrl: config.remote.baseUrl,
          error: error.message,
          fallbackAvailable: config.remote.fallbackToLocal
        };
        
        // Only mark as degraded if fallback is not available
        if (!config.remote.fallbackToLocal) {
          healthData.status = 'unhealthy';
        } else {
          healthData.status = 'degraded';
        }
      }
    } else {
      healthData.checks.remoteService = {
        status: 'disabled',
        message: 'Remote topic service is disabled'
      };
    }

    // Check cache system
    try {
      const fs = require('fs');
      const path = require('path');
      const cacheDir = path.join(__dirname, '../../cache');
      
      if (fs.existsSync(cacheDir)) {
        const cacheFiles = fs.readdirSync(cacheDir);
        healthData.checks.cache = {
          status: 'healthy',
          directory: cacheDir,
          files: cacheFiles.length,
          size: getCacheSizeSync(cacheDir)
        };
      } else {
        healthData.checks.cache = {
          status: 'healthy',
          directory: cacheDir,
          files: 0,
          message: 'Cache directory will be created when needed'
        };
      }
    } catch (error) {
      healthData.checks.cache = {
        status: 'unhealthy',
        error: error.message
      };
    }

    // Set overall status based on critical checks
    const criticalChecks = ['localTopics'];
    const hasCriticalFailures = criticalChecks.some(check => 
      healthData.checks[check]?.status === 'unhealthy'
    );

    if (hasCriticalFailures) {
      healthData.status = 'unhealthy';
    }

    // Set appropriate HTTP status code
    const httpStatus = healthData.status === 'healthy' ? 200 : 
                      healthData.status === 'degraded' ? 200 : 503;

    res.status(httpStatus).json(healthData);

  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({
      timestamp: new Date().toISOString(),
      system: 'Topic Management System',
      status: 'unhealthy',
      error: error.message
    });
  }
};

// Get detailed topic information
const getTopicInfo = async (req, res) => {
  try {
    const { topic } = req.params;
    
    if (!topic) {
      return res.status(400).json({
        success: false,
        message: 'Topic parameter is required'
      });
    }

    const topicData = {
      topic: topic,
      timestamp: new Date().toISOString(),
      sources: {}
    };

    // Try to get from local
    try {
      const localTopics = await getAvailableTopics();
      const localTopic = localTopics.find(t => t.id === topic || t.name === topic);
      
      if (localTopic) {
        topicData.sources.local = {
          available: true,
          name: localTopic.name,
          questionCount: localTopic.questions?.length || 0,
          timeLimit: localTopic.timeLimit,
          difficulty: localTopic.difficulty
        };
      } else {
        topicData.sources.local = {
          available: false,
          message: 'Topic not found in local storage'
        };
      }
    } catch (error) {
      topicData.sources.local = {
        available: false,
        error: error.message
      };
    }

    // Try to get from remote if enabled
    if (config.remote?.enabled) {
      try {
        const remoteService = new RemoteTopicService(config.remote);
        const remoteTopic = await remoteService.fetchTopic(topic);
        
        topicData.sources.remote = {
          available: true,
          name: remoteTopic.name,
          questionCount: remoteTopic.questions?.length || 0,
          timeLimit: remoteTopic.timeLimit,
          difficulty: remoteTopic.difficulty,
          cached: remoteService.cacheService.isMemoryCached(`topic_${topic}`)
        };
      } catch (error) {
        topicData.sources.remote = {
          available: false,
          error: error.message
        };
      }
    } else {
      topicData.sources.remote = {
        available: false,
        message: 'Remote topic service is disabled'
      };
    }

    // Determine which source was used
    topicData.activeSource = topicData.sources.remote.available ? 'remote' : 
                            topicData.sources.local.available ? 'local' : 'none';

    res.json({
      success: true,
      data: topicData
    });

  } catch (error) {
    console.error('Topic info error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get topic information',
      error: error.message
    });
  }
};

// Clear cache endpoint
const clearCache = async (req, res) => {
  try {
    const { type } = req.query; // 'memory', 'file', or 'all'
    
    if (config.remote?.enabled) {
      const remoteService = new RemoteTopicService(config.remote);
      
      switch (type) {
        case 'memory':
          remoteService.cacheService.clearMemoryCache();
          break;
        case 'file':
          await remoteService.cacheService.clearFileCache();
          break;
        case 'all':
        default:
          remoteService.cacheService.clearMemoryCache();
          await remoteService.cacheService.clearFileCache();
          break;
      }

      res.json({
        success: true,
        message: `${type || 'all'} cache cleared successfully`,
        timestamp: new Date().toISOString()
      });
    } else {
      res.json({
        success: true,
        message: 'Remote service disabled - no cache to clear',
        timestamp: new Date().toISOString()
      });
    }

  } catch (error) {
    console.error('Cache clear error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cache',
      error: error.message
    });
  }
};

// Helper function to get cache size synchronously
function getCacheSizeSync(dirPath) {
  try {
    const fs = require('fs');
    const path = require('path');
    
    let totalSize = 0;
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    }
    
    // Convert to human readable format
    if (totalSize === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(totalSize) / Math.log(1024));
    return `${(totalSize / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  } catch (error) {
    return 'Unknown';
  }
}

module.exports = {
  checkTopicHealth,
  getTopicInfo,
  clearCache
};
