import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faTrophy,
  faChartLine,
  faRedo,
  faHome,
  faArrowLeft,
  faAward,
  faSpinner,
  faFireFlameSimple,
  faExclamationTriangle,
  faInfoCircle,
  faBrain,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { API_ENDPOINTS, QUIZ_CONFIG } from "./constants";
import OllamaFeedback from "./OllamaFeedback";
import OllamaService from "./OllamaService";

// Helper function to get display name for question types
export const getQuestionTypeDisplay = (type) => {
  switch (type) {
    case QUIZ_CONFIG.QUESTION_TYPES.EMAIL_PHISHING:
      return "Email Phishing Identification";
    case QUIZ_CONFIG.QUESTION_TYPES.VISHING:
      return "Voice Phishing (Vishing) Scenario";
    case QUIZ_CONFIG.QUESTION_TYPES.SMISHING:
      return "SMS Phishing (Smishing) Scenario";
    case QUIZ_CONFIG.QUESTION_TYPES.WEBSITE_PHISHING:
      return "Website Phishing Identification";
    case QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE:
    default:
      return "Multiple Choice";
  }
};

// Helper function to calculate normalised percentage score
const calculatePercentScore = (score, totalQuestions) => {
  if (totalQuestions === 0) return 0;

  // Calculate percentage but cap it at 100%
  const percentage = Math.min(100, Math.round((score / totalQuestions) * 100));

  return percentage;
};

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State variables
  const [achievements, setAchievements] = useState([]);
  const [loadingAchievements, setLoadingAchievements] = useState(false);
  const [newAchievements, setNewAchievements] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmittingScore, setIsSubmittingScore] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [duplicateEntry, setDuplicateEntry] = useState(false);
  const [showAIFeedback, setShowAIFeedback] = useState(false);
  const [ollamaAvailable, setOllamaAvailable] = useState(false);
  const [checkingOllama, setCheckingOllama] = useState(false);

  // Add a ref to track if submission has been attempted
  const submissionAttemptedRef = useRef(false);

  // Get the quiz results from location state
  const {
    score,
    totalQuestions,
    userAnswers,
    difficulty,
    quizId,
    duration,
    consecutiveCorrect,
  } = location.state || {
    score: 0,
    totalQuestions: 0,
    userAnswers: [],
    difficulty: "Beginner",
    quizId: 1,
    duration: 0,
    consecutiveCorrect: 0,
  };

  // Get user ID from session storage
  const userId = sessionStorage.getItem("userId") || "1";
  const username = sessionStorage.getItem("username") || "User";

  // Calculate the actual correct answers and total points
  const [earnedPoints, totalPoints, correctAnswers] =
    calculateScoreDetails(userAnswers);

  // Calculate percentages for the statistics (normalised to 0-100%)
  // Use our calculated values rather than the passed score
  const percentCorrect =
    totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

  // Determine pass/fail status based on config threshold
  const passed = percentCorrect >= (QUIZ_CONFIG.PASS_THRESHOLD || 70);

  // Check if Ollama is available when component loads
  useEffect(() => {
    const checkOllamaAvailability = async () => {
      setCheckingOllama(true);
      try {
        const available = await OllamaService.isAvailable();
        setOllamaAvailable(available);
        console.log(
          "Ollama availability check:",
          available ? "Available" : "Not available"
        );
      } catch (error) {
        console.error("Error checking Ollama availability:", error);
        setOllamaAvailable(false);
      } finally {
        setCheckingOllama(false);
      }
    };

    checkOllamaAvailability();
  }, []);

  // Function to calculate score details from userAnswers
  function calculateScoreDetails(answers) {
    let earned = 0;
    let total = 0;
    let correct = 0;

    if (!answers || answers.length === 0) {
      return [0, 0, 0];
    }

    answers.forEach((answer) => {
      // For special question types with explicit point values
      if (
        answer.type &&
        answer.type !== QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE
      ) {
        if (answer.details) {
          // If we have earnedPoints and maxPoints in the details
          if (
            answer.details.earnedPoints !== undefined &&
            answer.details.maxPoints !== undefined
          ) {
            // Round to nearest multiple of 5 to ensure consistent scoring
            const roundedPoints =
              Math.round(answer.details.earnedPoints / 5) * 5;
            earned += roundedPoints;
            total += answer.details.maxPoints;

            // Count as correct if score is at least 70%
            if (answer.details.earnedPoints / answer.details.maxPoints >= 0.7) {
              correct += 1;
            }
          }
          // Check for penalties from false positives
          if (
            answer.details.falsePositives &&
            answer.details.falsePositives.length > 0
          ) {
            // Apply penalty for each false positive (typically -5 points per wrong selection)
            earned -= answer.details.falsePositives.length * 5;
          }
          // If we just have score percentage
          else if (answer.score !== undefined) {
            // Calculate points and round to nearest multiple of 5
            const rawPoints = (answer.score / 100) * 10;
            const roundedPoints = Math.round(rawPoints / 5) * 5;
            earned += roundedPoints;
            total += 10;

            if (answer.score >= 70) {
              correct += 1;
            }
          }
        }
        // If we just have score percentage but no details
        else if (answer.score !== undefined) {
          // Calculate points and round to nearest multiple of 5
          const rawPoints = (answer.score / 100) * 10;
          const roundedPoints = Math.round(rawPoints / 5) * 5;
          earned += roundedPoints;
          total += 10;

          if (answer.score >= 70) {
            correct += 1;
          }
        }
      }
      // For multiple choice questions
      else {
        if (answer.isCorrect !== undefined) {
          total += 10;
          if (answer.isCorrect) {
            earned += 10;
            correct += 1;
          }
        }
      }
    });

    // Ensure earned points isn't negative and rounds to nearest multiple of 5
    earned = Math.max(0, Math.round(earned / 5) * 5);

    // Round total to nearest multiple of 10 to ensure consistency
    total = Math.round(total / 10) * 10;

    return [earned, total, correct];
  }

  useEffect(() => {
    const submitQuizScore = async () => {
      // Check if we've already attempted to submit the score
      if (
        submissionAttemptedRef.current ||
        scoreSubmitted ||
        isSubmittingScore
      ) {
        return; // Skip if already submitted or in progress
      }

      // Mark that a submission has been attempted
      submissionAttemptedRef.current = true;
      setIsSubmittingScore(true);

      try {
        console.log(
          `Submitting quiz completion with earned points: ${earnedPoints}, total points: ${totalPoints}`
        );

        // Normalise scores in user answers to ensure none exceed 100%
        const normalisedUserAnswers = userAnswers.map((answer) => ({
          ...answer,
          score: Math.min(100, answer.score || 0),
        }));

        const quizCompletionData = {
          userId: userId,
          quizId: quizId,
          score: percentCorrect, // Use calculated percentage
          totalQuestions: totalQuestions,
          correctAnswers: correctAnswers, // Use calculated correct answers
          earnedPoints: earnedPoints, // Include earned points
          totalPossiblePoints: totalPoints, // Include total possible points
          duration: duration || 0, // Include quiz duration in seconds
          completionDetails: userAnswers.map((answer, index) => ({
            questionIndex: index,
            question: answer.question,
            type: answer.type,
            userAnswer: answer.selectedOption,
            correctAnswer: answer.correctOption,
            isCorrect: answer.isCorrect,
            score: answer.score,
            details: answer.details,
            earnedPoints:
              answer.details?.earnedPoints || (answer.isCorrect ? 10 : 0),
            possiblePoints: answer.details?.maxPoints || 10,
          })),
          submissionId: `${userId}-${quizId}-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 10)}`, // Add unique submission ID
        };

        const response = await fetch(API_ENDPOINTS.COMPLETE_QUIZ, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quizCompletionData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to submit quiz score");
        }

        console.log("Quiz score submitted successfully:", data);

        // Show success toast only once
        toast.success("Your quiz results have been recorded!", {
          position: "top-center",
          autoClose: 3000,
        });

        // Mark as submitted
        setScoreSubmitted(true);
      } catch (error) {
        console.error("Error submitting quiz score:", error);

        // For errors, show a generic message
        toast.error(
          "Unable to save quiz results, but you can still view your performance.",
          {
            position: "top-center",
            autoClose: 4000,
          }
        );

        // Still consider it "submitted" to prevent retries
        setScoreSubmitted(true);
      } finally {
        setIsSubmittingScore(false);
      }
    };

    // Submit score when component mounts - but only once
    submitQuizScore();
  }, []); // Empty dependency array

  // Fetch achievements after score submission
  useEffect(() => {
    const fetchAchievements = async () => {
      // Skip if score not considered "submitted" yet
      if (!scoreSubmitted) return;

      try {
        setLoadingAchievements(true);

        const response = await fetch(
          API_ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(":userId", userId)
        );

        if (!response.ok) {
          throw new Error("Failed to fetch achievements");
        }

        const data = await response.json();

        if (data.success && data.achievements) {
          setAchievements(data.achievements);
        }
      } catch (err) {
        console.error("Error fetching achievements:", err);
        // Don't set error state to avoid blocking the UI
      } finally {
        setLoadingAchievements(false);
      }
    };

    fetchAchievements();
  }, [userId, scoreSubmitted]);

  // Performance message based on score
  const getPerformanceMessage = () => {
    if (percentCorrect >= 90) return "Excellent! You're a security expert!";
    if (percentCorrect >= 80)
      return "Great job! You have strong security awareness.";
    if (percentCorrect >= 70) return "Good work! You've passed the quiz.";
    if (percentCorrect >= 60)
      return "Not bad, but there's room for improvement.";
    return "You need more practice to improve your security awareness.";
  };

  // Navigation functions
  const goToDashboard = () => navigate("/dashboard");
  const retryQuiz = () => navigate("/quiz/difficulty");
  const goBack = () => navigate(-1);

  // Helper function to render question content based on type
  const renderQuestionContent = (answer) => {
    if (
      answer.type &&
      answer.type !== QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE
    ) {
      // Calculate points and metrics for the question
      const earnedPoints = answer.details?.earnedPoints || 0;
      const maxPoints = answer.details?.maxPoints || 10;

      // For identification questions like phishing, vishing, etc.
      let identificationStats = null;

      if (
        answer.type === QUIZ_CONFIG.QUESTION_TYPES.EMAIL_PHISHING ||
        answer.type === QUIZ_CONFIG.QUESTION_TYPES.WEBSITE_PHISHING
      ) {
        // For identification questions with threats
        const totalThreats =
          (answer.details?.truePositives?.length || 0) +
          (answer.details?.falseNegatives?.length || 0);
        const correctlyIdentified = answer.details?.truePositives?.length || 0;

        identificationStats = `${correctlyIdentified} of ${totalThreats} threats identified correctly`;
      } else if (
        answer.type === QUIZ_CONFIG.QUESTION_TYPES.VISHING ||
        answer.type === QUIZ_CONFIG.QUESTION_TYPES.SMISHING
      ) {
        // For vishing/smishing with correct/incorrect options
        const totalCorrectOptions =
          answer.details?.correctlySelected?.length || 0;
        const totalOptions = answer.details?.correctOptions?.length || 0;

        if (totalOptions > 0) {
          identificationStats = `${totalCorrectOptions} of ${totalOptions} elements identified correctly`;
        }
      }

      return (
        <div className="question-type-label">
          <span className="question-type">
            {getQuestionTypeDisplay(answer.type)}
          </span>

          <div className="points-indicator">
            <span className="points-text">
              {earnedPoints}/{maxPoints} points
            </span>
            {identificationStats && (
              <span className="identification-stats">
                {identificationStats}
              </span>
            )}
          </div>

          {answer.details && (
            <div className="details-summary">
              {answer.details.truePositives && (
                <div className="identification-summary">
                  {answer.details.truePositives.length} of{" "}
                  {answer.details.truePositives.length +
                    answer.details.falseNegatives.length}{" "}
                  threats identified correctly
                </div>
              )}
              {answer.details.correctlySelected && (
                <div className="identification-summary">
                  {answer.details.correctlySelected.length} correct selections,{" "}
                  {answer.details.incorrectlySelected
                    ? answer.details.incorrectlySelected.length
                    : 0}{" "}
                  incorrect selections
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // Default rendering for multiple choice
    return (
      <div className="answers">
        <div className="points-indicator">
          <span className="points-text">
            {answer.isCorrect ? "10" : "0"}/10 points
          </span>
        </div>
        <div className="answer">
          <span className="answer-label">Your answer:</span>
          <span
            className={`answer-text ${
              answer.isCorrect ? "correct" : "incorrect"
            }`}
          >
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
    );
  };

  // Toggle AI feedback visibility
  const toggleAIFeedback = () => {
    setShowAIFeedback(!showAIFeedback);
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>{difficulty} Quiz Results</h2>

        <div className="score-summary">
          <div
            className="score-circle"
            style={{
              background: `conic-gradient(
              ${passed ? "#2ecc71" : "#e74c3c"} ${percentCorrect * 3.6}deg,
              #2c3e50 0deg
            )`,
            }}
          >
            <div className="score-circle-inner">
              <span className="score-percentage">{percentCorrect}%</span>
            </div>
          </div>

          <div className="score-details">
            <p className="score-text">
              You scored <span className="score-value">{correctAnswers}</span>{" "}
              correct answers out of{" "}
              <span className="total-value">{totalQuestions}</span> questions
            </p>
            <p className="points-text">
              <span className="points-value">{earnedPoints}</span> points earned
              out of <span className="points-total">{totalPoints}</span>{" "}
              possible points
            </p>
            <p className={`status-text ${passed ? "passed" : "failed"}`}>
              {passed ? "PASSED" : "FAILED"}
            </p>
            <p className="performance-message">{getPerformanceMessage()}</p>

            {/* Score submission status */}
            <p className="submission-status">
              {isSubmittingScore ? (
                <span className="submitting">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    className="spinner-icon"
                  />{" "}
                  Recording results...
                </span>
              ) : scoreSubmitted ? (
                <span className="submitted">
                  <FontAwesomeIcon icon={faCheck} className="check-icon" />{" "}
                  Results saved
                </span>
              ) : (
                <span className="not-submitted">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="warning-icon"
                  />{" "}
                  Unable to save results
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* AI Feedback Button */}
      <div className="ai-feedback-section">
        <button
          className="ai-feedback-btn"
          onClick={toggleAIFeedback}
          disabled={checkingOllama}
        >
          {checkingOllama ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin />
              Checking AI availability...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faBrain} />
              {showAIFeedback
                ? "Hide AI Analysis"
                : "Show Personalised Learning Recommendations"}
            </>
          )}
        </button>
        {ollamaAvailable === false && !checkingOllama && (
          <div className="ai-status-message">
            <FontAwesomeIcon icon={faInfoCircle} />
            AI feedback is currently unavailable. See setup guide for
            instructions.
          </div>
        )}
      </div>

      {/* AI Feedback Component */}
      {showAIFeedback && (
        <OllamaFeedback
          userAnswers={userAnswers}
          difficulty={difficulty}
          onClose={toggleAIFeedback}
        />
      )}

      <div className="results-content">
        <h3 className="section-title">Question Review</h3>

        <div className="questions-review">
          {userAnswers.map((answer, index) => {
            // Determine if the answer is correct based on type
            const isCorrectAnswer =
              answer.type === QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE
                ? answer.isCorrect
                : answer.score >= 70;

            return (
              <div
                key={index}
                className={`question-item ${
                  isCorrectAnswer ? "correct" : "incorrect"
                }`}
              >
                <div className="question-header">
                  <span className="question-number">Question {index + 1}</span>
                  <span
                    className={`question-result ${
                      isCorrectAnswer ? "correct" : "incorrect"
                    }`}
                  >
                    {isCorrectAnswer ? (
                      <>
                        <FontAwesomeIcon icon={faCheck} /> Correct
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faTimes} /> Incorrect
                      </>
                    )}
                  </span>
                </div>

                <div className="question-content">
                  <p className="question-text">{answer.question}</p>

                  {/* Render content based on question type */}
                  {renderQuestionContent(answer)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="results-actions">
        <button className="action-btn back-btn" onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <button className="action-btn retry-btn" onClick={retryQuiz}>
          <FontAwesomeIcon icon={faRedo} /> Try Another Quiz
        </button>
        <button className="action-btn home-btn" onClick={goToDashboard}>
          <FontAwesomeIcon icon={faHome} /> Dashboard
        </button>
      </div>

      <style jsx="true">{`
        /* Main container */
        .results-container {
          max-width: 800px;
          margin: 2rem auto;
          background-color: #1a1a1a;
          border-radius: 14px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }

        /* AI Feedback Button section styling */
        .ai-feedback-section {
          background-color: #272736;
          border-radius: 8px;
          padding: 1rem;
          margin: 1.5rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .ai-feedback-btn {
          background-color: #3a3a6a;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ai-feedback-btn:hover:not(:disabled) {
          background-color: #4a4a8a;
          transform: translateY(-2px);
        }

        .ai-feedback-btn:disabled {
          background-color: #3a3a5a;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .ai-status-message {
          color: #95a5a6;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .score-summary {
          display: flex;
          align-items: center;
          margin-top: 2rem;
          gap: 2rem;
        }

        .score-circle {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .score-circle-inner {
          width: 120px;
          height: 120px;
          background: #1a1a1a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .score-percentage {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .score-details {
          flex: 1;
        }

        .score-text {
          font-size: 1.2rem;
          color: #e0e0e0;
          margin-bottom: 0.5rem;
        }

        .points-text {
          font-size: 1rem;
          color: #b3b3b3;
          margin-bottom: 0.75rem;
        }

        .points-value,
        .points-total {
          font-weight: bold;
          color: #3498db;
        }

        .score-value,
        .total-value {
          font-weight: bold;
          color: #3498db;
        }

        .status-text {
          font-size: 1.5rem;
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
          font-style: italic;
          margin-bottom: 0.5rem;
        }

        .submission-status {
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        .submitting {
          color: #f39c12;
        }

        .submitted {
          color: #2ecc71;
        }

        .not-submitted {
          color: #e74c3c;
        }

        .spinner-icon,
        .check-icon,
        .warning-icon,
        .info-icon {
          margin-right: 5px;
        }

        .loading-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          color: #3498db;
          font-style: italic;
        }

        .streak-update-section {
          background-color: rgba(231, 76, 60, 0.1);
          border-radius: 8px;
          padding: 0.75rem;
          margin: 1rem 0;
          display: flex;
          justify-content: center;
        }

        .streak-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #e74c3c;
          font-weight: bold;
        }

        .results-content {
          margin-top: 2rem;
        }

        .section-title {
          color: #ffffff;
          font-size: 1.3rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid #2c3e50;
          padding-bottom: 0.5rem;
        }

        .questions-review {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .question-item {
          background-color: #2c3e50;
          border-radius: 8px;
          padding: 1rem;
          border-left: 4px solid;
        }

        .question-item.correct {
          border-left-color: #2ecc71;
        }

        .question-item.incorrect {
          border-left-color: #e74c3c;
        }

        .question-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #34495e;
        }

        .question-number {
          font-weight: bold;
          color: #bdc3c7;
        }

        .question-result {
          font-weight: bold;
        }

        .question-result.correct {
          color: #2ecc71;
        }

        .question-result.incorrect {
          color: #e74c3c;
        }

        .question-content {
          color: #ecf0f1;
        }

        .question-text {
          margin-bottom: 1rem;
        }

        .answers {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .answer {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .answer-label {
          font-size: 0.9rem;
          color: #bdc3c7;
        }

        .answer-text {
          background-color: #34495e;
          padding: 0.5rem;
          border-radius: 4px;
        }

        .answer-text.correct {
          background-color: rgba(46, 204, 113, 0.2);
          border: 1px solid #2ecc71;
        }

        .answer-text.incorrect {
          background-color: rgba(231, 76, 60, 0.2);
          border: 1px solid #e74c3c;
        }

        .results-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.2s ease;
        }

        .back-btn {
          background-color: #7f8c8d;
          color: white;
        }

        .back-btn:hover {
          background-color: #95a5a6;
        }

        .retry-btn {
          background-color: #e67e22;
          color: white;
        }

        .retry-btn:hover {
          background-color: #d35400;
        }

        .home-btn {
          background-color: #3498db;
          color: white;
        }

        .home-btn:hover {
          background-color: #2980b9;
        }

        /* Points indicator for all question types */
        .points-indicator {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 0.5rem 0;
          flex-wrap: wrap;
        }

        .points-text {
          display: inline-block;
          background-color: rgba(52, 152, 219, 0.2);
          color: #3498db;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .identification-stats {
          display: inline-block;
          color: #bdc3c7;
          padding: 0.25rem 0.5rem;
          font-size: 0.85rem;
        }

        /* Question type styling */
        .question-type-label {
          margin: 0.5rem 0;
          font-size: 0.9rem;
        }

        .question-type {
          background-color: #2c3e50;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          color: #ecf0f1;
        }

        .details-summary {
          margin-top: 0.5rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .points-summary {
          background-color: rgba(52, 152, 219, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          color: #3498db;
        }

        .points-earned {
          font-weight: bold;
        }

        .identification-summary {
          color: #bdc3c7;
        }

        @media (max-width: 768px) {
          .score-summary {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }

          .results-actions {
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .action-btn {
            flex: 1;
            justify-content: center;
            min-width: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizResults;
