// src/backend/__tests__/analytics/threat-performance.test.js
// Tests for the threat performance analytics

// Mock modules
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('Threat Performance Analytics', () => {
    let pool;
    let request;
    let response;
    
    beforeEach(() => {
      jest.clearAllMocks();
      
      // Import the pool module and get the mock
      pool = require('../../db');
      
      // Create mock req/res objects
      request = {
        params: {},
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
    
    test('should correctly aggregate performance data by question type', async () => {
      // Setup request
      request.params = { userId: '123' };
      
      // Mock performance query result
      pool.query.mockResolvedValueOnce({
        rows: [
          {
            question_type: 'email_analysis',
            total_questions: '5',
            total_earned_points: '40',
            total_max_points: '50',
            average_percent: '80.0'
          },
          {
            question_type: 'url_analysis',
            total_questions: '3',
            total_earned_points: '24',
            total_max_points: '30',
            average_percent: '80.0'
          }
        ]
      });
      
      // Mock missed threats query result
      pool.query.mockResolvedValueOnce({
        rows: [
          {
            question_type: 'email_analysis',
            identifications: JSON.stringify({
              falseNegatives: ['sender', 'link']
            }),
            frequency: '2'
          }
        ]
      });
      
      // Import server and execute handler
      const server = require('../../server');
      await server.__testables.getThreatPerformanceHandler(request, response);
      
      // Verify queries
      expect(pool.query).toHaveBeenCalledTimes(2);
      
      // Instead of verifying the exact response structure, check that the call happened
      // and then verify key properties of the response separately
      expect(response.json).toHaveBeenCalled();
      
      // Extract the actual response
      const actualResponse = response.json.mock.calls[0][0];
      
      // Verify the response has the expected properties
      expect(actualResponse).toHaveProperty('success', true);
      expect(actualResponse).toHaveProperty('performance');
      expect(actualResponse).toHaveProperty('missedThreats');
      
      // Verify the performance array contains the expected items
      expect(actualResponse.performance).toContainEqual(
        expect.objectContaining({
          question_type: 'email_analysis',
          average_percent: '80.0'
        })
      );
      
      expect(actualResponse.performance).toContainEqual(
        expect.objectContaining({
          question_type: 'url_analysis',
          average_percent: '80.0'
        })
      );
      
      // Verify the missedThreats contains email_analysis with sender and link
      expect(actualResponse.missedThreats).toHaveProperty('email_analysis');
      
      const emailThreats = actualResponse.missedThreats.email_analysis;
      const senderThreat = emailThreats.find(t => t.id === 'sender');
      const linkThreat = emailThreats.find(t => t.id === 'link');
      
      expect(senderThreat).toBeDefined();
      expect(linkThreat).toBeDefined();
    });
    
    test('should handle empty performance data', async () => {
      // Setup request
      request.params = { userId: '123' };
      
      // Mock empty performance query result
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Mock empty missed threats query result
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      // Import server and execute handler
      const server = require('../../server');
      await server.__testables.getThreatPerformanceHandler(request, response);
      
      // Verify response
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        performance: [],
        missedThreats: {}
      });
    });
  });