import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

/**
 * VishingQuestion component - handles transcript of a voice phishing attempt with multi-select options
 * @param {Object} question - question data
 * @param {Function} onAnswer - callback when answer is submitted
 */

const VishingQuestion = ({ question, onAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleOption = (optionId) => {
    if (submitted) return; // Prevent changes after submission

    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  // Handling form submission
  const handleSubmit = () => {
    const correctOptions = question.options
      .filter((option) => option.isCorrect)
      .map((option) => option.id);
    const incorrectOptions = question.options
      .filter((option) => !option.isCorrect)
      .map((option) => option.id);

    // Calculate correctly identified clues (true positives)
    const correctlyIdentified = selectedOptions.filter((id) =>
      correctOptions.includes(id)
    );

    // Calculate incorrectly identified (false positives)
    const incorreclyIdentified = selectedOptions.filter((id) =>
      incorrectOptions.includes(id)
    );

    // Calculate missed clues (false negatives)
    const missedClues = correctOptions.filter(
      (id) => !selectedOptions.includes(id)
    );

    // Calculate points using consistent system:
    // - Each correct identification: +10 points
    // - Each incorrect selection: -5 points
    let earnedPoints = correctlyIdentified.length * 10;
    earnedPoints -= incorreclyIdentified.length * 5;

    // Ensure earned points is never negative
    earnedPoints = Math.max(0, earnedPoints);

    // Maximum possible points is 10 points per correct option
    const maxPoints = correctOptions.length * 10;

    // Calculate percentage score
    const score =
      maxPoints > 0
        ? Math.min(100, Math.round((earnedPoints / maxPoints) * 100))
        : 0;

    setSubmitted(true);

    onAnswer({
      score,
      details: {
        correctlySelected: correctlyIdentified,
        incorrectlySelected: incorreclyIdentified,
        missedClues: missedClues,
        correctOptions: correctOptions,
        earnedPoints: earnedPoints,
        maxPoints: maxPoints,
      },
    });
  };

  return (
    <div className="vishing-container">
      <h3 className="question-text">{question.question}</h3>

      <div className="call-transcript">
        <div className="call-header">
          <FontAwesomeIcon icon={faPhone} className="call-icon" />
          <span className="call-title">Call Transcript</span>
        </div>

        <div className="transcript-content">
          {question.callTranscript.split("\n").map((exchange, idx) => (
            <div key={idx} className="dialog-exchange">
              {exchange}
            </div>
          ))}
        </div>
      </div>

      <div className="vishing-options">
        <h4 className="options-title">
          Select all suspicious elements in this call (choose carefully):
        </h4>

        <div className="options-grid">
          {question.options.map((option) => (
            <div
              key={option.id}
              className={`vishing-option ${
                selectedOptions.includes(option.id) ? "selected" : ""
              } 
                          ${submitted && option.isCorrect ? "correct" : ""} 
                          ${
                            submitted &&
                            !option.isCorrect &&
                            selectedOptions.includes(option.id)
                              ? "incorrect"
                              : ""
                          }`}
              onClick={() => toggleOption(option.id)}
            >
              <div className="option-header">
                <div className="option-checkbox">
                  {selectedOptions.includes(option.id) && (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                </div>
                <div className="option-text">{option.text}</div>
              </div>

              {/* Only show results after submission */}
              {submitted && (
                <div className="option-footer">
                  {option.isCorrect && selectedOptions.includes(option.id) && (
                    <div className="option-points">+10 points</div>
                  )}

                  {option.isCorrect && !selectedOptions.includes(option.id) && (
                    <div className="option-missed">Missed</div>
                  )}

                  {!option.isCorrect && selectedOptions.includes(option.id) && (
                    <div className="option-incorrect">-5 points</div>
                  )}

                  {option.explanation && (
                    <div className="option-explanation">
                      {option.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {!submitted ? (
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={selectedOptions.length === 0}
        >
          Submit Analysis
        </button>
      ) : (
        <div className="explanation-box">
          <h4>Explanation:</h4>
          <p>{question.explanation}</p>
        </div>
      )}

      <style jsx>{`
        .vishing-container {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .call-transcript {
          background-color: #2c3e50;
          border-radius: 8px;
          overflow: hidden;
          margin: 1.5rem 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .call-header {
          background-color: #34495e;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .call-icon {
          color: #3498db;
        }

        .call-title {
          font-weight: bold;
          color: #ecf0f1;
        }

        .transcript-content {
          padding: 16px;
          color: #ecf0f1;
          white-space: pre-wrap;
          max-height: 300px;
          overflow-y: auto;
        }

        .dialog-exchange {
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          line-height: 1.5;
        }

        .dialog-exchange:last-child {
          border-bottom: none;
        }

        .vishing-options {
          margin-top: 24px;
        }

        .options-title {
          color: #ffffff;
          margin-bottom: 16px;
        }

        /* Fixed grid layout with explicit sizing */
        .options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr); /* Always 2 columns */
          gap: 16px;
        }

        .vishing-option {
          display: flex;
          flex-direction: column;
          padding: 16px;
          background-color: #2c3e50;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          min-height: 100px; /* Minimum height to avoid squishing */
          position: relative;
          border: 2px solid transparent;
        }

        .vishing-option:hover {
          background-color: #34495e;
          transform: translateY(-2px);
        }

        .vishing-option.selected {
          background-color: rgba(52, 152, 219, 0.2);
          border-color: #3498db;
        }

        .vishing-option.correct {
          background-color: rgba(46, 204, 113, 0.2);
          border-color: #2ecc71;
        }

        .vishing-option.incorrect {
          background-color: rgba(231, 76, 60, 0.2);
          border-color: #e74c3c;
        }

        .option-header {
          display: flex;
          margin-bottom: 12px;
          align-items: flex-start;
        }

        .option-checkbox {
          width: 24px;
          height: 24px;
          border: 2px solid #7f8c8d;
          border-radius: 4px;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .selected .option-checkbox {
          border-color: #3498db;
          background-color: #3498db;
          color: white;
        }

        .correct .option-checkbox {
          border-color: #2ecc71;
          background-color: #2ecc71;
        }

        .incorrect .option-checkbox {
          border-color: #e74c3c;
          background-color: #e74c3c;
        }

        .option-text {
          color: #ecf0f1;
          flex: 1;
        }

        .option-footer {
          margin-top: auto;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 12px;
        }

        .option-points {
          background-color: #2ecc71;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.85rem;
          display: inline-block;
        }

        .option-missed {
          background-color: #f39c12;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.85rem;
          display: inline-block;
        }

        .option-incorrect {
          background-color: #e74c3c;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.85rem;
          display: inline-block;
        }

        .option-explanation {
          margin-top: 8px;
          font-size: 0.9rem;
          color: #bdc3c7;
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
          width: 100%;
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

        /* Media query for smaller screens */
        @media (max-width: 768px) {
          .options-grid {
            grid-template-columns: 1fr; /* Switch to single column on mobile */
          }
        }
      `}</style>
    </div>
  );
};

export default VishingQuestion;
