/**
 * OllamaService.js - Enhanced service for interacting with locally-running Ollama models
 * Provides more personalized and context-aware prompts for security feedback
 */

// Configuration for Ollama
const OLLAMA_CONFIG = {
  API_URL: 'http://localhost:11434/api/generate',
  DEFAULT_MODEL: 'llama3', // Use whichever model you have installed locally
  TIMEOUT: 30000, // 30 seconds timeout for responses
  MAX_RETRIES: 2,  // Number of retries if a request fails
  // Security topics taxonomy for better categorization
  SECURITY_TOPICS: {
    EMAIL_PHISHING: {
      keywords: ['email', 'phishing', 'attachment', 'sender', 'link'],
      related: ['business email compromise', 'spear phishing', 'whaling']
    },
    VISHING: {
      keywords: ['voice', 'vishing', 'phone', 'call', 'caller'],
      related: ['social engineering', 'pretexting', 'caller id spoofing']
    },
    SMISHING: {
      keywords: ['sms', 'text', 'smishing', 'message', 'texting'],
      related: ['mobile security', 'url shorteners', 'qr codes']
    },
    WEBSITE_PHISHING: {
      keywords: ['website', 'url', 'domain', 'ssl', 'https', 'certificate'],
      related: ['pharming', 'typosquatting', 'homograph attacks']
    },
    PASSWORD_SECURITY: {
      keywords: ['password', 'credential', 'authentication', 'login'],
      related: ['multi-factor authentication', 'password managers', 'biometrics']
    },
    SOCIAL_ENGINEERING: {
      keywords: ['social', 'engineering', 'manipulation', 'pretexting'],
      related: ['baiting', 'quid pro quo', 'tailgating', 'dumpster diving']
    }
  }
};

// Store previous responses to detect repetition
const responseCache = {
  feedbacks: [],
  // Check for similar content in previous responses
  isTooSimilar: function(newContent) {
    if (!newContent) return true;
    
    // Extract the importance statement for comparison
    let newImportance = '';
    if (typeof newContent === 'object' && newContent.importance) {
      newImportance = newContent.importance;
    } else if (typeof newContent === 'string') {
      try {
        const parsed = JSON.parse(newContent);
        newImportance = parsed.importance || '';
      } catch (e) {
        newImportance = newContent.substring(0, 100);
      }
    }
    
    // If we have an empty or very short importance, likely invalid
    if (!newImportance || newImportance.length < 20) return true;
    
    // Check against previous feedbacks
    for (const prev of this.feedbacks) {
      // If importance statements are too similar, consider it duplicate
      if (prev.importance && this.calculateSimilarity(prev.importance, newImportance) > 0.85) {
        console.warn("Detected very similar content to previous feedback");
        return true;
      }
    }
    
    return false;
  },
  // Calculate text similarity
  calculateSimilarity: function(str1, str2) {
    if (!str1 || !str2) return 0;
    
    // Simple word-overlap similarity metric
    const words1 = str1.toLowerCase().split(/\W+/).filter(w => w.length > 3);
    const words2 = str2.toLowerCase().split(/\W+/).filter(w => w.length > 3);
    
    // Count common words
    const common = words1.filter(word => words2.includes(word)).length;
    
    // Calculate Jaccard similarity
    return common / (words1.length + words2.length - common);
  },
  addFeedback: function(feedback) {
    // Only store valid feedback objects
    if (feedback && typeof feedback === 'object') {
      this.feedbacks.push(feedback);
      
      // Limit cache size
      if (this.feedbacks.length > 10) {
        this.feedbacks.shift();
      }
    }
  },
  clear: function() {
    this.feedbacks = [];
  }
};

class OllamaService {
  /**
   * Generate a response from the Ollama model
   * @param {string} prompt - The prompt to send to the model
   * @param {Object} options - Additional options
   * @returns {Promise<string>} - The model's response
   */
  static async generateResponse(prompt, options = {}) {
    const { 
      model = OLLAMA_CONFIG.DEFAULT_MODEL,
      temperature = 0.7,
      maxTokens = 2048,
      stream = false,
      retries = 0,
      systemPrompt = null, // Parameter for system prompts
      forceUnique = false  // Force unique content compared to previous responses
    } = options;
    
    try {
      console.log(`Sending prompt to Ollama (${model})...`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), OLLAMA_CONFIG.TIMEOUT);
      
      // Add the system prompt if provided
      const fullPrompt = systemPrompt 
        ? `<s>\n${systemPrompt}\n</s>\n\n${prompt}`
        : prompt;
      
      const response = await fetch(OLLAMA_CONFIG.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          prompt: fullPrompt,
          stream: stream,
          options: {
            temperature: temperature,
            num_predict: maxTokens
          }
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Ollama API error: ${response.status} ${response.statusText} ${JSON.stringify(errorData)}`);
      }
      
      const data = await response.json();
      
      // Check for unique content if requested
      if (forceUnique) {
        try {
          const parsedResponse = JSON.parse(data.response);
          
          // If too similar to previous responses and we have retries left
          if (responseCache.isTooSimilar(parsedResponse) && retries < 2) {
            console.log("Response too similar to previous, retrying with higher temperature...");
            return this.generateResponse(prompt, {
              ...options,
              temperature: Math.min(temperature + 0.2, 1.0), // Increase temperature to get more varied responses
              retries: retries + 1
            });
          }
          
          // Add to cache if it seems valid
          responseCache.addFeedback(parsedResponse);
          
          return data.response;
        } catch (e) {
          // If can't parse as JSON, return as is
          return data.response;
        }
      }
      
      return data.response;
      
    } catch (error) {
      console.error('Error calling Ollama:', error);
      
      // Retry logic
      if (retries < OLLAMA_CONFIG.MAX_RETRIES) {
        console.log(`Retrying Ollama request (attempt ${retries + 1}/${OLLAMA_CONFIG.MAX_RETRIES})...`);
        return this.generateResponse(prompt, { ...options, retries: retries + 1 });
      }
      
      throw error;
    }
  }
  
  /**
   * Check if Ollama is available and running
   * @returns {Promise<boolean>} - True if Ollama is available
   */
  static async isAvailable() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // Short timeout for availability check
      
      const response = await fetch('http://localhost:11434/api/tags', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      return response.ok;
    } catch (error) {
      console.warn('Ollama is not available:', error.message);
      return false;
    }
  }
  
  /**
   * Get a list of available models from Ollama
   * @returns {Promise<string[]>} - Array of available model names
   */
  static async getAvailableModels() {
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      
      if (!response.ok) {
        throw new Error(`Failed to get models: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.models?.map(model => model.name) || [];
    } catch (error) {
      console.error('Error getting Ollama models:', error);
      return [];
    }
  }

