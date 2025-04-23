import { QUIZ_CONFIG } from './constants';

/**
 * Helper function to get display name for different question types
 */
export const getQuestionTypeDisplay = (type) => {
  switch (type) {
    case QUIZ_CONFIG.QUESTION_TYPES.EMAIL_PHISHING:
      return 'Email Phishing Identification';
    case QUIZ_CONFIG.QUESTION_TYPES.VISHING:
      return 'Voice Phishing (Vishing) Scenario';
    case QUIZ_CONFIG.QUESTION_TYPES.SMISHING:
      return 'SMS Phishing (Smishing) Scenario';
    case QUIZ_CONFIG.QUESTION_TYPES.WEBSITE_PHISHING:
      return 'Website Phishing Identification';
    case QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE:
    default:
      return 'Multiple Choice';
  }
};

/**
 * Renders the appropriate content for each question type in the results
 */
export const renderQuestionContent = (answer) => {
  if (answer.type && answer.type !== QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE) {
    return (
      <div className="question-type-label">
        <span className="question-type">{getQuestionTypeDisplay(answer.type)}</span>
        {answer.details && (
          <div className="details-summary">
            {answer.details.earnedPoints !== undefined && (
              <div className="points-summary">
                <span className="points-earned">{answer.details.earnedPoints}</span> / 
                <span className="points-possible">{answer.details.maxPoints}</span> points
              </div>
            )}
            {answer.details.truePositives && (
              <div className="identification-summary">
                {answer.details.truePositives.length} of {answer.details.truePositives.length + answer.details.falseNegatives.length} threats identified correctly
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
      <div className="answer">
        <span className="answer-label">Your answer:</span>
        <span className={`answer-text ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
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

/**
 * Helper function to determine if answer was correct for any question type
 */
export const isAnswerCorrect = (answer) => {
  if (answer.isCorrect !== undefined) {
    return answer.isCorrect;
  }
  
  if (answer.score !== undefined) {
    return answer.score >= 70;
  }
  
  return false;
};

