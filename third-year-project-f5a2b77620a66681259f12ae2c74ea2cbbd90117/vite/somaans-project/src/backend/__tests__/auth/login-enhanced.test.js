// src/backend/__tests__/auth/login-enhanced.test.js
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

describe('Enhanced Login Functionality', () => {
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
  
  test('should generate remember token when requested', async () => {
    // Mock user query response
    pool.query.mockResolvedValueOnce({
      rows: [{
        id: 1,
        username: 'testuser',
        password_hash: 'hashedpassword',
      }],
    });
    
    // Mock password validation
    bcrypt.compare.mockResolvedValueOnce(true);
    
    // Mock last login update
    pool.query.mockResolvedValueOnce({ rows: [] });
    
    // Mock remember token generation
    crypto.randomBytes.mockReturnValueOnce({
      toString: jest.fn().mockReturnValue('securetoken123'),
    });
    
    // Mock table check
    pool.query.mockResolvedValueOnce({
      rows: [{ exists: true }]
    });
    
    // Mock token storage
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 10 }]
    });
    
    // Mock token verification
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, token: 'securetoken123' }]
    });
    
    // Setup request with remember_me
    request.body = {
      username: 'testuser',
      password: 'correctpassword',
      remember_me: true
    };
    
    // Import and execute the handler
    const server = require('../../server');
    const loginHandler = server.__testables.loginHandler;
    await loginHandler(request, response);
    
    // Check that login succeeds with remember token
    expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      remember_token: expect.any(String)
    }));
  });
  
  test('should not generate token when remember_me is false', async () => {
    // Mock user query response
    pool.query.mockResolvedValueOnce({
      rows: [{
        id: 1,
        username: 'testuser',
        password_hash: 'hashedpassword',
      }],
    });
    
    // Mock password validation
    bcrypt.compare.mockResolvedValueOnce(true);
    
    // Mock last login update
    pool.query.mockResolvedValueOnce({ rows: [] });
    
    // Setup request with remember_me = false
    request.body = {
      username: 'testuser',
      password: 'correctpassword',
      remember_me: false
    };
    
    // Import and execute the handler
    const server = require('../../server');
    const loginHandler = server.__testables.loginHandler;
    await loginHandler(request, response);
    
    // Check that login succeeds with no remember token
    expect(crypto.randomBytes).not.toHaveBeenCalled();
    expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      user: expect.objectContaining({
        id: 1,
        username: 'testuser'
      })
    }));
  });
});