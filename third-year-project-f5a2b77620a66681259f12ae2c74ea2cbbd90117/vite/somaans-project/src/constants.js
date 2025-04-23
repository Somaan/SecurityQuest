/**
 * Central constants file for the application
 */


// API endpoints
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 
                     (window.location.origin.includes('devtunnels') 
                      ? 'https://localhost:5000/api' 
                      : 'http://localhost:5000/api');

                    

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  FORGOT_PASSWORD: `${API_BASE_URL}/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/reset-password`,
  INVALIDATE_REMEMBER_TOKEN: `${API_BASE_URL}/invalidate-remember-token`,
  GET_USERS: `${API_BASE_URL}/users`,
  GET_USER_LOGIN_HISTORY: `${API_BASE_URL}/users/login-history`,
  GET_USER_QUIZ_HISTORY: `${API_BASE_URL}/users/quiz-history`,
  GET_USER_STREAKS: `${API_BASE_URL}/users/:userId/streaks`,
  COMPLETE_QUIZ: `${API_BASE_URL}/quiz/complete`,
  GET_USER_ACHIEVEMENTS: `${API_BASE_URL}/users/:userId/achievements`,
  CHECK_NEW_ACHIEVEMENTS: `${API_BASE_URL}/users/:userId/check-achievements`,
  GET_QUIZ_QUESTIONS: `${API_BASE_URL}/quiz/questions`, // Future endpoint for quiz questions
  GET_USER_THREAT_PERFORMANCE: `${API_BASE_URL}/users/:userId/threat-performance`, // New endpoint for threat identification stats
  
  // Add a mock API for development
  IS_MOCK_API: true,
  MOCK_DELAY: 500, // milliseconds delay for mock API responses
};

// CAPTCHA configuration - fixed path for images
export const CAPTCHA_CONFIG = {
  // Using relative paths for better compatibility
  busImages: [
      '/images/bus1.jpg',
      '/images/bus2.jpg',
      '/images/bus3.jpg',
      '/images/bus4.jpg',
      '/images/bus5.jpg'
  ],
  // Array to define correct cells in CAPTCHA
  correctCellsMap: [
      new Set([4, 5, 6, 7, 8]), 
      new Set([0, 1, 3, 4]),    
      new Set([2, 3, 4, 5, 8]),  
      new Set([4, 5, 7, 8]),
      new Set([0, 3, 6])
  ]
};

// Form validation configuration
export const FORM_CONFIG = {
  MAX_LENGTH: 20,
  passwordPatterns: {
      minLength: /.{10,}/,
      minNumber: /\d/,
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/
  }
};

// Toast configuration
export const TOAST_CONFIG = {
  success: {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark"
  },
  error: {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark"
  },
  confirmation: {
      position: "top-center",
      autoClose: false,
      closeButton: false,
      draggable: true,
      closeOnClick: false,
      theme: "dark",
      hideProgressBar: true,
      pauseOnHover: true
  }
};

