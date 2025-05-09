import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBook,
  faGraduationCap,
  faChalkboardTeacher,
  faArrowLeft,
  faTrophy,
  faChartLine,
  faShieldAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

/**
 * QuizDifficulty component with introductory text
 */
const QuizDifficulty = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username") || "User";
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  // Handle quiz selection
  const handleQuizSelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setTimeout(() => {
      navigate("/quiz/questions", { state: { difficulty } });
    }, 500);
  };

  return (
    <div className="quiz-page-container">
      <div className="quiz-content">
        <div className="quiz-header">
          <div className="intro-section">
            <FontAwesomeIcon icon={faShieldAlt} className="intro-icon" />
            <p className="intro-text">
              Test your skills on social-engineering threats by taking one of
              these quizzes
            </p>
          </div>
        </div>

        {/* Timer Information Notice */}
        <div className="timer-notice">
          <FontAwesomeIcon icon={faClock} className="timer-icon" />
          <p>
            Your quiz will be timed to measure your response efficiency. Take
            your time and answer carefully.
          </p>
        </div>

        <div className="quiz-options">
          {/* Beginner Quiz Option */}
          <div
            className={`quiz-option ${
              selectedDifficulty === "Beginner" ? "selected" : ""
            }`}
            onClick={() => handleQuizSelect("Beginner")}
          >
            <div className="quiz-option-content">
              <div className="quiz-option-title">
                <div className="quiz-icon-wrapper beginner">
                  <FontAwesomeIcon icon={faBook} className="quiz-icon" />
                </div>
                <h3>Beginner</h3>
              </div>
              <p className="quiz-description">
                This quiz will cover phishing concepts and fundamentals to
                protect yourself against the biggest threat in the cyberspace!
              </p>
            </div>
            <div className="quiz-arrow">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>

          {/* Intermediate Quiz Option */}
          <div
            className={`quiz-option ${
              selectedDifficulty === "Intermediate" ? "selected" : ""
            }`}
            onClick={() => handleQuizSelect("Intermediate")}
          >
            <div className="quiz-option-content">
              <div className="quiz-option-title">
                <div className="quiz-icon-wrapper intermediate">
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    className="quiz-icon"
                  />
                </div>
                <h3>Intermediate</h3>
              </div>
              <p className="quiz-description">
                This quiz will cover more advanced techniques used by Social
                Engineers. You will also be shown real-world exemplar scenarios
                where these attacks may come into place.
              </p>
            </div>
            <div className="quiz-arrow">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>

          {/* Advanced Quiz Option */}
          <div
            className={`quiz-option ${
              selectedDifficulty === "Advanced" ? "selected" : ""
            }`}
            onClick={() => handleQuizSelect("Advanced")}
          >
            <div className="quiz-option-content">
              <div className="quiz-option-title">
                <div className="quiz-icon-wrapper advanced">
                  <FontAwesomeIcon
                    icon={faChalkboardTeacher}
                    className="quiz-icon"
                  />
                </div>
                <h3>Advanced</h3>
              </div>
              <p className="quiz-description">
                In our Advanced quiz, it will combine what Beginner/Intermediate
                levels included, but with added Corporate examples and even more
                complex threats to identify from.
              </p>
            </div>
            <div className="quiz-arrow">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <p className="not-ready-text">
          Not ready for a quiz? Try these instead:
        </p>
        <div className="alternative-buttons">
          <button
            className="alt-button dashboard"
            onClick={() => navigate("/dashboard")}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Return to Dashboard
          </button>
          <button
            className="alt-button achievements"
            onClick={() => navigate("/achievements")}
          >
            <FontAwesomeIcon icon={faTrophy} />
            View Your Achievements
          </button>
          <button
            className="alt-button statistics"
            onClick={() => navigate("/statistics")}
          >
            <FontAwesomeIcon icon={faChartLine} />
            Check Your Statistics
          </button>
        </div>
      </div>

      <style jsx>{`
        /* Page container with vertically centered content */
        .quiz-page-container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          overflow-x: hidden;
          max-width: 100vw;
          box-sizing: border-box;
          padding: 0;
          position: relative;
        }

        /* Main content area with vertical centering */
        .quiz-content {
          width: 100%;
          max-width: 700px;
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 20px;
          box-sizing: border-box;
          /* This flex-grow and margin combination ensures vertical centering */
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Header section with white text */
        .quiz-header {
          margin-bottom: 20px;
          text-align: center;
          width: 100%;
        }

        /* Intro section styling */
        .intro-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 16px;
        }

        .intro-icon {
          font-size: 2rem;
          color: #ffffff;
          margin-bottom: 10px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .intro-text {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 500;
          margin: 0 0 5px 0;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          line-height: 1.4;
        }

        /* Timer Notice Styling */
        .timer-notice {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          background-color: rgba(231, 76, 60, 0.1);
          border-left: 3px solid #e74c3c;
          border-radius: 6px;
          margin-bottom: 25px;
          width: 95%;
          max-width: 650px;
        }

        .timer-icon {
          color: #e74c3c;
          font-size: 1.2rem;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .timer-notice p {
          color: #e0e0e0;
          font-size: 0.95rem;
          margin: 0;
        }

        .quiz-header h2 {
          color: #ffffff;
          font-size: 1.6rem;
          font-weight: 600;
          margin-top: 5px;
          margin-bottom: 10px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        /* Quiz options container with spacing */
        .quiz-options {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Individual quiz option card */
        .quiz-option {
          background-color: rgba(26, 26, 26, 0.95);
          border-radius: 16px;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          width: 100%;
          box-sizing: border-box;
        }

        .quiz-option:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
        }

        .quiz-option.selected {
          border-color: #646cff;
          background-color: rgba(26, 26, 26, 0.97);
          box-shadow: 0 6px 12px rgba(100, 108, 255, 0.4);
        }

        .quiz-option-content {
          flex: 1;
          min-width: 0; /* Prevents flex items from overflowing */
        }

        /* Quiz option title with icon */
        .quiz-option-title {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }

        .quiz-option-title h3 {
          font-size: 1.2rem;
          margin: 0;
          color: #ffffff;
          font-weight: 600;
        }

        /* Icon wrapper with circular background */
        .quiz-icon-wrapper {
          min-width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .quiz-icon-wrapper.beginner {
          background-color: rgba(52, 152, 219, 0.2);
          color: #3498db;
        }

        .quiz-icon-wrapper.intermediate {
          background-color: rgba(46, 204, 113, 0.2);
          color: #2ecc71;
        }

        .quiz-icon-wrapper.advanced {
          background-color: rgba(231, 76, 60, 0.2);
          color: #e74c3c;
        }

        .quiz-icon {
          font-size: 1.2rem;
        }

        /* Quiz description with text wrapping */
        .quiz-description {
          color: #e0e0e0;
          font-size: 0.9rem;
          line-height: 1.4;
          margin: 0;
          overflow-wrap: break-word;
          word-wrap: break-word;
          hyphens: auto;
        }

        /* Arrow indicator */
        .quiz-arrow {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #646cff;
          font-size: 1.1rem;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .quiz-option:hover .quiz-arrow {
          transform: translateX(5px);
        }

        /* Bottom section with alternative options - fixed at bottom */
        .bottom-section {
          width: 100%;
          text-align: center;
          padding: 20px;
          box-sizing: border-box;
          margin-top: auto;
        }

        /* More visible "Not ready" text */
        .not-ready-text {
          color: #ffffff;
          margin-bottom: 15px;
          font-size: 1.1rem;
          font-weight: 500;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .alternative-buttons {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* Stylish alternative buttons */
        .alt-button {
          background-color: rgba(44, 62, 80, 0.8);
          color: #ecf0f1;
          border: none;
          padding: 12px 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          min-width: 0;
          flex-shrink: 1;
        }

        .alt-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .alt-button.dashboard:hover {
          background-color: #34495e;
        }

        .alt-button.achievements:hover {
          background-color: #f39c12;
        }

        .alt-button.statistics:hover {
          background-color: #3498db;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .quiz-option {
            padding: 12px 15px;
          }

          .alternative-buttons {
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }

          .alt-button {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }

          .quiz-header h2 {
            font-size: 1.4rem;
          }

          .intro-text {
            font-size: 1.1rem;
          }

          .timer-notice {
            flex-direction: column;
            text-align: center;
            padding: 15px;
          }

          .timer-icon {
            margin-right: 0;
            margin-bottom: 8px;
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .quiz-content {
            padding: 0 15px;
          }

          .quiz-header h2 {
            font-size: 1.2rem;
          }

          .intro-text {
            font-size: 1rem;
          }

          .intro-icon {
            font-size: 1.8rem;
          }

          .quiz-option-title h3 {
            font-size: 1.1rem;
          }

          .quiz-icon-wrapper {
            width: 30px;
            height: 30px;
            margin-right: 8px;
          }

          .quiz-description {
            font-size: 0.85rem;
          }

          .bottom-section {
            padding: 15px 10px;
          }

          .not-ready-text {
            font-size: 1rem;
            margin-bottom: 10px;
          }

          .alt-button {
            padding: 10px 12px;
            font-size: 0.9rem;
          }

          .timer-notice p {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizDifficulty;
