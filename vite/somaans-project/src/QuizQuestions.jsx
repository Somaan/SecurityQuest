import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faSpinner,
  faClock,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { QUIZ_CONFIG, API_ENDPOINTS } from './constants';

const QuizQuestions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { difficulty } = location.state || { difficulty: 'Beginner' };
  
  // Get Quiz ID from config based on difficulty
  const quizId = QUIZ_CONFIG.QUIZ_IDS[difficulty] || 1;
  
  // State variables
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(QUIZ_CONFIG.QUESTION_TIME);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  
  // Get user ID from session storage
  const userId = sessionStorage.getItem('userId') || '1';
  const username = sessionStorage.getItem('username') || 'User';
  
  // Timer interval reference
  let timerInterval = null;
  
  // Fetch questions from API (or use mock data)
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        
        // Use mock data for development
        const mockQuestions = QUIZ_CONFIG.MOCK_QUIZ_DATA[difficulty] || [];
        setQuestions(mockQuestions);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load quiz questions. Please try again.');
        setLoading(false);
      }
    };
    
    fetchQuestions();
    
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [difficulty]);
  
  // Start timer for current question
  useEffect(() => {
    if (loading || quizComplete) return;
    
    // Reset timer when moving to a new question
    setTimeLeft(QUIZ_CONFIG.QUESTION_TIME);
    
    // Set up timer
    timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          // Auto-submit when time runs out
          handleTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    // Clean up interval
    return () => {
      clearInterval(timerInterval);
    };
  }, [currentQuestionIndex, loading, quizComplete]);
  
  // Handle time up - auto-submit current answer
  const handleTimeUp = () => {
    if (selectedOptionIndex === null) {
      // If no option selected, count as incorrect answer
      const currentQuestion = questions[currentQuestionIndex];
      
      const answerData = {
        question: currentQuestion.question,
        selectedOption: 'Time expired',
        correctOption: currentQuestion.options[currentQuestion.correctAnswer],
        isCorrect: false
      };
      
      setUserAnswers([...userAnswers, answerData]);
      
      // Move to next question or finish quiz
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOptionIndex(null);
      } else {
        finishQuiz();
      }
    } else {
      // If option was selected, handle submission
      handleOptionSubmit();
    }
  };
  
  // Handle option selection
  const handleOptionSelect = (index) => {
    setSelectedOptionIndex(index);
  };
  
  // Handle option submission
  const handleOptionSubmit = () => {
    if (selectedOptionIndex === null) {
      toast.info('Please select an answer');
      return;
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOptionIndex === currentQuestion.correctAnswer;
    
    // If correct, increment score
    if (isCorrect) {
      setScore(score + 1);
    }
    
    const answerData = {
      question: currentQuestion.question,
      selectedOption: currentQuestion.options[selectedOptionIndex],
      correctOption: currentQuestion.options[currentQuestion.correctAnswer],
      isCorrect
    };
    
    setUserAnswers([...userAnswers, answerData]);
    
    // Move to next question or finish quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionIndex(null);
    } else {
      finishQuiz();
    }
  };
  
  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Finish quiz and process results
  const finishQuiz = async () => {
    setQuizComplete(true);
    clearInterval(timerInterval);
    
    // Calculate final score
    const finalScore = userAnswers.filter(answer => answer.isCorrect).length;
    const totalQuestions = questions.length;
    
    console.log(`Quiz completed! Score: ${finalScore}/${totalQuestions}`);
    console.log(`Quiz ID: ${quizId}, User ID: ${userId}`);
    
    try {
      // Submit quiz results to API
      const response = await fetch(API_ENDPOINTS.COMPLETE_QUIZ, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          quizId: quizId,
          score: finalScore
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quiz results');
      }
      
      console.log('Quiz results submitted successfully:', data);
      
      // Navigate to results page
      navigate('/quiz/results', {
        state: {
          score: finalScore,
          totalQuestions,
          userAnswers,
          difficulty,
          quizId
        }
      });
    } catch (error) {
      console.error('Error submitting quiz results:', error);
      toast.error('Failed to save quiz results. Proceeding to results page.');
      
      // Navigate to results page anyway
      navigate('/quiz/results', {
        state: {
          score: finalScore,
          totalQuestions,
          userAnswers,
          difficulty,
          quizId
        }
      });
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="quiz-container loading">
        <div className="loading-spinner">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          <p>Loading quiz questions...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="quiz-container error">
        <div className="error-message">
          <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={() => navigate('/quiz/difficulty')} className="back-button">
            Back to Quiz Selection
          </button>
        </div>
      </div>
    );
  }
  
  // Main quiz content
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{difficulty} Quiz</h2>
        <div className="timer">
          <FontAwesomeIcon icon={faClock} className="timer-icon" />
          <span className={timeLeft <= 10 ? 'time-low' : ''}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ 
            width: `${((currentQuestionIndex) / questions.length) * 100}%` 
          }}
        ></div>
      </div>
      
      <div className="question-counter">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
      
      <div className="question-container">
        <h3 className="question-text">{currentQuestion.question}</h3>
        
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <div 
              key={index}
              className={`option ${selectedOptionIndex === index ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(index)}
            >
              <div className="option-text">{option}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="question-actions">
        <button 
          className="submit-btn"
          onClick={handleOptionSubmit}
          disabled={selectedOptionIndex === null}
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          <FontAwesomeIcon icon={faChevronRight} className="btn-icon" />
        </button>
      </div>
      
      <style jsx>{`
        .quiz-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 1.5rem;
        }
        
        .quiz-container.loading,
        .quiz-container.error {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          text-align: center;
        }
        
        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #3498db;
        }
        
        .loading-spinner p {
          margin-top: 1rem;
          color: #e0e0e0;
        }
        
        .error-message {
          color: #e74c3c;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .error-message h3 {
          margin: 1rem 0;
          font-size: 1.5rem;
        }
        
        .error-message p {
          margin-bottom: 1.5rem;
          color: #e0e0e0;
        }
        
        .back-button {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }
        
        .quiz-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .quiz-header h2 {
          color: #ffffff;
          font-size: 1.6rem;
          margin: 0;
        }
        
        .timer {
          background-color: #2c3e50;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .timer-icon {
          color: #3498db;
        }
        
        .time-low {
          color: #e74c3c;
          animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        .progress-bar-container {
          height: 8px;
          background-color: #2c3e50;
          border-radius: 4px;
          margin-bottom: 1rem;
        }
        
        .progress-bar-fill {
          height: 100%;
          background-color: #3498db;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        
        .question-counter {
          text-align: center;
          color: #bdc3c7;
          margin-bottom: 2rem;
          font-size: 0.9rem;
        }
        
        .question-container {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        
        .question-text {
          color: #ffffff;
          font-size: 1.25rem;
          margin-top: 0;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        
        .options-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .option {
          background-color: #2c3e50;
          border-radius: 8px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
        }
        
        .option:hover {
          background-color: #34495e;
          transform: translateY(-2px);
        }
        
        .option.selected {
          background-color: #3498db;
          border: 2px solid #2980b9;
        }
        
        .option-text {
          color: #ffffff;
          flex: 1;
        }
        
        .question-actions {
          display: flex;
          justify-content: flex-end;
        }
        
        .submit-btn {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }
        
        .submit-btn:hover {
          background-color: #2980b9;
        }
        
        .submit-btn:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
        }
        
        .btn-icon {
          font-size: 0.8rem;
        }
        
        @media (max-width: 768px) {
          .quiz-container {
            padding: 1rem;
          }
          
          .quiz-header h2 {
            font-size: 1.4rem;
          }
          
          .timer {
            padding: 0.4rem 0.8rem;
          }
          
          .question-text {
            font-size: 1.1rem;
          }
        }
        
        @media (max-width: 480px) {
          .quiz-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .timer {
            align-self: flex-end;
          }
          
          .question-text {
            font-size: 1rem;
          }
          
          .option {
            padding: 0.75rem;
          }
          
          .submit-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizQuestions;