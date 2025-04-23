import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, 
  faTimes, 
  faInfoCircle 
} from '@fortawesome/free-solid-svg-icons';

const WebsitePhishingQuestion = ({ question, onAnswer }) => {
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
    // Calculate score - each correct identification is worth points
    const correctElements = question.suspiciousElements.map(el => el.id);
    
    // True positives (correctly identified suspicious elements)
    const truePositives = selectedElements.filter(id => correctElements.includes(id));
    
    // False positives (incorrectly marked elements as suspicious)
    const falsePositives = selectedElements.filter(id => !correctElements.includes(id));
    
    // False negatives (missed suspicious elements)
    const falseNegatives = correctElements.filter(id => !selectedElements.includes(id));
    
    // Calculate score as percentage of correct identifications
    const score = correctElements.length > 0 
      ? Math.round((truePositives.length / correctElements.length) * 100)
      : 0;
    
    // Show explanation after answering
    setShowExplanation(true);
    
    // Calculate earned points (typically 10 points per correct identification)
    const earnedPoints = truePositives.length * 10;
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
    <div className="website-phishing-container">
      <h3 className="question-text">{question.question}</h3>
      
      <div className="website-preview">
        <div className="website-image-container">
          <img 
            src={question.websiteImage} 
            alt="Suspicious website" 
            className="website-image" 
          />
          
          {/* Overlay for clickable suspicious elements */}
          <div className="suspicious-elements-overlay">
            {question.suspiciousElements.map(element => (
              <div
                key={element.id}
                className={`suspicious-element ${selectedElements.includes(element.id) ? 'selected' : ''} ${showExplanation && !selectedElements.includes(element.id) ? 'missed' : ''}`}
                style={{
                  top: `${element.coordinates.top}%`,
                  left: `${element.coordinates.left}%`,
                  width: `${element.coordinates.width}%`,
                  height: `${element.coordinates.height}%`,
                }}
                onClick={() => toggleElement(element.id)}
                title={element.description || "Click to mark as suspicious"}
              >
                {selectedElements.includes(element.id) && (
                  <FontAwesomeIcon icon={faInfoCircle} className="suspicious-icon" />
                )}
                {showExplanation && !selectedElements.includes(element.id) && (
                  <FontAwesomeIcon icon={faTimes} className="missed-icon" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="selection-instruction">
        <FontAwesomeIcon icon={faInfoCircle} />
        <span>Click on suspicious elements in the website to identify potential phishing signs</span>
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
            {question.suspiciousElements.map(element => (
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
        </div>
      )}
      
      <style jsx>{`
        .website-phishing-container {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .website-preview {
          margin: 1.5rem 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .website-image-container {
          position: relative;
          width: 100%;
        }
        
        .website-image {
          width: 100%;
          display: block;
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
          background-color: rgba(255, 0, 0, 0.1);
          border-color: rgba(255, 0, 0, 0.3);
        }
        
        .suspicious-element.selected {
          background-color: rgba(255, 0, 0, 0.2);
          border-color: rgba(255, 0, 0, 0.5);
        }
        
        .suspicious-element.missed {
          background-color: rgba(255, 165, 0, 0.1);
          border-color: rgba(255, 165, 0, 0.4);
        }
        
        .suspicious-icon {
          color: #e74c3c;
          font-size: 18px;
        }
        
        .missed-icon {
          color: #f39c12;
          font-size: 18px;
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
        
        .suspicious-elements-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .suspicious-elements-list li {
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
        
        .correct-icon {
          color: #2ecc71;
          flex-shrink: 0;
        }
        
        .missed-icon {
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
      `}</style>
    </div>
  );
};

export default WebsitePhishingQuestion;