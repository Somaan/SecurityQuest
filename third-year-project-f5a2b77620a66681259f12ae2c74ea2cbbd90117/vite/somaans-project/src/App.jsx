// App.jsx with Theme Provider
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ErrorPage from "./ErrorPage";
import NavBar from "./NavBar";
import { ToastContainer } from "react-toastify";
import { ROUTES, PUBLIC_ROUTES, PROTECTED_ROUTES } from "./Routes";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Dashboard from "./Dashboard";
import Statistics from "./Statistics";
import Leaderboard from "./Leaderboard";
import Achievements from "./Achievements";
import Quiz from "./Quiz";
import AchievementNotification from "./AchievementNotification";
import AchievementService from "./AchievementService";
import { ThemeProvider } from "./ThemeContext";

/** 
- Main application component
  - Handles routing logic and authentication state management
  - Controls Access to protected and public routes
  - Checks for remembered user on initial load
  - Manages global achievement notifications
  - Now wrapped with ThemeProvider for light/dark theme support
*/

function App() {
  const location = useLocation();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname.toLowerCase());
  const isErrorPage =
    !PUBLIC_ROUTES.includes(location.pathname.toLowerCase()) &&
    !PROTECTED_ROUTES.includes(location.pathname.toLowerCase());

  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );

  // Achievement notification state
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const userId = sessionStorage.getItem("userId") || "1";

  // Determine if current path is part of quiz routes to handle the NavBar visibility
  const isQuizPage = location.pathname.includes("/quiz");
  const isQuizResultsPage = location.pathname.includes("/quiz/results");

  // Hide navbar for specific quiz pages
  const hideNavBar = isQuizPage;

  // Check for remembered user on initial load
  useEffect(() => {
    const checkRememberedUser = async () => {
      // Check if user just logged out - if so, don't auto-login
      const justLoggedOut =
        sessionStorage.getItem("just_logged_out") === "true";
      if (justLoggedOut) {
        sessionStorage.removeItem("just_logged_out");
        setIsAuthenticating(false);
        return;
      }

      // Only attempt auto-login on direct visit to login page when not authenticated
      const isOnLoginPage =
        location.pathname.toLowerCase() === ROUTES.LOGIN.toLowerCase();
      const rememberedUser = localStorage.getItem("rememberedUser");

      // Only prefill credentials but don't auto-login after initial page load
      if (rememberedUser && !isAuthenticated && isOnLoginPage) {
        // Don't auto-authenticate here, just let the login form prefill
        setIsAuthenticating(false);
        return;
      }

      setIsAuthenticating(false);
    };

    checkRememberedUser();
  }, [location.pathname, isAuthenticated]);

  // Periodically check for achievements if authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    // Check for new achievements immediately when user logs in
    const checkAchievements = async () => {
      if (!userId) return;

      // Check various achievement types
      const [newAchievements, leaderboardAchievements] = await Promise.all([
        AchievementService.checkForNewAchievements(userId),
        AchievementService.checkLeaderboardAchievements(userId),
      ]);

      // Queue all new achievements for display
      [...newAchievements, ...leaderboardAchievements].forEach(
        (achievement) => {
          AchievementService.queueAchievement(achievement);
        }
      );

      // Start showing achievements if not already showing one
      if (!currentAchievement) {
        showNextAchievement();
      }
    };

    // Immediately check and then set up periodic checks
    checkAchievements();

    const checkInterval = setInterval(checkAchievements, 30000); // Check every 30 seconds

    return () => clearInterval(checkInterval);
  }, [isAuthenticated, userId, currentAchievement]);

  // Function to display the next achievement in queue
  const showNextAchievement = () => {
    const nextAchievement = AchievementService.getNextAchievementToShow();
    if (nextAchievement) {
      setCurrentAchievement(nextAchievement);
    }
  };

  // Handle closing the achievement notification
  const handleCloseAchievement = () => {
    setCurrentAchievement(null);

    // Show the next achievement if there is one
    setTimeout(showNextAchievement, 300);
  };

  // Show loading state while checking authentication
  if (isAuthenticating) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!isPublicRoute && !isAuthenticated && !isErrorPage) {
    return <ErrorPage />;
  }

  return (
    <ThemeProvider>
      {/* Only show NavBar when not on quiz pages */}
      {!isPublicRoute && !isErrorPage && !hideNavBar && <NavBar />}

      <Routes>
        {/* Public Routes */}
        <Route
          path={ROUTES.HOME}
          element={
            <Navigate
              to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN}
              replace
            />
          }
        />
        <Route
          path={ROUTES.LOGIN}
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.DASHBOARD} replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.DASHBOARD} replace />
            ) : (
              <Register />
            )
          }
        />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to={ROUTES.LOGIN} replace />
            )
          }
        />

        {/* Quiz Routes - Special handling for navbar visibility */}
        <Route
          path={ROUTES.QUIZ + "/*"}
          element={
            isAuthenticated ? <Quiz /> : <Navigate to={ROUTES.LOGIN} replace />
          }
        />

        <Route
          path={ROUTES.ACHIEVEMENTS}
          element={
            isAuthenticated ? (
              <Achievements />
            ) : (
              <Navigate to={ROUTES.LOGIN} replace />
            )
          }
        />
        <Route
          path={ROUTES.LEADERBOARD}
          element={
            isAuthenticated ? (
              <Leaderboard />
            ) : (
              <Navigate to={ROUTES.LOGIN} replace />
            )
          }
        />
        <Route
          path={ROUTES.STATISTICS}
          element={
            isAuthenticated ? (
              <Statistics />
            ) : (
              <Navigate to={ROUTES.LOGIN} replace />
            )
          }
        />

        {/* Catch all other routes */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {/* Achievement notification popup */}
      {currentAchievement && (
        <AchievementNotification
          achievement={currentAchievement}
          onClose={handleCloseAchievement}
        />
      )}

      <ToastContainer position="top-center" autoClose={2000} />

      <style jsx>{`
        /* Note: Base styles are now in themes.css */
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: var(--text-primary);
          font-size: 1.5rem;
          background-color: var(--bg-primary);
        }

        /* Ensure content is properly positioned when navbar is hidden */
        .content-wrapper-full {
          margin-left: 0;
          width: 100%;
        }
      `}</style>
    </ThemeProvider>
  );
}

export default App;
