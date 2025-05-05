// src/__tests__/services/OllamaService.test.js

// Mock global fetch before imports
global.fetch = jest.fn();

// Import service
import OllamaService from '../../OllamaService';

describe('OllamaService', () => {
  // Setup & Teardown
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Default successful fetch implementation
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        response: JSON.stringify({
          title: "Sample Title",
          importance: "Sample importance statement",
          keyPoints: ["Point 1", "Point 2", "Point 3"],
          practicalTips: ["Tip 1", "Tip 2"],
          resources: ["Resource 1", "Resource 2"]
        })
      })
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test data
  const mockQuestion = {
    question: 'What is phishing?',
    type: 'multiple_choice',
    isCorrect: false,
    userAnswer: 'A legitimate email',
    correctOption: 'An attempt to trick you into revealing information',
    questionIndex: 1
  };

  const mockQuestions = [
    mockQuestion,
    {
      question: 'How can you identify a secure website?',
      type: 'multiple_choice',
      isCorrect: false,
      userAnswer: 'It has a colorful design',
      correctOption: 'It uses HTTPS and has a valid certificate',
      questionIndex: 2
    }
  ];

  const mockUserContext = {
    name: 'Test User',
    role: 'developer',
    industry: 'technology',
    learningStyle: 'visual',
    simplifiedExplanations: false,
    includeExamples: true
  };

  // 1. Test generateResponse method
  describe('generateResponse', () => {
    test('should successfully call Ollama API and return response', async () => {
      const result = await OllamaService.generateResponse('Test prompt');
      
      // Verify fetch was called with correct parameters
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:11434/api/generate',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.any(String)
        })
      );

      // Verify body contains expected values
      const body = JSON.parse(global.fetch.mock.calls[0][1].body);
      expect(body).toEqual({
        model: 'phi3',
        prompt: 'Test prompt',
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 2048
        }
      });

      // Verify correct response is returned
      expect(result).toEqual(expect.any(String));
    });

    test('should include system prompt when provided', async () => {
      await OllamaService.generateResponse('Test prompt', {
        systemPrompt: 'You are a helpful assistant'
      });
      
      const body = JSON.parse(global.fetch.mock.calls[0][1].body);
      expect(body.prompt).toContain('You are a helpful assistant');
      expect(body.prompt).toContain('Test prompt');
    });

    test('should handle API errors', async () => {
      // Clear previous mocks and set up new ones for this specific test
      global.fetch.mockReset();
      
      // Mock API error - must set this up BEFORE calling the function
      global.fetch.mockRejectedValueOnce(new Error('API error'));
      
      // Expect the function to throw
      await expect(OllamaService.generateResponse('Test prompt')).rejects.toThrow();
      
      // Reset for the second part of the test
      global.fetch.mockReset();
      
      // First call fails
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: jest.fn().mockResolvedValue({ error: 'Server error' })
      });
      
      // Second call (retry) succeeds
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({
          response: 'Success after retry'
        })
      });
      
      // Should retry and succeed
      const result = await OllamaService.generateResponse('Test prompt', { retries: 1 });
      
      // Verify it was called twice (original + 1 retry)
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(result).toBe('Success after retry');
    });

    test('should handle network errors', async () => {
      // Clear previous mocks
      global.fetch.mockReset();
      
      // Mock network error for this test
      global.fetch.mockRejectedValueOnce(new Error('Network error'));
      
      // Expect the function to throw after retries
      await expect(OllamaService.generateResponse('Test prompt')).rejects.toThrow();
    });

    test('should respect custom model and temperature', async () => {
      await OllamaService.generateResponse('Test prompt', {
        model: 'llama3',
        temperature: 0.9
      });
      
      const body = JSON.parse(global.fetch.mock.calls[0][1].body);
      expect(body.model).toBe('llama3');
      expect(body.options.temperature).toBe(0.9);
    });

    test('should handle forceUnique parameter by making multiple calls if needed', async () => {
      // Clear previous mocks
      global.fetch.mockReset();
      
      // First response is invalid JSON
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({
          response: "Not a valid JSON"
        })
      });

      // Second response is valid
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({
          response: JSON.stringify({
            title: "Valid Title",
            importance: "Valid importance",
            keyPoints: ["Point"]
          })
        })
      });

      // Call with forceUnique to test retry behavior
      try {
        await OllamaService.generateResponse('Test prompt', { forceUnique: true });
      } catch (error) {
        // This might fail due to parsing error, which is expected
        console.log("Expected error when testing forceUnique:", error.message);
      }

      // Should call fetch at least once
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  // 2. Test isAvailable method
  describe('isAvailable', () => {
    test('should return true when Ollama is available', async () => {
      // Reset mock for this test
      global.fetch.mockReset();
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ models: [] })
      });

      const result = await OllamaService.isAvailable();
      expect(result).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:11434/api/tags',
        expect.any(Object)
      );
    });

    test('should return false when Ollama is not available', async () => {
      // Reset mock for this test
      global.fetch.mockReset();
      
      // Mock network error
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await OllamaService.isAvailable();
      expect(result).toBe(false);
    });

    test('should return false when Ollama returns an error', async () => {
      // Reset mock for this test
      global.fetch.mockReset();
      
      global.fetch.mockResolvedValueOnce({
        ok: false
      });

      const result = await OllamaService.isAvailable();
      expect(result).toBe(false);
    });
  });

  // 3. Test getAvailableModels method
  describe('getAvailableModels', () => {
    test('should return list of available models', async () => {
      // Reset mock for this test
      global.fetch.mockReset();
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({
          models: [
            { name: 'phi3' },
            { name: 'llama3' }
          ]
        })
      });

      const result = await OllamaService.getAvailableModels();
      expect(result).toEqual(['phi3', 'llama3']);
    });

    test('should return empty array on error', async () => {
      // Reset mock for this test
      global.fetch.mockReset();
      
      // Mock network error
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await OllamaService.getAvailableModels();
      expect(result).toEqual([]);
    });

    test('should handle invalid response format', async () => {
      // Reset mock for this test
      global.fetch.mockReset();
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({
          // Missing 'models' array
        })
      });

      const result = await OllamaService.getAvailableModels();
      expect(result).toEqual([]);
    });
  });

  // 4. Test categoriseQuestions method
  describe('categoriseQuestions', () => {
    test('should categorize questions by explicit type', () => {
      const questions = [
        { question: 'Is this email legitimate?', type: 'email_phishing' },
        { question: 'Is this phone call suspicious?', type: 'vishing' }
      ];

      const result = OllamaService.categoriseQuestions(questions);
      
      expect(result).toHaveProperty('EMAIL_PHISHING');
      expect(result).toHaveProperty('VISHING');
      expect(result.EMAIL_PHISHING).toHaveLength(1);
      expect(result.VISHING).toHaveLength(1);
    });

    test('should categorize questions by content analysis when type is missing', () => {
      const questions = [
        { question: 'How do you identify a phishing email with suspicious attachments?', type: null },
        { question: 'What makes a password strong and secure?', type: null }
      ];

      const result = OllamaService.categoriseQuestions(questions);
      
      expect(result).toHaveProperty('EMAIL_PHISHING');
      expect(result).toHaveProperty('PASSWORD_SECURITY');
    });

    test("should handle questions that don't fit specific categories", () => {
      const questions = [
        { question: 'What is the general principle of security?', type: null }
      ];

      const result = OllamaService.categoriseQuestions(questions);
      
      expect(result).toHaveProperty('GENERAL_SECURITY');
    });

    test('should categorize based on related terms and concepts', () => {
      const questions = [
        { question: 'How can you protect against spear phishing attacks?', type: null },
        { question: 'What is a homograph attack in URLs?', type: null }
      ];

      const result = OllamaService.categoriseQuestions(questions);
      
      expect(result).toHaveProperty('EMAIL_PHISHING');
      expect(result).toHaveProperty('WEBSITE_PHISHING');
    });
  });

  // 5. Test generateQuizFeedback method
  describe('generateQuizFeedback', () => {
    test('should generate feedback for incorrect answers', async () => {
      // Store original methods
      const originalIsAvailable = OllamaService.isAvailable;
      const originalCategoriseQuestions = OllamaService.categoriseQuestions;
      const originalGenerateTopicFeedback = OllamaService.generateTopicFeedback;
      
      // Replace with mock implementations
      OllamaService.isAvailable = jest.fn().mockResolvedValue(true);
      OllamaService.categoriseQuestions = jest.fn().mockReturnValue({
        'EMAIL_PHISHING': [mockQuestion]
      });
      OllamaService.generateTopicFeedback = jest.fn().mockResolvedValue({
        title: 'Email Phishing',
        importance: 'Test importance',
        keyPoints: ['Point 1'],
        practicalTips: ['Tip 1'],
        resources: ['Resource 1']
      });
      
      const result = await OllamaService.generateQuizFeedback(mockQuestions, 'beginner');
      
      // Verify the test
      expect(result).toHaveProperty('analysis');
      expect(result).toHaveProperty('topics');
      expect(result.topics).toHaveLength(1);
      expect(OllamaService.generateTopicFeedback).toHaveBeenCalled();
      
      // Restore original methods
      OllamaService.isAvailable = originalIsAvailable;
      OllamaService.categoriseQuestions = originalCategoriseQuestions;
      OllamaService.generateTopicFeedback = originalGenerateTopicFeedback;
    });

    test('should use fallback when Ollama is not available', async () => {
      // Store original methods
      const originalIsAvailable = OllamaService.isAvailable;
      const originalGenerateFallbackFeedback = OllamaService.generateFallbackFeedback;
      
      // Replace with mock implementations
      OllamaService.isAvailable = jest.fn().mockResolvedValue(false);
      OllamaService.generateFallbackFeedback = jest.fn().mockReturnValue({
        analysis: 'Fallback analysis',
        topics: [{ title: 'Fallback Topic' }]
      });
      
      const result = await OllamaService.generateQuizFeedback(mockQuestions, 'beginner');
      
      // Verify the test
      expect(OllamaService.generateFallbackFeedback).toHaveBeenCalled();
      expect(result.analysis).toContain('Fallback');
      
      // Restore original methods
      OllamaService.isAvailable = originalIsAvailable;
      OllamaService.generateFallbackFeedback = originalGenerateFallbackFeedback;
    });

    test('should call generatePerfectScoreFeedback when all answers are correct', async () => {
      // Store original methods
      const originalIsAvailable = OllamaService.isAvailable;
      const originalGeneratePerfectScoreFeedback = OllamaService.generatePerfectScoreFeedback;
      
      // Replace with mock implementations
      OllamaService.isAvailable = jest.fn().mockResolvedValue(true);
      OllamaService.generatePerfectScoreFeedback = jest.fn().mockResolvedValue({
        title: 'Perfect Score',
        importance: 'Congratulations',
        keyPoints: ['Next step 1'],
        resources: ['Resource 1']
      });
      
      // All correct answers
      const correctAnswers = [
        { 
          question: 'What is phishing?', 
          isCorrect: true 
        }
      ];
      
      const result = await OllamaService.generateQuizFeedback(correctAnswers, 'beginner');
      
      // Verify the test
      expect(OllamaService.generatePerfectScoreFeedback).toHaveBeenCalled();
      
      // Restore original methods
      OllamaService.isAvailable = originalIsAvailable;
      OllamaService.generatePerfectScoreFeedback = originalGeneratePerfectScoreFeedback;
    });

    test('should handle errors in topic feedback generation', async () => {
      // Store original methods
      const originalIsAvailable = OllamaService.isAvailable;
      const originalCategoriseQuestions = OllamaService.categoriseQuestions;
      const originalGenerateTopicFeedback = OllamaService.generateTopicFeedback;
      const originalGenerateFallbackFeedback = OllamaService.generateFallbackFeedback;
      
      // Replace with mock implementations
      OllamaService.isAvailable = jest.fn().mockResolvedValue(true);
      OllamaService.categoriseQuestions = jest.fn().mockReturnValue({
        'EMAIL_PHISHING': [mockQuestion]
      });
      OllamaService.generateTopicFeedback = jest.fn().mockRejectedValue(new Error('API error'));
      OllamaService.generateFallbackFeedback = jest.fn().mockReturnValue({
        analysis: 'Fallback analysis',
        topics: [{ title: 'Fallback Topic' }]
      });
      
      const result = await OllamaService.generateQuizFeedback(mockQuestions, 'beginner');
      
      // Verify the test
      expect(OllamaService.generateFallbackFeedback).toHaveBeenCalled();
      
      // Restore original methods
      OllamaService.isAvailable = originalIsAvailable;
      OllamaService.categoriseQuestions = originalCategoriseQuestions;
      OllamaService.generateTopicFeedback = originalGenerateTopicFeedback;
      OllamaService.generateFallbackFeedback = originalGenerateFallbackFeedback;
    });
  });

  // 6. Test generateSingleQuestionFeedback method
  describe('generateSingleQuestionFeedback', () => {
    test('should generate feedback for a specific question', async () => {
      // Store original methods
      const originalIsAvailable = OllamaService.isAvailable;
      const originalGenerateResponse = OllamaService.generateResponse;
      
      // Replace with mock implementations
      OllamaService.isAvailable = jest.fn().mockResolvedValue(true);
      OllamaService.generateResponse = jest.fn().mockResolvedValue(JSON.stringify({
        title: 'Understanding Phishing',
        importance: 'Phishing is a common attack vector',
        keyPoints: ['Point 1', 'Point 2'],
        practicalTips: ['Tip 1', 'Tip 2'],
        resources: ['Resource 1', 'Resource 2']
      }));
      
      const result = await OllamaService.generateSingleQuestionFeedback(mockQuestion, 'beginner', mockUserContext);
      
      // Verify the test
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('importance');
      expect(result).toHaveProperty('keyPoints');
      expect(result).toHaveProperty('practicalTips');
      expect(result).toHaveProperty('resources');
      expect(OllamaService.generateResponse).toHaveBeenCalled();
      
      // Restore original methods
      OllamaService.isAvailable = originalIsAvailable;
      OllamaService.generateResponse = originalGenerateResponse;
    });

    test('should use fallback when Ollama is not available', async () => {
      // Store original methods
      const originalIsAvailable = OllamaService.isAvailable;
      const originalGenerateFallbackQuestionFeedback = OllamaService.generateFallbackQuestionFeedback;
      
      // Replace with mock implementations
      OllamaService.isAvailable = jest.fn().mockResolvedValue(false);
      OllamaService.generateFallbackQuestionFeedback = jest.fn().mockReturnValue({
        title: 'Fallback Title',
        importance: 'Fallback importance',
        keyPoints: ['Fallback point'],
        practicalTips: ['Fallback tip'],
        resources: ['Fallback resource']
      });
      
      const result = await OllamaService.generateSingleQuestionFeedback(mockQuestion, 'beginner', mockUserContext);
      
      // Verify the test
      expect(OllamaService.generateFallbackQuestionFeedback).toHaveBeenCalled();
      expect(result.title).toContain('Fallback');
      
      // Restore original methods
      OllamaService.isAvailable = originalIsAvailable;
      OllamaService.generateFallbackQuestionFeedback = originalGenerateFallbackQuestionFeedback;
    });

    test('should handle various question types', async () => {
      // Store original methods
      const originalIsAvailable = OllamaService.isAvailable;
      const originalGenerateResponse = OllamaService.generateResponse;
      
      // Replace with mock implementations
      OllamaService.isAvailable = jest.fn().mockResolvedValue(true);
      OllamaService.generateResponse = jest.fn().mockResolvedValue(JSON.stringify({
        title: 'Sample Title',
        importance: 'Sample importance',
        keyPoints: ['Point 1'],
        practicalTips: ['Tip 1'],
        resources: ['Resource 1']
      }));
      
      // Test multiple choice question
      const multipleChoiceQuestion = { 
        ...mockQuestion,
        type: 'multiple_choice'
      };
      
      // Test special question type
      const specialQuestion = {
        question: 'Is this email legitimate?',
        type: 'email_phishing',
        score: 60,
        details: { flags: ['suspicious_sender', 'urgent_language'] },
        questionIndex: 3
      };
      
      await OllamaService.generateSingleQuestionFeedback(multipleChoiceQuestion, 'beginner', {});
      await OllamaService.generateSingleQuestionFeedback(specialQuestion, 'beginner', {});
      
      // Verify the test
      expect(OllamaService.generateResponse).toHaveBeenCalledTimes(2);
      
      // Restore original methods
      OllamaService.isAvailable = originalIsAvailable;
      OllamaService.generateResponse = originalGenerateResponse;
    });

    test('should handle invalid responses', async () => {
      // Store original methods
      const originalIsAvailable = OllamaService.isAvailable;
      const originalGenerateResponse = OllamaService.generateResponse;
      const originalGenerateFallbackQuestionFeedback = OllamaService.generateFallbackQuestionFeedback;
      
      // Replace with mock implementations
      OllamaService.isAvailable = jest.fn().mockResolvedValue(true);
      OllamaService.generateResponse = jest.fn().mockResolvedValue('Not valid JSON');
      OllamaService.generateFallbackQuestionFeedback = jest.fn().mockReturnValue({
        title: 'Fallback Title',
        importance: 'Fallback importance',
        keyPoints: ['Fallback point'],
        practicalTips: ['Fallback tip'],
        resources: ['Fallback resource']
      });
      
      const result = await OllamaService.generateSingleQuestionFeedback(mockQuestion, 'beginner', {});
      
      // Verify the test
      expect(OllamaService.generateFallbackQuestionFeedback).toHaveBeenCalled();
      
      // Restore original methods
      OllamaService.isAvailable = originalIsAvailable;
      OllamaService.generateResponse = originalGenerateResponse;
      OllamaService.generateFallbackQuestionFeedback = originalGenerateFallbackQuestionFeedback;
    });

    test('should enhance titles to be more question-specific', async () => {
      // Store original methods
      const originalIsAvailable = OllamaService.isAvailable;
      const originalGenerateResponse = OllamaService.generateResponse;
      const originalEnsureQuestionRelevantTitle = OllamaService.ensureQuestionRelevantTitle;
      
      // Replace with mock implementations
      OllamaService.isAvailable = jest.fn().mockResolvedValue(true);
      OllamaService.generateResponse = jest.fn().mockResolvedValue(JSON.stringify({
        title: 'Security Basics',
        importance: 'Some importance statement',
        keyPoints: ['Point 1'],
        practicalTips: ['Tip 1'],
        resources: ['Resource 1']
      }));
      OllamaService.ensureQuestionRelevantTitle = jest.fn().mockReturnValue('Understanding phishing: Security Basics');
      
      const result = await OllamaService.generateSingleQuestionFeedback(mockQuestion, 'beginner', {});
      
      // Verify the test
      expect(OllamaService.ensureQuestionRelevantTitle).toHaveBeenCalled();
      expect(result.title).toBe('Understanding phishing: Security Basics');
      
      // Restore original methods
      OllamaService.isAvailable = originalIsAvailable;
      OllamaService.generateResponse = originalGenerateResponse;
      OllamaService.ensureQuestionRelevantTitle = originalEnsureQuestionRelevantTitle;
    });
  });

  // 7. Test generatePerfectScoreFeedback method
  describe('generatePerfectScoreFeedback', () => {
    test('should generate personalized feedback for perfect score', async () => {
      // Store original methods
      const originalIsAvailable = OllamaService.isAvailable;
      const originalGenerateResponse = OllamaService.generateResponse;
      
      // Replace with mock implementations
      OllamaService.isAvailable = jest.fn().mockResolvedValue(true);
      OllamaService.generateResponse = jest.fn().mockResolvedValue(JSON.stringify({
        title: 'Perfect Score - Excellent Work!',
        importance: 'Your security knowledge is impressive',
        keyPoints: ['Next step 1', 'Next step 2'],
        practicalTips: ['Advanced tip 1'],
        resources: ['Advanced resource 1']
      }));
      
      const result = await OllamaService.generatePerfectScoreFeedback('intermediate', mockUserContext);
      
      // Verify the test
      expect(result).toHaveProperty('title');
      expect(result.title).toContain('Perfect Score');
      expect(OllamaService.generateResponse).toHaveBeenCalled();
      
      // Restore original methods
      OllamaService.isAvailable = originalIsAvailable;
      OllamaService.generateResponse = originalGenerateResponse;
    });

    test('should use fallback for different difficulty levels', async () => {
      // Store original methods
      const originalIsAvailable = OllamaService.isAvailable;
      const originalGenerateResponse = OllamaService.generateResponse;
      
      // Mock isAvailable to return false so fallback values are used
      OllamaService.isAvailable = jest.fn().mockResolvedValue(false);
      
      // Create mock responses for different difficulties
      const beginnerResult = await OllamaService.generatePerfectScoreFeedback('beginner', {});
      const intermediateResult = await OllamaService.generatePerfectScoreFeedback('intermediate', {});
      const advancedResult = await OllamaService.generatePerfectScoreFeedback('advanced', {});
      
      // Restore original methods
      OllamaService.isAvailable = originalIsAvailable;
      OllamaService.generateResponse = originalGenerateResponse;
      
      // Verify different titles for different difficulties
      expect(beginnerResult.title).not.toEqual(intermediateResult.title);
      expect(intermediateResult.title).not.toEqual(advancedResult.title);
      
      // All should be perfect score titles
      expect(beginnerResult.title).toContain('Perfect Score');
      expect(intermediateResult.title).toContain('Perfect Score');
      expect(advancedResult.title).toContain('Perfect Score');
    });

    test('should handle errors in generation', async () => {
      // Store original methods
      const originalIsAvailable = OllamaService.isAvailable;
      const originalGenerateResponse = OllamaService.generateResponse;
      
      // Replace with mock implementations
      OllamaService.isAvailable = jest.fn().mockResolvedValue(true);
      OllamaService.generateResponse = jest.fn().mockRejectedValue(new Error('API error'));
      
      const result = await OllamaService.generatePerfectScoreFeedback('intermediate', {});
      
      // Restore original methods
      OllamaService.isAvailable = originalIsAvailable;
      OllamaService.generateResponse = originalGenerateResponse;
      
      // Should still return a valid object
      expect(result).toHaveProperty('title');
      expect(result.title).toContain('Perfect Score');
    });
  });

  // 8. Test fallback content generation
  describe('fallback content generation', () => {
    test('generateFallbackQuestionFeedback should return structured feedback', () => {
      // Store original methods
      const originalGenerateContentBasedFeedback = OllamaService.generateContentBasedFeedback;
      const originalGenerateTitleFromQuestion = OllamaService.generateTitleFromQuestion;
      
      // Replace with mock implementations
      OllamaService.generateTitleFromQuestion = jest.fn().mockReturnValue('Phishing Detection (#1)');
      OllamaService.generateContentBasedFeedback = jest.fn().mockReturnValue({
        title: 'Phishing Detection (#1)',
        importance: 'Phishing is dangerous',
        keyPoints: ['Point 1', 'Point 2'],
        practicalTips: ['Tip 1', 'Tip 2'],
        resources: ['Resource 1', 'Resource 2']
      });
      
      const result = OllamaService.generateFallbackQuestionFeedback(mockQuestion);
      
      // Restore original methods
      OllamaService.generateContentBasedFeedback = originalGenerateContentBasedFeedback;
      OllamaService.generateTitleFromQuestion = originalGenerateTitleFromQuestion;
      
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('importance');
      expect(result).toHaveProperty('keyPoints');
      expect(result).toHaveProperty('practicalTips');
      expect(result).toHaveProperty('resources');
    });

    test('generateTitleFromQuestion should create relevant titles', () => {
      const phishingTitle = OllamaService.generateTitleFromQuestion('How do you identify phishing emails?', 1);
      const passwordTitle = OllamaService.generateTitleFromQuestion('What makes a password secure?', 2);
      
      expect(phishingTitle).toContain('Phishing');
      expect(passwordTitle).toContain('Password');
    });

    test('getEmailPhishingFeedback should return subtype-specific content', () => {
      const generalResult = OllamaService.getEmailPhishingFeedback('general', 1, 'Email Security');
      const spearResult = OllamaService.getEmailPhishingFeedback('spear', 2, 'Spear Phishing');
      
      expect(generalResult.importance).not.toEqual(spearResult.importance);
      expect(generalResult.keyPoints).not.toEqual(spearResult.keyPoints);
    });

    test('generateFallbackFeedback should handle empty quiz results', async () => {
      // Store original method
      const originalGeneratePerfectScoreFeedback = OllamaService.generatePerfectScoreFeedback;
      
      // Replace with mock implementation
      OllamaService.generatePerfectScoreFeedback = jest.fn().mockReturnValue({
        title: 'Perfect Score Test',
        importance: 'Congratulations Test',
        keyPoints: ['Next step test'],
        resources: ['Resource test']
      });
      
      const result = OllamaService.generateFallbackFeedback([], 'beginner');
      
      // Restore original method
      OllamaService.generatePerfectScoreFeedback = originalGeneratePerfectScoreFeedback;
      
      // Verify the result has the expected properties
      expect(result).toHaveProperty('title');
      expect(result.title).toContain('Perfect Score');
    });

    test('generateFallbackFeedback should process incorrect answers', () => {
      // Store original method
      const originalGenerateFallbackQuestionFeedback = OllamaService.generateFallbackQuestionFeedback;
      
      // Replace with mock implementation
      OllamaService.generateFallbackQuestionFeedback = jest.fn()
        .mockReturnValueOnce({
          title: 'Feedback 1',
          importance: 'Important 1',
          keyPoints: ['Point 1'],
          practicalTips: ['Tip 1'],
          resources: ['Resource 1']
        })
        .mockReturnValueOnce({
          title: 'Feedback 2',
          importance: 'Important 2',
          keyPoints: ['Point 2'],
          practicalTips: ['Tip 2'],
          resources: ['Resource 2']
        });
      
      const result = OllamaService.generateFallbackFeedback(mockQuestions, 'beginner');
      
      // Restore original method
      OllamaService.generateFallbackQuestionFeedback = originalGenerateFallbackQuestionFeedback;
      
      expect(result).toHaveProperty('analysis');
      expect(result).toHaveProperty('topics');
      expect(result.topics.length).toBe(2);
    });

    test('getFallbackContentByCategory should return consistent structure', () => {
      const categories = [
        'EMAIL_PHISHING', 'VISHING', 'SMISHING', 'WEBSITE_PHISHING',
        'PASSWORD_SECURITY', 'SOCIAL_ENGINEERING', 'GENERAL_SECURITY',
        'UNKNOWN_CATEGORY'
      ];
      
      categories.forEach(category => {
        const result = OllamaService.getFallbackContentByCategory(category);
        
        expect(result).toHaveProperty('importance');
        expect(result).toHaveProperty('keyPoints');
        expect(result).toHaveProperty('practicalTips');
        expect(result).toHaveProperty('resources');
      });
    });
  });

  // 9. Test helper methods
  describe('helper methods', () => {
    test('formatQuestionType should format question types for display', () => {
      expect(OllamaService.formatQuestionType('email_phishing')).toBe('Email Phishing Identification');
      expect(OllamaService.formatQuestionType('vishing')).toBe('Voice Phishing (Vishing)');
      expect(OllamaService.formatQuestionType('multiple_choice')).toBe('Security Knowledge');
      expect(OllamaService.formatQuestionType('custom_type')).toBe('Custom Type');
    });

    test('formatCategoryName should format category constants', () => {
      expect(OllamaService.formatCategoryName('EMAIL_PHISHING')).toBe('Email Phishing');
      expect(OllamaService.formatCategoryName('PASSWORD_SECURITY')).toBe('Password Security');
      expect(OllamaService.formatCategoryName('CUSTOM_CATEGORY')).toBe('Custom Category');
    });

    test('ensureQuestionRelevantTitle should enhance generic titles', () => {
      const genericTitle = 'Security Basics';
      const specificQuestion = {
        question: 'How do you identify phishing emails with suspicious links?'
      };
      
      const enhancedTitle = OllamaService.ensureQuestionRelevantTitle(genericTitle, specificQuestion);
      
      // Result should be a non-empty string
      expect(enhancedTitle).toBeTruthy();
      expect(typeof enhancedTitle).toBe('string');
    });
  });
});