import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBook,
  faGraduationCap,
  faChalkboardTeacher
} from '@fortawesome/free-solid-svg-icons';

/**
 * QuizDifficulty component
 * - Allows user to select quiz difficulty level
 * - Redirects to quiz questions with selected difficulty
 */
const QuizDifficulty = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username') || 'User';
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  
  // Handle quiz selection
  const handleQuizSelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    // In a real implementation, we would navigate to the questions page with the difficulty
    // For now, we'll navigate to the questions page
    setTimeout(() => {
      navigate('/quiz/questions');
    }, 500);
    
    console.log(`Selected quiz difficulty: ${difficulty}`);
  };

  return (
    <div className="content-wrapper">
      <div className="quiz-container">
        <div className="quiz-header">
          <h2>Select a quiz you would like to complete, {username}</h2>
        </div>
        
        <div className="quiz-options">
          {/* Beginner Quiz Option */}
          <div 
            className={`quiz-option ${selectedDifficulty === 'Beginner' ? 'selected' : ''}`}
            onClick={() => handleQuizSelect('Beginner')}
          >
            <div className="quiz-option-content">
              <div className="quiz-option-title">
                <FontAwesomeIcon icon={faBook} className="quiz-icon beginner" />
                <h3>Beginner</h3>
              </div>
              <p className="quiz-description">
                This quiz will cover phishing concepts and fundamentals to protect 
                yourself against the biggest threat to our online safety!
              </p>
            </div>
            <div className="quiz-arrow">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
          
          {/* Intermediate Quiz Option */}
          <div 
            className={`quiz-option ${selectedDifficulty === 'Intermediate' ? 'selected' : ''}`}
            onClick={() => handleQuizSelect('Intermediate')}
          >
            <div className="quiz-option-content">
              <div className="quiz-option-title">
                <FontAwesomeIcon icon={faGraduationCap} className="quiz-icon intermediate" />
                <h3>Intermediate</h3>
              </div>
              <p className="quiz-description">
                This quiz will cover more advanced techniques used by Social Engineers. 
                You will also be shown real-world exemplar scenarios where these attacks 
                may come into place.
              </p>
            </div>
            <div className="quiz-arrow">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
          
          {/* Advanced Quiz Option */}
          <div 
            className={`quiz-option ${selectedDifficulty === 'Advanced' ? 'selected' : ''}`}
            onClick={() => handleQuizSelect('Advanced')}
          >
            <div className="quiz-option-content">
              <div className="quiz-option-title">
                <FontAwesomeIcon icon={faChalkboardTeacher} className="quiz-icon advanced" />
                <h3>Advanced</h3>
              </div>
              <p className="quiz-description">
                In our Advanced quiz, it will combine what Beginner/Intermediate levels 
                included, but with added Corporate examples and even more complex 
                threats.
              </p>
            </div>
            <div className="quiz-arrow">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .quiz-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .quiz-header {
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .quiz-header h2 {
          color: #ffffff;
          font-size: 1.5rem;
        }
        
        .quiz-options {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .quiz-option {
          background-color: #1a1a1a;
          border-radius: 14px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 2px solid transparent;
        }
        
        .quiz-option:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
          border-color: rgba(100, 108, 255, 0.3);
        }
        
        .quiz-option.selected {
          border-color: #646cff;
          background-color: rgba(100, 108, 255, 0.1);
        }
        
        .quiz-option-content {
          flex: 1;
        }
        
        .quiz-option-title {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        
        .quiz-option-title h3 {
          font-size: 1.25rem;
          margin: 0;
          color: #ffffff;
        }
        
        .quiz-icon {
          font-size: 1.5rem;
          margin-right: 0.75rem;
        }
        
        .quiz-icon.beginner {
          color: #3498db;
        }
        
        .quiz-icon.intermediate {
          color: #2ecc71;
        }
        
        .quiz-icon.advanced {
          color: #e74c3c;
        }
        
        .quiz-description {
          color: #e0e0e0;
          font-size: 0.95rem;
          margin: 0;
          line-height: 1.5;
        }
        
        .quiz-arrow {
          color: #646cff;
          font-size: 1.25rem;
          padding-left: 1rem;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .quiz-container {
            padding: 1rem;
          }
          
          .quiz-option {
            padding: 1.25rem;
          }
          
          .quiz-option-title h3 {
            font-size: 1.1rem;
          }
          
          .quiz-description {
            font-size: 0.9rem;
          }
        }
        
        @media (max-width: 480px) {
          .quiz-header h2 {
            font-size: 1.25rem;
          }
          
          .quiz-option-title {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .quiz-icon {
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizDifficulty;