// Mock modules
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('Rate Limiting Middleware', () => {
    let pool;
    let request;
    let response;
    let next;
    
    beforeEach(() => {
      jest.clearAllMocks();
      
      // Import the pool module and get the mock
      pool = require('../db');
      
      // Create mock req/res/next objects
      request = {
        ip: '127.0.0.1',
        path: '/api/login',
        method: 'POST'
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      
      next = jest.fn();
    });
    
    test('should allow requests under the rate limit', async () => {
      // Create a simple rate limiting middleware
      const rateLimiter = async (req, res, next) => {
        const clientIp = req.ip;
        const path = req.path;
        const method = req.method;
        
        try {
          // Check requests in the last minute
          const result = await pool.query(`
            SELECT COUNT(*) as request_count
            FROM request_log
            WHERE 
              client_ip = $1 AND
              path = $2 AND
              method = $3 AND
              request_time > NOW() - INTERVAL '1 minute'
          `, [clientIp, path, method]);
          
          const requestCount = parseInt(result.rows[0].request_count);
          
          // Define limits based on endpoint
          let limit = 60; // Default 60 requests per minute
          
          // Stricter limits for auth endpoints
          if (path.includes('/login') || path.includes('/register')) {
            limit = 5; // 5 requests per minute
          }
          
          // Check if over limit
          if (requestCount >= limit) {
            return res.status(429).json({
              error: 'Too many requests',
              retryAfter: 60 // Retry after 1 minute
            });
          }
          
          // Log this request
          await pool.query(`
            INSERT INTO request_log (client_ip, path, method, request_time)
            VALUES ($1, $2, $3, NOW())
          `, [clientIp, path, method]);
          
          // Continue processing the request
          return next();
          
        } catch (error) {
          console.error('Rate limiter error:', error);
          // Allow the request on error
          return next();
        }
      };
      
      // Mock query for checking requests
      pool.query.mockResolvedValueOnce({
        rows: [{ request_count: '3' }] // Under limit of 5 for login
      });
      
      // Mock query for logging request
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Execute middleware
      await rateLimiter(request, response, next);
      
      // Verify next() was called (request allowed)
      expect(next).toHaveBeenCalled();
    });
    
    test('should block requests over the rate limit', async () => {
      // Create a simple rate limiting middleware
      const rateLimiter = async (req, res, next) => {
        const clientIp = req.ip;
        const path = req.path;
        const method = req.method;
        
        try {
          // Check requests in the last minute
          const result = await pool.query(`
            SELECT COUNT(*) as request_count
            FROM request_log
            WHERE 
              client_ip = $1 AND
              path = $2 AND
              method = $3 AND
              request_time > NOW() - INTERVAL '1 minute'
          `, [clientIp, path, method]);
          
          const requestCount = parseInt(result.rows[0].request_count);
          
          // Define limits based on endpoint
          let limit = 60; // Default 60 requests per minute
          
          // Stricter limits for auth endpoints
          if (path.includes('/login') || path.includes('/register')) {
            limit = 5; // 5 requests per minute
          }
          
          // Check if over limit
          if (requestCount >= limit) {
            return res.status(429).json({
              error: 'Too many requests',
              retryAfter: 60 // Retry after 1 minute
            });
          }
          
          // Log this request
          await pool.query(`
            INSERT INTO request_log (client_ip, path, method, request_time)
            VALUES ($1, $2, $3, NOW())
          `, [clientIp, path, method]);
          
          // Continue processing the request
          return next();
          
        } catch (error) {
          console.error('Rate limiter error:', error);
          // Allow the request on error
          return next();
        }
      };
      
      // Mock query for checking requests - over limit
      pool.query.mockResolvedValueOnce({
        rows: [{ request_count: '6' }] // Over limit of 5 for login
      });
      
      // Execute middleware
      await rateLimiter(request, response, next);
      
      // Verify response
      expect(next).not.toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(429);
      expect(response.json).toHaveBeenCalledWith({
        error: 'Too many requests',
        retryAfter: 60
      });
    });
  });