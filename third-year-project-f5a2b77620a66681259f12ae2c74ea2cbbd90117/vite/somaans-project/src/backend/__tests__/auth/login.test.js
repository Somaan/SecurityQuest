// src/backend/__tests__/auth/login.test.js
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

describe('Login Endpoint', () => {
  let pool;
  let request;
  let response;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Import the pool module and get the mock
    pool = require('../db');
    
    // Create a mock req/res
    request = {
      body: {},
    };
    
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  
  test('should return 401 if user is not found', async () => {
    // Mock query response for non-existent user
    pool.query.mockResolvedValueOnce({ rows: [] });
    
    // Setup request body
    request.body = {
      username: 'nonexistent',
      password: 'password123',
    };
    
    // Import and execute the handler
    const server = require('../../../server');
    const loginHandler = server.__testables.loginHandler;
    await loginHandler(request, response);
    
    // Check expectations
    expect(pool.query).toHaveBeenCalledWith(
      'SELECT * FROM users WHERE username = $1',
      ['nonexistent']
    );
    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({ error: 'User not found' });
  });
  
  test('should return 401 if password is invalid', async () => {
    // Mock user query response
    pool.query.mockResolvedValueOnce({
      rows: [{
        id: 1,
        username: 'testuser',
        password_hash: 'hashedpassword',
      }],
    });
    
    // Mock bcrypt.compare to return false (invalid password)
    bcrypt.compare.mockResolvedValueOnce(false);
    
    // Setup request body
    request.body = {
      username: 'testuser',
      password: 'wrongpassword',
    };
    
    // Import and execute the handler
    const server = require('../../../server');
    const loginHandler = server.__testables.loginHandler;
    await loginHandler(request, response);
    
    // Check expectations
    expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', 'hashedpassword');
    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({ error: 'Invalid password' });
  });
  
  test('should return user data and token on successful login', async () => {
    // Mock user query response
    pool.query.mockResolvedValueOnce({
      rows: [{
        id: 1,
        username: 'testuser',
        password_hash: 'hashedpassword',
      }],
    });
    
    // Mock update last login query
    pool.query.mockResolvedValueOnce({ rows: [] });
    
    // Mock bcrypt.compare to return true (valid password)
    bcrypt.compare.mockResolvedValueOnce(true);
    
    // Setup request body with remember_me
    request.body = {
      username: 'testuser',
      password: 'correctpassword',
      remember_me: true,
    };
    
    // Mock crypto.randomBytes for remember token
    crypto.randomBytes.mockReturnValueOnce({
      toString: jest.fn().mockReturnValue('mockedtoken'),
    });
    
    // Mock remember token table check
    pool.query.mockResolvedValueOnce({
      rows: [{ exists: true }],
    });
    
    // Mock token storage
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1 }],
    });
    
    // Mock token verification
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, token: 'mockedtoken' }],
    });
    
    // Import and execute the handler
    const server = require('../../../server');
    const loginHandler = server.__testables.loginHandler;
    await loginHandler(request, response);
    
    // Check expectations
    expect(response.json).toHaveBeenCalledWith({
      success: true,
      user: {
        id: 1,
        username: 'testuser',
      },
      remember_token: 'mockedtoken',
    });
  });
});