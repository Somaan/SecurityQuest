import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QUIZ_CONFIG } from './constants';
import { toast } from 'react-toastify';

const QuizQuestions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(QUIZ_CONFIG.QUESTION_TIME);
  const [answeredState, setAnsweredState] = useState(null); // null, 'correct', or 'incorrect'
  
  // Get quiz difficulty from location state
  const difficulty = location.state?.difficulty || 'Beginner';
  const quizId = QUIZ_CONFIG.QUIZ_IDS[difficulty] || 1;
  
  // Get questions for selected difficulty
  const questions = QUIZ_CONFIG.MOCK_QUIZ_DATA[difficulty] || [];
  
  // Effect for timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !answeredState) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
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
  
  // Handle answer selection
  const handleOptionSelect = (optionIndex) => {
    if (answeredState) return; // Prevent selection after answering
    setSelectedOption(optionIndex);
  };
  
  // Handle submitting an answer
  const handleAnswer = () => {
    if (answeredState) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    
    // If no option selected, treat as incorrect
    if (selectedOption === null) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestionIndex] = {
        question: currentQuestion.question,
        selectedOption: "No answer selected",
        correctOption: currentQuestion.options[currentQuestion.correctAnswer],
        isCorrect: false
      };
      setUserAnswers(updatedAnswers);
      setAnsweredState('incorrect');
      
      toast.error("Time's up! Moving to next question...");
      return;
    }
    
    // Check if answer is correct
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    // Update answers array
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = {
      question: currentQuestion.question,
      selectedOption: currentQuestion.options[selectedOption],
      correctOption: currentQuestion.options[currentQuestion.correctAnswer],
      isCorrect
    };
    
    setUserAnswers(updatedAnswers);
    setAnsweredState(isCorrect ? 'correct' : 'incorrect');
    
    // Show feedback toast
    if (isCorrect) {
      toast.success("Correct answer!");
    } else {
      toast.error("Incorrect answer!");
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
    // Calculate score
    const score = userAnswers.filter(answer => answer.isCorrect).length;
    
    // Navigate to results page
    navigate('/quiz/results', {
      state: {
        score,
        totalQuestions: questions.length,
        userAnswers,
        difficulty,
        quizId
      }
    });
  };
  
  // Exit quiz and go back to difficulty selection
  const exitQuiz = () => {
    if (window.confirm("Are you sure you want to exit the quiz? Your progress will be lost.")) {
      navigate('/quiz/difficulty');
    }
  };
  
  // Current question
  const currentQuestion = questions[currentQuestionIndex];
  
  if (!currentQuestion) {
    return <div>Loading questions...</div>;
  }
  
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>{difficulty} Quiz</h1>
        <div className="timer-container">
          <span className={`timer ${timeLeft < 10 ? 'timer-low' : ''}`}>
            Time: {timeLeft}s
          </span>
        </div>
      </div>
      
      <div className="progress-container">
        <div className="progress-bar-background">
          <div 
            className="progress-bar-fill"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="progress-text">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>
      
      <div className="question-card">
        <h2 className="question-text">{currentQuestion.question}</h2>
        
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <div 
              key={index}
              className={`option ${selectedOption === index ? 'selected' : ''} 
                ${answeredState && index === currentQuestion.correctAnswer ? 'correct' : ''}
                ${answeredState === 'incorrect' && selectedOption === index ? 'incorrect' : ''}`}
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
      
      <div className="quiz-actions">
        <button 
          className="exit-btn"
          onClick={exitQuiz}
        >
          Exit Quiz
        </button>
        
        {!answeredState ? (
          <button 
            className="next-btn"
            onClick={handleAnswer}
            disabled={selectedOption === null}
          >
            Submit Answer
          </button>
        ) : (
          <button 
            className="next-btn"
            onClick={nextQuestion}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
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
      `}</style>
    </div>
  );
};

export default QuizQuestions;