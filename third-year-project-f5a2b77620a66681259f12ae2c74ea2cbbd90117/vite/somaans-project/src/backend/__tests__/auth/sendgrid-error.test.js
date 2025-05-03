// src/backend/__tests__/auth/sendgrid-error.test.js
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  jest.mock('@sendgrid/mail', () => ({
    setApiKey: jest.fn(),
    send: jest.fn()
  }));
  
  jest.mock('crypto', () => ({
    randomBytes: jest.fn().mockReturnValue({
      toString: jest.fn().mockReturnValue('testtoken123')
    })
  }));
  
  describe('SendGrid Error Handling', () => {
    let pool;
    let request;
    let response;
    let sgMail;
    
    beforeEach(() => {
      jest.clearAllMocks();
      pool = require('../../db');
      sgMail = require('@sendgrid/mail');
      
      request = {
        body: { email: 'test@example.com' },
        protocol: 'http',
        get: jest.fn().mockReturnValue('localhost:5000')
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
    
    test('should handle SendGrid general error gracefully', async () => {
      // Match the exact query sequence in the server
      // 1. User lookup
      pool.query.mockResolvedValueOnce({
        rows: [{ id: 1, username: 'testuser', email: 'test@example.com' }]
      });
      
      // 2. Token insertion
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Simulate a generic error from SendGrid
      const genericError = new Error('SendGrid error');
      sgMail.send.mockRejectedValueOnce(genericError);
      
      const server = require('../../server');
      await server.__testables.forgotPasswordHandler(request, response);
      
      // Server should return 500 with error
      expect(response.status).toHaveBeenCalledWith(500);
      // Don't check exact message - just verify it's an error response
      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(String) })
      );
    });
  });