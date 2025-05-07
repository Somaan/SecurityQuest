import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_ENDPOINTS, QUIZ_CONFIG } from "./constants";
import { toast } from "react-toastify";
import EmailPhishingQuestion from "./EmailPhishingQuestion";
import VishingQuestion from "./VishingQuestion";
import SmishingQuestion from "./SmishingQuestion";
import WebsitePhishingQuestion from "./WebsitePhishingQuestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faStar } from "@fortawesome/free-solid-svg-icons";
import AchievementService from "./AchievementService";

const QuizQuestions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(QUIZ_CONFIG.QUESTION_TIME);
  const [answeredState, setAnsweredState] = useState(null); // null, 'correct', or 'incorrect'
  const [isLoading, setIsLoading] = useState(true);
  const [showStreakBanner, setShowStreakBanner] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  // Track start time for quiz duration
  const [startTime, setStartTime] = useState(null);

  // Achievement tracking
  const [correctStreak, setCorrectStreak] = useState(0);

  const userId = sessionStorage.getItem("userId") || "1";

  // Get quiz difficulty from location state
  const difficulty = location.state?.difficulty || "Beginner";
  const quizId = QUIZ_CONFIG.QUIZ_IDS[difficulty] || 1;

  // Set start time when component mounts
  useEffect(() => {
    setStartTime(new Date());
  }, []);

  // Fetch questions from the database
  // Fetch questions from the database
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        // Generate a unique submission ID for this quiz attempt
        const submissionId = `${userId}-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 15)}`;
        sessionStorage.setItem("currentQuizSubmissionId", submissionId);

        // Fetch questions from the API
        const endpoint = API_ENDPOINTS.GET_QUIZ_QUESTIONS.replace(
          ":difficulty",
          difficulty
        );
        const response = await fetch(`${endpoint}?userId=${userId}`);

        if (!response.ok) {
          throw new Error(`Error fetching questions: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success && data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
        } else {
          throw new Error("No questions returned from the server");
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError(err.message);
        setIsLoading(false);

        // Fallback to mock data if available
        if (
          QUIZ_CONFIG.MOCK_QUIZ_DATA &&
          QUIZ_CONFIG.MOCK_QUIZ_DATA[difficulty]
        ) {
          console.log("Using fallback mock data");
          setQuestions(QUIZ_CONFIG.MOCK_QUIZ_DATA[difficulty]);
          setError(null);
        }
      }
    };

    fetchQuestions();
  }, [difficulty, userId]);

  // Effect for timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !answeredState) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !answeredState) {
      // Time's up, auto-submit
      handleAnswer();
    }
  }, [timeLeft, answeredState]);

  // Reset timer when moving to a new question
  useEffect(() => {
    setTimeLeft(QUIZ_CONFIG.QUESTION_TIME);
    setSelectedOption(null);
    setAnsweredState(null);
  }, [currentQuestionIndex]);

  // Show and hide streak banner when needed
  useEffect(() => {
    if (correctStreak === 3) {
      setShowStreakBanner(true);
      const timer = setTimeout(() => {
        setShowStreakBanner(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [correctStreak]);

  // Handle answer selection for multiple choice
  const handleOptionSelect = (optionIndex) => {
    if (answeredState) return; // Prevent selection after answering
    setSelectedOption(optionIndex);
  };

  // Handle submitting an answer for multiple choice questions
  const handleAnswer = () => {
    if (answeredState) return;

    const currentQuestion = questions[currentQuestionIndex];

    // For standard multiple choice questions
    if (
      !currentQuestion.type ||
      currentQuestion.type === QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE
    ) {
      // If no option selected, treat as incorrect
      if (selectedOption === null) {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = {
          question: currentQuestion.question,
          type: QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE,
          selectedOption: "No answer selected",
          correctOption: currentQuestion.options[currentQuestion.correctAnswer],
          isCorrect: false,
          score: 0,
          questionIndex: currentQuestionIndex,
        };
        setUserAnswers(updatedAnswers);
        setAnsweredState("incorrect");

        // Reset streak on incorrect answer
        setCorrectStreak(0);

        toast.error("Time's up! Moving to next question...");
        return;
      }

      // Check if answer is correct
      const isCorrect = selectedOption === currentQuestion.correctAnswer;

      // Update answers array
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestionIndex] = {
        question: currentQuestion.question,
        type: QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE,
        selectedOption: currentQuestion.options[selectedOption],
        correctOption: currentQuestion.options[currentQuestion.correctAnswer],
        isCorrect,
        score: isCorrect ? 100 : 0,
        questionIndex: currentQuestionIndex,
      };

      setUserAnswers(updatedAnswers);
      setAnsweredState(isCorrect ? "correct" : "incorrect");

      // Update streak counter
      if (isCorrect) {
        const newStreak = correctStreak + 1;
        setCorrectStreak(newStreak);

        // Check for streak achievements
        checkStreakAchievements(newStreak);
      } else {
        setCorrectStreak(0);
      }

      // Show feedback toast
      if (isCorrect) {
        toast.success("Correct answer!");
      } else {
        toast.error("Incorrect answer!");
      }
    }
  };

  // Handle answers from special question types
  const handleSpecialQuestionAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];

    // Update answers array
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = {
      question: currentQuestion.question,
      type: currentQuestion.type,
      details: answer.details,
      score: answer.score,
      questionIndex: currentQuestionIndex,
    };

    setUserAnswers(updatedAnswers);

    // Determine if answer was correct (score >= 70%)
    const isCorrect = answer.score >= 70;
    setAnsweredState(isCorrect ? "correct" : "incorrect");

    // Update streak counter
    if (isCorrect) {
      const newStreak = correctStreak + 1;
      setCorrectStreak(newStreak);

      // Check for streak achievements
      checkStreakAchievements(newStreak);
    } else {
      setCorrectStreak(0);
    }

    // Show feedback toast
    if (isCorrect) {
      toast.success(`Good job! You scored ${Math.round(answer.score)}%`);
    } else {
      toast.warning(
        `You scored ${Math.round(
          answer.score
        )}%. Try to identify more threats next time.`
      );
    }
  };

  // Check for streak-based achievements
  const checkStreakAchievements = (streak) => {
    // Quick Learner achievement - 3 correct in a row
    if (streak === 3) {
      const quickLearnerAchievement = {
        id: "quick-learner",
        title: "Quick Learner",
        description: "3 correct answers in a row",
        icon: "star",
        color: "#F1C40F",
        unlocked: true,
      };

      // Queue the achievement for display
      AchievementService.queueAchievement(quickLearnerAchievement);

      fetch(
        `${API_ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(":userId", userId)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            achievementId: 7,
            unlocked: true,
            progress: 100,
          }),
        }
      ).catch((err) => {
        console.error("Failed to save achievements:", err);
      });
    }
  };

  // Move to next question or finish quiz
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  // Complete the quiz and navigate to results
  const finishQuiz = () => {
    // Calculate overall score (average of all question scores)
    const totalScore = userAnswers.reduce(
      (sum, answer) => sum + answer.score,
      0
    );
    const averageScore = Math.round(totalScore / userAnswers.length);

    // Calculate quiz duration
    const endTime = new Date();
    const quizDuration = Math.round((endTime - startTime) / 1000); // duration in seconds

    // Track consecutive correct answers for the results page
    const quizResults = {
      score: averageScore,
      totalQuestions: questions.length,
      userAnswers,
      difficulty,
      quizId,
      consecutiveCorrect: correctStreak,
      duration: quizDuration, // Add duration to results
      submissionId: sessionStorage.getItem("currentQuizSubmissionId"),
    };

    // Submit quiz results to the server
    const submitQuizResults = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.BASE_URL}/api/quiz/complete`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              quizId: quizId,
              score: averageScore,
              totalQuestions: questions.length,
              correctAnswers: userAnswers.filter(
                (answer) =>
                  answer.isCorrect || (answer.score && answer.score >= 70)
              ).length,
              duration: quizDuration,
              completionDetails: userAnswers,
              submissionId: quizResults.submissionId,
            }),
          }
        );

        const data = await response.json();

        if (data.success) {
          console.log("Quiz results saved successfully:", data);

          // Update streak data in quiz results
          quizResults.quizStreak = data.quizStreak;
          quizResults.longestQuizStreak = data.longestQuizStreak;
        } else {
          console.error("Error saving quiz results:", data.error);
        }
      } catch (error) {
        console.error("Error submitting quiz results:", error);
      }
    };

    // Submit results and then navigate
    submitQuizResults().then(() => {
      // Check for quiz completion achievements
      const quizAchievements =
        AchievementService.checkQuizAchievements(quizResults);
      quizAchievements.forEach((achievement) => {
        AchievementService.queueAchievement(achievement);
      });

      // Navigate to results page
      navigate("/quiz/results", {
        state: quizResults,
      });
    });
  };

  // Exit quiz and go back to difficulty selection
  const exitQuiz = () => {
    if (
      window.confirm(
        "Are you sure you want to exit the quiz? Your progress will be lost."
      )
    ) {
      navigate("/quiz/difficulty");
    }
  };

  if (isLoading) {
    return (
      <div className="quiz-container">
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
          <p>Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-container">
        <div className="error-message">
          <p>Error loading questions: {error}</p>
          <button
            className="exit-btn"
            onClick={() => navigate("/quiz/difficulty")}
          >
            Back to Difficulty Selection
          </button>
        </div>
      </div>
    );
  }

  // Check if questions are available
  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="error-message">
          <p>No questions available for this difficulty level.</p>
          <button
            className="exit-btn"
            onClick={() => navigate("/quiz/difficulty")}
          >
            Back to Difficulty Selection
          </button>
        </div>
      </div>
    );
  }

  // Current question
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="quiz-container">
        <div className="error-message">
          <p>Question data is not available.</p>
          <button
            className="exit-btn"
            onClick={() => navigate("/quiz/difficulty")}
          >
            Back to Difficulty Selection
          </button>
        </div>
      </div>
    );
  }

  // Render different question types based on the type property
  const renderQuestion = () => {
    const questionType =
      currentQuestion.type || QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE;

    switch (questionType) {
      case QUIZ_CONFIG.QUESTION_TYPES.EMAIL_PHISHING:
        return (
          <EmailPhishingQuestion
            question={currentQuestion}
            onAnswer={handleSpecialQuestionAnswer}
          />
        );

      case QUIZ_CONFIG.QUESTION_TYPES.VISHING:
        return (
          <VishingQuestion
            question={currentQuestion}
            onAnswer={handleSpecialQuestionAnswer}
          />
        );

      case QUIZ_CONFIG.QUESTION_TYPES.SMISHING:
        return (
          <SmishingQuestion
            question={currentQuestion}
            onAnswer={handleSpecialQuestionAnswer}
          />
        );

      case QUIZ_CONFIG.QUESTION_TYPES.WEBSITE_PHISHING:
        return (
          <WebsitePhishingQuestion
            question={currentQuestion}
            onAnswer={handleSpecialQuestionAnswer}
          />
        );

      case QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE:
      default:
        // Standard multiple choice question
        return (
          <div className="question-card">
            <h2 className="question-text">{currentQuestion.question}</h2>

            <div className="options-container">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`option ${
                    selectedOption === index ? "selected" : ""
                  } 
                    ${
                      answeredState && index === currentQuestion.correctAnswer
                        ? "correct"
                        : ""
                    }
                    ${
                      answeredState === "incorrect" && selectedOption === index
                        ? "incorrect"
                        : ""
                    }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  {option}
                </div>
              ))}
            </div>

            {/* Explanation (shown after answering) */}
            {answeredState && (
              <div className="explanation-box">
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>{difficulty} Quiz</h1>
        <div className="timer-container">
          <span className={`timer ${timeLeft < 10 ? "timer-low" : ""}`}>
            Time: {timeLeft}s
          </span>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-bar-background">
          <div
            className="progress-bar-fill"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
        <div className="progress-text">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>

      {/* Render question based on its type */}
      {renderQuestion()}

      {/* Streak Banner (shown only when reaching 3 correct) */}
      {showStreakBanner && (
        <div className="streak-banner">
          <FontAwesomeIcon icon={faStar} className="streak-icon" />
          <span>3 correct answers in a row!</span>
        </div>
      )}

      <div className="quiz-actions">
        <button className="exit-btn" onClick={exitQuiz}>
          Exit Quiz
        </button>

        {!answeredState ? (
          currentQuestion.type &&
          currentQuestion.type !==
            QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE ? null : (
            <button
              className="next-btn"
              onClick={handleAnswer}
              disabled={selectedOption === null}
            >
              Submit Answer
            </button>
          )
        ) : (
          <button className="next-btn" onClick={nextQuestion}>
            {currentQuestionIndex < questions.length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </button>
        )}
      </div>

      <style jsx>{`
        .quiz-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: #1a1a1a;
          border-radius: 16px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          position: relative;
        }

        .quiz-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .quiz-header h1 {
          color: #ffffff;
          font-size: 1.8rem;
          margin: 0;
        }

        .timer-container {
          background-color: #2c3e50;
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }

        .timer {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: bold;
        }

        .timer-low {
          color: #e74c3c;
        }

        .progress-container {
          margin-bottom: 1.5rem;
        }

        .progress-bar-background {
          width: 100%;
          height: 8px;
          background-color: #34495e;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-bar-fill {
          height: 100%;
          background-color: #2ecc71;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .progress-text {
          text-align: right;
          color: #bdc3c7;
          font-size: 0.9rem;
        }

        .question-card {
          background-color: #242424;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .question-text {
          color: #ffffff;
          font-size: 1.4rem;
          margin-top: 0;
          margin-bottom: 1.5rem;
        }

        .options-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .option {
          padding: 1rem;
          background-color: #2c3e50;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid transparent;
          color: #ffffff;
        }

        .option:hover {
          background-color: #34495e;
        }

        .option.selected {
          border-color: #3498db;
          background-color: rgba(52, 152, 219, 0.2);
        }

        .option.correct {
          border-color: #2ecc71;
          background-color: rgba(46, 204, 113, 0.2);
        }

        .option.incorrect {
          border-color: #e74c3c;
          background-color: rgba(231, 76, 60, 0.2);
        }

        /* Streak Banner Styling - Fixed in top-right corner */
        .streak-banner {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: rgba(241, 196, 15, 0.95);
          color: #000000;
          padding: 10px 20px;
          border-radius: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          gap: 8px;
          animation: slideInFromRight 0.5s forwards;
          z-index: 1000;
        }

        .streak-icon {
          color: #ffffff;
        }

        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .explanation-box {
          margin-top: 1.5rem;
          padding: 1rem;
          background-color: #34495e;
          border-radius: 8px;
          border-left: 4px solid #3498db;
        }

        .explanation-box p {
          color: #ecf0f1;
          margin: 0;
          line-height: 1.5;
        }

        .quiz-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .exit-btn {
          background-color: #7f8c8d;
          color: white;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 6px;
          cursor: pointer;
        }

        .exit-btn:hover {
          background-color: #95a5a6;
        }

        .next-btn {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
        }

        .next-btn:hover {
          background-color: #2980b9;
        }

        .next-btn:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          color: #ecf0f1;
        }

        .loading-icon {
          font-size: 2rem;
          color: #3498db;
          margin-bottom: 1rem;
        }

        .error-message {
          text-align: center;
          color: #ecf0f1;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default QuizQuestions;
