import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faCheck,
  faTimes,
  faInfoCircle,
  faExclamationTriangle,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

const EmailPhishingQuestion = ({ question, onAnswer }) => {
  const [selectedElements, setSelectedElements] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [highlightedElement, setHighlightedElement] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState("");
  // Track which types of suspicious elements have been selected to prevent redundant selections
  const [selectedTypes, setSelectedTypes] = useState({});

  const emailBodyRef = useRef(null);

  // Reset tooltip when no element is highlighted
  useEffect(() => {
    if (!highlightedElement) {
      setShowTooltip(false);
    }
  }, [highlightedElement]);

  const toggleElement = (elementId) => {
    if (showExplanation) return; // Prevent changes after submission

    const element = question.suspiciousElements.find((e) => e.id === elementId);
    if (!element) return;

    // If this element is already selected, unselect it
    if (selectedElements.includes(elementId)) {
      setSelectedElements(selectedElements.filter((id) => id !== elementId));

      // Also update the selectedTypes object
      if (element.type) {
        setSelectedTypes((prev) => ({
          ...prev,
          [element.type]: false,
        }));
      }
      return;
    }

    // If this type has already been selected and we're enforcing unique type selection
    if (
      element.type &&
      selectedTypes[element.type] &&
      question.uniqueTypeSelection
    ) {
      return; // Don't allow selection of this type again
    }

    // Otherwise, select this element
    setSelectedElements([...selectedElements, elementId]);

    // Update selectedTypes if the element has a type
    if (element.type) {
      setSelectedTypes((prev) => ({
        ...prev,
        [element.type]: true,
      }));
    }
  };

  const handleElementMouseEnter = (element) => {
    if (showExplanation) return;

    setHighlightedElement(element.id);
    setTooltipContent(element.hint || element.description);
    setShowTooltip(true);
  };

  const handleElementMouseLeave = () => {
    setHighlightedElement(null);
  };

  const handleMouseMove = (e) => {
    if (showTooltip) {
      // Position tooltip near cursor but avoid edges
      const rect = emailBodyRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left + 10; // 10px offset from cursor
      const y = e.clientY - rect.top - 30; // 30px above cursor

      setTooltipPosition({ x, y });
    }
  };

  const handleSubmit = () => {
    // Check if the question has any elements explicitly marked as not suspicious
    const hasExplicitDecoys = question.suspiciousElements.some(
      (element) => element.isCorrect === false
    );

    // Get correct elements based on whether explicit marking exists
    const correctElements = hasExplicitDecoys
      ? question.suspiciousElements
          .filter((element) => element.isCorrect !== false)
          .map((el) => el.id)
      : question.suspiciousElements.map((el) => el.id); // If no explicit marking, assume all are correct

    // Get decoy elements (incorrect options)
    const decoyElements = question.suspiciousElements
      .filter((element) => element.isCorrect === false)
      .map((el) => el.id);

    // Calculate metrics
    const truePositives = selectedElements.filter((id) =>
      correctElements.includes(id)
    );
    const falsePositives = selectedElements.filter((id) =>
      decoyElements.includes(id)
    );
    const falseNegatives = correctElements.filter(
      (id) => !selectedElements.includes(id)
    );

    // Calculate score
    // Each true positive is worth 10 points
    const truePositivePoints = truePositives.length * 10;
    // Each false positive results in a 5 point deduction
    const falsePositiveDeduction = falsePositives.length * 5;

    // Calculate earned points (ensuring it's never negative)
    const earnedPoints = Math.max(
      0,
      truePositivePoints - falsePositiveDeduction
    );
    // Total possible points is 10 points per correct element
    const maxPoints = correctElements.length * 10;

    // Calculate percentage score
    const score =
      maxPoints > 0
        ? Math.min(100, Math.round((earnedPoints / maxPoints) * 100))
        : 0;

    setShowExplanation(true);
    setShowTooltip(false);

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

  // Helper function to determine if an element should be selectable based on uniqueness rules
  const isElementSelectable = (element) => {
    // If we're not enforcing unique type selection, all elements are selectable
    if (!question.uniqueTypeSelection) return true;

    // If this element is already selected, it's selectable (for unselecting)
    if (selectedElements.includes(element.id)) return true;

    // If this element type is already selected, it's not selectable
    if (element.type && selectedTypes[element.type]) return false;

    // Otherwise, it's selectable
    return true;
  };

  // Render email sections (sender, subject, etc.) with clickable areas
  const renderEmailField = (fieldName, fieldValue) => {
    // Find if any suspicious elements are in this field
    const suspiciousElementsInField = question.suspiciousElements.filter(
      (element) => {
        const fieldLabel = fieldName.toLowerCase();
        const description = element.description.toLowerCase();

        // If uniqueTypeSelection is enabled and this type is already selected, skip
        if (!isElementSelectable(element)) return false;

        return (
          (element.field && element.field.toLowerCase() === fieldLabel) ||
          description.includes(fieldLabel) ||
          (description.includes("email address") && fieldLabel === "from") ||
          (description.includes("subject line") && fieldLabel === "subject")
        );
      }
    );

    if (suspiciousElementsInField.length > 0) {
      // This field has suspicious elements, make it selectable
      return (
        <div className="email-field">
          <span className="email-label">{fieldName}:</span>
          {suspiciousElementsInField.map((element) => (
            <span
              key={element.id}
              className={`email-value selectable-element 
                ${
                  selectedElements.includes(element.id)
                    ? "selected-element"
                    : ""
                }
                ${
                  highlightedElement === element.id ? "highlighted-element" : ""
                }
                ${
                  showExplanation &&
                  element.isCorrect !== false &&
                  !selectedElements.includes(element.id)
                    ? "missed-element"
                    : ""
                } 
                ${
                  showExplanation &&
                  element.isCorrect === false &&
                  selectedElements.includes(element.id)
                    ? "incorrect-element"
                    : ""
                }`}
              onClick={() => toggleElement(element.id)}
              onMouseEnter={() => handleElementMouseEnter(element)}
              onMouseLeave={handleElementMouseLeave}
            >
              {fieldValue}
              {selectedElements.includes(element.id) && (
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="selection-icon"
                />
              )}
            </span>
          ))}
        </div>
      );
    }

    // No suspicious elements in this field, render normally
    return (
      <div className="email-field">
        <span className="email-label">{fieldName}:</span>
        <span className="email-value">{fieldValue}</span>
      </div>
    );
  };

  // Break email body into paragraphs and make appropriate sections clickable
  const renderEmailBody = () => {
    // Parse email body into paragraphs
    const paragraphs = question.emailContent.body.split("\n\n");

    return (
      <div
        className="email-body"
        ref={emailBodyRef}
        onMouseMove={handleMouseMove}
      >
        {paragraphs.map((paragraph, paraIndex) => {
          // Find ALL suspicious elements that match this paragraph
          const matchingElements = question.suspiciousElements.filter(
            (element) => element.content && paragraph.includes(element.content)
          );

          // If no suspicious elements for this paragraph, render it normally
          if (matchingElements.length === 0) {
            return (
              <p
                key={paraIndex}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            );
          }

          // Render paragraph ONCE with all matching elements data combined
          // This prevents duplicate paragraphs but allows all elements to be detected
          const combinedElementsData = {
            id: `para-${paraIndex}`,
            elementIds: matchingElements.map((el) => el.id),
            hints: matchingElements.map((el) => el.hint || el.description),
            selectedCount: matchingElements.filter((el) =>
              selectedElements.includes(el.id)
            ).length,
            isHighlighted: matchingElements.some(
              (el) => highlightedElement === el.id
            ),
            isMissed:
              showExplanation &&
              matchingElements.some(
                (el) =>
                  el.isCorrect !== false && !selectedElements.includes(el.id)
              ),
            isIncorrect:
              showExplanation &&
              matchingElements.some(
                (el) =>
                  el.isCorrect === false && selectedElements.includes(el.id)
              ),
          };

          // Create a clickable element that allows selection of any matching element
          return (
            <p
              key={`para-${paraIndex}`}
              className={`selectable-element 
                ${
                  combinedElementsData.selectedCount > 0
                    ? "selected-element"
                    : ""
                } 
                ${
                  combinedElementsData.isHighlighted
                    ? "highlighted-element"
                    : ""
                }
                ${combinedElementsData.isMissed ? "missed-element" : ""} 
                ${combinedElementsData.isIncorrect ? "incorrect-element" : ""}`}
              onClick={() => {
                // When clicking, choose the first non-selected element to select
                // Or if all are selected, then unselect the first one
                const firstNonSelected = matchingElements.find(
                  (el) => !selectedElements.includes(el.id)
                );
                if (firstNonSelected) {
                  toggleElement(firstNonSelected.id);
                } else if (matchingElements.length > 0) {
                  toggleElement(matchingElements[0].id);
                }
              }}
              onMouseEnter={() => {
                // When hovering, show tooltip for the first matching element
                if (matchingElements.length > 0) {
                  handleElementMouseEnter(matchingElements[0]);
                }
              }}
              onMouseLeave={handleElementMouseLeave}
            >
              {paragraph}
              {combinedElementsData.selectedCount > 0 && (
                <span className="selection-indicator">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="selection-icon"
                  />
                </span>
              )}
            </p>
          );
        })}

        {/* Only render the link separately if it's NOT already contained in a paragraph */}
        {question.emailContent.body.includes("Account Verification Portal") &&
          !paragraphs.some((p) =>
            p.includes("Account Verification Portal")
          ) && (
            <div
              className={`email-link selectable-element
              ${selectedElements.includes("element3") ? "selected-element" : ""}
              ${highlightedElement === "element3" ? "highlighted-element" : ""}
              ${
                showExplanation && !selectedElements.includes("element3")
                  ? "missed-element"
                  : ""
              }`}
              onClick={() => toggleElement("element3")}
              onMouseEnter={() =>
                handleElementMouseEnter(
                  question.suspiciousElements.find((e) => e.id === "element3")
                )
              }
              onMouseLeave={handleElementMouseLeave}
            >
              <a href="#" onClick={(e) => e.preventDefault()}>
                Account Verification Portal
              </a>
              {selectedElements.includes("element3") && (
                <span className="selection-indicator">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="selection-icon"
                  />
                </span>
              )}
            </div>
          )}

        {question.emailContent.signature && (
          <div className="email-signature">
            {question.emailContent.signature}
          </div>
        )}

        {/* Tooltip */}
        {showTooltip && (
          <div
            className="element-tooltip"
            style={{
              top: `${tooltipPosition.y}px`,
              left: `${tooltipPosition.x}px`,
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="email-phishing-container">
      <h3 className="question-text">{question.question}</h3>

      <div className="selection-instruction">
        <FontAwesomeIcon icon={faInfoCircle} />
        <span>
          Click on suspicious elements in the email to identify potential
          phishing signs. Think critically - not everything unusual is
          suspicious!
        </span>
      </div>

      {/* Help button with tooltip - Moved to a floating position */}
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

      {/* Email viewer */}
      <div className="email-viewer">
        <div className="email-header">
          {renderEmailField("From", question.emailContent.from)}
          {renderEmailField("To", question.emailContent.to)}
          {renderEmailField("Subject", question.emailContent.subject)}
          {renderEmailField("Date", question.emailContent.date)}
        </div>

        {renderEmailBody()}
      </div>

      {/* Selected elements summary */}
      <div className="selections-summary">
        <h4>
          Selected Suspicious Elements ({selectedElements.length})
          {showExplanation && (
            <span className="correct-count">
              -{" "}
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

      {/* Submit button */}
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
              .filter((element) => element.isCorrect !== false) // Only show genuinely suspicious elements
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

          {/* Only show false positives if the user selected any non-suspicious elements */}
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

      <style jsx>{`
        .email-phishing-container {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          position: relative;
        }

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
          position: relative;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .help-text {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        .help-tooltip {
          position: absolute;
          bottom: 110%;
          right: 0;
          margin-bottom: 10px;
          width: 300px;
          background-color: #34495e;
          color: #ecf0f1;
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 100;
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
          display: flex;
        }

        .email-label {
          font-weight: bold;
          margin-right: 8px;
          width: 60px;
          display: inline-block;
        }

        .email-value {
          flex: 1;
          word-break: break-word;
        }

        .selectable-element {
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 4px;
          transition: all 0.2s ease;
          position: relative;
          padding: 2px 4px;
          margin: -2px -4px;
        }

        .selectable-element:hover {
          border-color: rgba(52, 152, 219, 0.5);
          background-color: rgba(52, 152, 219, 0.1);
        }

        .selected-element {
          border-color: #e74c3c;
          background-color: rgba(231, 76, 60, 0.1);
        }

        .highlighted-element {
          border-color: #3498db;
          background-color: rgba(52, 152, 219, 0.2);
        }

        .missed-element {
          border-color: #f39c12;
          background-color: rgba(243, 156, 18, 0.1);
        }

        .incorrect-element {
          border-color: #e74c3c;
          background-color: rgba(231, 76, 60, 0.1);
        }

        .email-body {
          padding: 20px;
          position: relative;
          min-height: 200px;
          color: #333;
        }

        .email-body p {
          margin-bottom: 16px;
          line-height: 1.5;
          position: relative;
        }

        .email-link {
          margin: 16px 0;
          display: inline-block;
        }

        .email-link a {
          color: #3498db;
          text-decoration: underline;
        }

        .email-signature {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e0e0e0;
          color: #777;
          font-size: 0.9em;
        }

        .selection-indicator {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-left: 8px;
          color: #e74c3c;
        }

        .selection-icon {
          font-size: 0.9em;
        }

        .element-tooltip {
          position: absolute;
          background-color: #34495e;
          color: #ecf0f1;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 0.9rem;
          max-width: 250px;
          z-index: 5;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          pointer-events: none;
        }

        .element-tooltip::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 15px;
          border-width: 6px;
          border-style: solid;
          border-color: #34495e transparent transparent transparent;
        }

        .selections-summary {
          background-color: #242424;
          border-radius: 8px;
          padding: 1rem;
          margin: 1.5rem 0;
        }

        .selections-summary h4 {
          color: #ecf0f1;
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .correct-count {
          color: #2ecc71;
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
        }

        .item-icon.correct {
          color: #2ecc71;
        }

        .item-icon.incorrect {
          color: #e74c3c;
        }

        .no-selections {
          color: #95a5a6;
          font-style: italic;
          text-align: center;
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
          width: 100%;
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

        .missed-icon,
        .incorrect-icon {
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

        @media (max-width: 768px) {
          .email-phishing-container {
            padding: 1rem;
          }

          .selections-summary {
            padding: 0.75rem;
          }

          .help-container {
            bottom: 1rem;
            right: 1rem;
          }

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
