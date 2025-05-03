// src/backend/__tests__/middleware/cors.test.js
// Tests for CORS middleware configuration

// Mock modules properly
jest.mock('express', () => {
    // Create a mock app with all the necessary functions
    const app = {
      use: jest.fn(),
      get: jest.fn(),
      post: jest.fn(),
      listen: jest.fn(),
      _router: {
        stack: []
      }
    };
    
    // Create a mock express function that returns the app
    const express = jest.fn(() => app);
    
    // Add json middleware mock
    express.json = jest.fn(() => 'json-middleware');
    
    return express;
  });
  
  jest.mock('cors', () => jest.fn(() => 'cors-middleware'));
  
  describe('CORS Configuration', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    
    test('should configure CORS with correct options', () => {
      // Set environment to test to prevent server from starting
      process.env.NODE_ENV = 'test';
      
      // Reset module registry to force server.js to be reloaded
      jest.resetModules();
      
      // Get the express and cors mocks
      const express = require('express');
      const cors = require('cors');
      const app = express();
      
      // Import server which should call app.use with cors middleware
      require('../server');
      
      // Verify express.json was called
      expect(express.json).toHaveBeenCalled();
      
      // Verify app.use was called with cors middleware
      expect(app.use).toHaveBeenCalledWith('cors-middleware');
      
      // Verify cors was called with the expected options
      expect(cors).toHaveBeenCalledWith(expect.objectContaining({
        origin: expect.arrayContaining([
          'http://localhost:5173'
        ]),
        credentials: true
      }));
    });
  });