  /**
   * Enhanced categorization of questions based on content analysis
   * @param {Array} questions - Array of question objects
   * @returns {Object} - Categorized questions by topic
   */
  static categorizeQuestions(questions) {
    const categorizedQuestions = {};
    
    questions.forEach(question => {
      // Get the question text to analyze
      const questionText = question.question.toLowerCase();
      
      // First try to categorize by explicit type
      if (question.type) {
        let category;
        switch (question.type) {
          case 'email_phishing':
            category = 'EMAIL_PHISHING';
            break;
          case 'vishing':
            category = 'VISHING';
            break;
          case 'smishing':
            category = 'SMISHING';
            break;
          case 'website_phishing':
            category = 'WEBSITE_PHISHING';
            break;
          default:
            category = null;
        }
        
        if (category) {
          categorizedQuestions[category] = categorizedQuestions[category] || [];
          categorizedQuestions[category].push(question);
          return;
        }
      }
      
      // If no type or not categorized yet, use content analysis
      let bestMatchScore = 0;
      let bestMatchCategory = 'GENERAL_SECURITY';
      
      // Check each topic category for keyword matches
      Object.entries(OLLAMA_CONFIG.SECURITY_TOPICS).forEach(([category, data]) => {
        let score = 0;
        
        // Check primary keywords
        data.keywords.forEach(keyword => {
          if (questionText.includes(keyword)) {
            score += 2;
          }
        });
        
        // Check related concepts (lower weight)
        data.related.forEach(concept => {
          if (questionText.includes(concept)) {
            score += 1;
          }
        });
        
        if (score > bestMatchScore) {
          bestMatchScore = score;
          bestMatchCategory = category;
        }
      });
      
      // Add question to best matching category
      categorizedQuestions[bestMatchCategory] = categorizedQuestions[bestMatchCategory] || [];
      categorizedQuestions[bestMatchCategory].push(question);
    });
    
    return categorizedQuestions;
  }
  
  /**
   * Generate personalised feedback for a quiz using Ollama with enhanced prompts
   * @param {Array} quizData - The quiz data with user's answers
   * @param {string} difficulty - Quiz difficulty level
   * @param {Object} userContext - Optional additional user context
   * @returns {Promise<Object>} - Structured feedback object
   */
  static async generateQuizFeedback(quizData, difficulty, userContext = {}) {
    // Reset response cache for a new quiz
    responseCache.clear();
    
    // Check if Ollama is available first
    const available = await this.isAvailable();
    if (!available) {
      console.warn('Ollama is not available. Using fallback feedback generation.');
      return this.generateFallbackFeedback(quizData, difficulty);
    }
    
    // Extract incorrect answers
    const incorrectAnswers = quizData.filter(answer => {
      if (answer.isCorrect !== undefined) {
        return !answer.isCorrect;
      }
      return (answer.score || 0) < 70;
    });
    
    if (incorrectAnswers.length === 0) {
      return this.generatePerfectScoreFeedback(difficulty, userContext);
    }
    
    // Enhanced categorization
    const categorizedQuestions = this.categorizeQuestions(incorrectAnswers);
    
    // Prepare topic-specific prompts for each category
    const topicPromises = Object.entries(categorizedQuestions).map(async ([category, questions]) => {
      return this.generateTopicFeedback(category, questions, difficulty, userContext);
    });
    
    try {
      // Get all topic feedback
      const topicFeedbacks = await Promise.all(topicPromises);
      
      // Combine into final feedback structure
      return {
        analysis: `Based on your quiz performance on this ${difficulty} level security assessment, we've identified ${topicFeedbacks.length} key areas for improvement.`,
        topics: topicFeedbacks
      };
    } catch (error) {
      console.error('Error generating quiz feedback with Ollama:', error);
      return this.generateFallbackFeedback(quizData, difficulty);
    }
  }
  
