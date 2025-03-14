import React, { useState, useEffect } from 'react';
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
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { API_ENDPOINTS, QUIZ_CONFIG } from './constants';

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Original state variables
  const [achievements, setAchievements] = useState([]);
  const [loadingAchievements, setLoadingAchievements] = useState(false);
  const [newAchievements, setNewAchievements] = useState([]);
  const [error, setError] = useState(null);
  
  // NEW state variables for score submission
  const [isSubmittingScore, setIsSubmittingScore] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  
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
  
  // NEW useEffect to submit quiz score to backend
  useEffect(() => {
    const submitQuizScore = async () => {
      if (scoreSubmitted || isSubmittingScore) return;
      
      try {
        setIsSubmittingScore(true);
        console.log('Submitting quiz score to backend:', { 
          userId, 
          quizId, 
          score: percentCorrect 
        });
        
        const response = await fetch(API_ENDPOINTS.COMPLETE_QUIZ, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            quizId,
            score: percentCorrect // Send percentage score to backend
          }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to submit quiz score');
        }
        
        console.log('Quiz score submitted successfully:', data);
        setScoreSubmitted(true);
        
        // Show success message
        toast.success('Your quiz results have been recorded!', {
          position: "top-center",
          autoClose: 3000
        });
        
      } catch (err) {
        console.error('Error submitting quiz score:', err);
        toast.error('Failed to record quiz results. Your progress may not be saved.', {
          position: "top-center",
          autoClose: 5000
        });
      } finally {
        setIsSubmittingScore(false);
      }
    };
    
    // Submit score when component mounts
    submitQuizScore();
  }, [userId, quizId, percentCorrect, scoreSubmitted, isSubmittingScore]);
  
  // Existing useEffect for achievements - keep this as is
  useEffect(() => {
    const fetchAchievements = async () => {
      // Only fetch achievements after score is submitted
      if (!scoreSubmitted) return;
      
      try {
        setLoadingAchievements(true);
        
        // Call the API to get user achievements
        const response = await fetch(API_ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(':userId', userId));
        
        if (!response.ok) {
          throw new Error('Failed to fetch achievements');
        }
        
        const data = await response.json();
        
        if (data.success && data.achievements) {
          // Process achievements...
          setAchievements(data.achievements);
          // Filter for new achievements...
          // This part remains the same as your existing code
        }
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError(err.message);
      } finally {
        setLoadingAchievements(false);
      }
    };
    
    fetchAchievements();
  }, [userId, scoreSubmitted]);
  
  // Get a performance message based on score
  const getPerformanceMessage = () => {
    if (percentCorrect >= 90) return "Excellent! You're a security expert!";
    if (percentCorrect >= 80) return "Great job! You have strong security awareness.";
    if (percentCorrect >= 70) return "Good work! You've passed the quiz.";
    if (percentCorrect >= 60) return "Not bad, but there's room for improvement.";
    return "You need more practice to improve your security awareness.";
  };
  
  // Return to Dashboard
  const goToDashboard = () => {
    navigate('/dashboard');
  };
  
  // Retry the quiz
  const retryQuiz = () => {
    navigate('/quiz/difficulty');
  };
  
  // Go back to the quiz completion screen
  const goBack = () => {
    navigate(-1);
  };

  if (error) {
    return (
      <div className="results-container error">
        <div className="error-display">
          <FontAwesomeIcon icon={faExclamationTriangle} size="3x" className="error-icon" />
          <h3>Error Loading Achievements</h3>
          <p>{error}</p>
          <div className="quiz-actions">
            <button onClick={goToDashboard} className="action-btn home-btn">
              <FontAwesomeIcon icon={faHome} /> Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            
            {/* NEW score submission status */}
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
                  <FontAwesomeIcon icon={faExclamationTriangle} className="warning-icon" /> Results not saved
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
      
      {/* Newly unlocked achievements section */}
      {/* Keep your existing achievements code here */}
      
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
          <FontAwesomeIcon icon={faRedo} /> Try Again
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
        
        /* All your existing styles */
        
        /* NEW styles for submission status */
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
        
        .spinner-icon, .check-icon, .warning-icon {
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

export default QuizResults;