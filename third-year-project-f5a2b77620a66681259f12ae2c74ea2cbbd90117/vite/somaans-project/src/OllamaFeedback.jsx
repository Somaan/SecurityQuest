import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faSpinner,
  faInfoCircle,
  faChevronDown,
  faChevronUp,
  faBrain,
  faExclamationTriangle,
  faBook,
  faTools,
  faCheck,
  faUserGraduate,
  faRobot,
  faCog,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";
import { QUIZ_CONFIG } from "./constants";
import OllamaService from "./OllamaService";

/**
 * Enhanced OllamaFeedback component that analyses quiz results
 * and provides highly personalised feedback with contextual awareness
 * Uses locally-run Ollama models for targeted learning recommendations
 */
const OllamaFeedback = ({
  userAnswers,
  difficulty,
  onClose,
  userPreferences = {},
  quizHistory = null,
  userName = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackSections, setFeedbackSections] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  const [error, setError] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [processedQuestions, setProcessedQuestions] = useState({}); // Track processed questions
  const [isUsingFallback, setIsUsingFallback] = useState(false); // Track if we're using fallback content
  const [ollamaAvailable, setOllamaAvailable] = useState(true); // Track if Ollama is available

  // Toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections({
      ...expandedSections,
      [sectionId]: !expandedSections[sectionId],
    });
  };

  // Toggle all sections
  const toggleAllSections = (expand) => {
    if (!feedbackSections || feedbackSections.length === 0) return;

    const newExpandedState = {};
    feedbackSections.forEach((section) => {
      newExpandedState[section.id] = expand;
    });

    setExpandedSections(newExpandedState);
  };

  useEffect(() => {
    // Check if Ollama is available
    const checkOllamaAvailability = async () => {
      try {
        const available = await OllamaService.isAvailable();
        setOllamaAvailable(available);
        if (!available) {
          console.log("Ollama is not available, using fallback content");
          setIsUsingFallback(true);
        }
      } catch (error) {
        console.error("Error checking Ollama availability:", error);
        setIsUsingFallback(true);
        setOllamaAvailable(false);
      }
    };

    checkOllamaAvailability();
  }, []);

  useEffect(() => {
    // Only process if we have answers
    if (!userAnswers || userAnswers.length === 0) {
      setIsLoading(false);
      setError("No quiz data available for analysis");
      return;
    }

    // Calculate and set user progress information
    if (quizHistory) {
      analyseUserProgress(quizHistory);
    }

    // Start the analysis process
    analyseQuizPerformance();
  }, [userAnswers, difficulty, quizHistory, ollamaAvailable]);

  // Analyse user progress over time from quiz history
  const analyseUserProgress = (history) => {
    if (!Array.isArray(history) || history.length < 2) {
      setUserProgress(null);
      return;
    }

    // Sort by date
    const sortedHistory = [...history].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Calculate improvement
    const firstScore = sortedHistory[0].score;
    const lastScore = sortedHistory[sortedHistory.length - 1].score;
    const improvement = lastScore - firstScore;

    // Calculate average
    const averageScore =
      sortedHistory.reduce((sum, entry) => sum + entry.score, 0) /
      sortedHistory.length;

    // Identify areas of consistent weakness
    const weakAreas = {};
    sortedHistory.forEach((entry) => {
      if (!entry.incorrectTopics) return;

      entry.incorrectTopics.forEach((topic) => {
        weakAreas[topic] = (weakAreas[topic] || 0) + 1;
      });
    });

    // Get top weak areas (appearing in more than 50% of quizzes)
    const consistentWeakAreas = Object.entries(weakAreas)
      .filter(([_, count]) => count > sortedHistory.length / 2)
      .map(([topic]) => topic);

    setUserProgress({
      quizzesTaken: sortedHistory.length,
      improvement,
      averageScore,
      consistentWeakAreas,
      trend:
        improvement > 0
          ? "improving"
          : improvement < 0
          ? "declining"
          : "stable",
    });
  };

  const analyseQuizPerformance = async () => {
    try {
      setIsLoading(true);

      // Create user context for more personalised feedback
      const userContext = {
        // Basic user info if available
        name: userName || null,
        // Learning preferences
        learningStyle: userPreferences.learningStyle || null,
        // Professional context if available
        role: userPreferences.role || null,
        industry: userPreferences.industry || null,
        // Quiz history context if available
        previousPerformance: userProgress
          ? `${userProgress.quizzesTaken} quizzes taken with ${userProgress.trend} trend`
          : null,
        weakAreas: userProgress?.consistentWeakAreas || [],
        // Feature preferences
        preferSimplifiedExplanations:
          userPreferences.simplifiedExplanations || false,
        preferExamples: userPreferences.includeExamples || true,
      };

      // Identify incorrect answers
      const incorrectAnswers = userAnswers.filter((answer, index) => {
        // Store the original question index for reference
        if (!answer.questionIndex) {
          answer.questionIndex = index + 1;
        }

        // For multiple choice questions
        if (
          answer.type === QUIZ_CONFIG.QUESTION_TYPES.MULTIPLE_CHOICE ||
          !answer.type
        ) {
          return !answer.isCorrect;
        }

        // For special question types (email_phishing, vishing, etc.)
        return answer.score < 70;
      });

      if (incorrectAnswers.length === 0) {
        // Handle perfect score
        const perfectScoreFeedback = await generatePerfectScoreFeedback(
          difficulty,
          userContext
        );
        setFeedbackSections([perfectScoreFeedback]);
        // Auto-expand perfect score section
        setExpandedSections({ [perfectScoreFeedback.id]: true });
        setIsLoading(false);
        return;
      }

      // Enhanced approach: Process each incorrect answer individually with details
      // This ensures personalised feedback for each specific question
      const questionFeedbackPromises = incorrectAnswers.map(
        async (answer, index) => {
          // Use the original question index if available
          const questionNumber = answer.questionIndex || index + 1;
          const questionIdentifier = `q-${questionNumber}-${answer.question
            .substring(0, 20)
            .replace(/\s+/g, "-")
            .toLowerCase()}`;

          if (processedQuestions[questionIdentifier]) {
            return {
              ...processedQuestions[questionIdentifier],
              questionNumber, // Make sure we add the question number
            };
          }

          // Get feedback for this specific question
          try {
            if (!ollamaAvailable) {
              throw new Error("Ollama not available");
            }

            const feedback = await generateQuestionFeedback(
              answer,
              difficulty,
              userContext
            );
            return {
              ...feedback,
              questionId: questionIdentifier,
              questionNumber, // Add the question number for display
              isAiGenerated: true, // Mark as AI-generated
            };
          } catch (err) {
            // Set the global fallback flag if we encounter errors
            setIsUsingFallback(true);
            console.error(
              `Using fallback for question: ${answer.question}`,
              err
            );

            // Provide fallback feedback - ensure variety with the index
            return {
              id: questionIdentifier,
              title: `Understanding: ${answer.question.substring(0, 40)}...`,
              importance: getFallbackImportance(index),
              keyPoints: getFallbackKeyPoints(index, answer.question),
              practicalTips: getFallbackPracticalTips(index),
              resources: getFallbackResources(index),
              questionId: questionIdentifier,
              questionNumber,
              isAiGenerated: false, // Mark as not AI-generated
            };
          }
        }
      );

      // Wait for all feedback to be generated
      const individualFeedback = await Promise.all(questionFeedbackPromises);

      // Update processed questions cache
      const newProcessedQuestions = {};
      individualFeedback.forEach((feedback) => {
        newProcessedQuestions[feedback.questionId] = feedback;
      });
      setProcessedQuestions(newProcessedQuestions);

      // Set feedback sections
      setFeedbackSections(individualFeedback);

      // Auto-expand the first section
      if (individualFeedback.length > 0) {
        setExpandedSections({ [individualFeedback[0].id]: true });
      }
    } catch (error) {
      console.error("Error generating AI feedback:", error);
      setError(
        "Failed to generate personalised feedback. Please try again later."
      );
      setIsUsingFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Provide varied fallback content based on the index to avoid duplicates
  const getFallbackImportance = (index) => {
    const importanceOptions = [
      "This concept is crucial for identifying and avoiding common security threats in everyday digital interactions.",
      "Understanding this security principle is essential for protecting sensitive information and preventing unauthorised access.",
      "Recognising these warning signs is a fundamental skill for maintaining strong security posture in modern environments.",
      "This security practice forms a critical defense layer against increasingly sophisticated cyber attacks.",
      "Mastering this security concept will significantly improve your ability to detect and respond to potential threats.",
    ];
    return importanceOptions[index % importanceOptions.length];
  };

  const getFallbackKeyPoints = (index, question) => {
    // Create some variety in the key points based on the question content
    const questionLower = question.toLowerCase();

    // Default key points
    const defaultPoints = [
      "Always verify the source of communications before taking any action",
      "Be skeptical of requests creating urgency or threatening negative consequences",
      "Check for inconsistencies in branding, language, or technical details",
      "Trust your instincts when something feels suspicious or unusual",
    ];

    // Email specific points
    if (questionLower.includes("email") || questionLower.includes("phish")) {
      return [
        "Always check the sender's full email address, not just the display name",
        "Hover over links to verify their actual destination before clicking",
        "Be wary of emails with poor grammar, spelling errors, or unusual formatting",
        "Never download attachments from unexpected or suspicious emails",
      ];
    }

    // Password related points
    if (
      questionLower.includes("password") ||
      questionLower.includes("credential")
    ) {
      return [
        "Use unique, complex passwords for each different account or service",
        "Enable multi-factor authentication wherever possible",
        "Never share your passwords or authentication codes with others",
        "Consider using a reputable password manager to generate and store strong passwords",
      ];
    }

    // Website security points
    if (questionLower.includes("website") || questionLower.includes("url")) {
      return [
        "Always check the URL carefully for misspellings or unusual domains",
        "Verify the site has HTTPS (though phishing sites can use this too)",
        "Be cautious about entering sensitive information on unfamiliar websites",
        "Look for poor design quality, unusual layouts, or outdated elements",
      ];
    }

    // Social engineering points
    if (
      questionLower.includes("social") ||
      questionLower.includes("call") ||
      questionLower.includes("text")
    ) {
      return [
        "Verify unexpected requests through a different, known contact channel",
        "Be suspicious of artificial urgency or pressure to act quickly",
        "Don't provide sensitive information to someone who contacted you first",
        "Remember that authority can be faked - verify through established procedures",
      ];
    }

    // Return default if no specific content detected, with slight variation based on index
    return [
      defaultPoints[0],
      defaultPoints[(index % 4) + 1],
      defaultPoints[((index + 1) % 4) + 1],
      defaultPoints[((index + 2) % 4) + 1],
    ];
  };

  const getFallbackPracticalTips = (index) => {
    const tipSets = [
      [
        "Use a password manager to generate and store unique credentials",
        "Enable multi-factor authentication on all important accounts",
        "Verify requests through separate communication channels",
      ],
      [
        "Bookmark important websites rather than following email links",
        "Set up advanced email filtering and authentication",
        "Keep all software and devices updated with security patches",
      ],
      [
        "Learn to recognise the warning signs of social engineering attempts",
        "Create a personal verification protocol for unexpected requests",
        "Practice the principle of least privilege in digital interactions",
      ],
      [
        "Hover over links before clicking to verify their destination",
        "Check sender details carefully before taking action on emails",
        "Report suspicious communications to your IT security team",
      ],
      [
        "Use secure, private browsing modes when accessing sensitive accounts",
        "Review your account privacy and security settings regularly",
        "Implement a personal security incident response plan",
      ],
    ];
    return tipSets[index % tipSets.length];
  };

  const getFallbackResources = (index) => {
    const resourceSets = [
      [
        "SANS Security Awareness Training",
        "Cybersecurity & Infrastructure Security Agency (CISA) resources",
      ],
      [
        "National Cyber Security Centre (NCSC) guidance",
        "Have I Been Pwned? for checking account compromises",
      ],
      [
        "Anti-Phishing Working Group (APWG) resources",
        "Federal Trade Commission (FTC) Identity Theft resources",
      ],
      [
        "OWASP Top 10 Web Application Security Risks",
        "Digital Guardian Data Security blog",
      ],
      ["Krebs on Security blog", "NIST Cybersecurity Framework"],
    ];
    return resourceSets[index % resourceSets.length];
  };

  // New function to generate feedback for a specific question
  const generateQuestionFeedback = async (answer, difficulty, userContext) => {
    try {
      // Get question-specific feedback from the service
      const feedbackData = await OllamaService.generateSingleQuestionFeedback(
        answer,
        difficulty,
        userContext
      );

      return formatFeedbackSection(feedbackData);
    } catch (error) {
      console.error("Error generating question feedback:", error);
      throw error;
    }
  };

  // Format topic feedback data into section format
  const formatFeedbackSection = (topicData) => {
    // Ensure ID is created from title if not present
    const id =
      topicData.id || topicData.title.replace(/\s+/g, "-").toLowerCase();

    // Perfect score has different structure
    if (id === "perfect-score" || id.includes("perfect")) {
      return {
        id,
        title: topicData.title || "Perfect Score - Excellent Work!",
        congratulations: topicData.importance || topicData.congratulations,
        nextSteps: topicData.keyPoints || topicData.nextSteps,
        advancedResources: topicData.resources || topicData.advancedResources,
        isPerfectScore: true,
        isAiGenerated: !isUsingFallback && ollamaAvailable,
      };
    }

    // Regular topic feedback
    return {
      id,
      title: topicData.title,
      importance: topicData.importance,
      keyPoints: topicData.keyPoints || [],
      practicalTips: topicData.practicalTips || [],
      resources: topicData.resources || [],
      questionsCount: topicData.questionsCount || 1,
      examples: topicData.examples || [], // Support for examples if provided
      isAiGenerated:
        topicData.isAiGenerated !== undefined
          ? topicData.isAiGenerated
          : !isUsingFallback && ollamaAvailable,
    };
  };

  const generatePerfectScoreFeedback = async (difficulty, userContext) => {
    try {
      // Only try to get AI feedback if Ollama is available
      if (ollamaAvailable) {
        // Get perfect score feedback from the service
        const feedbackData = await OllamaService.generatePerfectScoreFeedback(
          difficulty,
          userContext
        );

        return {
          id: "perfect-score",
          title: feedbackData.title || "Perfect Score - Excellent Work!",
          congratulations:
            feedbackData.importance ||
            "Excellent work! You've demonstrated a thorough understanding of cybersecurity concepts at this level.",
          nextSteps: feedbackData.keyPoints || [
            "Consider exploring more advanced threat models and attack vectors",
            "Look into specialised security domains like cloud security or secure software development",
            "Practice with hands-on security labs and simulations",
          ],
          advancedResources: feedbackData.resources || [
            "SANS Institute courses and resources",
            "The Web Application Hacker's Handbook",
          ],
          isPerfectScore: true,
          isAiGenerated: true,
        };
      } else {
        throw new Error("Ollama not available for perfect score feedback");
      }
    } catch (error) {
      console.error("Error generating perfect score feedback:", error);
      setIsUsingFallback(true);

      // Return fallback perfect score feedback
      return {
        id: "perfect-score",
        title: "Perfect Score - Excellent Work!",
        congratulations:
          "Excellent work! You've demonstrated a thorough understanding of cybersecurity concepts at this level.",
        nextSteps: [
          "Consider exploring more advanced threat models and attack vectors",
          "Look into specialised security domains like cloud security or secure software development",
          "Practice with hands-on security labs and simulations",
        ],
        advancedResources: [
          "SANS Institute courses and resources",
          "The Web Application Hacker's Handbook",
        ],
        isPerfectScore: true,
        isAiGenerated: false,
      };
    }
  };

  // Handle perfect score section display
  const renderPerfectScoreSection = (section) => {
    const isExpanded = expandedSections[section.id] || false;

    return (
      <div className="feedback-section" key={section.id}>
        <div
          className="feedback-header"
          onClick={() => toggleSection(section.id)}
        >
          <div className="feedback-title-area">
            <FontAwesomeIcon
              icon={faUserGraduate}
              className="feedback-icon perfect"
            />
            <h3>{section.title}</h3>
            <span
              className={`source-badge ${
                section.isAiGenerated ? "ai" : "static"
              }`}
            >
              <FontAwesomeIcon icon={section.isAiGenerated ? faRobot : faCog} />
              <span className="source-text">
                {section.isAiGenerated ? "AI-Generated" : "Standard Feedback"}
              </span>
            </span>
          </div>
          <FontAwesomeIcon
            icon={isExpanded ? faChevronUp : faChevronDown}
            className="expand-icon"
          />
        </div>

        {isExpanded && (
          <div className="feedback-content">
            <p className="perfect-score-congrats">{section.congratulations}</p>

            <div className="feedback-subsection">
              <h4>
                <FontAwesomeIcon icon={faBrain} className="subsection-icon" />
                Next Steps to Advance Your Knowledge
              </h4>
              <ul className="feedback-list">
                {section.nextSteps.map((step, index) => (
                  <li key={`step-${index}`}>{step}</li>
                ))}
              </ul>
            </div>

            <div className="feedback-subsection">
              <h4>
                <FontAwesomeIcon icon={faBook} className="subsection-icon" />
                Advanced Resources
              </h4>
              <ul className="feedback-list resources-list">
                {section.advancedResources.map((resource, index) => (
                  <li key={`resource-${index}`}>{resource}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Handle topic feedback section display
  const renderTopicFeedbackSection = (section) => {
    const isExpanded = expandedSections[section.id] || false;

    return (
      <div className="feedback-section" key={section.id}>
        <div
          className="feedback-header"
          onClick={() => toggleSection(section.id)}
        >
          <div className="feedback-title-area">
            <FontAwesomeIcon icon={faLightbulb} className="feedback-icon" />
            <h3>
              {/* Include question number if available */}
              {section.questionNumber && (
                <span className="question-number">
                  Q{section.questionNumber}:{" "}
                </span>
              )}
              {section.title}
            </h3>
            <span
              className={`source-badge ${
                section.isAiGenerated ? "ai" : "static"
              }`}
            >
              <FontAwesomeIcon icon={section.isAiGenerated ? faRobot : faCog} />
              <span className="source-text">
                {section.isAiGenerated ? "AI-Generated" : "Standard Feedback"}
              </span>
            </span>
          </div>
          <FontAwesomeIcon
            icon={isExpanded ? faChevronUp : faChevronDown}
            className="expand-icon"
          />
        </div>

        {isExpanded && (
          <div className="feedback-content">
            <p className="importance-statement">{section.importance}</p>

            <div className="feedback-subsection">
              <h4>
                <FontAwesomeIcon icon={faCheck} className="subsection-icon" />
                Key Points to Remember
              </h4>
              <ul className="feedback-list">
                {section.keyPoints.map((point, index) => (
                  <li key={`point-${index}`}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="feedback-subsection">
              <h4>
                <FontAwesomeIcon icon={faTools} className="subsection-icon" />
                Practical Tips
              </h4>
              <ul className="feedback-list tips-list">
                {section.practicalTips.map((tip, index) => (
                  <li key={`tip-${index}`}>{tip}</li>
                ))}
              </ul>
            </div>

            {section.examples && section.examples.length > 0 && (
              <div className="feedback-subsection">
                <h4>
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="subsection-icon"
                  />
                  Real-World Examples
                </h4>
                <ul className="feedback-list examples-list">
                  {section.examples.map((example, index) => (
                    <li key={`example-${index}`}>{example}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="feedback-subsection">
              <h4>
                <FontAwesomeIcon icon={faBook} className="subsection-icon" />
                Recommended Resources
              </h4>
              <ul className="feedback-list resources-list">
                {section.resources.map((resource, index) => (
                  <li key={`resource-${index}`}>{resource}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Progress section showing user improvement over time
  const renderProgressSection = () => {
    if (!userProgress) return null;

    return (
      <div className="user-progress-section">
        <h4>Your Learning Progress</h4>
        <div className="progress-stats">
          <div className="progress-stat">
            <span className="stat-label">Quizzes Taken</span>
            <span className="stat-value">{userProgress.quizzesTaken}</span>
          </div>
          <div className="progress-stat">
            <span className="stat-label">Average Score</span>
            <span className="stat-value">
              {userProgress.averageScore.toFixed(1)}%
            </span>
          </div>
          <div className="progress-stat">
            <span className="stat-label">Trend</span>
            <span className={`stat-value trend-${userProgress.trend}`}>
              {userProgress.improvement > 0 ? "+" : ""}
              {userProgress.improvement.toFixed(1)}%
            </span>
          </div>
        </div>

        {userProgress.consistentWeakAreas.length > 0 && (
          <div className="weak-areas">
            <span className="weak-areas-label">Focus areas:</span>
            {userProgress.consistentWeakAreas.map((area, index) => (
              <span key={`area-${index}`} className="weak-area-tag">
                {area}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render the Ollama status notification banner
  const renderOllamaStatusBanner = () => {
    if (!isUsingFallback) return null;

    return (
      <div className="ollama-status-banner">
        <FontAwesomeIcon icon={faCodeBranch} className="status-icon" />
        <div className="status-message">
          <span className="status-title">
            Using standard feedback templates
          </span>
          <span className="status-details">
            {ollamaAvailable
              ? "Personalised AI feedback couldn't be generated for some responses"
              : "Ollama AI service is not available"}
          </span>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="ollama-feedback-container loading">
        <div className="feedback-loading">
          <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
          <p>Analysing your quiz results to provide personalised feedback...</p>
          <p className="loading-subtext">
            Generating insights tailored to your performance
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ollama-feedback-container error">
        <div className="feedback-error">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="error-icon"
          />
          <p>{error}</p>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  // Personalised greeting based on quiz performance
  const getPersonalisedGreeting = () => {
    if (!userAnswers) return "";

    const totalQuestions = userAnswers.length;
    const correctAnswers = userAnswers.filter(
      (a) => a.isCorrect || (a.score && a.score >= 70)
    ).length;
    const percentCorrect = (correctAnswers / totalQuestions) * 100;

    let greeting = "";

    if (userName) {
      greeting += `${userName}, `;
    }

    if (percentCorrect === 100) {
      greeting += "excellent work on achieving a perfect score!";
    } else if (percentCorrect >= 80) {
      greeting +=
        "great job on the quiz! Here's some targeted feedback to help you improve even further.";
    } else if (percentCorrect >= 60) {
      greeting +=
        "you're making good progress. Let's focus on strengthening these key areas.";
    } else {
      greeting +=
        "Here's some personalised guidance to help you improve your security knowledge.";
    }

    return greeting;
  };

  return (
    <div className="ollama-feedback-container">
      <div className="feedback-header-main">
        <div className="feedback-title-main">
          <FontAwesomeIcon icon={faBrain} className="ai-icon" />
          <h2>Personalised Learning Recommendations</h2>
        </div>
        <div className="header-controls">
          <div className="expand-buttons">
            <button
              className="text-btn"
              onClick={() => toggleAllSections(true)}
            >
              Expand All
            </button>
            <span className="separator">|</span>
            <button
              className="text-btn"
              onClick={() => toggleAllSections(false)}
            >
              Collapse All
            </button>
          </div>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      {renderOllamaStatusBanner()}

      <div className="feedback-intro">
        <p>
          <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
          <span className="personalised-greeting">
            {getPersonalisedGreeting()}
          </span>
        </p>
      </div>

      {renderProgressSection()}

      <div className="feedback-sections">
        {feedbackSections.map((section) => {
          if (section.isPerfectScore) {
            return renderPerfectScoreSection(section);
          } else {
            return renderTopicFeedbackSection(section);
          }
        })}
      </div>

      <div className="feedback-footer">
        <p>
          <small>
            Powered by {ollamaAvailable ? "Ollama AI" : "Learning System"} •
            Personalised for your learning journey
          </small>
        </p>
      </div>

      <style jsx="true">{`
        .ollama-feedback-container {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.25rem;
          margin: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          color: #e0e0e0;
          font-size: 0.95rem;
        }

        .ollama-feedback-container.loading,
        .ollama-feedback-container.error {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        .feedback-header-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #333;
        }

        .feedback-title-main {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .feedback-title-main h2 {
          margin: 0;
          font-size: 1.3rem;
          color: #ffffff;
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .expand-buttons {
          display: flex;
          align-items: center;
          font-size: 0.85rem;
        }

        .text-btn {
          background: none;
          border: none;
          color: #3498db;
          cursor: pointer;
          font-size: 0.85rem;
          padding: 0;
        }

        .text-btn:hover {
          text-decoration: underline;
        }

        .separator {
          color: #555;
          margin: 0 8px;
        }

        .ai-icon {
          color: #646cff;
          font-size: 1.3rem;
        }

        .ollama-status-banner {
          display: flex;
          align-items: center;
          background-color: rgba(52, 73, 94, 0.7);
          padding: 8px 12px;
          border-radius: 6px;
          margin-bottom: 1rem;
          gap: 10px;
        }

        .status-icon {
          color: #f39c12;
          font-size: 1.1rem;
        }

        .status-message {
          display: flex;
          flex-direction: column;
        }

        .status-title {
          font-weight: 500;
          color: #f39c12;
          font-size: 0.9rem;
        }

        .status-details {
          font-size: 0.8rem;
          color: #bdc3c7;
        }

        .feedback-intro {
          background-color: rgba(52, 152, 219, 0.1);
          border-radius: 8px;
          padding: 10px 12px;
          margin-bottom: 1.25rem;
        }

        .feedback-intro p {
          margin: 0;
          color: #e0e0e0;
          font-size: 0.92rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .personalised-greeting {
          font-weight: 500;
        }

        .info-icon {
          color: #3498db;
          flex-shrink: 0;
        }

        .subsection-icon {
          color: #3498db;
          margin-right: 8px;
          font-size: 0.9rem;
        }

        .user-progress-section {
          background-color: rgba(46, 204, 113, 0.1);
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 1.25rem;
        }

        .user-progress-section h4 {
          color: #2ecc71;
          margin-top: 0;
          margin-bottom: 8px;
          font-size: 1rem;
        }

        .progress-stats {
          display: flex;
          gap: 20px;
          margin-bottom: 8px;
        }

        .progress-stat {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #bdc3c7;
        }

        .stat-value {
          font-size: 1.05rem;
          font-weight: 500;
          color: #e0e0e0;
        }

        .trend-improving {
          color: #2ecc71;
        }

        .trend-declining {
          color: #e74c3c;
        }

        .trend-stable {
          color: #f39c12;
        }

        .weak-areas {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }

        .weak-areas-label {
          font-size: 0.85rem;
          color: #bdc3c7;
        }

        .weak-area-tag {
          background-color: rgba(231, 76, 60, 0.2);
          color: #e74c3c;
          font-size: 0.8rem;
          padding: 3px 8px;
          border-radius: 12px;
        }

        .feedback-sections {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .feedback-section {
          background-color: #242424;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .feedback-section:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .feedback-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 1rem;
          cursor: pointer;
          background-color: #2c3e50;
          transition: background-color 0.2s ease;
        }

        .feedback-header:hover {
          background-color: #34495e;
        }

        .feedback-title-area {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          flex-wrap: wrap;
        }

        .feedback-title-area h3 {
          margin: 0;
          font-size: 1.05rem;
          color: #ffffff;
          line-height: 1.4;
        }

        .question-number {
          display: inline-block;
          color: #f39c12;
          font-weight: bold;
          margin-right: 2px;
        }

        .source-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          margin-left: 10px;
        }

        .source-badge.ai {
          background-color: rgba(46, 204, 113, 0.15);
          color: #2ecc71;
        }

        .source-badge.static {
          background-color: rgba(52, 152, 219, 0.15);
          color: #3498db;
        }

        .source-text {
          white-space: nowrap;
        }

        .feedback-icon {
          color: #f39c12;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .feedback-icon.perfect {
          color: #2ecc71;
        }

        .questions-count {
          background-color: rgba(255, 255, 255, 0.1);
          padding: 2px 6px;
          border-radius: 12px;
          font-size: 0.75rem;
          color: #bdc3c7;
          margin-left: 8px;
        }

        .expand-icon {
          color: #bdc3c7;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .feedback-content {
          padding: 1.1rem;
        }

        .importance-statement {
          color: #e0e0e0;
          font-style: italic;
          margin-top: 0;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .perfect-score-congrats {
          color: #2ecc71;
          font-weight: 500;
          margin-top: 0;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .feedback-subsection {
          margin-bottom: 1.1rem;
        }

        .feedback-subsection:last-child {
          margin-bottom: 0;
        }

        .feedback-subsection h4 {
          color: #3498db;
          margin-top: 0;
          margin-bottom: 0.6rem;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
        }

        .feedback-list {
          margin: 0;
          padding-left: 1.5rem;
          color: #e0e0e0;
        }

        .feedback-list li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        .feedback-list li:last-child {
          margin-bottom: 0;
        }

        .tips-list li {
          color: #f1c40f;
        }

        .resources-list li {
          color: #9b59b6;
        }

        .examples-list li {
          color: #3498db;
        }

        .loading-subtext {
          color: #95a5a6;
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }

        .feedback-loading,
        .feedback-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1.5rem;
        }

        .loading-icon {
          color: #3498db;
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .error-icon {
          color: #e74c3c;
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .close-btn {
          background-color: #34495e;
          color: white;
          border: none;
          padding: 0.4rem 0.9rem;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          font-size: 0.9rem;
        }

        .close-btn:hover {
          background-color: #2c3e50;
        }

        .feedback-footer {
          margin-top: 1.25rem;
          text-align: center;
          color: #95a5a6;
          font-size: 0.75rem;
        }

        /* Responsive styling */
        @media (max-width: 768px) {
          .ollama-feedback-container {
            padding: 1rem;
          }

          .feedback-title-main h2 {
            font-size: 1.1rem;
          }

          .feedback-title-area {
            flex-wrap: wrap;
          }

          .source-badge {
            margin-left: 0;
            margin-top: 4px;
          }

          .progress-stats {
            flex-direction: column;
            gap: 8px;
          }

          .expand-buttons {
            display: none;
          }

          .feedback-content {
            padding: 0.9rem;
          }

          .source-text {
            display: none;
          }

          .source-badge {
            padding: 3px 6px;
          }
        }
      `}</style>
    </div>
  );
};

export default OllamaFeedback;