  /**
   * Generate feedback for a single specific question
   * @param {Object} questionData - Data for a single question
   * @param {string} difficulty - Quiz difficulty
   * @param {Object} userContext - User context
   * @returns {Promise<Object>} - Question-specific feedback
   */
  static async generateSingleQuestionFeedback(questionData, difficulty, userContext = {}) {
    // Check if Ollama is available
    const available = await this.isAvailable();
    if (!available) {
      console.warn('Ollama is not available. Using fallback feedback generation for question.');
      return this.generateFallbackQuestionFeedback(questionData);
    }

    try {
      // Make the question content more specific with unique details
      const questionNumber = questionData.questionIndex || "Unknown";
      const uniquePromptDetails = `Question #${questionNumber}: "${questionData.question}"`;
      
      // Create a detailed and specific prompt focused on this single question
      let questionDetails = '';
      
      // Format the question info differently based on question type
      if (questionData.type === 'multiple_choice' || !questionData.type) {
        questionDetails = `
Question #${questionNumber}: "${questionData.question}"
Type: Multiple Choice
User's answer: "${questionData.userAnswer || questionData.selectedOption || 'Not provided'}"
Correct answer: "${questionData.correctOption || 'Not provided'}"`;
      } else if (questionData.details) {
        // For special question types with details
        questionDetails = `
Question #${questionNumber}: "${questionData.question}"
Type: ${this.formatQuestionType(questionData.type)}
User's score: ${questionData.score || 0}%
Details: ${JSON.stringify(questionData.details, null, 2)}`;
      } else {
        // Basic info for other question types
        questionDetails = `
Question #${questionNumber}: "${questionData.question}"
Type: ${this.formatQuestionType(questionData.type)}
User's score: ${questionData.score || 0}%`;
      }
      
      // Add user context to create a more personalized experience
      const contextInfo = [];
      if (userContext.name) contextInfo.push(`User's name: ${userContext.name}`);
      if (userContext.role) contextInfo.push(`User's role: ${userContext.role}`);
      if (userContext.industry) contextInfo.push(`User's industry: ${userContext.industry}`);
      if (userContext.previousPerformance) contextInfo.push(`Previous quiz performance: ${userContext.previousPerformance}`);
      if (userContext.learningStyle) contextInfo.push(`Learning style preference: ${userContext.learningStyle}`);
      
      const userContextStr = contextInfo.length > 0 
        ? `\nAdditional context about the user:\n${contextInfo.join("\n")}`
        : '';
      
      // Craft a system prompt specifically for this question
      const systemPrompt = `You are an expert cybersecurity educator specializing in ${this.formatQuestionType(questionData.type || 'security awareness')}. 
Your task is to provide highly personalized, targeted feedback for Question #${questionNumber}: "${questionData.question}".
Focus exclusively on this particular question and the specific misconception evident in their incorrect answer.
Your feedback should be tailored to a ${difficulty} difficulty level and provide immediately actionable advice relevant to real-world scenarios.
Make your feedback UNIQUE and SPECIFIC to THIS EXACT question - do not provide generic cybersecurity advice.`;
      
      // Create a detailed question-specific prompt
      const prompt = `
I need your help creating personalized feedback for this specific security question that a user answered incorrectly.

QUESTION DETAILS:
${questionDetails}
${userContextStr}

Difficulty level: ${difficulty}

Based on this specific incorrect answer to Question #${questionNumber}, please provide:

1. A clear, concise title that accurately reflects the specific security concept in THIS question the user misunderstood (max 10 words)
2. Why understanding this SPECIFIC concept from Question #${questionNumber} is important (2 sentences maximum, emphasizing real-world impact)
3. 3-4 key learning points that DIRECTLY address the specific misconception shown in this particular answer
4. 2-3 practical tips they can apply immediately that are DIRECTLY related to this specific security concept
5. 1-2 reliable learning resources specific to this concept (just names of websites, tools, or content)

Format your response as JSON like this:
{
  "title": "A specific, descriptive title for this question's concept",
  "importance": "Why this specific concept matters...",
  "keyPoints": ["Point 1 addressing the specific misconception", "Point 2...", "Point 3..."],
  "practicalTips": ["Specific actionable tip 1", "Specific actionable tip 2"],
  "resources": ["Resource 1", "Resource 2"]
}

IMPORTANT: Make your feedback UNIQUE to Question #${questionNumber} - it must be COMPLETELY DIFFERENT from feedback for other questions. The user needs specific guidance related to THIS EXACT question, not generic cybersecurity advice.
`;
      
      // Call Ollama with the enhanced question-specific prompt
      const response = await this.generateResponse(prompt, {
        temperature: 0.8, // Higher temperature for more variety
        maxTokens: 2048,
        systemPrompt: systemPrompt,
        forceUnique: true // Force unique content compared to previous responses
      });
      
      try {
        // Parse the JSON response
        const parsedResponse = JSON.parse(response);
        
        // Verify the response has the expected structure
        if (!parsedResponse.title || !parsedResponse.importance) {
          console.warn("Invalid response structure from Ollama:", parsedResponse);
          throw new Error("Invalid response structure");
        }
        
        // Add question number and uniqueness flag to the title
        parsedResponse.title = this.ensureQuestionRelevantTitle(parsedResponse.title, questionData);
        
        return parsedResponse;
      } catch (error) {
        console.error("Error parsing Ollama response:", error);
        throw new Error("Failed to parse Ollama response");
      }
    } catch (error) {
      console.error(`Error generating feedback for specific question:`, error);
      
      // Return fallback feedback for this specific question
      return this.generateFallbackQuestionFeedback(questionData);
    }
  }
  
  /**
   * Ensure the title relates to the specific question
   */
  static ensureQuestionRelevantTitle(title, questionData) {
    // Extract key terms from the question
    const questionLower = questionData.question.toLowerCase();
    const questionTerms = questionLower.split(/\W+/).filter(word => 
      word.length > 3 && !['what', 'when', 'where', 'which', 'would', 'could', 'should', 'this', 'that', 'these', 'those'].includes(word)
    );
    
    // Check if the title contains any key terms from the question
    const titleLower = title.toLowerCase();
    const containsQuestionTerm = questionTerms.some(term => titleLower.includes(term));
    
    // If the title doesn't contain any question terms, make it more specific
    if (!containsQuestionTerm && questionTerms.length > 0) {
      // Get 1-2 key terms from the question
      const keyTerms = questionTerms.slice(0, 2).join(" and ");
      return `Understanding ${keyTerms}: ${title}`;
    }
    
    return title;
  }
  
