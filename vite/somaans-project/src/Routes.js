// routes.js
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    QUIZ: '/quiz',
    ACHIEVEMENTS: '/achievements',
    LEADERBOARD: '/leaderboard',
    STATISTICS: '/statistics'
};

// Public routes that don't require authentication
export const PUBLIC_ROUTES = [
    ROUTES.HOME,
    ROUTES.LOGIN,
    ROUTES.REGISTER
];

// Protected routes that require authentication
export const PROTECTED_ROUTES = [
    ROUTES.DASHBOARD,
    ROUTES.QUIZ,
    ROUTES.ACHIEVEMENTS,
    ROUTES.LEADERBOARD,
    ROUTES.STATISTICS
];
