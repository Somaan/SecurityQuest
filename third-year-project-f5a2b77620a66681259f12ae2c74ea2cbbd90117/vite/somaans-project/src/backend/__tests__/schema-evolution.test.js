// src/backend/__tests__/db/schema-evolution.test.js
// Tests for database schema evolution and migration

// Mock modules
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('Database Schema Evolution', () => {
    let pool;
    let request;
    let response;
    
    beforeEach(() => {
      jest.clearAllMocks();
      
      // Import the pool module and get the mock
      pool = require('../db');
      
      // Create mock req/res objects
      request = {
        body: {
          userId: 123,
          quizId: 1,
          score: 80,
          totalQuestions: 5,
          correctAnswers: 4,
          duration: 120,
          submissionId: 'test-submission-id'
        },
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
    
    test('should add submission_id column if it does not exist', async () => {
      // First query - store quiz attempt
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Second query - check for submission_id column, throw error indicating it doesn't exist
      pool.query.mockImplementationOnce(() => {
        const error = new Error('column "submission_id" does not exist');
        error.code = '42703'; // PostgreSQL error code for undefined_column
        throw error;
      });
      
      // Third query - add the submission_id column
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Fourth query - create index
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Fifth query - check for duplicate submission (none found)
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // For the remaining required queries to complete the quiz submission
      // User exists
      pool.query.mockResolvedValueOnce({ rows: [{ id: 123 }] });
      
      // Insert quiz completion
      pool.query.mockResolvedValueOnce({ 
        rows: [{ id: 456, completion_date: new Date().toISOString() }] 
      });
      
      // Get last quiz date
      pool.query.mockResolvedValueOnce({ 
        rows: [{ last_quiz_update: null }] 
      });
      
      // Update streak
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Get updated user
      pool.query.mockResolvedValueOnce({ 
        rows: [{ quiz_streak: 1, longest_quiz_streak: 1 }] 
      });
      
      // Get quiz count
      pool.query.mockResolvedValueOnce({ rows: [{ count: '1' }] });
      
      // Import server and execute handler
      const server = require('../server');
      await server.__testables.completeQuizHandler(request, response);
      
      // Verify that ALTER TABLE was called to add the column
      const alterTableCall = pool.query.mock.calls.find(call => 
        call[0].includes('ALTER TABLE quiz_completions') && 
        call[0].includes('ADD COLUMN submission_id')
      );
      
      expect(alterTableCall).toBeDefined();
      
      // Verify that CREATE INDEX was called
      const createIndexCall = pool.query.mock.calls.find(call => 
        call[0].includes('CREATE INDEX') && 
        call[0].includes('quiz_completions_submission_id_idx')
      );
      
      expect(createIndexCall).toBeDefined();
      
      // Verify that the completion was successful
      expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        completionId: 456
      }));
    });
    
    test('should create remember_tokens table if it does not exist', async () => {
      // Create a mock request for login with remember_me
      const loginRequest = {
        body: {
          username: 'testuser',
          password: 'password123',
          remember_me: true
        }
      };
      
      // Mock user query
      pool.query.mockResolvedValueOnce({ 
        rows: [{ id: 123, username: 'testuser', password_hash: 'hashedpassword' }] 
      });
      
      // Mock bcrypt.compare
      const bcrypt = require('bcrypt');
      bcrypt.compare = jest.fn().mockResolvedValueOnce(true);
      
      // Mock update last login
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Mock table exists check - table does NOT exist
      pool.query.mockResolvedValueOnce({ rows: [{ exists: false }] });
      
      // Mock CREATE TABLE query
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Mock token insertion
      pool.query.mockResolvedValueOnce({ rows: [{ id: 789 }] });
      
      // Mock token verification
      pool.query.mockResolvedValueOnce({ 
        rows: [{ id: 789, user_id: 123, token: 'test-token-123' }] 
      });
      
      // Import server and execute handler
      const server = require('../server');
      const loginHandler = server.__testables.loginHandler;
      await loginHandler(loginRequest, response);
      
      // Verify table creation query
      const createTableCall = pool.query.mock.calls.find(call => 
        call[0].includes('CREATE TABLE') && call[0].includes('remember_tokens')
      );
      
      expect(createTableCall).toBeDefined();
      expect(createTableCall[0]).toContain('user_id INTEGER NOT NULL');
      expect(createTableCall[0]).toContain('token VARCHAR(255) NOT NULL');
      expect(createTableCall[0]).toContain('expires_at TIMESTAMP NOT NULL');
      
      // Verify success response with token
      expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        remember_token: expect.any(String)
      }));
    });
  });