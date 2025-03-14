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
  faFireFlameSimple
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { QUIZ_CONFIG } from './constants';

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  
  // Get the quiz results from location state
  const locationState = location.state || {};
  const {
    score = 0,
    totalQuestions = 0,
    userAnswers = [],
    difficulty = 'Beginner'
  } = locationState;
  
  // Get username from session storage
  const username = sessionStorage.getItem('username') || 'User';
  
  // Calculate percentages for the statistics
  const percentCorrect = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  // Determine pass/fail status based on config threshold
  const passed = percentCorrect >= QUIZ_CONFIG.PASS_THRESHOLD;

  // Ensure content doesn't flash or disappear too quickly
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // If there's no data, redirect to quiz selection
  useEffect(() => {
    if (!location.state || !userAnswers || userAnswers.length === 0) {
      console.log("No quiz data found, redirecting to quiz selection");
      // Delay redirect slightly to prevent flickering
      const timer = setTimeout(() => {
        navigate('/quiz/difficulty', { replace: true });
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [userAnswers, location.state, navigate]);
  
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
    navigate('/quiz/difficulty', { replace: true });
  };
  
  // Skip results and go back to difficulty selection
  const skipResults = () => {
    navigate('/quiz/difficulty', { replace: true });
  };

  // If we don't have any quiz data, show loading state
  if (!showContent || !userAnswers || userAnswers.length === 0) {
    return (
      <div className="results-container loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading results...</p>
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
          </div>
        </div>
      </div>
      
      {/* Streak update indicator - Show only when passed */}
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
          z-index: 100;
          position: relative;
        }
        
        .results-container.loading {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
        }
        
        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(52, 152, 219, 0.3);
          border-radius: 50%;
          border-top-color: #3498db;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .loading-spinner p {
          color: #e0e0e0;
          font-size: 1.2rem;
        }
        
        .results-header {
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .results-header h2 {
          color: #ffffff;
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
        }
        
        .score-summary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          padding: 1.5rem;
          background-color: #2c3e50;
          border-radius: 12px;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .score-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .score-circle-inner {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-color: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .score-percentage {
          font-size: 1.8rem;
          font-weight: bold;
          color: #ffffff;
        }
        
        .score-details {
          text-align: left;
        }
        
        .score-text {
          font-size: 1.2rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        
        .score-value, .total-value {
          font-weight: bold;
        }
        
        .status-text {
          font-size: 1.4rem;
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
          font-size: 1rem;
        }
        
        /* Streak update section */
        .streak-update-section {
          margin: 1.5rem 0;
          text-align: center;
        }
        
        .streak-badge {
          display: inline-flex;
          align-items: center;
          background-color: #e74c3c;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          gap: 0.5rem;
          font-weight: bold;
          animation: pulseStreak 1.5s infinite alternate;
        }
        
        @keyframes pulseStreak {
          from {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(231, 76, 60, 0.4);
          }
          to {
            transform: scale(1.05);
            box-shadow: 0 0 10px rgba(231, 76, 60, 0.7);
          }
        }
        
        .streak-icon {
          color: #f1c40f;
        }
        
        .section-title {
          color: #ffffff;
          font-size: 1.4rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #3498db;
          padding-bottom: 0.5rem;
        }
        
        .questions-review {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .question-item {
          background-color: #2c3e50;
          border-radius: 10px;
          overflow: hidden;
        }
        
        .question-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background-color: #34495e;
        }
        
        .question-number {
          color: #e0e0e0;
          font-weight: 500;
        }
        
        .question-result {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
        }
        
        .question-result.correct {
          color: #2ecc71;
        }
        
        .question-result.incorrect {
          color: #e74c3c;
        }
        
        .question-content {
          padding: 1rem;
        }
        
        .question-text {
          color: #ffffff;
          font-size: 1.1rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        
        .answers {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .answer {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .answer-label {
          min-width: 110px;
          color: #bdc3c7;
          font-size: 0.9rem;
        }
        
        .answer-text {
          color: #ffffff;
          font-size: 1rem;
        }
        
        .answer-text.correct {
          color: #2ecc71;
        }
        
        .answer-text.incorrect {
          color: #e74c3c;
        }
        
        .results-actions {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .action-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .retry-btn {
          background-color: #9b59b6;
          color: white;
        }
        
        .retry-btn:hover {
          background-color: #8e44ad;
        }
        
        .home-btn {
          background-color: #3498db;
          color: white;
        }
        
        .home-btn:hover {
          background-color: #2980b9;
        }
        
        @media (max-width: 768px) {
          .results-container {
            padding: 1.5rem;
            margin: 1rem;
          }
          
          .results-header h2 {
            font-size: 1.5rem;
          }
          
          .score-summary {
            gap: 1.5rem;
            padding: 0.75rem;
          }
          
          .score-circle {
            width: 100px;
            height: 100px;
          }
          
          .score-circle-inner {
            width: 85px;
            height: 85px;
          }
          
          .score-percentage {
            font-size: 1.5rem;
          }
          
          .score-text {
            font-size: 1.1rem;
          }
          
          .status-text {
            font-size: 1.2rem;
          }
          
          .section-title {
            font-size: 1.2rem;
          }
          
          .question-text {
            font-size: 1rem;
          }
          
          .action-btn {
            padding: 0.6rem 1.2rem;
            font-size: 0.95rem;
          }
        }
        
        @media (max-width: 480px) {
          .results-container {
            padding: 1rem;
            border-radius: 10px;
          }
          
          .score-summary {
            flex-direction: column;
            gap: 1rem;
          }
          
          .score-details {
            text-align: center;
          }
          
          .question-header {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
          }
          
          .answer {
            flex-direction: column;
            gap: 0.25rem;
          }
          
          .answer-label {
            min-width: auto;
          }
          
          .results-actions {
            flex-direction: column;
          }
          
          .action-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizResults;