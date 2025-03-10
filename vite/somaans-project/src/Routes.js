/**
- Application routes configurations
- Defines all available routes and their access levels
 */
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    QUIZ: '/quiz',
    QUIZ_DIFFICULTY: './quiz/difficulty',
    QUIZ_RESULTS: './quiz/results',
    QUIZ_QUESTIONS: './quiz/questions',
    ACHIEVEMENTS: '/achievements',
    LEADERBOARD: '/leaderboard',
    STATISTICS: '/statistics',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
};

// Public routes that don't require authentication
export const PUBLIC_ROUTES = [
    ROUTES.HOME,
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.RESET_PASSWORD
];

// Protected routes that require authentication
export const PROTECTED_ROUTES = [
    ROUTES.DASHBOARD,
    ROUTES.QUIZ,
    ROUTES.QUIZ_DIFFICULTY,
    ROUTES.QUIZ_RESULTS,
    ROUTES.QUIZ_QUESTIONS,
    ROUTES.ACHIEVEMENTS,
    ROUTES.LEADERBOARD,
    ROUTES.STATISTICS
];
