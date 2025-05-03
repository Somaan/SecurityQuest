// src/backend/__tests__/email/sendgrid-integration.test.js
// Tests for SendGrid email integration

// Mock modules
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
      toString: jest.fn().mockReturnValue('test-token-123')
    })
  }));
  
  describe('SendGrid Email Integration', () => {
    let pool;
    let request;
    let response;
    let sgMail;
    
    beforeEach(() => {
      jest.clearAllMocks();
      
      // Import the pool module and get the mock
      pool = require('../../db');
      sgMail = require('@sendgrid/mail');
      
      // Create mock req/res objects
      request = {
        body: {},
        protocol: 'http',
        get: jest.fn().mockReturnValue('localhost:5000')
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
    
    test('should send password reset email with correct template', async () => {
      // Setup request
      request.body = {
        email: 'test@example.com'
      };
      
      // Mock user query result
      pool.query.mockResolvedValueOnce({
        rows: [{
          id: 123,
          username: 'testuser',
          email: 'test@example.com'
        }]
      });
      
      // Mock token storage query
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Setup SendGrid mock to capture the sent email
      let sentEmail;
      sgMail.send.mockImplementation((email) => {
        sentEmail = email;
        return Promise.resolve([{ statusCode: 202 }]);
      });
      
      // Import server and execute handler
      const server = require('../../server');
      await server.__testables.forgotPasswordHandler(request, response);
      
      // Verify email was sent with correct params
      expect(sgMail.send).toHaveBeenCalled();
      expect(sentEmail).toBeDefined();
      expect(sentEmail.to).toBe('test@example.com');
      expect(sentEmail.subject).toBe('Social Engineering Platform');
      
      // Verify email contains reset token
      expect(sentEmail.html).toContain('test-token-123');
      
      // Verify response
      expect(response.json).toHaveBeenCalledWith({
        message: 'Password reset email sent'
      });
    });
    
    test('should handle SendGrid API failure', async () => {
      // Setup request
      request.body = {
        email: 'test@example.com'
      };
      
      // Mock user query result
      pool.query.mockResolvedValueOnce({
        rows: [{
          id: 123,
          username: 'testuser',
          email: 'test@example.com'
        }]
      });
      
      // Mock token storage query
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Setup SendGrid mock to simulate an API error
      const sgError = new Error('SendGrid API error');
      sgError.response = {
        body: {
          errors: [{ message: 'Invalid API key' }]
        }
      };
      sgMail.send.mockRejectedValueOnce(sgError);
      
      // Import server and execute handler
      const server = require('../../server');
      await server.__testables.forgotPasswordHandler(request, response);
      
      // Verify error handling
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(String) })
      );
    });
  });