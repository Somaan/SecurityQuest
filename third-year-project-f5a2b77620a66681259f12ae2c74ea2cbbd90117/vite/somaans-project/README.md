# SecurityQuest

> **Academic Research Project** | University of East Anglia | Ethics Committee Approved

## 🚀 Project Impact
**Problem**: 74% of security breaches involve human elements, yet traditional cybersecurity training fails to create behavioral change.
**Solution**: Gamified learning platform with AI-powered personalised feedback that **demonstrably improves security awareness by 52.2%** through interactive social engineering scenarios.

**📄[View Complete Research Paper](./Final_Year_Report.pdf)** - Full methodology, results, and statistical analysis

## 🎯 Key Results
- **52.2% improvement** in cybersecurity confidence across all participants
- **100% of users** correctly identified phishing attempts post-training (vs 66.7% before)
- **326 test cases** with 100% pass rate (unit, integration, and system testing)
- **Ethics committee approved** user study with 6 participants over 2-week intervention period

- ## 🛠️ Technical Stack
- **Full-Stack PERN Application**
- - **Frontend**: React, CSS
  - **Backend**: Node.js, Express, RESTful APIs, bcrypt authentication
  - **Database**: PostgreSQL with connection pooling and parameterised queries
  - **AI Integration**: Ollama (local LLM) for personalised learning feedback
  - **Testing**: Jest, React Testing Library (326 test cases, 100% pass rate)
  - **UI/UX**: React Toastify notifications, responsive design, browser storage management
 
  ## 🎮 Core Features
- **Multi-vector attack training**: Phishing, vishing, smishing, spear-phishing scenarios
- **AI-powered feedback**: Local LLM provides contextual learning recommendations
- **Gamification system**: Achievements, leaderboards, progress tracking, streak mechanics
- **Three-tier difficulty**: Beginner → Intermediate → Advanced progression
- **Security-first design**: CAPTCHA, secure sessions, input validation, CORS protection

 ## 🚀 Quick Start
```bash
# Clone and setup
git clone https://github.com/yourusername/securityquest.git
cd securityquest

# Install dependencies
npm install
cd backend && npm install

# Setup PostgreSQL database
createdb securityquest
psql -d securityquest -f database/schema.sql

# Start development servers
npm run dev (frontend)
cd backend && node server.js (backend
```

**Prerequisites**: Node.js 18+, PostgreSQL 14+, Ollama (for AI features)
## 📊 Architecture Highlights

- **Component-based React architecture** with custom hooks and context providers
- **Secure API design** with middleware authentication and error handling
- **Local AI processing** ensuring privacy compliance
- **Responsive design** with accessibility features (WCAG compliance)
- **Comprehensive testing strategy** covering all application layers

## 🔒 Security Implementation

- bcrypt password hashing (work factor 10)
- SQL injection prevention via parameterised queries
- CAPTCHA verification and session management
- CORS configuration and input sanitisation

## 🎓 Academic Validation

- **Research methodology**: Pre/post intervention design with statistical analysis
- **Ethics approval**: University ethics committee approval for human subjects research
- **Peer review**: Academic supervision and methodology validation
- **Reproducible results**: Complete documentation and testing protocols

## 🏆 Skills Demonstrated

**Technical**: Full-stack development, database design, AI integration, security implementation, comprehensive testing
**Research**: Academic methodology, statistical analysis, user experience design, ethical research practices
**Product**: User-centered design, gamification principles, educational technology, behavioral change measurement