  /**
   * Format question type into readable form
   * @param {string} type - Question type
   * @returns {string} - Formatted question type
   */
  static formatQuestionType(type) {
    switch (type) {
      case 'email_phishing': return 'Email Phishing Identification';
      case 'vishing': return 'Voice Phishing (Vishing)';
      case 'smishing': return 'SMS Phishing (Smishing)';
      case 'website_phishing': return 'Website Phishing Detection';
      case 'multiple_choice': return 'Security Knowledge';
      default: return type.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
  }

  /**
   * Generate feedback for a specific topic category
   * @param {string} category - The security topic category
   * @param {Array} questions - Questions in this category
   * @param {string} difficulty - Quiz difficulty
   * @param {Object} userContext - User context information
   * @returns {Promise<Object>} - Topic feedback
   */
  static async generateTopicFeedback(category, questions, difficulty, userContext) {
    // Format questions for the prompt
    const questionsText = questions.map((q, index) => {
      if (q.type === 'multiple_choice' || !q.type) {
        return `Question #${index+1}: "${q.question}"
User's answer: "${q.userAnswer || 'Not provided'}"
Correct answer: "${q.correctOption || 'Not provided'}"`;
      } else {
        return `Question #${index+1} Type: ${q.type}
Question: "${q.question}"
User's score: ${q.score || 0}%`;
      }
    }).join("\n\n");
    
    // Add user context to create a more personalized experience
    const contextInfo = [];
    if (userContext.role) contextInfo.push(`User's role: ${userContext.role}`);
    if (userContext.industry) contextInfo.push(`User's industry: ${userContext.industry}`);
    if (userContext.previousPerformance) contextInfo.push(`Previous quiz performance: ${userContext.previousPerformance}`);
    if (userContext.learningStyle) contextInfo.push(`Learning style preference: ${userContext.learningStyle}`);
    
    const userContextStr = contextInfo.length > 0 
      ? `\nAdditional context about the user:\n${contextInfo.join("\n")}`
      : '';
    
    // Enhanced system prompt for better framing
    const systemPrompt = `You are an expert cybersecurity educator specializing in ${this.formatCategoryName(category)}. 
Your task is to provide personalized, actionable feedback that helps the user improve their security knowledge and practical skills.
Your feedback should be tailored to a ${difficulty} difficulty level, and should address specific misconceptions evident in their incorrect answers.
Always provide practical, immediately applicable advice that's relevant to real-world scenarios.`;
    
    // Create a detailed topic-specific prompt
    const prompt = `
I need your help creating personalized feedback for a user who took a cybersecurity quiz.

Topic: ${this.formatCategoryName(category)}
Difficulty level: ${difficulty}${userContextStr}

The user answered these questions incorrectly:
${questionsText}

Based on these specific errors, please provide:

1. Why this topic is important (2 sentences maximum, emphasizing real-world impact)
2. 3-4 key learning points that directly address the misconceptions shown in their wrong answers
3. 2-3 practical tips they can apply immediately in their daily digital life or workplace
4. 1-2 reliable learning resources specific to this topic (just names of websites, tools, or content)

Format your response as JSON like this:
{
  "title": "A specific, descriptive title for this topic area",
  "importance": "Why this topic matters...",
  "keyPoints": ["Point 1 addressing specific misconception", "Point 2...", "Point 3..."],
  "practicalTips": ["Specific actionable tip 1", "Specific actionable tip 2"],
  "resources": ["Resource 1", "Resource 2"]
}

Make your feedback conversational, encouraging, and precisely targeted to the user's specific knowledge gaps.
`;
    
    try {
      // Call Ollama with the enhanced prompt
      const response = await this.generateResponse(prompt, {
        temperature: 0.7,
        maxTokens: 2048,
        systemPrompt: systemPrompt
      });
      
      // Parse the JSON response
      return JSON.parse(response);
    } catch (error) {
      console.error(`Error generating feedback for ${category}:`, error);
      
      // Return fallback topic feedback
      return this.generateFallbackTopicFeedback(category);
    }
  }
  
  /**
   * Format a category name from constant to readable form
   * @param {string} category - Category constant
   * @returns {string} - Human-readable category name
   */
  static formatCategoryName(category) {
    switch (category) {
      case 'EMAIL_PHISHING': return 'Email Phishing';
      case 'VISHING': return 'Voice Phishing (Vishing)';
      case 'SMISHING': return 'SMS Phishing (Smishing)';
      case 'WEBSITE_PHISHING': return 'Website Phishing Detection';
      case 'PASSWORD_SECURITY': return 'Password Security';
      case 'SOCIAL_ENGINEERING': return 'Social Engineering Tactics';
      case 'GENERAL_SECURITY': return 'General Security Awareness';
      default: return category.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');
    }
  }
  
  /**
   * Generate fallback feedback for a specific question
   * @param {Object} questionData - The question data
   * @returns {Object} - Fallback question feedback
   */
  static generateFallbackQuestionFeedback(questionData) {
    // Extract question information
    const questionNumber = questionData.questionIndex || Math.floor(Math.random() * 20) + 1;
    const questionType = questionData.type || 'multiple_choice';
    const questionText = questionData.question || '';
    
    // Create a title based on the question
    const titleFromQuestion = this.generateTitleFromQuestion(questionText, questionNumber);
    
    // Get feedback based on question content
    return this.generateContentBasedFeedback(questionType, questionText, questionNumber, titleFromQuestion);
  }
  
  /**
   * Generate a title based on the question content
   * @param {string} questionText - The question text
   * @param {number} questionNumber - The question number
   * @returns {string} - Generated title
   */
  static generateTitleFromQuestion(questionText, questionNumber) {
    const lowerQuestion = questionText.toLowerCase();
    
    // Check for common question patterns
    if (lowerQuestion.includes('phishing') && lowerQuestion.includes('email')) {
      return `Email Phishing Detection (#${questionNumber})`;
    } else if (lowerQuestion.includes('smishing') || (lowerQuestion.includes('sms') && lowerQuestion.includes('phishing'))) {
      return `SMS Phishing Awareness (#${questionNumber})`;
    } else if (lowerQuestion.includes('vishing') || (lowerQuestion.includes('phone') && lowerQuestion.includes('call'))) {
      return `Voice Phishing Defense (#${questionNumber})`;
    } else if (lowerQuestion.includes('password')) {
      return `Password Security Best Practices (#${questionNumber})`;
    } else if (lowerQuestion.includes('social engineering')) {
      return `Social Engineering Awareness (#${questionNumber})`;
    } else if (lowerQuestion.includes('website') || lowerQuestion.includes('url')) {
      return `Website Security Verification (#${questionNumber})`;
    } else if (lowerQuestion.includes('authentication') || lowerQuestion.includes('login')) {
      return `Authentication Security (#${questionNumber})`;
    }
    
    // Extract key terms from the question for a more specific title
    const words = questionText.split(/\W+/).filter(word => 
      word.length > 3 && !['what', 'when', 'where', 'which', 'would', 'could', 'should', 'this', 'that', 'these', 'those'].includes(word.toLowerCase())
    );
    
    if (words.length >= 2) {
      const key1 = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
      const key2 = words[Math.floor(words.length/2)].toLowerCase();
      return `${key1} ${key2} Security (#${questionNumber})`;
    }
    
    // Generic title with question number for uniqueness
    return `Security Concept for Question #${questionNumber}`;
  }
  
  /**
   * Generate feedback based on question content
   * @param {string} questionType - The question type
   * @param {string} questionText - The question text
   * @param {number} questionNumber - The question number
   * @param {string} title - The generated title
   * @returns {Object} - Feedback based on content
   */
  static generateContentBasedFeedback(questionType, questionText, questionNumber, title) {
    const lowerQuestion = questionText.toLowerCase();
    
    // Email phishing specific feedback
    if (questionType === 'email_phishing' || lowerQuestion.includes('email') || lowerQuestion.includes('phish')) {
      // Determine specific subtype of email phishing based on question
      let subtype = 'general';
      if (lowerQuestion.includes('spear')) subtype = 'spear';
      if (lowerQuestion.includes('attachment')) subtype = 'attachment';
      if (lowerQuestion.includes('link')) subtype = 'link';
      if (lowerQuestion.includes('urgent') || lowerQuestion.includes('emergency')) subtype = 'urgency';
      
      return this.getEmailPhishingFeedback(subtype, questionNumber, title);
    }
    
    // SMS phishing specific feedback
    if (questionType === 'smishing' || lowerQuestion.includes('sms') || lowerQuestion.includes('text message')) {
      return this.getSmishingFeedback(questionNumber, title);
    }
    
    // Voice phishing specific feedback
    if (questionType === 'vishing' || lowerQuestion.includes('phone') || lowerQuestion.includes('call')) {
      return this.getVishingFeedback(questionNumber, title);
    }
    
    // Website phishing specific feedback
    if (questionType === 'website_phishing' || lowerQuestion.includes('website') || lowerQuestion.includes('url')) {
      return this.getWebsitePhishingFeedback(questionNumber, title);
    }
    
    // Password security specific feedback
    if (lowerQuestion.includes('password') || lowerQuestion.includes('credential')) {
      return this.getPasswordSecurityFeedback(questionNumber, title);
    }
    
    // Social engineering specific feedback
    if (lowerQuestion.includes('social') || lowerQuestion.includes('engineer')) {
      return this.getSocialEngineeringFeedback(questionNumber, title);
    }
    
    // Default to general security
    return this.getGeneralSecurityFeedback(questionNumber, title, lowerQuestion);
  }
  
  /**
   * Get email phishing feedback based on subtype
   */
  static getEmailPhishingFeedback(subtype, questionNumber, title) {
    // Base importance statement
    const baseImportance = "Email phishing remains the most common initial vector for security breaches, accounting for over 90% of successful cyber attacks.";
    
    // Customize based on subtype
    switch (subtype) {
      case 'spear':
        return {
          title,
          importance: "Spear phishing attacks are targeted, highly personalized, and research-driven, making them significantly more effective than mass phishing attempts.",
          keyPoints: [
            "Spear phishing emails contain personalized information gathered from your digital footprint",
            "These attacks often appear to come from trusted colleagues, superiors, or organizations you regularly interact with",
            "They typically reference specific projects, recent communications, or organizational events to establish credibility",
            "Even sophisticated users can fall victim due to the highly convincing nature of these targeted messages"
          ],
          practicalTips: [
            "Verify unexpected requests from colleagues through a different communication channel",
            "Be cautious of emails requesting sensitive information or action, even when they appear to come from known contacts",
            "Check email headers and sender addresses for subtle inconsistencies"
          ],
          resources: [
            "SANS Securing The Human: Spear Phishing training",
            "Cybersecurity & Infrastructure Security Agency (CISA) spear phishing resources"
          ]
        };
      
      case 'attachment':
        return {
          title,
          importance: "Malicious email attachments remain one of the primary delivery mechanisms for malware, including ransomware that can cripple entire organizations.",
          keyPoints: [
            "Even attachments that appear to be harmless document types can contain dangerous macros or exploits",
            "File extensions can be disguised to make executable files appear as documents",
            "Password-protected attachments may bypass security scanning systems",
            "Modern malware can spread through your network after a single infected attachment is opened"
          ],
          practicalTips: [
            "Never open attachments from unexpected emails, even if they appear to come from known contacts",
            "Use a document viewer or preview mode before downloading or opening attachments",
            "Disable automatic macro execution in office applications"
          ],
          resources: [
            "SANS Malicious Document Analysis course resources",
            "Microsoft Office security practices guide"
          ]
        };
      
      case 'link':
        return {
          title,
          importance: "Malicious links in emails lead to credential theft, malware installation, and financial fraud, often through sophisticated fake websites.",
          keyPoints: [
            "Phishing links can lead to perfect replicas of legitimate websites designed to steal credentials",
            "URLs can be disguised through URL shorteners, typosquatting, or homograph attacks using similar-looking characters",
            "Hovering over a link shows the actual destination, which may differ from the text displayed",
            "Some malicious links execute drive-by downloads or browser exploits when clicked"
          ],
          practicalTips: [
            "Hover over links to verify their actual destination before clicking",
            "Access sensitive websites directly through your bookmarks rather than email links",
            "Look for HTTPS and verify the domain name carefully before entering credentials"
          ],
          resources: [
            "PhishTank database of reported phishing URLs",
            "APWG Global Phishing Survey"
          ]
        };
      
      case 'urgency':
        return {
          title,
          importance: "Urgency and fear tactics in phishing emails exploit human psychology to bypass rational security thinking and trigger immediate action.",
          keyPoints: [
            "Creating artificial time pressure prevents victims from carefully evaluating the message",
            "Fear of negative consequences (account closure, legal action) can override security caution",
            "Messages claiming to be from authority figures exploit our tendency to comply with authority",
            "Emotional manipulation reduces critical thinking about security red flags"
          ],
          practicalTips: [
            "Take a moment to pause and evaluate any email creating a sense of urgency",
            "Verify urgent requests through official channels, not by replying to the email",
            "Remember that legitimate organizations rarely demand immediate action via email"
          ],
          resources: [
            "SANS Security Awareness: Social Engineering tactics training",
            "Federal Trade Commission (FTC) Scam Alert resources"
          ]
        };
      
      default:
        return {
          title,
          importance: baseImportance,
          keyPoints: [
            "Always verify the sender's actual email address, not just the display name which can be easily spoofed",
            "Look for linguistic errors, unusual formatting, and inconsistent branding that indicate phishing",
            "Be suspicious of unexpected attachments, links, or requests for sensitive information",
            "Consider the context: unexpected emails, especially with urgent requests, warrant extra scrutiny"
          ],
          practicalTips: [
            "Hover over links to reveal the actual URL destination before clicking",
            "Contact the purported sender through a different channel if an email seems suspicious",
            "Use email authentication protocols like DMARC, SPF, and DKIM in your organization"
          ],
          resources: [
            "Anti-Phishing Working Group (APWG) resources",
            "SANS 'Securing The Human' Email Security Training"
          ]
        };
    }
  }
  
  /**
   * Get SMS phishing (smishing) feedback
   */
  static getSmishingFeedback(questionNumber, title) {
    return {
      title,
      importance: "SMS phishing (smishing) exploits the higher open rates and trust associated with text messages, along with the limited security features on mobile devices.",
      keyPoints: [
        "Mobile interfaces make URL verification more difficult than on desktop devices",
        "Text messages have extremely high open and response rates compared to email",
        "Shortened URLs in SMS messages obscure the actual destination",
        "Mobile phones often lack the security tools commonly available on computers"
      ],
      practicalTips: [
        "Never click links in unsolicited text messages claiming to be from businesses",
        "Contact companies directly through their official app or website if you receive suspicious texts",
        "Use a spam reporting feature on your phone to report suspicious SMS messages"
      ],
      resources: [
        "FCC SMS phishing guidance",
        "Mobile Security Alliance resources"
      ]
    };
  }
  
  /**
   * Get voice phishing (vishing) feedback
   */
  static getVishingFeedback(questionNumber, title) {
    return {
      title,
      importance: "Voice phishing bypasses technical security controls by exploiting human trust through real-time conversation and caller ID spoofing.",
      keyPoints: [
        "Caller ID can be easily spoofed to display legitimate organization names or numbers",
        "Real-time conversation creates pressure to respond immediately without verification",
        "Human voices build trust and make it harder to detect deception compared to email",
        "Attackers often have prepared scripts and answers to anticipated questions"
      ],
      practicalTips: [
        "Never provide sensitive information to inbound callers, no matter how convincing they sound",
        "Hang up and call back using the official number from the organization's website",
        "Implement a verification protocol for unexpected calls in your organization"
      ],
      resources: [
        "FTC Phone Scam resources",
        "National Cyber Security Centre (NCSC) guidance on vishing"
      ]
    };
  }
  
  /**
   * Get website phishing feedback
   */
  static getWebsitePhishingFeedback(questionNumber, title) {
    return {
      title,
      importance: "Phishing websites have become increasingly sophisticated, often perfectly mimicking legitimate sites while harvesting credentials or distributing malware.",
      keyPoints: [
        "Modern phishing sites frequently use HTTPS certificates, making the padlock symbol an unreliable security indicator",
        "Domain typosquatting uses URLs that are visually similar to legitimate domains",
        "Many phishing sites now duplicate entire legitimate websites, including functional elements",
        "Homograph attacks use unicode characters that look identical to standard letters"
      ],
      practicalTips: [
        "Manually type important URLs or use bookmarks rather than following links",
        "Verify the full domain name carefully, including checking for extra subdomains",
        "Use a password manager, which won't auto-fill credentials on mismatched domains"
      ],
      resources: [
        "OWASP Web Security Testing Guide",
        "Google Safe Browsing resources"
      ]
    };
  }
  
  /**
   * Get password security feedback
   */
  static getPasswordSecurityFeedback(questionNumber, title) {
    return {
      title,
      importance: "Password compromise remains the primary method of account takeover, with poor password hygiene putting both personal and organizational security at risk.",
      keyPoints: [
        "Password reuse across sites means a breach at one service compromises all your accounts",
        "Length is more important than complexity - consider using longer passphrases",
        "Multi-factor authentication provides critical protection even if passwords are compromised",
        "Password managers generate, store, and auto-fill unique credentials for each service"
      ],
      practicalTips: [
        "Use a reputable password manager to create and store unique passwords",
        "Enable multi-factor authentication on all important accounts",
        "Check if your accounts have been involved in data breaches at haveibeenpwned.com"
      ],
      resources: [
        "NIST Digital Identity Guidelines",
        "EFF's Surveillance Self-Defense password recommendations"
      ]
    };
  }
  
  /**
   * Get social engineering feedback
   */
  static getSocialEngineeringFeedback(questionNumber, title) {
    return {
      title,
      importance: "Social engineering bypasses technical security measures by exploiting human psychology, making it the foundation of most successful cyber attacks.",
      keyPoints: [
        "Social engineers exploit universal human tendencies: trust, fear, urgency, and desire to help",
        "These attacks work across all communication channels: email, phone, text, social media, and in-person",
        "Sophisticated attacks often combine multiple approaches and research targets extensively",
        "Even security-conscious individuals can be vulnerable if the attacker has sufficient background information"
      ],
      practicalTips: [
        "Verify requests through a different, trusted communication channel",
        "Establish authentication procedures for sensitive requests within your organization",
        "Be skeptical of unexpected contact, especially those creating urgency or fear"
      ],
      resources: [
        "Social-Engineer.org Framework",
        "SANS Security Awareness social engineering modules"
      ]
    };
  }
  
  /**
   * Get general security feedback
   */
  static getGeneralSecurityFeedback(questionNumber, title, questionText) {
    // Extract some keywords from the question to make feedback more relevant
    const keywords = questionText.split(/\W+/).filter(word => 
      word.length > 3 && !['what', 'when', 'where', 'which', 'would', 'could', 'should', 'this', 'that', 'these', 'those'].includes(word.toLowerCase())
    );
    
    // Default feedback
    const baseFeedback = {
      title,
      importance: "A comprehensive understanding of security principles creates multiple layers of protection against the ever-evolving threat landscape.",
      keyPoints: [
        "Apply the principle of least privilege in all digital interactions",
        "Verify through trusted channels before taking action on unexpected requests",
        "Keep software and systems updated with security patches",
        "Trust your instincts when something seems suspicious"
      ],
      practicalTips: [
        "Use multi-factor authentication wherever available",
        "Back up important data regularly using the 3-2-1 rule",
        "Develop a personal security incident response plan"
      ],
      resources: [
        "SANS Security Awareness Training resources",
        "National Cybersecurity Alliance Stay Safe Online"
      ]
    };
    
    // Try to customize based on keywords from the question
    if (keywords.length > 0) {
      // Pick two random keywords
      const keyword1 = keywords[Math.floor(Math.random() * keywords.length)];
      const keyword2 = keywords[Math.floor(Math.random() * keywords.length)];
      
      // Customize one key point and one practical tip
      baseFeedback.keyPoints[0] = `Pay special attention to ${keyword1.toLowerCase()} when evaluating security situations`;
      baseFeedback.practicalTips[0] = `Regularly review your approach to ${keyword2.toLowerCase()} security to ensure best practices`;
    }
    
    // Always make the question number part of the title for uniqueness
    baseFeedback.title = `${baseFeedback.title} (#${questionNumber})`;
    
    return baseFeedback;
  }
  
  /**
   * Helper method to get fallback content by category
   * @param {string} category - Security category
   * @returns {Object} - Fallback content for the category
   */
  static getFallbackContentByCategory(category) {
    // Map of fallback content by category
    const fallbackContent = {
      'EMAIL_PHISHING': {
        importance: "Email phishing remains one of the most common initial attack vectors for security breaches in organizations.",
        keyPoints: [
          "Always verify the sender's email address by checking the actual email address, not just the display name",
          "Be suspicious of urgency, threatening language, or offers that seem too good to be true",
          "Check for grammatical errors, unusual formatting, and inconsistent branding",
          "Hover over links to verify their destination before clicking"
        ],
        practicalTips: [
          "Contact the purported sender through a different channel if an email seems suspicious",
          "Never enter credentials on a page you reached via an email link",
          "Set up advanced email filtering and enable email authentication protocols in your organization"
        ],
        resources: [
          "Anti-Phishing Working Group (APWG) resources",
          "SANS 'Securing The Human' Email Security Training"
        ]
      },
      'VISHING': {
        importance: "Voice phishing bypasses technical security controls by exploiting human trust through phone calls and is increasingly targeting remote workers.",
        keyPoints: [
          "Legitimate organizations rarely call you unexpectedly about technical or account issues",
          "Pressure tactics and creating artificial urgency are red flags in phone conversations",
          "Caller ID can be easily spoofed and should never be solely trusted for verification",
          "Requests for remote access to your computer are almost always malicious"
        ],
        practicalTips: [
          "Hang up and call back using the official number from the organization's website or your account statement",
          "Never provide sensitive information to inbound callers, no matter how convincing they sound",
          "Implement a verification protocol for phone-based requests in your organization"
        ],
        resources: [
          "Federal Trade Commission (FTC) Scam Alert resources",
          "National Cyber Security Centre (NCSC) guidance on social engineering"
        ]
      },
      'SMISHING': {
        importance: "SMS phishing exploits the trusted nature of text messages and the limited security features on mobile devices.",
        keyPoints: [
          "Legitimate organizations typically don't request sensitive information via text messages",
          "Shortened URLs in text messages are often used to hide malicious destinations",
          "Messages creating a sense of urgency or fear are common smishing tactics",
          "Mobile interfaces make it harder to verify sender authenticity"
        ],
        practicalTips: [
          "Never click links in suspicious text messages, instead go directly to the organization's website",
          "Verify requests through official channels before responding to SMS messages asking for information",
          "Report suspicious text messages to your mobile carrier's spam reporting service"
        ],
        resources: [
          "Mobile Security Alliance guidelines",
          "NCSC Mobile Device Guidance"
        ]
      },
      'WEBSITE_PHISHING': {
        importance: "Fake websites are increasingly sophisticated and can convincingly mimic legitimate sites to steal credentials and personal information.",
        keyPoints: [
          "Always check the URL carefully for subtle misspellings or different top-level domains",
          "Verify that HTTPS is being used (though phishing sites can use HTTPS too)",
          "Look for poor design quality, outdated logos, or unusual layouts",
          "Be cautious of websites asking for excessive or unusual information"
        ],
        practicalTips: [
          "Use bookmarks for sensitive websites rather than following links",
          "Enable multi-factor authentication to protect accounts even if credentials are compromised",
          "Use a password manager that won't auto-fill credentials on mismatched domain names"
        ],
        resources: [
          "Google Safe Browsing",
          "PhishTank database of reported phishing sites"
        ]
      },
      'PASSWORD_SECURITY': {
        importance: "Strong password management remains a fundamental defense against unauthorized access, especially as credential theft increases.",
        keyPoints: [
          "Use unique passwords for each account to prevent credential stuffing attacks",
          "Length is more important than complexity - aim for passphrases of 16+ characters",
          "Enable multi-factor authentication wherever available",
          "Regularly update critical passwords and after reported breaches"
        ],
        practicalTips: [
          "Use a reputable password manager to generate and store strong, unique passwords",
          "Check if your accounts have been compromised using services like Have I Been Pwned",
          "Consider using passkeys where available as a more secure alternative to passwords"
        ],
        resources: [
          "NIST Password Guidelines",
          "SANS Password Security Checklist"
        ]
      },
      'SOCIAL_ENGINEERING': {
        importance: "Social engineering attacks target human psychology rather than technical vulnerabilities, making them effective against even security-conscious organizations.",
        keyPoints: [
          "Verify requests through separate communication channels, especially for sensitive actions",
          "Be skeptical of artificial urgency or pressure tactics in any communication",
          "Trust your instincts when something feels unusual or too convenient",
          "Remember that authority can be faked - verify identity through established procedures"
        ],
        practicalTips: [
          "Establish clear verification procedures for sensitive requests in your organization",
          "Pause and think critically before acting on unexpected requests",
          "Never provide sensitive information to someone who contacted you first"
        ],
        resources: [
          "Social-Engineer.org Framework",
          "SANS Social Engineering Prevention Training"
        ]
      },
      'GENERAL_SECURITY': {
        importance: "A strong foundation in security principles helps you recognize and respond appropriately to a wide range of threats.",
        keyPoints: [
          "Verify requests through separate, trusted channels before taking action",
          "Be skeptical of urgency, pressure tactics, and unexpected communications",
          "Apply the principle of least privilege in all digital interactions",
          "Trust your instincts when something seems suspicious or unusual"
        ],
        practicalTips: [
          "Implement multi-factor authentication on all important accounts",
          "Keep all software updated with the latest security patches",
          "Use a password manager to create and store strong, unique passwords"
        ],
        resources: [
          "SANS Security Awareness Training resources",
          "National Cybersecurity Alliance Stay Safe Online resources"
        ]
      }
    };
    
    // Return specific fallback or generic fallback if category not found
    return fallbackContent[category] || fallbackContent['GENERAL_SECURITY'];
  }
  
  /**
   * Generate fallback topic feedback for a topic
   * @param {string} category - The security topic category
   * @returns {Object} - Fallback topic feedback
   */
  static generateFallbackTopicFeedback(category) {
    const fallbackBase = this.getFallbackContentByCategory(category);
    
    return {
      title: this.formatCategoryName(category),
      importance: fallbackBase.importance,
      keyPoints: fallbackBase.keyPoints,
      practicalTips: fallbackBase.practicalTips,
      resources: fallbackBase.resources
    };
  }
  
  /**
   * Generate feedback for perfect scores with enhanced personalization
   * @param {string} difficulty - Quiz difficulty level
   * @param {Object} userContext - User context information
   * @returns {Object} - Perfect score feedback
   */
  static async generatePerfectScoreFeedback(difficulty, userContext = {}) {
    try {
      // If Ollama is available, generate personalised perfect score feedback
      if (await this.isAvailable()) {
        // Enhanced system prompt for perfect score
        const systemPrompt = `You are an advanced cybersecurity education specialist providing feedback to a user who has demonstrated excellent understanding of security concepts. Your goal is to recognize their achievement while encouraging continued learning and advancement.`;
        
        // Add user context to create a more personalized experience
        const contextInfo = [];
        if (userContext.name) contextInfo.push(`User's name: ${userContext.name}`);
        if (userContext.role) contextInfo.push(`User's role: ${userContext.role}`);
        if (userContext.industry) contextInfo.push(`User's industry: ${userContext.industry}`);
        if (userContext.interests) contextInfo.push(`User's security interests: ${userContext.interests}`);
        if (userContext.careerGoals) contextInfo.push(`User's career goals: ${userContext.careerGoals}`);
        
        const userContextStr = contextInfo.length > 0 
          ? `\nPersonalization context:\n${contextInfo.join("\n")}`
          : '';
        
        const prompt = `
I need your help creating personalized feedback for a user who achieved a perfect score on a ${difficulty} level security quiz.${userContextStr}

Please provide:
1. A specific, genuinely encouraging congratulatory message that acknowledges their mastery (2-3 sentences)
2. 3-4 focused suggestions for how they can advance beyond this level, building on their demonstrated knowledge
3. 2-3 advanced resources specifically relevant to someone at their level looking to progress further

Format your response as JSON:
{
  "title": "A celebratory title acknowledging their achievement",
  "importance": "Brief statement on the value of their security knowledge",
  "keyPoints": ["Specific next-level suggestion 1", "Suggestion 2", "Suggestion 3"],
  "practicalTips": ["Advanced practice idea 1", "Advanced practice idea 2"],
  "resources": ["Advanced resource 1", "Advanced resource 2"]
}

Make your response genuinely encouraging while offering truly valuable next steps beyond what they've already mastered.
`;
        
        const response = await this.generateResponse(prompt, {
          temperature: 0.7,
          maxTokens: 1024,
          systemPrompt: systemPrompt
        });
        
        return JSON.parse(response);
      }
    } catch (error) {
      console.error('Error generating perfect score feedback:', error);
    }
    
    // Fallback perfect score feedback based on difficulty
    const difficultyBasedFeedback = {
      beginner: {
        title: "Perfect Score - Strong Security Foundation!",
        importance: "Your solid grasp of fundamental security concepts provides essential protection against common threats.",
        keyPoints: [
          "Explore intermediate concepts like threat modeling and attack vectors",
          "Learn about security tools that can help automate your defenses",
          "Begin studying specific security domains that interest you most"
        ],
        practicalTips: [
          "Set up multi-factor authentication on all your accounts",
          "Practice identifying phishing attempts with tools like Google's phishing quiz"
        ],
        resources: [
          "OWASP Top 10 Web Application Security Risks",
          "Cybersecurity & Infrastructure Security Agency (CISA) resources"
        ]
      },
      intermediate: {
        title: "Perfect Score - Impressive Security Knowledge!",
        importance: "Your comprehensive understanding of security concepts equips you to handle sophisticated threats effectively.",
        keyPoints: [
          "Explore advanced threat hunting and incident response techniques",
          "Learn about security architecture and defense-in-depth strategies",
          "Consider specializing in a security domain like application security or network defense"
        ],
        practicalTips: [
          "Practice with hands-on labs or capture-the-flag competitions",
          "Set up a home lab to experiment with security tools and techniques"
        ],
        resources: [
          "SANS Internet Storm Center",
          "Practical Malware Analysis book by Michael Sikorski"
        ]
      },
      advanced: {
        title: "Perfect Score - Expert-Level Security Mastery!",
        importance: "Your expert-level understanding positions you well for tackling complex security challenges and mentoring others.",
        keyPoints: [
          "Explore emerging threat vectors like supply chain attacks and AI-driven threats",
          "Consider contributing to open-source security projects or research",
          "Develop specialized knowledge in areas like threat intelligence or zero trust architecture"
        ],
        practicalTips: [
          "Create custom security tools or automation for specific needs",
          "Participate in bug bounty programs to hone your offensive security skills"
        ],
        resources: [
          "Black Hat conference presentations",
          "Research papers from IEEE Symposium on Security and Privacy"
        ]
      }
    };
    
    // Return appropriate feedback based on difficulty or default to intermediate
    return difficultyBasedFeedback[difficulty.toLowerCase()] || difficultyBasedFeedback.intermediate;
  }
  
  /**
   * Generate fallback feedback when Ollama is unavailable
   * @param {Array} quizData - The quiz data with user's answers
   * @param {string} difficulty - Quiz difficulty level
   * @returns {Object} - Structured feedback object
   */
  static generateFallbackFeedback(quizData, difficulty) {
    // Extract incorrect answers
    const incorrectAnswers = quizData.filter(answer => {
      if (answer.isCorrect !== undefined) {
        return !answer.isCorrect;
      }
      return (answer.score || 0) < 70;
    });
    
    if (incorrectAnswers.length === 0) {
      return this.generatePerfectScoreFeedback(difficulty);
    }
    
    // Generate individual feedback for each incorrect answer
    const topics = incorrectAnswers.map((answer, index) => {
      return this.generateFallbackQuestionFeedback(answer);
    });
    
    return {
      analysis: `Based on your quiz performance on this ${difficulty} level quiz, we've created personalized feedback for each question you missed.`,
      topics: topics
    };
  }
}

export default OllamaService;