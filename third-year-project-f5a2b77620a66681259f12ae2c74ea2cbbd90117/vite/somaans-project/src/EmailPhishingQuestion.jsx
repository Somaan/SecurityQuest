import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faExclamationTriangle,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

const EmailPhishingQuestion = ({ question, onAnswer }) => {
  const [selectedElements, setSelectedElements] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  const emailRef = useRef(null);

  // Toggle selection of an element
  const toggleElement = (elementId) => {
    if (showExplanation) return; // Prevent changes after submission

    if (selectedElements.includes(elementId)) {
      setSelectedElements(selectedElements.filter((id) => id !== elementId));
    } else {
      setSelectedElements([...selectedElements, elementId]);
    }
  };

  // Show tooltip when hovering over elements
  const handleMouseMove = (e) => {
    if (showExplanation) return;

    // Find if mouse is over any suspicious element
    const elements = question.suspiciousElements;

    // Hide tooltip when not over any suspicious element
    setTooltipData(null);

    // Check each element if it contains the current mouse position
    elements.forEach((element) => {
      if (e.target.dataset.elementId === element.id) {
        setTooltipData({
          id: element.id,
          content: element.hint || element.description,
          x: e.clientX + 10,
          y: e.clientY - 30,
        });
      }
    });
  };

  // Handle answer submission
  const handleSubmit = () => {
    // Get correct elements (those not explicitly marked as false)
    const correctElements = question.suspiciousElements
      .filter((element) => element.isCorrect !== false)
      .map((el) => el.id);

    // Get incorrect elements (those explicitly marked as false)
    const incorrectElements = question.suspiciousElements
      .filter((element) => element.isCorrect === false)
      .map((el) => el.id);

    // Calculate metrics
    const truePositives = selectedElements.filter((id) =>
      correctElements.includes(id)
    );
    const falsePositives = selectedElements.filter((id) =>
      incorrectElements.includes(id)
    );
    const falseNegatives = correctElements.filter(
      (id) => !selectedElements.includes(id)
    );

    // Calculate points
    const earnedPoints = Math.max(
      0,
      truePositives.length * 10 - falsePositives.length * 5
    );
    const maxPoints = correctElements.length * 10;

    // Calculate percentage score
    const score =
      maxPoints > 0
        ? Math.min(100, Math.round((earnedPoints / maxPoints) * 100))
        : 0;

    setShowExplanation(true);
    setTooltipData(null);

    onAnswer({
      score,
      details: {
        truePositives,
        falsePositives,
        falseNegatives,
        earnedPoints,
        maxPoints,
      },
    });
  };

  // Render email content with selectable elements
  const renderEmail = () => {
    const { emailContent } = question;

    // Create a map of suspicious elements for easier lookup
    const elementMap = {};
    question.suspiciousElements.forEach((element) => {
      elementMap[element.id] = element;
    });

    // Helper function to mark selectable email parts
    const markSelectable = (content, elementId) => {
      const element = elementMap[elementId];
      const isSelected = selectedElements.includes(elementId);
      const showMissed =
        showExplanation && element.isCorrect !== false && !isSelected;
      const showIncorrect =
        showExplanation && element.isCorrect === false && isSelected;

      return (
        <span
          key={elementId}
          data-element-id={elementId}
          className={`selectable-element
            ${isSelected ? "selected-element" : ""}
            ${showMissed ? "missed-element" : ""}
            ${showIncorrect ? "incorrect-element" : ""}
          `}
          onClick={() => toggleElement(elementId)}
        >
          {content}
          {isSelected && (
            <span className="selection-icon">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </span>
          )}
        </span>
      );
    };

    // Render email header fields (from, to, subject, date)
    const renderHeaderField = (label, value, elementId) => {
      return (
        <div className="email-field">
          <span className="field-label">{label}:</span>
          {elementId ? (
            markSelectable(value, elementId)
          ) : (
            <span className="field-value">{value}</span>
          )}
        </div>
      );
    };

    // Find which elements correspond to which email parts
    const findElementForField = (fieldName) => {
      return question.suspiciousElements.find(
        (element) =>
          element.field === fieldName.toLowerCase() ||
          (element.description &&
            element.description.toLowerCase().includes(fieldName.toLowerCase()))
      );
    };

    // Parse email body content
    const renderEmailBody = () => {
      // Split body into paragraphs
      const paragraphs = emailContent.body.split("\n\n");

      return paragraphs.map((paragraph, index) => {
        // Find any elements that match this paragraph
        const matchingElements = question.suspiciousElements.filter(
          (element) => element.content && paragraph.includes(element.content)
        );

        if (matchingElements.length === 0) {
          // Regular paragraph with no suspicious elements
          return (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
          );
        }

        // Use the first matching element
        const element = matchingElements[0];
        return <p key={index}>{markSelectable(paragraph, element.id)}</p>;
      });
    };

    // Find elements for email fields
    const fromElement = findElementForField("from");
    const subjectElement = findElementForField("subject");
    const linkElement = question.suspiciousElements.find(
      (element) =>
        element.description &&
        element.description.toLowerCase().includes("link")
    );

    return (
      <div
        className="email-container"
        ref={emailRef}
        onMouseMove={handleMouseMove}
      >
        <div className="email-header">
          {renderHeaderField("From", emailContent.from, fromElement?.id)}
          {renderHeaderField("To", emailContent.to)}
          {renderHeaderField(
            "Subject",
            emailContent.subject,
            subjectElement?.id
          )}
          {renderHeaderField("Date", emailContent.date)}
        </div>

        <div className="email-body">
          {renderEmailBody()}

          {/* Separately handle links if they're not in paragraphs */}
          {linkElement &&
            !emailContent.body.includes("Account Verification Portal") && (
              <div className="email-link-container">
                {markSelectable(
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Account Verification Portal
                  </a>,
                  linkElement.id
                )}
              </div>
            )}

          {/* Render signature if present */}
          {emailContent.signature && (
            <div className="email-signature">{emailContent.signature}</div>
          )}
        </div>

        {/* Tooltip */}
        {tooltipData && (
          <div
            className="element-tooltip"
            style={{
              left: `${tooltipData.x}px`,
              top: `${tooltipData.y}px`,
            }}
          >
            {tooltipData.content}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="email-phishing-question">
      <h3 className="question-title">{question.question}</h3>

      <div className="instruction-box">
        <FontAwesomeIcon icon={faInfoCircle} />
        <span>
          Click on suspicious elements in the email to identify potential
          phishing signs. Think critically - not everything unusual is
          suspicious!
        </span>
      </div>

      {/* Email viewer */}
      <div className="email-viewer">{renderEmail()}</div>

      {/* Selected elements summary */}
      <div className="selections-summary">
        <h4>
          Selected Suspicious Elements ({selectedElements.length})
          {showExplanation && (
            <span className="correct-count">
              {" - "}
              {
                selectedElements.filter((id) =>
                  question.suspiciousElements.find(
                    (e) => e.id === id && e.isCorrect !== false
                  )
                ).length
              }{" "}
              correct
            </span>
          )}
        </h4>

        {selectedElements.length > 0 ? (
          <ul className="selected-items-list">
            {selectedElements.map((elementId) => {
              const element = question.suspiciousElements.find(
                (e) => e.id === elementId
              );
              const isCorrect = element && element.isCorrect !== false;

              return (
                <li
                  key={elementId}
                  className={`selected-item ${
                    showExplanation ? (isCorrect ? "correct" : "incorrect") : ""
                  }`}
                >
                  {element ? element.description : "Unknown element"}
                  {showExplanation &&
                    (isCorrect ? (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="item-icon correct"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="item-icon incorrect"
                      />
                    ))}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="no-selections">No elements selected yet</p>
        )}
      </div>

      {/* Submit or show explanation */}
      {!showExplanation ? (
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={selectedElements.length === 0}
        >
          Submit Analysis
        </button>
      ) : (
        <div className="explanation-container">
          <h4>Explanation:</h4>
          <p>{question.explanation}</p>

          <h4>Suspicious Elements You Should Have Identified:</h4>
          <ul className="suspicious-elements-list">
            {question.suspiciousElements
              .filter((element) => element.isCorrect !== false)
              .map((element) => (
                <li
                  key={element.id}
                  className={
                    selectedElements.includes(element.id)
                      ? "correctly-identified"
                      : "missed"
                  }
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

          {/* Show false positives if any */}
          {question.suspiciousElements.filter(
            (element) =>
              element.isCorrect === false &&
              selectedElements.includes(element.id)
          ).length > 0 && (
            <>
              <h4>Not Actually Suspicious:</h4>
              <ul className="false-positives-list">
                {question.suspiciousElements
                  .filter(
                    (element) =>
                      element.isCorrect === false &&
                      selectedElements.includes(element.id)
                  )
                  .map((element) => (
                    <li key={element.id} className="false-positive">
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="incorrect-icon"
                      />
                      <span>{element.description}</span>
                      <span className="points-deducted">-5 points</span>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      )}

      {/* Help button with tooltip */}
      <div className="help-container">
        <button className="help-button" title="Click for help">
          <FontAwesomeIcon icon={faQuestionCircle} />
          <span className="help-text">Help</span>
        </button>
        <div className="help-tooltip">
          <p>Common phishing signs include:</p>
          <ul>
            <li>Suspicious sender domains (not matching the company)</li>
            <li>Urgency or threatening language</li>
            <li>Suspicious links (hover to check URLs)</li>
            <li>Poor grammar or spelling mistakes</li>
            <li>Requests for personal information</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .email-phishing-question {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .question-title {
          color: #ffffff;
          margin-top: 0;
          margin-bottom: 1rem;
        }

        .instruction-box {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background-color: rgba(52, 152, 219, 0.1);
          border-radius: 8px;
          color: #e0e0e0;
        }

        .email-viewer {
          background-color: #f8f9fa;
          border-radius: 8px;
          overflow: hidden;
          margin: 1.5rem 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .email-container {
          position: relative;
          color: #333;
        }

        .email-header {
          background-color: #f1f3f5;
          padding: 1rem;
          border-bottom: 1px solid #dee2e6;
        }

        .email-field {
          margin-bottom: 0.5rem;
          display: flex;
          align-items: flex-start;
        }

        .email-field:last-child {
          margin-bottom: 0;
        }

        .field-label {
          font-weight: bold;
          width: 60px;
          margin-right: 0.5rem;
        }

        .field-value {
          flex: 1;
        }

        .email-body {
          padding: 1.25rem;
          line-height: 1.5;
        }

        .email-body p {
          margin-bottom: 1rem;
        }

        .email-signature {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #dee2e6;
          color: #6c757d;
          font-size: 0.9em;
        }

        .email-link-container {
          margin: 1rem 0;
        }

        .email-link-container a {
          color: #0d6efd;
          text-decoration: underline;
        }

        /* Selectable elements */
        .selectable-element {
          cursor: pointer;
          position: relative;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .selectable-element:hover {
          background-color: rgba(52, 152, 219, 0.1);
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.4);
        }

        .selected-element {
          background-color: rgba(231, 76, 60, 0.1);
          box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.4);
        }

        .missed-element {
          background-color: rgba(243, 156, 18, 0.1);
          box-shadow: 0 0 0 2px rgba(243, 156, 18, 0.4);
        }

        .incorrect-element {
          background-color: rgba(231, 76, 60, 0.1);
          box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.4);
        }

        .selection-icon {
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: #e74c3c;
          color: white;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
        }

        /* Tooltip */
        .element-tooltip {
          position: fixed;
          background-color: #343a40;
          color: #fff;
          padding: 0.5rem 0.75rem;
          border-radius: 4px;
          font-size: 0.875rem;
          max-width: 250px;
          z-index: 1000;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          pointer-events: none;
          transform: translate(0, -100%);
        }

        /* Selections summary */
        .selections-summary {
          background-color: #212529;
          border-radius: 8px;
          padding: 1rem;
          margin: 1.5rem 0;
        }

        .selections-summary h4 {
          color: #f8f9fa;
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .correct-count {
          color: #2ecc71;
          font-weight: normal;
        }

        .selected-items-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .selected-item {
          background-color: #2c3e50;
          padding: 0.5rem 0.75rem;
          margin-bottom: 0.5rem;
          border-radius: 4px;
          color: #ecf0f1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .selected-item.correct {
          border-left: 3px solid #2ecc71;
        }

        .selected-item.incorrect {
          border-left: 3px solid #e74c3c;
        }

        .item-icon {
          margin-left: 0.5rem;
          flex-shrink: 0;
        }

        .item-icon.correct {
          color: #2ecc71;
        }

        .item-icon.incorrect {
          color: #e74c3c;
        }

        .no-selections {
          color: #adb5bd;
          font-style: italic;
          text-align: center;
        }

        /* Submit button */
        .submit-btn {
          background-color: #3498db;
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          border: none;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s ease;
          width: 100%;
        }

        .submit-btn:hover {
          background-color: #2980b9;
        }

        .submit-btn:disabled {
          background-color: #adb5bd;
          cursor: not-allowed;
        }

        /* Explanation */
        .explanation-container {
          margin-top: 1.5rem;
          padding: 1rem;
          background-color: #2c3e50;
          border-radius: 8px;
          color: #ecf0f1;
        }

        .explanation-container h4 {
          margin-top: 0;
          margin-bottom: 0.75rem;
          color: #3498db;
        }

        .explanation-container p {
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .suspicious-elements-list,
        .false-positives-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem 0;
        }

        .suspicious-elements-list li,
        .false-positives-list li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0;
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

        .missed-icon,
        .incorrect-icon {
          color: #e74c3c;
          flex-shrink: 0;
        }

        .points-earned {
          margin-left: auto;
          background-color: #2ecc71;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
        }

        .points-deducted {
          margin-left: auto;
          background-color: #e74c3c;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
        }

        /* Help button */
        .help-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 100;
        }

        .help-button {
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 50%;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .help-text {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        .help-tooltip {
          position: absolute;
          bottom: 110%;
          right: 0;
          width: 300px;
          background-color: #343a40;
          color: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        .help-tooltip p {
          margin-top: 0;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        .help-tooltip ul {
          margin: 0;
          padding-left: 1.5rem;
        }

        .help-tooltip li {
          margin-bottom: 0.25rem;
        }

        .help-container:hover .help-tooltip {
          opacity: 1;
          pointer-events: auto;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .help-tooltip {
            width: 250px;
            right: -100px;
          }

          .help-tooltip::after {
            right: 110px;
            left: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default EmailPhishingQuestion;
