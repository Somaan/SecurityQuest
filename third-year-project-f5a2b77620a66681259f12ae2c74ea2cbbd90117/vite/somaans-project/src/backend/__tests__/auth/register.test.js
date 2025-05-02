// src/backend/__tests__/auth/register.test.js
const bcrypt = require('bcrypt');

// Mock modules
jest.mock('pg', () => {
  const mPool = {
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

jest.mock('bcrypt');

describe('Register Endpoint', () => {
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
  
  test('should return 400 if username already exists', async () => {
    // Mock query response for existing username
    pool.query.mockResolvedValueOnce({
      rows: [{
        id: 1,
        username: 'existinguser',
        email: 'different@email.com',
      }],
    });
    
    // Setup request body
    request.body = {
      username: 'existinguser',
      email: 'new@email.com',
      password: 'password123',
    };
    
    // Import and execute the handler
    const server = require('../../../server');
    const registerHandler = server.__testables.registerHandler;
    await registerHandler(request, response);
    
    // Check expectations
    expect(pool.query).toHaveBeenCalledWith(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      ['existinguser', 'new@email.com']
    );
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      error: 'Username or email already exists',
    });
  });
  
  test('should return 400 if email already exists', async () => {
    // Mock query response for existing email
    pool.query.mockResolvedValueOnce({
      rows: [{
        id: 1,
        username: 'differentuser',
        email: 'existing@email.com',
      }],
    });
    
    // Setup request body
    request.body = {
      username: 'newuser',
      email: 'existing@email.com',
      password: 'password123',
    };
    
    // Import and execute the handler
    const server = require('../../../server');
    const registerHandler = server.__testables.registerHandler;
    await registerHandler(request, response);
    
    // Check expectations
    expect(pool.query).toHaveBeenCalledWith(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      ['newuser', 'existing@email.com']
    );
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      error: 'Username or email already exists',
    });
  });
  
  test('should register new user successfully', async () => {
    // Mock query response for non-existing user
    pool.query.mockResolvedValueOnce({ rows: [] });
    
    // Mock bcrypt.hash for password hashing
    bcrypt.hash.mockResolvedValueOnce('hashedpassword');
    
    // Mock insert user query
    pool.query.mockResolvedValueOnce({
      rows: [{
        id: 1,
        username: 'newuser',
        email: 'new@email.com',
      }],
    });
    
    // Setup request body
    request.body = {
      username: 'newuser',
      email: 'new@email.com',
      password: 'password123',
    };
    
    // Import and execute the handler
    const server = require('../../../server');
    const registerHandler = server.__testables.registerHandler;
    await registerHandler(request, response);
    
    // Check expectations
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO users'),
      ['newuser', 'new@email.com', 'hashedpassword']
    );
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      success: true,
      user: {
        id: 1,
        username: 'newuser',
        email: 'new@email.com',
      },
    });
  });
});