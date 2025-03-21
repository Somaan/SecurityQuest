import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faTimes,
  faTrophy,
  faChartLine,
  faRedo,
  faHome,
  faArrowLeft,
  faAward,
  faSpinner,
  faFireFlameSimple,
  faExclamationTriangle,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { API_ENDPOINTS, QUIZ_CONFIG } from './constants';

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State variables
  const [achievements, setAchievements] = useState([]);
  const [loadingAchievements, setLoadingAchievements] = useState(false);
  const [newAchievements, setNewAchievements] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmittingScore, setIsSubmittingScore] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [duplicateEntry, setDuplicateEntry] = useState(false);
  
  // Add a ref to track if submission has been attempted
  // This will persist across re-renders and even remounting in StrictMode
  const submissionAttemptedRef = useRef(false);
  
  // Get the quiz results from location state
  const { score, totalQuestions, userAnswers, difficulty, quizId } = location.state || {
    score: 0,
    totalQuestions: 0,
    userAnswers: [],
    difficulty: 'Beginner',
    quizId: 1
  };
  
  // Get user ID from session storage
  const userId = sessionStorage.getItem('userId') || '1';
  const username = sessionStorage.getItem('username') || 'User';
  
  // Calculate percentages for the statistics
  const percentCorrect = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  // Determine pass/fail status based on config threshold
  const passed = percentCorrect >= (QUIZ_CONFIG.PASS_THRESHOLD || 70);
  
  // Submit quiz score to backend - with robust fix for duplicate entries
  useEffect(() => {
    const submitQuizScore = async () => {
      // Check if submission has already been attempted using the ref
      // This will prevent double submission even if component mounts twice
      if (submissionAttemptedRef.current) {
        console.log('Submission already attempted, skipping duplicate attempt');
        return;
      }
      
      // Mark that a submission has been attempted
      submissionAttemptedRef.current = true;
      
      // Skip if already in progress
      if (isSubmittingScore) {
        return;
      }
      
      try {
        setIsSubmittingScore(true);
        
        // Generate a unique tracking ID for this specific quiz submission
        const submissionId = `${userId}-${quizId}-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
        
        const quizCompletionData = {
          userId: userId,
          quizId: quizId,
          score: percentCorrect,
          totalQuestions: totalQuestions,
          correctAnswers: score,
          completionDetails: userAnswers.map((answer, index) => ({
            questionIndex: index,
            question: answer.question,
            userAnswer: answer.selectedOption,
            correctAnswer: answer.correctOption,
            isCorrect: answer.isCorrect
          })),
          submissionId: submissionId // Add unique submission ID
        };
        
        console.log(`Submitting quiz completion with ID: ${submissionId}`);
        
        const response = await fetch(API_ENDPOINTS.COMPLETE_QUIZ, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quizCompletionData),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to submit quiz score');
        }
        
        console.log('Quiz score submitted successfully:', data);
        
        // Show success toast
        toast.success('Your quiz results have been recorded!', {
          position: "top-center",
          autoClose: 3000
        });
        
        // Mark as submitted
        setScoreSubmitted(true);
      } catch (err) {
        console.error('Error submitting quiz score:', err);
        
        // For errors, show a generic message
        toast.error('Unable to save quiz results, but you can still view your performance.', {
          position: "top-center",
          autoClose: 4000
        });
        
        // Still consider it "submitted" to prevent retries
        setScoreSubmitted(true);
      } finally {
        setIsSubmittingScore(false);
      }
    };
    
    // Submit score when component mounts
    submitQuizScore();
  }, []); // Empty dependency array
  
  // Fetch achievements after score submission
  useEffect(() => {
    const fetchAchievements = async () => {
      // Skip if score not considered "submitted" yet
      if (!scoreSubmitted) return;
      
      try {
        setLoadingAchievements(true);
        
        const response = await fetch(API_ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(':userId', userId));
        
        if (!response.ok) {
          throw new Error('Failed to fetch achievements');
        }
        
        const data = await response.json();
        
        if (data.success && data.achievements) {
          setAchievements(data.achievements);
        }
      } catch (err) {
        console.error('Error fetching achievements:', err);
        // Don't set error state to avoid blocking the UI
      } finally {
        setLoadingAchievements(false);
      }
    };
    
    fetchAchievements();
  }, [userId, scoreSubmitted]);
  
  // Performance message based on score
  const getPerformanceMessage = () => {
    if (percentCorrect >= 90) return "Excellent! You're a security expert!";
    if (percentCorrect >= 80) return "Great job! You have strong security awareness.";
    if (percentCorrect >= 70) return "Good work! You've passed the quiz.";
    if (percentCorrect >= 60) return "Not bad, but there's room for improvement.";
    return "You need more practice to improve your security awareness.";
  };
  
  // Navigation functions
  const goToDashboard = () => navigate('/dashboard');
  const retryQuiz = () => navigate('/quiz/difficulty');
  const goBack = () => navigate(-1);

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>{difficulty} Quiz Results</h2>
        
        <div className="score-summary">
          <div className="score-circle" style={{
            background: `conic-gradient(
              ${passed ? '#2ecc71' : '#e74c3c'} ${percentCorrect * 3.6}deg,
              #2c3e50 0deg
            )`
          }}>
            <div className="score-circle-inner">
              <span className="score-percentage">{percentCorrect}%</span>
            </div>
          </div>
          
          <div className="score-details">
            <p className="score-text">
              You scored <span className="score-value">{score}</span> out of <span className="total-value">{totalQuestions}</span>
            </p>
            <p className={`status-text ${passed ? 'passed' : 'failed'}`}>
              {passed ? 'PASSED' : 'FAILED'}
            </p>
            <p className="performance-message">{getPerformanceMessage()}</p>
            
            {/* Score submission status */}
            <p className="submission-status">
              {isSubmittingScore ? (
                <span className="submitting">
                  <FontAwesomeIcon icon={faSpinner} spin className="spinner-icon" /> Recording results...
                </span>
              ) : scoreSubmitted ? (
                <span className="submitted">
                  <FontAwesomeIcon icon={faCheck} className="check-icon" /> Results saved
                </span>
              ) : (
                <span className="not-submitted">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="warning-icon" /> Unable to save results
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
      
      {/* Loading indicator for achievements */}
      {loadingAchievements && (
        <div className="loading-section">
          <FontAwesomeIcon icon={faSpinner} spin />
          <span>Loading achievements...</span>
        </div>
      )}
      
      {/* Streak update indicator */}
      {passed && (
        <div className="streak-update-section">
          <div className="streak-badge">
            <FontAwesomeIcon icon={faFireFlameSimple} className="streak-icon" />
            <span>Quiz streak increased!</span>
          </div>
        </div>
      )}
      
      <div className="results-content">
        <h3 className="section-title">Question Review</h3>
        
        <div className="questions-review">
          {userAnswers.map((answer, index) => (
            <div 
              key={index} 
              className={`question-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
            >
              <div className="question-header">
                <span className="question-number">Question {index + 1}</span>
                <span className={`question-result ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                  {answer.isCorrect ? (
                    <><FontAwesomeIcon icon={faCheck} /> Correct</>
                  ) : (
                    <><FontAwesomeIcon icon={faTimes} /> Incorrect</>
                  )}
                </span>
              </div>
              
              <div className="question-content">
                <p className="question-text">{answer.question}</p>
                
                <div className="answers">
                  <div className="answer">
                    <span className="answer-label">Your answer:</span>
                    <span className={`answer-text ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                      {answer.selectedOption}
                    </span>
                  </div>
                  
                  {!answer.isCorrect && (
                    <div className="answer">
                      <span className="answer-label">Correct answer:</span>
                      <span className="answer-text correct">{answer.correctOption}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="results-actions">
        <button className="action-btn back-btn" onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <button className="action-btn retry-btn" onClick={retryQuiz}>
          <FontAwesomeIcon icon={faRedo} /> Try Another Quiz
        </button>
        <button className="action-btn home-btn" onClick={goToDashboard}>
          <FontAwesomeIcon icon={faHome} /> Dashboard
        </button>
      </div>
      
      <style jsx>{`
        .results-container {
          max-width: 800px;
          margin: 2rem auto;
          background-color: #1a1a1a;
          border-radius: 14px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        
        .score-summary {
          display: flex;
          align-items: center;
          margin-top: 2rem;
          gap: 2rem;
        }
        
        .score-circle {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .score-circle-inner {
          width: 120px;
          height: 120px;
          background: #1a1a1a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .score-percentage {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .score-details {
          flex: 1;
        }
        
        .score-text {
          font-size: 1.2rem;
          color: #e0e0e0;
          margin-bottom: 0.5rem;
        }
        
        .score-value, .total-value {
          font-weight: bold;
          color: #3498db;
        }
        
        .status-text {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .status-text.passed {
          color: #2ecc71;
        }
        
        .status-text.failed {
          color: #e74c3c;
        }
        
        .performance-message {
          color: #e0e0e0;
          font-style: italic;
          margin-bottom: 0.5rem;
        }
        
        .submission-status {
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
        
        .submitting {
          color: #f39c12;
        }
        
        .submitted {
          color: #2ecc71;
        }
        
        .not-submitted {
          color: #e74c3c;
        }
        
        .spinner-icon, .check-icon, .warning-icon, .info-icon {
          margin-right: 5px;
        }
        
        .loading-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          color: #3498db;
          font-style: italic;
        }
        
        .streak-update-section {
          background-color: rgba(231, 76, 60, 0.1);
          border-radius: 8px;
          padding: 0.75rem;
          margin: 1rem 0;
          display: flex;
          justify-content: center;
        }
        
        .streak-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #e74c3c;
          font-weight: bold;
        }
        
        .results-content {
          margin-top: 2rem;
        }
        
        .section-title {
          color: #ffffff;
          font-size: 1.3rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid #2c3e50;
          padding-bottom: 0.5rem;
        }
        
        .questions-review {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .question-item {
          background-color: #2c3e50;
          border-radius: 8px;
          padding: 1rem;
          border-left: 4px solid;
        }
        
        .question-item.correct {
          border-left-color: #2ecc71;
        }
        
        .question-item.incorrect {
          border-left-color: #e74c3c;
        }
        
        .question-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #34495e;
        }
        
        .question-number {
          font-weight: bold;
          color: #bdc3c7;
        }
        
        .question-result {
          font-weight: bold;
        }
        
        .question-result.correct {
          color: #2ecc71;
        }
        
        .question-result.incorrect {
          color: #e74c3c;
        }
        
        .question-content {
          color: #ecf0f1;
        }
        
        .question-text {
          margin-bottom: 1rem;
        }
        
        .answers {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .answer {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .answer-label {
          font-size: 0.9rem;
          color: #bdc3c7;
        }
        
        .answer-text {
          background-color: #34495e;
          padding: 0.5rem;
          border-radius: 4px;
        }
        
        .answer-text.correct {
          background-color: rgba(46, 204, 113, 0.2);
          border: 1px solid #2ecc71;
        }
        
        .answer-text.incorrect {
          background-color: rgba(231, 76, 60, 0.2);
          border: 1px solid #e74c3c;
        }
        
        .results-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
        }
        
        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.2s ease;
        }
        
        .back-btn {
          background-color: #7f8c8d;
          color: white;
        }
        
        .back-btn:hover {
          background-color: #95a5a6;
        }
        
        .retry-btn {
          background-color: #e67e22;
          color: white;
        }
        
        .retry-btn:hover {
          background-color: #d35400;
        }
        
        .home-btn {
          background-color: #3498db;
          color: white;
        }
        
        .home-btn:hover {
          background-color: #2980b9;
        }
        
        @media (max-width: 768px) {
          .score-summary {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }
          
          .results-actions {
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          
          .action-btn {
            flex: 1;
            justify-content: center;
            min-width: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizResults;