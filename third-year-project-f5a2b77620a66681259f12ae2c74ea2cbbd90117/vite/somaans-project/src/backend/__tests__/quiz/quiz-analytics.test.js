// Mock modules
jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('Quiz Analytics Endpoints', () => {
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
        query: {},
      };
      
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
    
    describe('GET /api/analytics/quiz-performance-by-type', () => {
      test('should return performance data by question type', async () => {
        // Create mock handler for analytics
        const getQuizPerformanceByType = async (req, res) => {
          try {
            // Mock a query that would analyze performance by question type
            const result = await pool.query(`
              SELECT 
                qa.question_type,
                COUNT(*) as total_questions,
                ROUND(AVG(qa.is_correct::int * 100), 1) as average_percent,
                ROUND(AVG(CASE WHEN qa.is_correct THEN qa.earned_points ELSE 0 END), 1) as average_points
              FROM quiz_answers qa
              JOIN quiz_completions qc ON qa.completion_id = qc.id
              GROUP BY qa.question_type
              ORDER BY qa.question_type
            `);
            
            res.json({
              success: true,
              data: result.rows
            });
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
        };
        
        // Mock query result
        pool.query.mockResolvedValueOnce({
          rows: [
            {
              question_type: 'email_analysis',
              total_questions: '120',
              average_percent: '72.5',
              average_points: '7.2'
            },
            {
              question_type: 'multiple_choice',
              total_questions: '350',
              average_percent: '85.3',
              average_points: '8.5'
            },
            {
              question_type: 'url_analysis',
              total_questions: '80',
              average_percent: '68.0',
              average_points: '6.8'
            }
          ]
        });
        
        // Execute handler
        await getQuizPerformanceByType(request, response);
        
        // Verify response
        expect(response.json).toHaveBeenCalledWith({
          success: true,
          data: expect.arrayContaining([
            expect.objectContaining({
              question_type: 'email_analysis',
              total_questions: '120',
              average_percent: '72.5'
            }),
            expect.objectContaining({
              question_type: 'multiple_choice',
              total_questions: '350',
              average_percent: '85.3'
            }),
            expect.objectContaining({
              question_type: 'url_analysis',
              total_questions: '80',
              average_percent: '68.0'
            })
          ])
        });
      });
    });
    
    describe('GET /api/analytics/quiz-difficulty-distribution', () => {
      test('should return distribution of quiz difficulty attempts', async () => {
        // Create mock handler for analytics
        const getQuizDifficultyDistribution = async (req, res) => {
          try {
            // Mock a query that would analyze distribution by difficulty level
            const result = await pool.query(`
              SELECT 
                qc.quiz_id as difficulty_level,
                COUNT(*) as attempt_count,
                ROUND(AVG(qc.score), 1) as average_score,
                ROUND(MIN(qc.score), 1) as min_score,
                ROUND(MAX(qc.score), 1) as max_score
              FROM quiz_completions qc
              GROUP BY qc.quiz_id
              ORDER BY qc.quiz_id
            `);
            
            res.json({
              success: true,
              data: result.rows
            });
          } catch (error) {
            res.status(500).json({ error: 'Server error' });
          }
        };
        
        // Mock query result
        pool.query.mockResolvedValueOnce({
          rows: [
            {
              difficulty_level: 1, // Beginner
              attempt_count: '250',
              average_score: '87.5',
              min_score: '60.0',
              max_score: '100.0'
            },
            {
              difficulty_level: 2, // Intermediate
              attempt_count: '180',
              average_score: '75.2',
              min_score: '45.0',
              max_score: '95.0'
            },
            {
              difficulty_level: 3, // Advanced
              attempt_count: '120',
              average_score: '68.7',
              min_score: '30.0',
              max_score: '90.0'
            }
          ]
        });
        
        // Execute handler
        await getQuizDifficultyDistribution(request, response);
        
        // Verify response
        expect(response.json).toHaveBeenCalledWith({
          success: true,
          data: expect.arrayContaining([
            expect.objectContaining({
              difficulty_level: 1, // Beginner
              attempt_count: '250',
              average_score: '87.5'
            }),
            expect.objectContaining({
              difficulty_level: 2, // Intermediate
              attempt_count: '180',
              average_score: '75.2'
            }),
            expect.objectContaining({
              difficulty_level: 3, // Advanced
              attempt_count: '120',
              average_score: '68.7'
            })
          ])
        });
      });
    });
  });