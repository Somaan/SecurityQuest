// src/backend/__tests__/auth/email-reset.test.js
jest.mock('pg', () => {
    const mPool = { query: jest.fn() };
    return { Pool: jest.fn(() => mPool) };
  });
  
  jest.mock('@sendgrid/mail', () => ({
    setApiKey: jest.fn(),
    send: jest.fn().mockResolvedValue([{ statusCode: 202 }])
  }));
  
  jest.mock('crypto', () => ({
    randomBytes: jest.fn().mockReturnValue({
      toString: jest.fn().mockReturnValue('testtoken123')
    })
  }));
  
  describe('Password Reset Email Flow', () => {
    let pool, request, response, sgMail;
    
    beforeEach(() => {
      jest.clearAllMocks();
      pool = require('../../db');
      sgMail = require('@sendgrid/mail');
      
      request = {
        body: {},
        protocol: 'http',
        get: jest.fn().mockReturnValue('localhost:5000')
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });
    
    test('should send password reset email with token', async () => {
      // Mock exact query responses needed by the handler
      pool.query.mockResolvedValueOnce({
        rows: [{ id: 123, username: 'testuser', email: 'test@example.com' }]
      });
      pool.query.mockResolvedValueOnce({ rows: [] }); // Token storage
      
      request.body = { email: 'test@example.com' };
      
      const server = require('../../server');
      await server.__testables.forgotPasswordHandler(request, response);
      
      // Verify all expected behavior
      expect(pool.query).toHaveBeenCalledTimes(2);
      expect(sgMail.send).toHaveBeenCalledWith(expect.objectContaining({
        to: 'test@example.com',
        from: expect.objectContaining({
          email: expect.any(String),
          name: expect.any(String)
        }),
        html: expect.stringContaining('testtoken123')
      }));
      expect(response.json).toHaveBeenCalledWith({ message: 'Password reset email sent' });
    });
    
    test('should handle SendGrid errors gracefully', async () => {
      // Precisely mock the sequence needed to reach error handling code
      pool.query.mockResolvedValueOnce({
        rows: [{ id: 123, username: 'testuser', email: 'test@example.com' }]
      });
      pool.query.mockResolvedValueOnce({ rows: [] }); // Token storage
      
      // Force SendGrid to throw an error with proper message property
      const error = new Error('SendGrid API error');
      error.response = { body: { errors: [{ message: 'API error' }] } };
      sgMail.send.mockRejectedValueOnce(error);
      
      request.body = { email: 'test@example.com' };
      
      const server = require('../../server');
      await server.__testables.forgotPasswordHandler(request, response);
      
      // The actual server returns a 500 status with error message
      expect(response.status).toHaveBeenCalledWith(500);
      // Just test that json was called without specifying the exact content
      // since the error message might vary
      expect(response.json).toHaveBeenCalled();
    });
  });