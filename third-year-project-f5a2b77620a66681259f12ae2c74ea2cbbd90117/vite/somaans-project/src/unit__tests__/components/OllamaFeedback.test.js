// src/__tests__/components/OllamaFeedback.test.js

// Mock dependencies before imports
jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: ({ icon, className }) => (
      <span data-testid={`icon-${icon}`} className={className || ''}>
        {icon}
      </span>
    )
  }));
  
  jest.mock('@fortawesome/free-solid-svg-icons', () => ({
    faLightbulb: 'faLightbulb',
    faSpinner: 'faSpinner',
    faInfoCircle: 'faInfoCircle',
    faChevronDown: 'faChevronDown',
    faChevronUp: 'faChevronUp',
    faBrain: 'faBrain',
    faExclamationTriangle: 'faExclamationTriangle',
    faBook: 'faBook',
    faTools: 'faTools',
    faCheck: 'faCheck',
    faUserGraduate: 'faUserGraduate',
    faRobot: 'faRobot',
    faCog: 'faCog',
    faCodeBranch: 'faCodeBranch',
  }));
  
  jest.mock('../../constants', () => ({
    QUIZ_CONFIG: {
      QUESTION_TYPES: {
        MULTIPLE_CHOICE: 'multiple_choice',
      }
    }
  }));
  
  // Mock OllamaService with working implementations
  const mockQuestionFeedback = {
    title: 'Understanding Phishing Attacks',
    importance: 'Phishing remains one of the most common and effective attack vectors in cybersecurity.',
    keyPoints: [
      'Always verify the sender\'s email address',
      'Be suspicious of urgent requests for personal information',
      'Check for spelling and grammar errors, which are common in phishing attempts',
    ],
    practicalTips: [
      'Hover over links before clicking to see the actual URL',
      'Never provide sensitive information in response to an email request',
      'Use multi-factor authentication where possible',
    ],
    resources: [
      'Anti-Phishing Working Group (APWG) resources',
      'PhishTank database of known phishing attempts',
    ],
  };
  
  const mockPerfectScoreFeedback = {
    title: 'Perfect Score - Excellent Work!',
    importance: 'Congratulations on your perfect score! You have demonstrated an excellent understanding of cybersecurity principles.',
    keyPoints: [
      'Consider taking on more advanced security challenges',
      'Look into specialized security certifications',
      'Explore offensive security techniques to better understand defenses',
    ],
    resources: [
      'SANS Institute advanced courses',
      'Offensive Security Certified Professional (OSCP) certification',
    ],
  };
  
  jest.mock('../../OllamaService', () => ({
    isAvailable: jest.fn().mockResolvedValue(true),
    generateSingleQuestionFeedback: jest.fn().mockResolvedValue(mockQuestionFeedback),
    generatePerfectScoreFeedback: jest.fn().mockResolvedValue(mockPerfectScoreFeedback),
  }));
  
  // Import needed modules
  import React from 'react';
  import { render, screen, fireEvent, waitFor } from '@testing-library/react';
  import '@testing-library/jest-dom';
  import OllamaFeedback from '../../OllamaFeedback';
  import OllamaService from '../../OllamaService';
  
  // Test suite for OllamaFeedback component
  describe('OllamaFeedback Component', () => {
    // Test data setup
    const mockUserAnswers = [
      {
        question: 'What is phishing?',
        type: 'multiple_choice',
        isCorrect: false,
        selectedAnswer: 'A legitimate email from your bank',
        correctAnswer: 'An attempt to trick you into revealing sensitive information',
      },
      {
        question: 'Which of the following is a strong password?',
        type: 'multiple_choice',
        isCorrect: true,
        selectedAnswer: 'P@$$w0rd123!',
        correctAnswer: 'P@$$w0rd123!',
      },
    ];
  
    const mockQuizHistory = [
      { date: '2023-01-01', score: 60, incorrectTopics: ['phishing', 'passwords'] },
      { date: '2023-02-01', score: 70, incorrectTopics: ['phishing'] },
      { date: '2023-03-01', score: 80, incorrectTopics: [] },
    ];
  
    // Setup and teardown
    beforeEach(() => {
      jest.clearAllMocks();
      
      // Ensure consistent mock implementations
      OllamaService.isAvailable.mockResolvedValue(true);
      OllamaService.generateSingleQuestionFeedback.mockResolvedValue(mockQuestionFeedback);
      OllamaService.generatePerfectScoreFeedback.mockResolvedValue(mockPerfectScoreFeedback);
    });
  
    // Tests
  
    // 1. Test loading state
    test('should show loading state initially', () => {
      render(
        <OllamaFeedback 
          userAnswers={mockUserAnswers}
          difficulty="beginner"
          onClose={jest.fn()}
        />
      );
  
      expect(screen.getByText(/analysing your quiz results/i)).toBeInTheDocument();
    });
  
    // 2. Test error state
    test('should show error message when no quiz data available', async () => {
      render(
        <OllamaFeedback 
          userAnswers={[]}
          difficulty="beginner"
          onClose={jest.fn()}
        />
      );
  
      await waitFor(() => {
        expect(screen.getByText(/no quiz data available for analysis/i)).toBeInTheDocument();
      });
    });
  
    // 3. Test feedback generation for incorrect answers
    test('should generate feedback for incorrect answers', async () => {
      render(
        <OllamaFeedback 
          userAnswers={mockUserAnswers}
          difficulty="beginner"
          onClose={jest.fn()}
        />
      );
  
      await waitFor(() => {
        expect(OllamaService.generateSingleQuestionFeedback).toHaveBeenCalled();
        expect(screen.getByText('Understanding Phishing Attacks')).toBeInTheDocument();
      });
    });
  
    // 4. Test perfect score scenario
    test('should generate perfect score feedback when all answers are correct', async () => {
      const perfectAnswers = [
        {
          question: 'What is phishing?',
          type: 'multiple_choice',
          isCorrect: true,
          selectedAnswer: 'An attempt to trick you into revealing sensitive information',
          correctAnswer: 'An attempt to trick you into revealing sensitive information',
        },
      ];
  
      render(
        <OllamaFeedback 
          userAnswers={perfectAnswers}
          difficulty="beginner"
          onClose={jest.fn()}
        />
      );
  
      await waitFor(() => {
        expect(OllamaService.generatePerfectScoreFeedback).toHaveBeenCalled();
        expect(screen.getByText('Perfect Score - Excellent Work!')).toBeInTheDocument();
      });
    });
  
    // 5. Test section toggling functionality
    test('should toggle sections when clicked', async () => {
      render(
        <OllamaFeedback 
          userAnswers={mockUserAnswers}
          difficulty="beginner"
          onClose={jest.fn()}
        />
      );
  
      // Wait for content to load
      await waitFor(() => {
        expect(screen.getByText('Understanding Phishing Attacks')).toBeInTheDocument();
      });
  
      // First section should be expanded by default
      expect(screen.getByText(/Phishing remains one of the most common/i)).toBeInTheDocument();
  
      // Click to collapse the section
      const sectionHeader = screen.getByText('Understanding Phishing Attacks').closest('div');
      fireEvent.click(sectionHeader);
  
      // The content should no longer be visible
      await waitFor(() => {
        expect(screen.queryByText(/Phishing remains one of the most common/i)).not.toBeInTheDocument();
      });
    });
  
    // 6. Test expand/collapse all functionality
    test('should expand and collapse all sections', async () => {
      render(
        <OllamaFeedback 
          userAnswers={mockUserAnswers}
          difficulty="beginner"
          onClose={jest.fn()}
        />
      );
  
      // Wait for content to load
      await waitFor(() => {
        expect(screen.getByText('Understanding Phishing Attacks')).toBeInTheDocument();
      });
  
      // Click "Collapse All"
      const collapseAllButton = screen.getByText('Collapse All');
      fireEvent.click(collapseAllButton);
  
      // Content should be hidden
      await waitFor(() => {
        expect(screen.queryByText(/Phishing remains one of the most common/i)).not.toBeInTheDocument();
      });
  
      // Click "Expand All"
      const expandAllButton = screen.getByText('Expand All');
      fireEvent.click(expandAllButton);
  
      // Content should be visible again
      await waitFor(() => {
        expect(screen.getByText(/Phishing remains one of the most common/i)).toBeInTheDocument();
      });
    });
  
    // 7. Test fallback content when Ollama is not available
    test('should use fallback content when Ollama is not available', async () => {
      // Mock Ollama as unavailable
      OllamaService.isAvailable.mockResolvedValue(false);
  
      render(
        <OllamaFeedback 
          userAnswers={mockUserAnswers}
          difficulty="beginner"
          onClose={jest.fn()}
        />
      );
  
      // Check for fallback banner
      await waitFor(() => {
        expect(screen.getByText(/Using standard feedback templates/i)).toBeInTheDocument();
      });
    });
  
    // 8. Test close button functionality
    test('should call onClose when close button is clicked', async () => {
      const mockOnClose = jest.fn();
      
      render(
        <OllamaFeedback 
          userAnswers={mockUserAnswers}
          difficulty="beginner"
          onClose={mockOnClose}
        />
      );
  
      // Wait for content to load
      await waitFor(() => {
        expect(screen.getByText(/Personalised Learning Recommendations/i)).toBeInTheDocument();
      });
  
      // Click the close button
      const closeButton = screen.getByText('Close');
      fireEvent.click(closeButton);
  
      // Check if onClose was called
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  
    // 9. Test user progress section
    test('should display user progress section when quiz history is provided', async () => {
      render(
        <OllamaFeedback 
          userAnswers={mockUserAnswers}
          difficulty="beginner"
          onClose={jest.fn()}
          quizHistory={mockQuizHistory}
        />
      );
  
      // Check for progress metrics
      await waitFor(() => {
        expect(screen.getByText(/Your Learning Progress/i)).toBeInTheDocument();
        expect(screen.getByText(/Quizzes Taken/i)).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument(); // 3 quizzes in history
      });
  
      // Look for improvement text - carefully avoiding regex with special characters
      const progressSection = screen.getByText(/Your Learning Progress/i).closest('div');
      expect(progressSection).toHaveTextContent('20.0%'); // Improvement percentage
    });
  
    // 10. Test personalized greeting with username
    test('should display personalized greeting with username when provided', async () => {
      render(
        <OllamaFeedback 
          userAnswers={mockUserAnswers}
          difficulty="beginner"
          onClose={jest.fn()}
          userName="Alice"
        />
      );
  
      // Wait for content to load
      await waitFor(() => {
        expect(screen.getByText(/Personalised Learning Recommendations/i)).toBeInTheDocument();
      });
  
      // Check for personalized greeting containing the name
      const introSection = screen.getByText(/Personalised Learning Recommendations/i)
        .closest('.ollama-feedback-container')
        .querySelector('.feedback-intro');
      
      expect(introSection).toHaveTextContent('Alice'); 
    });
  });