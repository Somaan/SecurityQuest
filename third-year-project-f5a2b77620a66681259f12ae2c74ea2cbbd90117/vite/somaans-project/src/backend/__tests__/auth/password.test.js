// src/backend/__tests__/auth/password.test.js
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Mock modules
jest.mock('pg', () => {
  const mPool = {
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

jest.mock('bcrypt');
jest.mock('crypto');

// Mock SendGrid
jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn().mockResolvedValue([{ statusCode: 202 }]),
}));

describe('Password Management', () => {
  let pool;
  let request;
  let response;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Import the pool module and get the mock
    pool = require('../../db');
    
    // Create a mock req/res
    request = {
      body: {},
    };
    
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  
  describe('Forgot Password Endpoint', () => {
    test('should return 404 if email not found', async () => {
      // Mock query response for non-existent email
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Setup request body
      request.body = {
        email: 'nonexistent@email.com',
      };
      
      // Import and execute the handler
      const server = require('../../server');
      const forgotPasswordHandler = server.__testables.forgotPasswordHandler;
      await forgotPasswordHandler(request, response);
      
      // Check expectations
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE email = $1',
        ['nonexistent@email.com']
      );
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ error: 'Email not found' });
    });
    
    test('should generate reset token and send email', async () => {
      // Mock query response for existing email
      pool.query.mockResolvedValueOnce({
        rows: [{
          id: 1,
          username: 'testuser',
          email: 'test@email.com',
        }],
      });
      
      // Mock crypto.randomBytes for reset token
      crypto.randomBytes.mockReturnValueOnce({
        toString: jest.fn().mockReturnValue('resettoken123'),
      });
      
      // Mock token insertion query
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Setup request body
      request.body = {
        email: 'test@email.com',
      };
      
      // Get SendGrid mock
      const sgMail = require('@sendgrid/mail');
      
      // Import and execute the handler
      const server = require('../../server');
      const forgotPasswordHandler = server.__testables.forgotPasswordHandler;
      await forgotPasswordHandler(request, response);
      
      // Check expectations
      expect(crypto.randomBytes).toHaveBeenCalledWith(32);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO password_reset'),
        [1, 'resettoken123', expect.any(Object)]
      );
      expect(sgMail.send).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'test@email.com',
          subject: 'Social Engineering Platform',
        })
      );
      expect(response.json).toHaveBeenCalledWith({
        message: 'Password reset email sent',
      });
    });
  });
  
  describe('Reset Password Endpoint', () => {
    test('should return 400 if token is invalid or expired', async () => {
      // Mock query response for invalid token
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Setup request body
      request.body = {
        token: 'invalidtoken',
        newPassword: 'newpassword123',
      };
      
      // Import and execute the handler
      const server = require('../../server');
      const resetPasswordHandler = server.__testables.resetPasswordHandler;
      await resetPasswordHandler(request, response);
      
      // Check expectations
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT * FROM password_reset'),
        ['invalidtoken']
      );
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
    });
    
    test('should update password and mark token as used', async () => {
      // Mock query response for valid token
      pool.query.mockResolvedValueOnce({
        rows: [{
          id: 1,
          user_id: 2,
          token: 'validtoken',
          used: false,
          expires_at: new Date(Date.now() + 3600000), // 1 hour in the future
        }],
      });
      
      // Mock bcrypt.hash for password hashing
      bcrypt.hash.mockResolvedValueOnce('newhashpassword');
      
      // Mock update password query
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Mock mark token as used query
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Setup request body
      request.body = {
        token: 'validtoken',
        newPassword: 'newpassword123',
      };
      
      // Import and execute the handler
      const server = require('../../server');
      const resetPasswordHandler = server.__testables.resetPasswordHandler;
      await resetPasswordHandler(request, response);
      
      // Check expectations
      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 10);
      expect(pool.query).toHaveBeenNthCalledWith(
        2,
        'UPDATE users SET password_hash = $1 WHERE id = $2',
        ['newhashpassword', 2]
      );
      expect(pool.query).toHaveBeenNthCalledWith(
        3,
        'UPDATE password_reset SET used = TRUE WHERE id = $1',
        [1]
      );
      expect(response.json).toHaveBeenCalledWith({
        message: 'Password successfully reset',
      });
    });
  });
});