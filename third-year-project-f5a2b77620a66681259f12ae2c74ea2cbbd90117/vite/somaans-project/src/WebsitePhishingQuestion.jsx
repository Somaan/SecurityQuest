import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faQuestionCircle,
  faMousePointer,
  faExclamationTriangle,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Improved WebsitePhishingQuestion component with better selection mechanism
 * @param {Object} question - The question data
 * @param {Function} onAnswer - Callback when answer is submitted
 */
const WebsitePhishingQuestion = ({ question, onAnswer }) => {
  const [selectedElements, setSelectedElements] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState(null);

  const imageRef = useRef(null);

  // Toggle selection of an element
  const toggleElement = (elementId, event) => {
    if (showExplanation) return; // Prevent changes after submission

    // Stop event propagation to prevent parent elements from being clicked
    if (event) {
      event.stopPropagation();
    }

    if (selectedElements.includes(elementId)) {
      setSelectedElements(selectedElements.filter((id) => id !== elementId));
    } else {
      setSelectedElements([...selectedElements, elementId]);
    }
  };

  // Handle mouse movement over image
  const handleMouseMove = (e) => {
    if (showExplanation) return;

    // Get cursor position relative to the image
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Find element under cursor (if any)
    const element = findElementAtPosition(x, y);

    if (element) {
      // Update tooltip content and position
      setTooltipContent(element.description);
      setTooltipPosition({
        x: e.clientX - rect.left + 15,
        y: e.clientY - rect.top - 15,
      });
      setShowTooltip(true);
      setHoveredElement(element.id);
    } else {
      setShowTooltip(false);
      setHoveredElement(null);
    }
  };

  // Find which element (if any) is at the given position
  // Modified to handle z-index properly by checking smallest elements first
  const findElementAtPosition = (x, y) => {
    // Sort elements by size (smallest area first) to handle overlapping elements
    const sortedElements = [...question.suspiciousElements].sort((a, b) => {
      const areaA = a.coordinates.width * a.coordinates.height;
      const areaB = b.coordinates.width * b.coordinates.height;
      return areaA - areaB; // Smaller elements should be checked first
    });

    // Find the smallest element that contains the point
    return sortedElements.find((element) => {
      const { top, left, width, height } = element.coordinates;
      return x >= left && x <= left + width && y >= top && y <= top + height;
    });
  };

  // Highlight an element when hovering over it
  const handleElementMouseEnter = (element) => {
    if (showExplanation) return;
    setHoveredElement(element.id);
    setTooltipContent(element.description);
    setShowTooltip(true);
  };

  // Clear highlighted element
  const handleElementMouseLeave = () => {
    setHoveredElement(null);
    setShowTooltip(false);
  };

  // Handle mouse leaving the image
  const handleMouseLeave = () => {
    setShowTooltip(false);
    setHoveredElement(null);
  };

  // Handle submission of answer
  const handleSubmit = () => {
    // Get all correct elements
    const correctElements = question.suspiciousElements
      .filter((element) => element.isCorrect !== false)
      .map((el) => el.id);

    // Calculate metrics
    const truePositives = selectedElements.filter((id) =>
      correctElements.includes(id)
    );
    const falsePositives = selectedElements.filter(
      (id) => !correctElements.includes(id)
    );
    const falseNegatives = correctElements.filter(
      (id) => !selectedElements.includes(id)
    );

    // Calculate score - using consistent 10 points per correct element, -5 for incorrect
    let earnedPoints = 0;
    let maxPoints = 0;

    // Each correctly identified element earns 10 points
    earnedPoints += truePositives.length * 10;

    // Each incorrectly identified element (false positive) deducts 5 points
    earnedPoints -= falsePositives.length * 5;

    // Ensure earned points is never negative
    earnedPoints = Math.max(0, earnedPoints);

    // Total possible points is 10 points per correct element
    maxPoints = correctElements.length * 10;

    // Calculate percentage score
    const score =
      maxPoints > 0
        ? Math.min(100, Math.round((earnedPoints / maxPoints) * 100))
        : 0;

    setShowExplanation(true);

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

  // Helper function to render the selection overlays
  const renderSelectionOverlays = () => {
    // Process question.suspiciousElements to fix the overlapping issue
    // Adjust coordinates for 'poor layout' to not cover other elements
    const adjustedElements = question.suspiciousElements.map((element) => {
      // If this is the "poor layout" element (large, contains others)
      if (element.id === "webElement5") {
        // Create a modified copy of the element with adjusted coordinates
        return {
          ...element,
          renderedCoordinates: {
            // Make it a border around the page that doesn't cover other elements
            top: 10, // Keep top the same
            left: 10, // Keep left the same
            width: 80, // Keep width the same
            height: 10, // Make it just a thin strip at the top
          },
        };
      }
      // For all other elements, use their original coordinates
      return {
        ...element,
        renderedCoordinates: { ...element.coordinates },
      };
    });

    return adjustedElements.map((element) => {
      const { top, left, width, height } =
        element.renderedCoordinates || element.coordinates;

      // Determine overlay styling classes
      const isSelected = selectedElements.includes(element.id);
      const isHovered = hoveredElement === element.id;
      const isMissed =
        showExplanation &&
        element.isCorrect !== false &&
        !selectedElements.includes(element.id);
      const isIncorrect =
        showExplanation &&
        element.isCorrect === false &&
        selectedElements.includes(element.id);

      return (
        <div
          key={element.id}
          className={`selection-overlay 
            ${isSelected ? "selected" : ""} 
            ${isHovered ? "hovered" : ""} 
            ${isMissed ? "missed" : ""} 
            ${isIncorrect ? "incorrect" : ""}`}
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${width}%`,
            height: `${height}%`,
            // Add a higher z-index for smaller elements to ensure they're clickable
            zIndex: element.id === "webElement5" ? 1 : 2,
          }}
          onClick={(e) => toggleElement(element.id, e)}
          onMouseEnter={() => handleElementMouseEnter(element)}
          onMouseLeave={handleElementMouseLeave}
        >
          {isSelected && (
            <span className="selection-indicator">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </span>
          )}
          {showExplanation && !isSelected && element.isCorrect !== false && (
            <span className="missed-indicator">
              <FontAwesomeIcon icon={faTimes} />
            </span>
          )}
        </div>
      );
    });
  };

  // Helper function to get element details by ID
  const getElementById = (id) => {
    return question.suspiciousElements.find((element) => element.id === id);
  };

  return (
    <div className="website-phishing-container">
      <h3 className="question-text">{question.question}</h3>

      {/* Help button with tooltip */}
      <div className="help-container">
        <button className="help-button" title="Click for help">
          <FontAwesomeIcon icon={faQuestionCircle} />
          <span className="help-text">Help</span>
        </button>
        <div className="help-tooltip">
          <p>Common website phishing signs include:</p>
          <ul>
            <li>Suspicious URLs (not matching the official domain)</li>
            <li>Missing HTTPS security</li>
            <li>Misspelled brand names or logos</li>
            <li>Requests for excessive personal information</li>
            <li>Poor design quality compared to the real site</li>
            <li>Browser security warnings</li>
          </ul>
        </div>
      </div>

      <div className="selection-instruction">
        <FontAwesomeIcon icon={faInfoCircle} />
        <span>
          Click on suspicious elements in the website and identify potential
          phishing signs. Look carefully at the URL, security indicators, and
          form fields.
        </span>
      </div>

      {/* Website image container */}
      <div className="website-preview">
        <div className="website-browser-chrome">
          <div className="browser-controls">
            <div className="browser-buttons">
              <span className="browser-button red"></span>
              <span className="browser-button yellow"></span>
              <span className="browser-button green"></span>
            </div>
            <div className="browser-address-bar">
              <span className="security-indicator">
                <FontAwesomeIcon icon={faUnlock} className="unsecure-icon" />
              </span>
              <span className="url-text">bank-secure-login.com/signin</span>
            </div>
            <div className="browser-menu">
              <span className="menu-dot"></span>
              <span className="menu-dot"></span>
              <span className="menu-dot"></span>
            </div>
          </div>

          <div
            className="website-image-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              ref={imageRef}
              src={question.websiteImage}
              alt="Suspicious website"
              className="website-image"
            />

            {/* Overlay for selection areas */}
            <div className="selection-overlays">
              {renderSelectionOverlays()}
            </div>

            {/* Tooltip */}
            {showTooltip && !showExplanation && (
              <div
                className="element-tooltip"
                style={{
                  top: `${tooltipPosition.y}px`,
                  left: `${tooltipPosition.x}px`,
                }}
              >
                {tooltipContent}
                <FontAwesomeIcon
                  icon={faMousePointer}
                  className="click-indicator"
                />
              </div>
            )}
          </div>
        </div>
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
              const element = getElementById(elementId);
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
                      <span className="points-earned">
                        +{element.points || 10} points
                      </span>
                    ) : (
                      <span className="points-deducted">-5 points</span>
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
                    <span className="points-earned">
                      +{element.points || 10} points
                    </span>
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
        .website-phishing-container {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .help-container {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
        }

        .help-button {
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
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
          top: 100%;
          right: 0;
          margin-top: 10px;
          width: 300px;
          background-color: #34495e;
          color: #ecf0f1;
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 10;
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

        .website-preview {
          margin: 1.5rem 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .website-browser-chrome {
          background-color: #f0f0f0;
          border-radius: 8px;
          overflow: hidden;
        }

        .browser-controls {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          background-color: #e0e0e0;
          border-bottom: 1px solid #ccc;
        }

        .browser-buttons {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-right: 12px;
        }

        .browser-button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .browser-button.red {
          background-color: #ff5f57;
        }
        .browser-button.yellow {
          background-color: #ffbd2e;
        }
        .browser-button.green {
          background-color: #28ca41;
        }

        .browser-address-bar {
          flex: 1;
          background-color: #fff;
          border-radius: 4px;
          padding: 6px 10px;
          font-size: 14px;
          color: #333;
          display: flex;
          align-items: center;
        }

        .security-indicator {
          margin-right: 8px;
          color: #e74c3c;
        }

        .unsecure-icon {
          font-size: 14px;
        }

        .url-text {
          font-family: monospace;
        }

        .browser-menu {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-left: 12px;
        }

        .menu-dot {
          width: 4px;
          height: 4px;
          background-color: #666;
          border-radius: 50%;
        }

        .website-image-container {
          position: relative;
          width: 100%;
        }

        .website-image {
          width: 100%;
          display: block;
        }

        .selection-overlays {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .selection-overlay {
          position: absolute;
          cursor: pointer;
          border: 2px dashed transparent;
          border-radius: 4px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
        }

        .selection-overlay:hover {
          border-color: rgba(52, 152, 219, 0.5);
          background-color: rgba(52, 152, 219, 0.1);
        }

        .selection-overlay.hovered {
          border-color: rgba(52, 152, 219, 0.7);
          background-color: rgba(52, 152, 219, 0.2);
        }

        .selection-overlay.selected {
          border-color: rgba(231, 76, 60, 0.8);
          background-color: rgba(231, 76, 60, 0.2);
        }

        .selection-overlay.missed {
          border-color: rgba(243, 156, 18, 0.8);
          background-color: rgba(243, 156, 18, 0.2);
        }

        .selection-overlay.incorrect {
          border-color: rgba(231, 76, 60, 0.8);
          background-color: rgba(231, 76, 60, 0.2);
        }

        .selection-indicator,
        .missed-indicator {
          background-color: rgba(0, 0, 0, 0.7);
          color: #ffffff;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }

        .selection-indicator {
          color: #e74c3c;
        }

        .missed-indicator {
          color: #f39c12;
        }

        .element-tooltip {
          position: absolute;
          background-color: rgba(0, 0, 0, 0.8);
          color: #ffffff;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 0.9rem;
          max-width: 250px;
          z-index: 5;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .click-indicator {
          color: #3498db;
          font-size: 0.8rem;
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
          gap: 1rem;
        }

        .selected-item.correct {
          border-left: 3px solid #2ecc71;
        }

        .selected-item.incorrect {
          border-left: 3px solid #e74c3c;
        }

        .no-selections {
          color: #95a5a6;
          font-style: italic;
          text-align: center;
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
          white-space: nowrap;
        }

        .points-deducted {
          margin-left: auto;
          background-color: #e74c3c;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.85rem;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .website-phishing-container {
            padding: 1rem;
          }

          .help-container {
            top: 1rem;
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

          .browser-controls {
            padding: 6px 8px;
          }

          .browser-address-bar {
            padding: 4px 8px;
            font-size: 12px;
          }

          .selection-overlay {
            border-width: 3px; /* Larger border for touch devices */
          }
        }
      `}</style>
    </div>
  );
};

export default WebsitePhishingQuestion;
