// src/backend/__tests__/db.test.js
const { Pool } = require('pg');

// Mock the pg module
jest.mock('pg', () => {
  const mPool = {
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('Database Connection', () => {
  let pool;
  
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Require the db module after mocking pg
    pool = require('../db');
  });
  
  test('should create a pg Pool with correct configuration', () => {
    expect(Pool).toHaveBeenCalledWith({
      user: 'postgres',
      host: 'localhost',
      database: 'social_engineering_game',
      password: 'M@nchester 123',
      port: 5432,
    });
  });

  test('should export a Pool instance', () => {
    expect(pool).toBeDefined();
    expect(pool.query).toBeDefined();
    expect(typeof pool.query).toBe('function');
  });
  
  test('should handle database query execution', async () => {
    // Setup mock for successful query
    const mockRows = [{ id: 1, name: 'test' }];
    pool.query.mockResolvedValueOnce({ rows: mockRows });
    
    // Perform a test query
    const result = await pool.query('SELECT * FROM test');
    
    // Verify correct behavior
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM test');
    expect(result.rows).toEqual(mockRows);
  });
});