// Quiz configuration
export const QUIZ_CONFIG = {
  // Map difficulty levels to quiz IDs
  QUIZ_IDS: {
      'Beginner': 1,
      'Intermediate': 2,
      'Advanced': 3
  },
  
  // Question types
  QUESTION_TYPES: {
    MULTIPLE_CHOICE: 'multiple_choice',
    EMAIL_PHISHING: 'email_phishing',
    VISHING: 'vishing',
    SMISHING: 'smishing',
    WEBSITE_PHISHING: 'website_phishing'
  },
  
  // Time per question in seconds
  QUESTION_TIME: 60,
  
  // Pass threshold percentage
  PASS_THRESHOLD: 70,
  
  // Points configuration
  POINTS_PER_CORRECT_ANSWER: 10,
  
  // Mock quiz data for development
  MOCK_QUIZ_DATA: {
    'Beginner': [
      {
        id: 1,
        question: "What is phishing?",
        options: [
          "A type of fish found in oceans",
          "A cybersecurity attack that uses disguised email as a weapon",
          "A software program that protects your computer",
          "A method of encrypting files"
        ],
        correctAnswer: 1,
        explanation: "Phishing is a cybersecurity attack that uses disguised email as a weapon. The goal is to trick the email recipient into believing the message is something they want or need and to click a link or download an attachment."
      },
      {
        id: 2,
        question: "Which of these is a common indicator of a phishing attempt?",
        options: [
          "Emails from known colleagues with their correct email address",
          "Messages that have correct grammar and no spelling mistakes",
          "Emails with urgent calls to action or threats",
          "Communications that address you by your full name"
        ],
        correctAnswer: 2,
        explanation: "Urgent calls to action, threats, or creating a sense of emergency are common tactics in phishing attempts to make users act before thinking critically."
      },
      {
        id: 3,
        question: "What should you do if you suspect an email is a phishing attempt?",
        options: [
          "Open any attachments to check if they're legitimate",
          "Reply directly to ask if it's legitimate",
          "Click links to see where they lead",
          "Don't click links and report it to your IT department"
        ],
        correctAnswer: 3,
        explanation: "Never open attachments or click links in suspicious emails. The safest action is to report the email to your IT department or security team."
      },
      {
        id: 4,
        question: "Which of these email senders is MOST likely to be a phishing attempt?",
        options: [
          "support@yourcompany.com",
          "support@yourcornpany.com",
          "john.smith@colleague-company.com",
          "newsletter@google.com"
        ],
        correctAnswer: 1,
        explanation: "The email address 'support@yourcornpany.com' contains a common spoofing technique where 'company' is misspelled as 'cornpany' which can be hard to notice at a quick glance."
      },
      {
        id: 5,
        question: "What is 'spear phishing'?",
        options: [
          "Sending phishing emails to a large number of random people",
          "Targeted phishing attacks directed at specific individuals or companies",
          "Using phone calls instead of emails for phishing",
          "Phishing attempts made through social media"
        ],
        correctAnswer: 1,
        explanation: "Spear phishing refers to targeted attacks aimed at specific individuals or organizations, often using personalized information to appear more credible."
      },
      {
        id: 6,
        type: 'email_phishing',
        question: "Identify all suspicious elements in this email that indicate it might be a phishing attempt",
        emailContent: {
          from: "amazon-support@amazonsecure.service-id.net",
          to: "valued.customer@gmail.com",
          subject: "Amazon.com: Action Required - Verify Your Account Immediately",
          date: "April 8, 2025, 14:34",
          body: `Dear Valued Customer,

We've detected unusual activity in your account. Your Amazon account has been temporarily limited until you verify your information.

Please verify your information within 24 hours by clicking here: <a href="https://amazn-account-verify.com/secure">Account Verification Portal</a>

If you fail to verify your account information, your account will be suspended permanently.

Regards,
The Amazon Security Team

© 2025 Amazon.com, Inc. All rights reserved.`,
          signature: "Amazon Security Team"
        },
        suspiciousElements: [
          {
            id: "element1",
            description: "The sender's email address is not from an official amazon.com domain",
            coordinates: {top: 10, left: 5, width: 90, height: 5},
            hint: "Official Amazon emails come from domains ending with @amazon.com"
          },
          {
            id: "element2",
            description: "Urgent language creating artificial time pressure ('within 24 hours')",
            coordinates: {top: 40, left: 15, width: 70, height: 5},
            hint: "Phishing emails often create false urgency to prevent you from thinking critically"
          },
          {
            id: "element3",
            description: "The link URL is not an official Amazon domain",
            coordinates: {top: 50, left: 35, width: 30, height: 5},
            hint: "Always check where links actually point before clicking"
          },
          {
            id: "element4",
            description: "Threat of account suspension as a scare tactic",
            coordinates: {top: 60, left: 5, width: 95, height: 5},
            hint: "Phishers often use threats to manipulate victims into acting"
          }
        ],
        explanation: "This email exhibits multiple classic phishing red flags: it's from a non-Amazon domain, creates false urgency, contains a suspicious link, and uses threat tactics to manipulate the recipient. Always verify suspicious emails by contacting the company directly through their official website or phone number, never through links in the email itself."
      },
      //smishing question
      {
        id: 7,
        type: "smishing",
        question: "Is this text message legitimate or a smishing attempt?",
        messageContent: {
          from: "+1 (332) 456-7890",
          timestamp: "Today, 11:23 AM",
          message: "Alert: Your bank account has been locked due to suspicious activity. Click securityalertid25.com/unlock to verify your identity and restore access immediately."
        },
        options: [
          {
            id: "option1", 
            text: "This is a legitmate message from my bank",
            isCorrect: false
          },
          {
            id: "option2", 
            text: "This is a smishing (SMS phishing) attempt",
            isCorrect: true
          }
        ],
        explanation: "This is a smishing attempt. Legitimate banks would never send text messages with direct links to verify identity. They would ask you to contact them through official channels or log in to your account directly through their app or website. The URL is also suspicious and doesn't match standard bank domain patterns."
      }
    ],
    'Intermediate': [
      {
        id: 1,
        question: "Which of these is a sign of a sophisticated phishing attack?",
        options: [
          "Obvious spelling errors in the email",
          "Using threatening language and urgent deadlines",
          "Spoofed domains that look very similar to legitimate ones",
          "Requests sent to multiple recipients in the same email"
        ],
        correctAnswer: 2,
        explanation: "Sophisticated phishing attacks often use domains that look nearly identical to legitimate ones (like microsoft-support.com instead of microsoft.com) to deceive users."
      },
      {
        id: 2,
        question: "What is 'vishing'?",
        options: [
          "Visual phishing using fake images",
          "Voice phishing over phone calls",
          "Video-based phishing using deep fakes",
          "Viral phishing using social media"
        ],
        correctAnswer: 1,
        explanation: "Vishing is voice phishing, which uses phone calls to trick people into revealing sensitive information or making security mistakes."
      },
      {
        id: 3,
        question: "How do attackers commonly trick people in Business Email Compromise (BEC) attacks?",
        options: [
          "By sending mass emails with malware attachments",
          "By impersonating executives and requesting urgent wire transfers",
          "By offering fake promotions and discounts",
          "By sending ransomware through email links"
        ],
        correctAnswer: 1,
        explanation: "In BEC attacks, attackers impersonate executives or trusted partners to request urgent wire transfers or sensitive information from employees."
      },
      {
        id: 4,
        question: "What is DMARC?",
        options: [
          "A type of malware that steals email credentials",
          "An email authentication protocol to prevent spoofing",
          "A phishing simulation tool for security training",
          "A database of known phishing domains"
        ],
        correctAnswer: 1,
        explanation: "DMARC (Domain-based Message Authentication, Reporting & Conformance) is an email authentication protocol that helps prevent email spoofing and phishing attacks."
      },
      {
        id: 5,
        question: "Which of these behaviors increases your risk of falling victim to phishing?",
        options: [
          "Using multi-factor authentication",
          "Reusing the same password across multiple sites",
          "Checking the sender's email address before responding",
          "Hovering over links before clicking them"
        ],
        correctAnswer: 1,
        explanation: "Reusing passwords across multiple sites means that if your credentials are stolen from one site through phishing, attackers can access all your other accounts using the same credentials."
      },
      {
        id: 6,
        type: "vishing",
        question: "Listen to this call recording and identify what makes it a vihsing (voice phishing) attempt",
        callTranscript: `Caller: "Hello, this is Michael from Microsoft Tech Support. We've detected malicious software on your computer that's sending us alerts."
        You: "I wasn't aware of any problems." 
        Caller: "Yes, it's a serious security breach. Your personal data is at risk. I can help you fix this right away, but I'll need you to connect your computer remotely. Can you go to your computer now?"
        You: I'm at my computer."
        Caller: "Great. I need you to download a security tool. Go to www.quick-support.net and enter the code i'll give you. This will let me fix your security issues."
        You: "How do I know you're really from Microsoft?"
        Caller: "I understand your concern. You can verify I'm legitimate by checking your computer's event logs - they show the security alerts we're receiving. I can guide you through checking those if you'd like, or we can proceed with the fix. The malware is extracting data as we speak."`,
        options: [
          {
            id: "vishingClue1",
            text: "Claiming to be from Microsoft Tech Support calling about security issues",
            isCorrect: true,
            points: 10,
            explanation: "Microsoft does not proactively monitor individual computers and call users about malware."
          },
          {
            id: "vishingClue2",
            text: "Creating urgency by claiming data is being extracted right now",
            isCorrect: true,
            points: 10,
            explanation: "Creating a sense of urgenncy is a common tactic to pressure victims into making hasty decisions."
          },
          {
            id: "vishingClue3",
            text: "Requesting remote access to your computer",
            isCorrect: true,
            points: 10,
            explanation: "Legitimate tech support would not cold-call you and ask for remote access."
          },
          {
            id: "vishingClue4", 
            text: "Directing you to a non-Microsoft website",
            isCorrect: true,
            points: 10,
            explanation: "Microsoft would direct users to microsoft.com domains, not third-party websites."
          },
          {
            id: "vishingClue5", 
            text: "Offering to verify legitimacy through event logs",
            isCorrect: true,
            points: 10,
            explanation: "This is a diversion tactic to appear legitimate while avoiding proper verification."
          }
        ],
        explanation: "This is a classic vishing (voice phishing) attack. Microsoft does not proactively monitor personal computers and call users about detected malware. The caller created urgency, requested remote access to your computer, and directed you to a non-Microsoft website - all red flags of a scam. Always hang up and contact companies directly through their official phone numbers if you receive suspicious calls."
      },

      //phishing website 
      {
        id: 7,
        type: "website_phishing",
        question: "Identify all the suspicious elements on this login page that indicate it might be a phishing website",
        // Fixed image path
        websiteImage: "/images/fake-bank-login.png",
        suspiciousElements: [
          {
            id: "webElements1",
            description: "The URL shows 'bank-secure-login.com' instead of the offical bank domain",
            coordinates: {top: 5, left: 10, width: 80, height: 8},
            points: 10,
            isCorrect: true
          },
          {
            id: "webElement2", 
            description: "No HTTPS secure connection",
            coordinates: {top: 5, left: 5, width: 5, height: 8},
            points: 10,
            isCorrect: true
          },
          {
            id: "webElement3",
            description: "Mispelled bank name in the logo ('BankOne' vs 'Bank0ne')", 
            coordinates: {top: 15, left: 40, width: 20, height: 10},
            points: 10,
            isCorrect: true
          },
          {
            id: "webElement4",
            description: "Unusual request for full credit card number on login page",
            coordinates: {top: 40, left: 30, width: 40, height: 10},
            points: 10,
            isCorrect: true
          },
          {
            id: "webElement5",
            description: "Poor layout and unprofessional design compared to the real website",
            coordinates: {top: 10, left: 10, width: 80, height: 80},
            points: 10,
            isCorrect: true
          },
          {
            id: "webElement6",
            description: "The 'Remember Me' checkbox option",
            coordinates: {top: 60, left: 30, width: 40, height: 5},
            points: 0,
            isCorrect: false
          },
          {
            id: "webElement7",
            description: "The bank's copyright notice at the bottom.",
            coordinates: {top: 85, left: 20, width: 60, height: 5},
            points: 0,
            isCorrect: false
          }
        ],
        explanation: "This phishing website has multiple red flags: incorrect domain name, lack of HTTPS security, misspelled bank name, unusual request for sensitive information on the login page, and generally poor design. Always verify you're on the correct website by typing the URL directly or using a bookmarked link rather than clicking links in emails or messages."
      }
    ],
    'Advanced': [
      {
        id: 1,
        question: "What is a watering hole attack?",
        options: [
          "A phishing attack targeting people with water-related interests",
          "A targeted attack where frequently visited websites are compromised",
          "An attack using water-damage sensors to infiltrate buildings",
          "A DDoS attack that floods servers with requests"
        ],
        correctAnswer: 1,
        explanation: "A watering hole attack targets organizations by infecting websites they frequently visit with malware, rather than attacking them directly."
      },
      {
        id: 2,
        question: "Which of these is an advanced anti-phishing measure?",
        options: [
          "Using basic spam filters",
          "Checking for HTTPS in the URL",
          "Implementing DMARC, SPF, and DKIM email authentication",
          "Installing antivirus software"
        ],
        correctAnswer: 2,
        explanation: "DMARC, SPF, and DKIM are advanced email authentication protocols that work together to prevent email spoofing and verify sender legitimacy."
      },
      {
        id: 3,
        question: "What is 'smishing'?",
        options: [
          "Social media phishing",
          "SMS phishing",
          "Smart device phishing",
          "Smoke-signal phishing (a joke term)"
        ],
        correctAnswer: 1,
        explanation: "Smishing is SMS phishing, which uses text messages to trick recipients into revealing sensitive information or installing malware."
      },
      {
        id: 4,
        question: "In corporate settings, which department is typically most targeted by spear phishing?",
        options: [
          "IT Department",
          "Sales Department",
          "Finance Department",
          "Human Resources"
        ],
        correctAnswer: 2,
        explanation: "Finance departments are often targeted because they have direct access to financial systems and can authorize payments, making them prime targets for BEC and wire fraud attacks."
      },
      {
        id: 5,
        question: "What security feature helps validate that you're on the legitimate website rather than a phishing site?",
        options: [
          "CAPTCHA",
          "HTTPS",
          "Extended Validation (EV) Certificates",
          "Two-factor authentication"
        ],
        correctAnswer: 2,
        explanation: "Extended Validation (EV) Certificates provide the highest level of website verification and display the company name in the browser's address bar, helping users confirm they're on the legitimate site."
      },
      {
        id: 6,
        type: "email_phishing",
        question: "This is a sophisticated phishing email targeting corporate employees. Identify all suspicious elements that would help you detect this attack.",
        emailContent: {
          from: "jennifer.miller@acme-corp-global.com",
          to: "financial.team@yourdomain.com",
          subject: "Urgent: Updated Invoice Payment",
          date: "April 6, 2025, 09:15",
          body:  `Dear Finance Team,
          Please process the attached updated invoice urgently. The vendor has notified us that our payment is overdue, and we need to resolve this immediately to maintain our service level.
          
          I've already approved this payment as per company policy. Please process the wire transfer using the new banking details in the attached invoice.
          
          If you have any questions, please don't hesitate to email me, but please prioritise this payment as the vendor may suspend services.
          
          Best Regards,
          Jennifer Miller
          Chief Financial Officer
          Acme Corporation
          Cell: +1 (212) 555-9876
          jennifer.miller@acme-corp-global.com
          
          CONFIDENTIAL: This email and any files transmitted with it are confidential and intended solely for the use of individual or entity to whom they are addressed.`,
          attachmentName: "ACME_Invoice_April2025_UPDATED.pdf.exe"
        },
        suspiciousElements: [
          {
            id: "advElement1",
            description: "Domain mismatch: legitimate company emails would use 'acmecorp.com' not 'acme-corp-global.com'",
            coordinates: {top: 5, left: 5, width: 90, height: 5},
            points: 10,
            isCorrect: true
          },
          {
            id: "advElement2",
            description: "Creating urgency with language suggesting immediate action required",
            coordinates: {top: 25, left: 5, width: 90, height: 15},
            points: 10,
            isCorrect: true
          },
          {
            id: "advElement3",
            description: "Request to use 'new' banking details, suggesting a change from established procedure",
            coordinates: {top: 40, left: 20, width: 60, height: 5},
            points: 10,
            isCorrect: true
          },
          {
            id: "advElement4",
            description: "Discouraging verification by emphasising urgency",
            coordinates: {top: 50, left: 10, width: 80, height: 10},
            points: 10,
            isCorrect: true
          },
          {
            id: "advElement5",
            description: "Suspicious file attachment with executable (.exe) extension disguised as PDF",
            coordinates: {top: 80, left: 20, width: 60, height: 5},
            points: 10,
            isCorrect: true
          },
          // Red herrings: things that present but are not suspicious
          {
            id: "advElement6",
            description: "The email is addressed to a team rather than an individual.",
            coordinates: {top: 20, left: 10, width: 60, height: 5},
            points: 0,
            isCorrect: false,
          },
          {
            id: "advElement7",
            description: "The confidentiality notice at the bottom of the email",
            coordinates: {top: 85, left: 5, width: 90, height: 10},
            points: 0,
            isCorrect: false
          },
          {
            id: "advElement8",
            description: "The time of day the email was sent (9:15 AM).",
            coordinates: {top: 5, left: 60, width: 30, height: 5},
            points: 0,
            isCorrect: false
          }
        ],
        explanation: "This sophisticated phishing email targets finance teams with several subtle red flags: domain spoofing ('acme-corp-global.com' instead of the legitimate 'acmecorp.com'), urgency tactics, request to use new banking details (a BEC attack indicator), discouraging verification, and a dangerous executable file disguised as a PDF. Always verify unusual financial requests through established channels and be suspicious of any email requesting urgent financial actions or changes to banking details."
      },
      
    
      {
        id: 7,
        type: 'vishing',
        question: "You received this message on LinkedIn. Identify what makes it a potential social engineering attack.",
        callTranscript: `LinkedIn Message:
      From: David Chen, Recruitement Specialist at Google
      Profile: 500+ connections, Joined 2 weeks ago
      
      Hello,
      
      I'm a recruiter with Google's AI division. I was impressed by your profile and experience. We have an immediate opening that matches your skills perfectly.
      The position offers a competitive salary of £80,000+ with excellent benefits. Due to the urgent nature of this role, we're using an expedited hiring process.
      To learn more and apply, please complete our preliminary screening at google-careers-ai-apply.come. We need your LinkedIn credentialsto link your application to our HR system.
      I look forward to moving your application forward.
      
      Best regards,
      David Chen
      Senior Recruiter, Google AI Division`,
        options: [
          {
            id: "socialClue1",
            text: "New account (joined 2 weeks ago) claiming to be a senior recruiter",
            isCorrect: true,
            explanation: "Legitmate senior recruiters typically have established accounts with longer history."
          },
          {
            id: "socialClue2",
            text: "Non-corporate URL (not google.com domain)",
            isCorrect: true,
            explanation: "Official Google communication would use google.com domains, not third-party sites."
          },
          {
            id: "socialClue3",
            text: "Unusually high salary mentioned upfront without interview",
            isCorrect: true,
            explanation: "Legitmate recruiters rarely mention specific salary figures before formal interviews."
          },
          {
            id: "socialClue4",
            text: "Creating urgency with 'expedited hiring process'",
            isCorrect: true,
            explanation: "Creating false sense of urgency is a common tactic to prevent critical thinking."
          },
          {
            id: "socialClue5",
            text: "Requesting LinkedIn credentials (legitimate companies never ask for this)",
            isCorrect: true,
            explanation: "No legitimate company would ever ask for your social media credentials."
          },
          {
            id: "socialClue6",
            text: "The recruiter has many connections (500+)",
            isCorrect: false,
            explanation: "Having many connections is normal for recruiters and by itself is not suspicious."
          },
          {
            id: "socialClue7",
            text: "The greeting uses 'Hello' instead of your name",
            isCorrect: false,
            explanation: "While personalisation is common, a generic greeting isnt necessarily suspicious."
          },
          {
            id: "socialClue8",
            text: "The recruiter included their title in the signature",
            isCorrect: false,
            explanation: "Including titles in signatures is standard professional practice."
          }
        ],
        explanation: "This is a sophisticated social engineering attack disguised as a job opportunity. The key red flags include: a new account claiming to be a senior recruiter, non-corporate URL for the application process, unusually high salary mentioned upfront, artificial urgency, and the request for LinkedIn credentials. Legitimate recruiters from major companies use corporate email addresses, don't ask for credentials, and conduct proper interviews before discussing specific compensation. Always verify the legitimacy of recruiters by checking their profile history and only communicate through official company channels."
      }
    ]
  }
};

