const https = require('https');
const http = require('http');
const { URL } = require('url');

/**
 * Simple HTTP client with timeout and retry capabilities
 */
class HttpClient {
  constructor(options = {}) {
    this.timeout = options.timeout || 10000;
    this.retryAttempts = options.retryAttempts || 3;
    this.retryDelay = options.retryDelay || 1000;
  }

  /**
   * Make HTTP GET request with retry logic
   * @param {string} url - URL to fetch
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response data
   */
  async get(url, options = {}) {
    const maxAttempts = this.retryAttempts + 1;
    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await this._makeRequest(url, options);
        return response;
      } catch (error) {
        lastError = error;
        
        // Don't retry on certain errors
        if (error.statusCode === 404 || error.statusCode === 403 || error.statusCode === 401) {
          throw error;
        }

        if (attempt < maxAttempts) {
          const delay = this.retryDelay * Math.pow(2, attempt - 1); // Exponential backoff
          console.log(`HTTP request failed (attempt ${attempt}/${maxAttempts}), retrying in ${delay}ms...`, {
            url: url,
            error: error.message
          });
          await this._sleep(delay);
        }
      }
    }

    throw lastError;
  }

  /**
   * Make the actual HTTP request
   * @param {string} url - URL to fetch
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response data
   */
  _makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(url);
      const client = parsedUrl.protocol === 'https:' ? https : http;
      
      const requestOptions = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'GET',
        timeout: this.timeout,
        headers: {
          'User-Agent': 'QuizApp/1.0.0',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          ...options.headers
        }
      };

      // In development, ignore SSL certificate issues
      if (parsedUrl.protocol === 'https:' && process.env.NODE_ENV === 'development') {
        requestOptions.rejectUnauthorized = false;
      }

      const req = client.request(requestOptions, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              const jsonData = JSON.parse(data);
              resolve({
                data: jsonData,
                statusCode: res.statusCode,
                headers: res.headers,
                etag: res.headers.etag,
                lastModified: res.headers['last-modified']
              });
            } else {
              const error = new Error(`HTTP ${res.statusCode}: ${data}`);
              error.statusCode = res.statusCode;
              error.responseData = data;
              reject(error);
            }
          } catch (parseError) {
            const error = new Error(`Invalid JSON response: ${parseError.message}`);
            error.statusCode = res.statusCode;
            error.responseData = data;
            reject(error);
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Network error: ${error.message}`));
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error(`Request timeout after ${this.timeout}ms`));
      });

      req.end();
    });
  }

  /**
   * Sleep for specified milliseconds
   * @param {number} ms - Milliseconds to sleep
   */
  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = HttpClient;
