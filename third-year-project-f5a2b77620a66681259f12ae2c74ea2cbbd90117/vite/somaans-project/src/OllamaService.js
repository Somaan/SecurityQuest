/**
 * OllamaService.js - Enhanced service for interacting with locally-running Ollama models
 * Provides more personalised and context-aware prompts for security feedback
 */

// Configuration for Ollama
const OLLAMA_CONFIG = {
  API_URL: 'http://localhost:11434/api/generate',
  DEFAULT_MODEL: 'phi3', // Use whichever model you have installed locally
  TIMEOUT: 60000, // Increased from 30s to 60s to prevent timeouts
  MAX_RETRIES: 2,  // Number of retries if a request fails
  // Security topics taxonomy for better categorisation
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
  // FIXED: Always return false to prevent incorrect duplicate detection
  isTooSimilar: function(newContent) {
    return false; // Disable similarity check to avoid duplicate content issues
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
      const timeoutId = setTimeout(() => {
        console.log("Ollama request timed out after", OLLAMA_CONFIG.TIMEOUT/1000, "seconds");
        controller.abort();
      }, OLLAMA_CONFIG.TIMEOUT);
      
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
      const timeoutId = setTimeout(() => controller.abort(), 10000); // Increased from 5s to 10s
      
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
   * Enhanced categorisation of questions based on content analysis
   * @param {Array} questions - Array of question objects
   * @returns {Object} - Categorised questions by topic
   */
  static categoriseQuestions(questions) {
    const categorisedQuestions = {};
    
    questions.forEach(question => {
      // Get the question text to analyse
      const questionText = question.question.toLowerCase();
      
      // First try to categorise by explicit type
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
          categorisedQuestions[category] = categorisedQuestions[category] || [];
          categorisedQuestions[category].push(question);
          return;
        }
      }
      
      // If no type or not categorised yet, use content analysis
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
      categorisedQuestions[bestMatchCategory] = categorisedQuestions[bestMatchCategory] || [];
      categorisedQuestions[bestMatchCategory].push(question);
    });
    
    return categorisedQuestions;
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
    
    // Enhanced categorisation
    const categorisedQuestions = this.categoriseQuestions(incorrectAnswers);
    
    // Prepare topic-specific prompts for each category
    const topicPromises = Object.entries(categorisedQuestions).map(async ([category, questions]) => {
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
      // FIXED: Make the question number consistent and explicit
      const questionNumber = questionData.questionIndex !== undefined ? 
        questionData.questionIndex + 1 : "Unknown";
      
      // FIXED: Create a consistent ID format
      const questionId = `question-${questionNumber}`;
      
      // FIXED: Extract the specific user misconception for better personalization
      let userMisconception = '';
      
      // Format the question info differently based on question type
      let questionDetails = '';
      
      // FIXED: Extract the specific user misconception
      if (questionData.type === 'multiple_choice' || !questionData.type) {
        userMisconception = `User answered "${questionData.selectedOption || 'Unknown'}" instead of "${questionData.correctOption || 'Unknown'}"`;
        
        questionDetails = `
Question #${questionNumber}: "${questionData.question}"
Type: Multiple Choice
User's incorrect answer: "${questionData.selectedOption || questionData.userAnswer || 'Not provided'}"
Correct answer: "${questionData.correctOption || 'Not provided'}"
User misconception: ${userMisconception}`;
      } else if (questionData.details) {
        // For special question types with details
        if (questionData.details.falseNegatives && questionData.details.falseNegatives.length > 0) {
          userMisconception = `User failed to identify ${questionData.details.falseNegatives.length} critical security elements`;
        } else if (questionData.details.incorrectlySelected && questionData.details.incorrectlySelected.length > 0) {
          userMisconception = `User incorrectly identified non-suspicious elements as suspicious`;
        }
        
        questionDetails = `
Question #${questionNumber}: "${questionData.question}"
Type: ${this.formatQuestionType(questionData.type)}
User's score: ${questionData.score || 0}%
User misconception: ${userMisconception}
Details: ${JSON.stringify(questionData.details, null, 2)}`;
      } else {
        // Basic info for other question types
        questionDetails = `
Question #${questionNumber}: "${questionData.question}"
Type: ${this.formatQuestionType(questionData.type)}
User's score: ${questionData.score || 0}%
User misconception: The user did not correctly identify all security threats.`;
      }
      
      // Add user context to create a more personalised experience
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
      const systemPrompt = `You are an expert cybersecurity educator specialising in ${this.formatQuestionType(questionData.type || 'security awareness')}. 
Your task is to provide highly personalised, targeted feedback for Question #${questionNumber}: "${questionData.question}".
Focus on the specific misconception in their incorrect answer: "${userMisconception}".
Your feedback should be tailored to a ${difficulty} difficulty level and provide immediately actionable advice relevant to real-world scenarios.
Make your feedback UNIQUE and SPECIFIC to THIS EXACT question - do not provide generic cybersecurity advice.`;
      
      // FIXED: Create a detailed question-specific prompt that includes misconception
      const prompt = `
I need your help creating personalised feedback for this specific security question that a user answered incorrectly.

QUESTION DETAILS:
${questionDetails}
${userContextStr}

Difficulty level: ${difficulty}

Based on this specific incorrect answer to Question #${questionNumber}, please provide:

1. A clear, concise title that accurately reflects the specific security concept in THIS question the user misunderstood (max 10 words)
2. Why understanding this SPECIFIC concept from Question #${questionNumber} is important (2 sentences maximum, emphasising real-world impact)
3. 3-4 key learning points that DIRECTLY address the specific misconception shown in their answer "${userMisconception}"
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
        
        // FIXED: Add question number info to ensure proper display
        parsedResponse.id = questionId;
        parsedResponse.questionNumber = questionNumber;
        
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
    
    // Add user context to create a more personalised experience
    const contextInfo = [];
    if (userContext.role) contextInfo.push(`User's role: ${userContext.role}`);
    if (userContext.industry) contextInfo.push(`User's industry: ${userContext.industry}`);
    if (userContext.previousPerformance) contextInfo.push(`Previous quiz performance: ${userContext.previousPerformance}`);
    if (userContext.learningStyle) contextInfo.push(`Learning style preference: ${userContext.learningStyle}`);
    
    const userContextStr = contextInfo.length > 0 
      ? `\nAdditional context about the user:\n${contextInfo.join("\n")}`
      : '';
    
    // Enhanced system prompt for better framing
    const systemPrompt = `You are an expert cybersecurity educator specialising in ${this.formatCategoryName(category)}. 
Your task is to provide personalised, actionable feedback that helps the user improve their security knowledge and practical skills.
Your feedback should be tailored to a ${difficulty} difficulty level, and should address specific misconceptions evident in their incorrect answers.
Always provide practical, immediately applicable advice that's relevant to real-world scenarios.`;
    
    // Create a detailed topic-specific prompt
    const prompt = `
I need your help creating personalised feedback for a user who took a cybersecurity quiz.

Topic: ${this.formatCategoryName(category)}
Difficulty level: ${difficulty}${userContextStr}

The user answered these questions incorrectly:
${questionsText}

Based on these specific errors, please provide:

1. Why this topic is important (2 sentences maximum, emphasising real-world impact)
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
   * FIXED: Added missing method for email phishing feedback
   * Generate email phishing-specific feedback based on subtype
   * @param {string} subtype - The specific type of email phishing
   * @param {number} questionNumber - The question number
   * @param {string} title - The generated title
   * @returns {Object} - Email phishing feedback
   */
  static getEmailPhishingFeedback(subtype, questionNumber, title) {
    // Create a consistent ID
    const questionId = `question-${questionNumber}`;
    
    // Common email phishing feedback
    const baseFeedback = {
      id: questionId,
      title: title,
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
      ],
      questionNumber: questionNumber
    };
    
    // Adjust feedback based on subtype
    switch (subtype) {
      case 'spear':
        return {
          ...baseFeedback,
          title: `Spear Phishing Detection (#${questionNumber})`,
          importance: "Spear phishing attacks are highly targeted and personalized, making them much more difficult to detect than general phishing attempts.",
          keyPoints: [
            "Spear phishing emails are customized with personal information to appear more legitimate",
            "Attackers research their targets on social media and professional sites",
            "These attacks often impersonate colleagues, managers, or trusted partners",
            "They may reference real projects, events, or organizational information"
          ],
          practicalTips: [
            "Verify unexpected requests from colleagues through a different communication channel",
            "Be particularly cautious with emails requesting sensitive information or financial actions",
            "Implement DMARC, SPF, and DKIM to reduce email spoofing"
          ]
        };
        
      case 'attachment':
        return {
          ...baseFeedback,
          title: `Email Attachment Threats (#${questionNumber})`,
          importance: "Malicious attachments remain a primary delivery mechanism for malware and ransomware attacks.",
          keyPoints: [
            "Be wary of unexpected attachments, even from seemingly known senders",
            "Dangerous file types include .exe, .zip, .js, and macro-enabled documents (.docm, .xlsm)",
            "Modern attacks may use double extensions (file.pdf.exe) to disguise executable files",
            "Even PDFs can contain malicious JavaScript code"
          ],
          practicalTips: [
            "Never open attachments unless you were expecting them",
            "Use a secure document preview service or sandbox to open suspicious attachments",
            "Disable automatic macro execution in Microsoft Office"
          ]
        };
        
      case 'link':
        return {
          ...baseFeedback,
          title: `Dangerous Email Links (#${questionNumber})`,
          importance: "Malicious links in emails can lead to credential theft, malware downloads, or financial fraud.",
          keyPoints: [
            "Phishing links often lead to convincing replicas of legitimate websites",
            "URLs may use typosquatting (gooogle.com) or deceptive subdomains (paypal.malicious.com)",
            "The visible link text often differs from the actual URL destination",
            "Some links may redirect multiple times before reaching the malicious site"
          ],
          practicalTips: [
            "Hover over links to preview the actual URL before clicking",
            "Look for HTTPS, but remember that phishing sites can use encryption too",
            "Type important URLs directly into your browser rather than clicking links"
          ]
        };
        
      case 'urgency':
        return {
          ...baseFeedback,
          title: `Urgency Tactics in Phishing (#${questionNumber})`,
          importance: "Creating a false sense of urgency is a key tactic used to bypass critical thinking and prompt immediate action.",
          keyPoints: [
            "Phishing emails often create artificial time pressure to force quick decisions",
            "Common urgency tactics include account suspension threats, limited-time offers, and security alerts",
            "Threats of negative consequences are designed to trigger emotional responses",
            "Legitimate organizations rarely demand immediate action via email"
          ],
          practicalTips: [
            "Take time to evaluate urgent requests, even when they appear time-sensitive",
            "Check directly with the purported sender through official channels",
            "Remember that creating panic is a deliberate social engineering tactic"
          ]
        };
      
      // Default general email phishing feedback
      default:
        return baseFeedback;
    }
  }
  
  /**
   * Generate fallback feedback for a specific question
   * @param {Object} questionData - The question data
   * @returns {Object} - Fallback question feedback
   */
  static generateFallbackQuestionFeedback(questionData) {
    // Extract question information
    // FIXED: Make the question number consistent
    const questionNumber = questionData.questionIndex !== undefined ? 
      questionData.questionIndex + 1 : "Unknown";
    const questionType = questionData.type || 'multiple_choice';
    const questionText = questionData.question || '';
    
    // FIXED: Create a consistent ID
    const questionId = `question-${questionNumber}`;
    
    // Create a title based on the question
    const titleFromQuestion = this.generateTitleFromQuestion(questionText, questionNumber);
    
    // Get feedback based on question content
    return this.generateContentBasedFeedback(questionType, questionText, questionNumber, titleFromQuestion, questionData);
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
  static generateContentBasedFeedback(questionType, questionText, questionNumber, title, questionData) {
    const lowerQuestion = questionText.toLowerCase();
    
    // FIXED: Create a consistent ID
    const questionId = `question-${questionNumber}`;
    
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
    
    // For multiple choice, try to extract specific misconception
    if (questionType === 'multiple_choice' && questionData && questionData.selectedOption) {
      // Different feedback based on specific questions
      if (lowerQuestion.includes("what is phishing")) {
        return {
          id: questionId,
          title: "Understanding Phishing Fundamentals",
          importance: "Phishing is a primary attack vector used in over 90% of successful cyberattacks, not an encryption method.",
          keyPoints: [
            "Phishing is a social engineering attack that uses deceptive communications, not an encryption technology",
            "These attacks aim to trick users into revealing sensitive information or installing malware",
            "Phishing typically arrives via email but can occur through SMS, voice calls, or social media",
            "The goal is to appear legitimate enough to bypass the victim's natural suspicion"
          ],
          practicalTips: [
            "Verify the sender's email address by checking the actual email header, not just the display name",
            "Be wary of unexpected communications, especially those creating urgency or fear",
            "Never click suspicious links - instead, navigate directly to the official website"
          ],
          resources: [
            "Anti-Phishing Working Group (APWG) resources",
            "SANS Security Awareness Training modules"
          ],
          questionNumber: questionNumber
        };
      }
      else if (lowerQuestion.includes("common indicator")) {
        return {
          id: questionId,
          title: "Recognizing Phishing Red Flags",
          importance: "Understanding reliable phishing indicators is crucial for identifying and avoiding increasingly sophisticated attacks.",
          keyPoints: [
            "Communications using your full name are not reliable indicators of legitimacy and can be easily spoofed",
            "Urgent calls to action and threats are classic phishing tactics designed to prevent critical thinking",
            "Phishers use urgency to force quick decisions before you notice other suspicious elements",
            "Legitimate organizations rarely create artificial time pressure via email"
          ],
          practicalTips: [
            "Take time to evaluate any message creating a sense of urgency - legitimate requests rarely require immediate action",
            "Look for multiple red flags together, as sophisticated phishing may get some details right",
            "When in doubt, verify through official channels, not by responding to the message"
          ],
          resources: [
            "NIST Guide on Avoiding Social Engineering and Phishing Attacks",
            "Phishing.org awareness resources"
          ],
          questionNumber: questionNumber
        };
      }
      else if (lowerQuestion.includes("spear phishing")) {
        return {
          id: questionId,
          title: "Spear Phishing vs. Social Media Phishing",
          importance: "Spear phishing attacks are highly targeted and personalized, making them significantly more dangerous than general phishing attempts.",
          keyPoints: [
            "Spear phishing specifically targets individuals or organizations with personalized content, not just social media platforms",
            "These attacks use research about the target to create highly convincing, customized communications",
            "Attackers often impersonate trusted individuals or organizations known to the target",
            "The personalization makes these attacks much harder to detect than generic phishing"
          ],
          practicalTips: [
            "Verify unexpected communications from colleagues through a different channel, even if they appear legitimate",
            "Be especially cautious with messages that demonstrate knowledge of your organization or recent activities",
            "Implement email authentication protocols to help verify sender legitimacy"
          ],
          resources: [
            "SANS Securing The Human: Spear Phishing Training",
            "FBI guidance on Business Email Compromise"
          ],
          questionNumber: questionNumber
        };
      }
    }
    
    // SMS phishing specific feedback
    if (questionType === 'smishing' || lowerQuestion.includes('sms') || lowerQuestion.includes('text message')) {
      return {
        id: questionId,
        title: title,
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
        ],
        questionNumber: questionNumber
      };
    }
    
    // Voice phishing specific feedback
    if (questionType === 'vishing' || lowerQuestion.includes('phone') || lowerQuestion.includes('call')) {
      return {
        id: questionId,
        title: title,
        importance: "Voice phishing bypasses technical security controls by exploiting human trust through real-time conversation and caller ID spoofing.",
        keyPoints: [
          "Caller ID can be easily spoofed to display legitimate organisation names or numbers",
          "Real-time conversation creates pressure to respond immediately without verification",
          "Human voices build trust and make it harder to detect deception compared to email",
          "Attackers often have prepared scripts and answers to anticipated questions"
        ],
        practicalTips: [
          "Never provide sensitive information to inbound callers, no matter how convincing they sound",
          "Hang up and call back using the official number from the organisation's website",
          "Implement a verification protocol for unexpected calls in your organisation"
        ],
        resources: [
          "FTC Phone Scam resources",
          "National Cyber Security Centre (NCSC) guidance on vishing"
        ],
        questionNumber: questionNumber
      };
    }
    
    // Website phishing specific feedback
    if (questionType === 'website_phishing' || lowerQuestion.includes('website') || lowerQuestion.includes('url')) {
      return {
        id: questionId,
        title: title,
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
        ],
        questionNumber: questionNumber
      };
    }
    
    // Default general security feedback
    return {
      id: questionId,
      title: title,
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
      ],
      questionNumber: questionNumber
    };
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
        importance: "Email phishing remains one of the most common initial attack vectors for security breaches in organisations.",
        keyPoints: [
          "Always verify the sender's email address by checking the actual email address, not just the display name",
          "Be suspicious of urgency, threatening language, or offers that seem too good to be true",
          "Check for grammatical errors, unusual formatting, and inconsistent branding",
          "Hover over links to verify their destination before clicking"
        ],
        practicalTips: [
          "Contact the purported sender through a different channel if an email seems suspicious",
          "Never enter credentials on a page you reached via an email link",
          "Set up advanced email filtering and enable email authentication protocols in your organisation"
        ],
        resources: [
          "Anti-Phishing Working Group (APWG) resources",
          "SANS 'Securing The Human' Email Security Training"
        ]
      },
      'VISHING': {
        importance: "Voice phishing bypasses technical security controls by exploiting human trust through phone calls and is increasingly targeting remote workers.",
        keyPoints: [
          "Legitimate organisations rarely call you unexpectedly about technical or account issues",
          "Pressure tactics and creating artificial urgency are red flags in phone conversations",
          "Caller ID can be easily spoofed and should never be solely trusted for verification",
          "Requests for remote access to your computer are almost always malicious"
        ],
        practicalTips: [
          "Hang up and call back using the official number from the organisation's website or your account statement",
          "Never provide sensitive information to inbound callers, no matter how convincing they sound",
          "Implement a verification protocol for phone-based requests in your organisation"
        ],
        resources: [
          "Federal Trade Commission (FTC) Scam Alert resources",
          "National Cyber Security Centre (NCSC) guidance on social engineering"
        ]
      },
      'SMISHING': {
        importance: "SMS phishing exploits the trusted nature of text messages and the limited security features on mobile devices.",
        keyPoints: [
          "Legitimate organisations typically don't request sensitive information via text messages",
          "Shortened URLs in text messages are often used to hide malicious destinations",
          "Messages creating a sense of urgency or fear are common smishing tactics",
          "Mobile interfaces make it harder to verify sender authenticity"
        ],
        practicalTips: [
          "Never click links in suspicious text messages, instead go directly to the organisation's website",
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
        importance: "Strong password management remains a fundamental defense against unauthorised access, especially as credential theft increases.",
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
        importance: "Social engineering attacks target human psychology rather than technical vulnerabilities, making them effective against even security-conscious organisations.",
        keyPoints: [
          "Verify requests through separate communication channels, especially for sensitive actions",
          "Be skeptical of artificial urgency or pressure tactics in any communication",
          "Trust your instincts when something feels unusual or too convenient",
          "Remember that authority can be faked - verify identity through established procedures"
        ],
        practicalTips: [
          "Establish clear verification procedures for sensitive requests in your organiaation",
          "Pause and think critically before acting on unexpected requests",
          "Never provide sensitive information to someone who contacted you first"
        ],
        resources: [
          "Social-Engineer.org Framework",
          "SANS Social Engineering Prevention Training"
        ]
      },
      'GENERAL_SECURITY': {
        importance: "A strong foundation in security principles helps you recognise and respond appropriately to a wide range of threats.",
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
   * Generate feedback for perfect scores with enhanced personalisation
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
        
        // Add user context to create a more personalised experience
        const contextInfo = [];
        if (userContext.name) contextInfo.push(`User's name: ${userContext.name}`);
        if (userContext.role) contextInfo.push(`User's role: ${userContext.role}`);
        if (userContext.industry) contextInfo.push(`User's industry: ${userContext.industry}`);
        if (userContext.interests) contextInfo.push(`User's security interests: ${userContext.interests}`);
        if (userContext.careerGoals) contextInfo.push(`User's career goals: ${userContext.careerGoals}`);
        
        const userContextStr = contextInfo.length > 0 
          ? `\nPersonalisation context:\n${contextInfo.join("\n")}`
          : '';
        
        const prompt = `
I need your help creating personaliaed feedback for a user who achieved a perfect score on a ${difficulty} level security quiz.${userContextStr}

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
          "Consider specialising in a security domain like application security or network defense"
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
          "Develop specialised knowledge in areas like threat intelligence or zero trust architecture"
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
      analysis: `Based on your quiz performance on this ${difficulty} level quiz, we've created personalised feedback for each question you missed.`,
      topics: topics
    };
  }
}

export default OllamaService;