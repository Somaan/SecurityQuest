import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faCheck, 
  faTimes, 
  faInfoCircle, 
  faExclamationTriangle 
} from '@fortawesome/free-solid-svg-icons';

/**
 * EmailPhishingQuestion component - Improved for better element selection accuracy
 * @param {Object} question - The question data
 * @param {Function} onAnswer - Callback when answer is submitted
 */
const EmailPhishingQuestion = ({ question, onAnswer }) => {
  const [selectedElements, setSelectedElements] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const toggleElement = (elementId) => {
    if (showExplanation) return; // Prevent changes after submission
    
    if (selectedElements.includes(elementId)) {
      setSelectedElements(selectedElements.filter(id => id !== elementId));
    } else {
      setSelectedElements([...selectedElements, elementId]);
    }
  };
  
  const handleSubmit = () => {
    // Get all correct elements
    const correctElements = question.suspiciousElements
      .filter(element => element.isCorrect !== false) // Filter out elements explicitly marked as not suspicious
      .map(el => el.id);
    
    // Get decoy elements (incorrect options)
    const decoyElements = question.suspiciousElements
      .filter(element => element.isCorrect === false)
      .map(el => el.id);
    
    // Calculate metrics
    const truePositives = selectedElements.filter(id => correctElements.includes(id));
    const falsePositives = selectedElements.filter(id => decoyElements.includes(id));
    const falseNegatives = correctElements.filter(id => !selectedElements.includes(id));
    
    // Calculate score
    // Each correct identification is worth (100 / total correct elements)%
    // Each incorrect selection reduces score by half that value
    const pointsPerCorrect = correctElements.length > 0 ? (100 / correctElements.length) : 0;
    const pointsPerIncorrect = pointsPerCorrect / 2; // Penalty for incorrect selections
    
    let score = truePositives.length * pointsPerCorrect;
    score = Math.max(0, score - (falsePositives.length * pointsPerIncorrect));
    score = Math.min(100, Math.round(score)); // Normalize to 0-100%
    
    setShowExplanation(true);
    
    // Calculate earned points (based on 10 points per correct element)
    const earnedPoints = truePositives.length * 10 - falsePositives.length * 5; // -5 points for each false positive
    const maxPoints = correctElements.length * 10;
    
    onAnswer({
      score,
      details: {
        truePositives,
        falsePositives,
        falseNegatives,
        earnedPoints,
        maxPoints
      }
    });
  };
  
  return (
    <div className="email-phishing-container">
      <h3 className="question-text">{question.question}</h3>
      
      {/* Email viewer */}
      <div className="email-viewer">
        <div className="email-header">
          <div className="email-field">
            <span className="email-label">From:</span>
            <span className="email-value">{question.emailContent.from}</span>
          </div>
          <div className="email-field">
            <span className="email-label">To:</span>
            <span className="email-value">{question.emailContent.to}</span>
          </div>
          <div className="email-field">
            <span className="email-label">Subject:</span>
            <span className="email-value">{question.emailContent.subject}</span>
          </div>
          <div className="email-field">
            <span className="email-label">Date:</span>
            <span className="email-value">{question.emailContent.date}</span>
          </div>
        </div>
        
        <div className="email-body">
          {/* Render email body with clickable areas */}
          <div className="email-content">
            {question.emailContent.body.split('\n\n').map((paragraph, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
            
            {question.emailContent.attachmentName && (
              <div className="email-attachment">
                <FontAwesomeIcon icon={faEnvelope} />
                <span>{question.emailContent.attachmentName}</span>
              </div>
            )}
          </div>
          
          {/* Overlay for clickable suspicious elements */}
          <div className="suspicious-elements-overlay">
            {question.suspiciousElements.map(element => (
              <div
                key={element.id}
                className={`suspicious-element 
                  ${selectedElements.includes(element.id) ? 'selected' : ''} 
                  ${showExplanation && element.isCorrect !== false && !selectedElements.includes(element.id) ? 'missed' : ''} 
                  ${showExplanation && element.isCorrect === false && selectedElements.includes(element.id) ? 'incorrect' : ''}`}
                style={{
                  top: `${element.coordinates.top}%`,
                  left: `${element.coordinates.left}%`,
                  width: `${element.coordinates.width}%`,
                  height: `${element.coordinates.height}%`,
                }}
                onClick={() => toggleElement(element.id)}
                title={element.hint || element.description || "Click to mark as suspicious"}
              >
                {selectedElements.includes(element.id) && (
                  <FontAwesomeIcon icon={faExclamationTriangle} className="suspicious-icon" />
                )}
                {showExplanation && element.isCorrect !== false && !selectedElements.includes(element.id) && (
                  <FontAwesomeIcon icon={faTimes} className="missed-icon" />
                )}
                {showExplanation && element.isCorrect === false && selectedElements.includes(element.id) && (
                  <FontAwesomeIcon icon={faTimes} className="incorrect-icon" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="selection-instruction">
        <FontAwesomeIcon icon={faInfoCircle} />
        <span>Click on suspicious elements in the email to identify potential phishing signs. Think critically - not everything unusual is suspicious!</span>
      </div>
      
      {/* Submit button */}
      {!showExplanation && (
        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          Submit Analysis
        </button>
      )}
      
      {/* Explanation section (shown after answering) */}
      {showExplanation && (
        <div className="explanation-container">
          <h4>Explanation:</h4>
          <p>{question.explanation}</p>
          
          <h4>Suspicious Elements You Should Have Identified:</h4>
          <ul className="suspicious-elements-list">
            {question.suspiciousElements
              .filter(element => element.isCorrect !== false) // Only show genuinely suspicious elements
              .map(element => (
                <li 
                  key={element.id} 
                  className={selectedElements.includes(element.id) ? 'correctly-identified' : 'missed'}
                >
                  {selectedElements.includes(element.id) ? (
                    <FontAwesomeIcon icon={faCheck} className="correct-icon" />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} className="missed-icon" />
                  )}
                  <span>{element.description}</span>
                  {selectedElements.includes(element.id) && (
                    <span className="points-earned">+10 points</span>
                  )}
                </li>
              ))}
          </ul>
          
          {/* Only show false positives if the user selected any non-suspicious elements */}
          {question.suspiciousElements
            .filter(element => element.isCorrect === false && selectedElements.includes(element.id)).length > 0 && (
            <>
              <h4>Not Actually Suspicious:</h4>
              <ul className="false-positives-list">
                {question.suspiciousElements
                  .filter(element => element.isCorrect === false && selectedElements.includes(element.id))
                  .map(element => (
                    <li key={element.id} className="false-positive">
                      <FontAwesomeIcon icon={faTimes} className="incorrect-icon" />
                      <span>{element.description}</span>
                      <span className="points-deducted">-5 points</span>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      )}
      
      <style jsx>{`
        .email-phishing-container {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .email-viewer {
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          margin: 1.5rem 0;
          position: relative;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          color: #333;
        }
        
        .email-header {
          background-color: #f5f5f5;
          padding: 12px 16px;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .email-field {
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .email-label {
          font-weight: bold;
          margin-right: 8px;
          width: 60px;
          display: inline-block;
        }
        
        .email-body {
          padding: 20px;
          position: relative;
          min-height: 200px;
        }
        
        .email-content {
          position: relative;
          z-index: 1;
        }
        
        .email-content p {
          margin-bottom: 16px;
          line-height: 1.5;
        }
        
        .email-attachment {
          display: inline-flex;
          align-items: center;
          background-color: #f5f5f5;
          padding: 8px 12px;
          border-radius: 4px;
          margin-top: 16px;
          border: 1px solid #e0e0e0;
        }
        
        .email-attachment svg {
          margin-right: 8px;
          color: #555;
        }
        
        .suspicious-elements-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }
        
        .suspicious-element {
          position: absolute;
          cursor: pointer;
          border: 2px dashed transparent;
          border-radius: 4px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .suspicious-element:hover {
          background-color: rgba(255, 0, 0, 0.05);
          border-color: rgba(255, 0, 0, 0.2);
        }
        
        .suspicious-element.selected {
          background-color: rgba(255, 0, 0, 0.1);
          border-color: rgba(255, 0, 0, 0.4);
        }
        
        .suspicious-element.missed {
          background-color: rgba(255, 165, 0, 0.1);
          border-color: rgba(255, 165, 0, 0.4);
        }
        
        .suspicious-element.incorrect {
          background-color: rgba(255, 0, 0, 0.1);
          border-color: rgba(255, 0, 0, 0.3);
        }
        
        .suspicious-icon {
          color: #e74c3c;
          font-size: 16px;
        }
        
        .missed-icon {
          color: #f39c12;
          font-size: 16px;
        }
        
        .incorrect-icon {
          color: #e74c3c;
          font-size: 16px;
        }
        
        .selection-instruction {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          color: #e0e0e0;
          background-color: rgba(52, 152, 219, 0.1);
          padding: 12px;
          border-radius: 8px;
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
        }
        
        .submit-btn:hover {
          background-color: #2980b9;
        }
        
        .submit-btn:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
        }
        
        .explanation-container {
          margin-top: 24px;
          padding: 16px;
          background-color: #2c3e50;
          border-radius: 8px;
          color: #ecf0f1;
        }
        
        .explanation-container h4 {
          margin-top: 0;
          margin-bottom: 12px;
          color: #3498db;
        }
        
        .explanation-container p {
          line-height: 1.6;
          margin-bottom: 16px;
        }
        
        .suspicious-elements-list,
        .false-positives-list {
          list-style: none;
          padding: 0;
          margin: 0;
          margin-bottom: 16px;
        }
        
        .suspicious-elements-list li,
        .false-positives-list li {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .correctly-identified {
          color: #2ecc71;
        }
        
        .missed {
          color: #e74c3c;
        }
        
        .false-positive {
          color: #e74c3c;
        }
        
        .correct-icon {
          color: #2ecc71;
          flex-shrink: 0;
        }
        
        .missed-icon, .incorrect-icon {
          color: #e74c3c;
          flex-shrink: 0;
        }
        
        .points-earned {
          margin-left: auto;
          background-color: #2ecc71;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.85rem;
        }
        
        .points-deducted {
          margin-left: auto;
          background-color: #e74c3c;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
};

export default EmailPhishingQuestion;