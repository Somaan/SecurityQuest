import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMobileAlt, 
  faCheck, 
  faTimes 
} from '@fortawesome/free-solid-svg-icons';

const SmishingQuestion = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  
  const handleOptionSelect = (optionId) => {
    if (submitted) return; // Prevent changes after submission
    
    setSelectedOption(optionId);
  };
  
  const handleSubmit = () => {
    if (!selectedOption) return;
    
    const selectedAnswer = question.options.find(option => option.id === selectedOption);
    const isCorrect = selectedAnswer.isCorrect;
    const score = isCorrect ? 100 : 0;
    
    setSubmitted(true);
    
    onAnswer({
      score,
      details: {
        selectedOption,
        isCorrect,
        earnedPoints: isCorrect ? 10 : 0,
        maxPoints: 10
      }
    });
  };
  
  return (
    <div className="smishing-container">
      <h3 className="question-text">{question.question}</h3>
      
      <div className="sms-display">
        <div className="phone-frame">
          <div className="phone-screen">
            <div className="sms-header">
              <FontAwesomeIcon icon={faMobileAlt} className="phone-icon" />
              <span className="contact-info">{question.messageContent.from}</span>
            </div>
            
            <div className="sms-timestamp">{question.messageContent.timestamp}</div>
            
            <div className="sms-bubble">
              {question.messageContent.message}
            </div>
          </div>
        </div>
      </div>
      
      <div className="smishing-options">
        {question.options.map(option => (
          <div 
            key={option.id}
            className={`smishing-option 
              ${selectedOption === option.id ? 'selected' : ''} 
              ${submitted && option.isCorrect ? 'correct' : ''} 
              ${submitted && !option.isCorrect && selectedOption === option.id ? 'incorrect' : ''}`}
            onClick={() => handleOptionSelect(option.id)}
          >
            <div className="option-radio">
              {selectedOption === option.id && <div className="radio-inner"></div>}
            </div>
            <div className="option-text">{option.text}</div>
            
            {submitted && (
              <div className="option-indicator">
                {option.isCorrect ? (
                  <FontAwesomeIcon icon={faCheck} className="correct-icon" />
                ) : (
                  <FontAwesomeIcon icon={faTimes} className="incorrect-icon" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!submitted ? (
        <button 
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!selectedOption}
        >
          Submit Answer
        </button>
      ) : (
        <div className="explanation-box">
          <h4>Explanation:</h4>
          <p>{question.explanation}</p>
        </div>
      )}
      
      <style jsx>{`
        .smishing-container {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .sms-display {
          display: flex;
          justify-content: center;
          margin: 2rem 0;
        }
        
        .phone-frame {
          width: 300px;
          height: 480px;
          background-color: #000;
          border-radius: 30px;
          padding: 12px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
        
        .phone-screen {
          background-color: #f5f5f5;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          padding: 16px;
          display: flex;
          flex-direction: column;
        }
        
        .sms-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .phone-icon {
          color: #3498db;
        }
        
        .contact-info {
          font-weight: bold;
          color: #333;
        }
        
        .sms-timestamp {
          text-align: center;
          font-size: 0.85rem;
          color: #777;
          margin: 12px 0;
        }
        
        .sms-bubble {
          background-color: #0b93f6;
          color: white;
          padding: 12px 16px;
          border-radius: 20px;
          margin-right: 48px;
          position: relative;
          margin-bottom: auto;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          line-height: 1.5;
        }
        
        .smishing-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 1.5rem;
        }
        
        .smishing-option {
          display: flex;
          align-items: center;
          padding: 16px;
          background-color: #2c3e50;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .smishing-option:hover {
          background-color: #34495e;
        }
        
        .smishing-option.selected {
          background-color: rgba(52, 152, 219, 0.2);
          border: 1px solid rgba(52, 152, 219, 0.5);
        }
        
        .smishing-option.correct {
          background-color: rgba(46, 204, 113, 0.2);
          border: 1px solid rgba(46, 204, 113, 0.5);
        }
        
        .smishing-option.incorrect {
          background-color: rgba(231, 76, 60, 0.2);
          border: 1px solid rgba(231, 76, 60, 0.5);
        }
        
        .option-radio {
          width: 20px;
          height: 20px;
          border: 2px solid #7f8c8d;
          border-radius: 50%;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .radio-inner {
          width: 10px;
          height: 10px;
          background-color: #3498db;
          border-radius: 50%;
        }
        
        .selected .option-radio {
          border-color: #3498db;
        }
        
        .correct .option-radio {
          border-color: #2ecc71;
        }
        
        .incorrect .option-radio {
          border-color: #e74c3c;
        }
        
        .correct .radio-inner {
          background-color: #2ecc71;
        }
        
        .incorrect .radio-inner {
          background-color: #e74c3c;
        }
        
        .option-text {
          flex: 1;
          color: #ecf0f1;
        }
        
        .option-indicator {
          margin-left: 12px;
          font-size: 1.2rem;
        }
        
        .correct-icon {
          color: #2ecc71;
        }
        
        .incorrect-icon {
          color: #e74c3c;
        }
        
        .submit-btn {
          background-color: #3498db;
          color: white;
          padding: 12px 24px;
          border-radius: 6px;
          border: none;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s ease;
          margin-top: 20px;
        }
        
        .submit-btn:hover {
          background-color: #2980b9;
        }
        
        .submit-btn:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
        }
        
        .explanation-box {
          margin-top: 24px;
          padding: 16px;
          background-color: #34495e;
          border-radius: 8px;
        }
        
        .explanation-box h4 {
          color: #3498db;
          margin-top: 0;
          margin-bottom: 12px;
        }
        
        .explanation-box p {
          color: #ecf0f1;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default SmishingQuestion;