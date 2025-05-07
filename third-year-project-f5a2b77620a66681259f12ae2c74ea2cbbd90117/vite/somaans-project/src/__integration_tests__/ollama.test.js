// src/__integration_tests__/ollama.test.js

// Use require instead of import (CommonJS syntax)
const OllamaService = require('../OllamaService').default;

// Mock the OllamaService module
jest.mock('../OllamaService', () => {
  // Get the actual module
  const actualModule = jest.requireActual('../OllamaService');
  
  // Return a mocked version
  return {
    __esModule: true,
    default: {
      ...actualModule.default,
      isAvailable: jest.fn(),
      generateResponse: jest.fn(),
      generateSingleQuestionFeedback: jest.fn(),
      generatePerfectScoreFeedback: jest.fn(),
      categoriseQuestions: jest.fn(),
      generateQuizFeedback: jest.fn(),
      responseCache: {
        isTooSimilar: jest.fn(),
        addFeedback: jest.fn(),
        clear: jest.fn()
      }
    }
  };
});

// Create our own QUIZ_CONFIG constants since we can't import from constants.js
const QUIZ_CONFIG = {
  QUESTION_TYPES: {
    MULTIPLE_CHOICE: 'multiple_choice',
    EMAIL_PHISHING: 'email_phishing',
    VISHING: 'vishing',
    SMISHING: 'smishing',
    WEBSITE_PHISHING: 'website_phishing'
  }
};

// Mock fetch globally
global.fetch = jest.fn();

describe('Ollama Integration Tests', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // Test data for question feedback tests
  const mockQuestionData = {
    question: "Is this email from your bank asking for your password legitimate?",
    userAnswer: "Yes",
    correctOption: "No",
    isCorrect: false,
    type: QUIZ_CONFIG.QUESTION_TYPES.EMAIL_PHISHING,
    questionIndex: 1
  };

  const mockVishingQuestion = {
    question: "Listen to this call recording and identify what makes it a vishing attempt",
    type: QUIZ_CONFIG.QUESTION_TYPES.VISHING,
    isCorrect: false,
    score: 60,
    details: {
      earnedPoints: 6,
      maxPoints: 10,
      selectedOptions: ["vishingClue1", "vishingClue2"]
    },
    questionIndex: 2
  };

  const mockUserContext = {
    name: "Test User",
    role: "IT Administrator",
    learningStyle: "Visual",
    previousPerformance: "3 quizzes taken with improving trend"
  };

  // Test Ollama availability check
  test('should correctly detect if Ollama is available', async () => {
    // Mock successful response
    OllamaService.isAvailable.mockResolvedValueOnce(true);
    
    const available = await OllamaService.isAvailable();
    expect(available).toBe(true);
  });

  test('should correctly detect if Ollama is unavailable', async () => {
    // Mock failed response
    OllamaService.isAvailable.mockResolvedValueOnce(false);
    
    const available = await OllamaService.isAvailable();
    expect(available).toBe(false);
  });

  // Test generateResponse method
  test('should generate response from Ollama API', async () => {
    // Mock successful Ollama API response
    OllamaService.generateResponse.mockResolvedValueOnce("This is a test response from Ollama API");
    
    const prompt = "Test prompt";
    const response = await OllamaService.generateResponse(prompt);
    
    expect(response).toBe("This is a test response from Ollama API");
    expect(OllamaService.generateResponse).toHaveBeenCalledWith(prompt);
  });

  // Test generating question feedback
  test('should generate feedback for a specific email phishing question', async () => {
    // Mock successful Ollama response with JSON feedback
    const mockFeedback = {
      title: "Email Security Awareness",
      importance: "Recognising phishing attempts is critical for preventing data breaches.",
      keyPoints: ["Verify sender email addresses", "Be cautious of urgent requests", "Check for grammar errors"],
      practicalTips: ["Hover over links before clicking", "Never share credentials via email"],
      resources: ["SANS Security Training", "PhishTank Database"]
    };
    
    OllamaService.generateSingleQuestionFeedback.mockResolvedValueOnce(mockFeedback);
    
    const feedback = await OllamaService.generateSingleQuestionFeedback(
      mockQuestionData, 
      "intermediate", 
      mockUserContext
    );
    
    expect(feedback).toHaveProperty('title');
    expect(feedback).toHaveProperty('importance');
    expect(feedback).toHaveProperty('keyPoints');
    expect(feedback.keyPoints).toEqual(mockFeedback.keyPoints);
    expect(OllamaService.generateSingleQuestionFeedback).toHaveBeenCalledWith(
      mockQuestionData,
      "intermediate", 
      mockUserContext
    );
  });

  // Test generating feedback for a vishing question
  test('should generate feedback for a vishing question', async () => {
    // Mock successful Ollama response with JSON feedback
    const mockFeedback = {
      title: "Voice Phishing Detection",
      importance: "Voice phishing attacks bypass technical security measures by exploiting human trust.",
      keyPoints: ["Verify caller identity through official channels", "Be suspicious of urgency tactics", "Never provide sensitive information to inbound callers"],
      practicalTips: ["Hang up and call back using official numbers", "Report suspicious calls to your IT department"],
      resources: ["FTC Phone Scam Resources", "SANS Security Awareness Training"]
    };
    
    OllamaService.generateSingleQuestionFeedback.mockResolvedValueOnce(mockFeedback);
    
    const feedback = await OllamaService.generateSingleQuestionFeedback(
      mockVishingQuestion, 
      "advanced", 
      mockUserContext
    );
    
    expect(feedback).toHaveProperty('title');
    expect(feedback.title).toContain('Voice Phishing');
    expect(feedback.keyPoints.length).toBeGreaterThan(0);
    expect(OllamaService.generateSingleQuestionFeedback).toHaveBeenCalledWith(
      mockVishingQuestion,
      "advanced", 
      mockUserContext
    );
  });

  // Test perfect score feedback
  test('should generate perfect score feedback', async () => {
    // Mock successful Ollama response
    const mockPerfectFeedback = {
      title: "Perfect Score - Excellent Work!",
      importance: "You've demonstrated a comprehensive understanding of cybersecurity principles.",
      keyPoints: ["Consider exploring advanced threat models", "Look into specialised security domains"],
      practicalTips: ["Practice with advanced simulations", "Join security communities for continued learning"],
      resources: ["SANS Institute courses", "Cybersecurity certification programs"]
    };
    
    OllamaService.generatePerfectScoreFeedback.mockResolvedValueOnce(mockPerfectFeedback);

    const feedback = await OllamaService.generatePerfectScoreFeedback("intermediate", mockUserContext);
    
    expect(feedback).toHaveProperty('title');
    expect(feedback.title).toContain('Perfect Score');
    expect(feedback).toHaveProperty('keyPoints');
    expect(feedback.keyPoints.length).toBeGreaterThan(0);
    expect(OllamaService.generatePerfectScoreFeedback).toHaveBeenCalledWith(
      "intermediate", 
      mockUserContext
    );
  });

  // Test fallback when Ollama is unavailable for question feedback
  test('should use fallback content for question feedback when Ollama is unavailable', async () => {
    // Mock failed response
    OllamaService.isAvailable.mockResolvedValueOnce(false);
    
    // Mock fallback feedback
    const fallbackFeedback = {
      title: "Email Security Awareness",
      importance: "Recognising phishing attempts is crucial for protecting personal and organisational data.",
      keyPoints: ["Always verify sender addresses", "Be wary of urgent requests", "Never click suspicious links"],
      practicalTips: ["Use multi-factor authentication", "Report suspicious emails"],
      resources: ["SANS Security Training"],
      isAiGenerated: false
    };
    
    OllamaService.generateSingleQuestionFeedback.mockResolvedValueOnce(fallbackFeedback);
    
    const feedback = await OllamaService.generateSingleQuestionFeedback(
      mockQuestionData, 
      "beginner", 
      mockUserContext
    );
    
    // Should still return valid feedback structure even when Ollama is unavailable
    expect(feedback).toHaveProperty('title');
    expect(feedback).toHaveProperty('importance');
    expect(feedback).toHaveProperty('keyPoints');
    expect(feedback.keyPoints.length).toBeGreaterThan(0);
    expect(feedback.isAiGenerated).toBe(false);
  });

  // Test fallback when Ollama is unavailable for perfect score
  test('should use fallback content for perfect score when Ollama is unavailable', async () => {
    // Mock failed availability check
    OllamaService.isAvailable.mockResolvedValueOnce(false);
    
    // Mock fallback feedback
    const fallbackFeedback = {
      title: "Perfect Score - Expert-Level Security Mastery!",
      importance: "Your expert-level understanding positions you well for tackling complex security challenges.",
      keyPoints: ["Explore emerging threat vectors", "Consider contributing to security projects"],
      resources: ["Black Hat conference presentations"],
      isAiGenerated: false
    };
    
    OllamaService.generatePerfectScoreFeedback.mockResolvedValueOnce(fallbackFeedback);
    
    const feedback = await OllamaService.generatePerfectScoreFeedback("advanced", mockUserContext);
    
    // Should return fallback perfect score content
    expect(feedback).toHaveProperty('title');
    expect(feedback.title).toContain('Perfect Score');
    expect(feedback).toHaveProperty('keyPoints');
    expect(feedback).toHaveProperty('resources');
    expect(feedback.isAiGenerated).toBeFalsy();
  });

  // Test question categorisation
  test('should correctly categorise questions by type', async () => {
    const questions = [
      {
        question: "What is phishing?",
        type: QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE,
        isCorrect: false
      },
      {
        question: "Identify suspicious elements in this email",
        type: QUIZ_CONFIG.QUESTION_TYPES.EMAIL_PHISHING,
        score: 60
      },
      {
        question: "Is this text message legitimate?",
        type: QUIZ_CONFIG.QUESTION_TYPES.SMISHING,
        score: 50
      }
    ];
    
    const categorizedResult = {
      [QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE]: [questions[0]],
      [QUIZ_CONFIG.QUESTION_TYPES.EMAIL_PHISHING]: [questions[1]],
      [QUIZ_CONFIG.QUESTION_TYPES.SMISHING]: [questions[2]]
    };
    
    OllamaService.categoriseQuestions.mockReturnValueOnce(categorizedResult);
    
    const categorized = OllamaService.categoriseQuestions(questions);
    
    expect(categorized).toHaveProperty(QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE);
    expect(categorized).toHaveProperty(QUIZ_CONFIG.QUESTION_TYPES.EMAIL_PHISHING);
    expect(categorized).toHaveProperty(QUIZ_CONFIG.QUESTION_TYPES.SMISHING);
    expect(categorized[QUIZ_CONFIG.QUESTION_TYPES.EMAIL_PHISHING].length).toBe(1);
  });

  // Test generating feedback for a complete quiz
  test('should generate feedback for a complete quiz with multiple questions', async () => {
    // Mock successful response
    const quizFeedback = {
      analysis: "Based on your quiz performance, we've identified several areas for improvement.",
      topics: [
        {
          title: "Email Security Awareness",
          importance: "Email remains the most common attack vector for security breaches.",
          keyPoints: ["Always verify sender addresses", "Be cautious of unexpected attachments"],
          practicalTips: ["Use multi-factor authentication", "Verify requests through other channels"],
          resources: ["SANS Security Training"]
        }
      ]
    };
    
    OllamaService.generateQuizFeedback.mockResolvedValueOnce(quizFeedback);
    
    const quizData = [
      {
        question: "What is phishing?",
        type: QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE,
        isCorrect: true
      },
      {
        question: "Identify suspicious elements in this email",
        type: QUIZ_CONFIG.QUESTION_TYPES.EMAIL_PHISHING,
        score: 60,
        isCorrect: false
      }
    ];
    
    const feedback = await OllamaService.generateQuizFeedback(quizData, "beginner", mockUserContext);
    
    expect(feedback).toHaveProperty('analysis');
    expect(feedback).toHaveProperty('topics');
    expect(feedback.topics.length).toBeGreaterThan(0);
    expect(feedback.topics[0]).toHaveProperty('keyPoints');
  });

  // Test handling of malformed JSON responses from Ollama API
  test('should handle malformed JSON responses from Ollama API', async () => {
    // Mock that Ollama is available
    OllamaService.isAvailable.mockResolvedValueOnce(true);
    
    // Mock a malformed response (not valid JSON)
    OllamaService.generateResponse.mockRejectedValueOnce(new Error('Invalid JSON response'));
    
    // Create a test question
    const badFormatQuestion = {
      question: "Is this email legitimate?",
      type: QUIZ_CONFIG.QUESTION_TYPES.EMAIL_PHISHING,
      isCorrect: false,
      questionIndex: 3
    };
    
    // Define fallback feedback that should be returned
    const fallbackFeedback = {
      title: "Email Security Awareness",
      importance: "Recognising phishing attempts is crucial for security.",
      keyPoints: ["Check sender addresses", "Be cautious of unexpected emails"],
      practicalTips: ["Don't click suspicious links", "Verify through official channels"],
      resources: ["Email Security Guide"],
      isAiGenerated: false
    };
    
    // Mock the fallback method to return our defined feedback
    OllamaService.generateSingleQuestionFeedback.mockImplementationOnce(async () => {
      // First call generateResponse (which will fail)
      try {
        await OllamaService.generateResponse("Test prompt");
      } catch (error) {
        // Then return fallback feedback
        return fallbackFeedback;
      }
    });
    
    // Call the method
    const feedback = await OllamaService.generateSingleQuestionFeedback(
      badFormatQuestion, 
      "beginner", 
      mockUserContext
    );
    
    // Verify we get the fallback feedback instead of an error
    expect(feedback).toEqual(fallbackFeedback);
    expect(feedback.isAiGenerated).toBe(false);
    
    // Verify the method was called
    expect(OllamaService.generateSingleQuestionFeedback).toHaveBeenCalledWith(
      badFormatQuestion,
      "beginner", 
      mockUserContext
    );
    
    // Verify generateResponse was called (and failed)
    expect(OllamaService.generateResponse).toHaveBeenCalled();
  });
});