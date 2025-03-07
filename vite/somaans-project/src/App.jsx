import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './Login';
import Register from './Register';
import ErrorPage from './ErrorPage';
import NavBar from './NavBar';
import CAPTCHA from './CAPTCHA';
import { ToastContainer } from 'react-toastify';
import { ROUTES, PUBLIC_ROUTES, PROTECTED_ROUTES } from './Routes';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Dashboard from './Dashboard';
import Statistics from './Statistics';
import Leaderboard from './Leaderboard';
import Achievements from './Achievements';

/** 
- Main application component
  - Handles routing logic and authentification state management
  - Controls Access to protected and public routes
  - Checks for remembered user on initial load
*/

function App() {
  const location = useLocation();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname.toLowerCase());
  const isErrorPage = !PUBLIC_ROUTES.includes(location.pathname.toLowerCase()) && 
                     !PROTECTED_ROUTES.includes(location.pathname.toLowerCase());

  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('isAuthenticated') === 'true'
  );

  // Check for remembered user on initial load
  useEffect(() => {
    const checkRememberedUser = async () => {
      // Check if user just logged out - if so, don't auto-login
      const justLoggedOut = sessionStorage.getItem('just_logged_out') === 'true';
      if (justLoggedOut) {
        sessionStorage.removeItem('just_logged_out');
        setIsAuthenticating(false);
        return;
      }
      
      // Only attempt auto-login on direct visit to login page when not authenticated
      const isOnLoginPage = location.pathname.toLowerCase() === ROUTES.LOGIN.toLowerCase();
      const rememberedUser = localStorage.getItem('rememberedUser');
      
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

  // Show loading state while checking authentication
  if (isAuthenticating) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!isPublicRoute && !isAuthenticated && !isErrorPage) {
    return <ErrorPage />;
  }

  return (
    <>
      {!isPublicRoute && !isErrorPage && <NavBar />}
      
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.HOME} element={<Navigate to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN} replace />} />
        <Route path={ROUTES.LOGIN} element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Login />} />
        <Route path={ROUTES.REGISTER} element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Register />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />


        {/* Protected Routes */}
        <Route path={ROUTES.DASHBOARD} element={
          isAuthenticated ? (
          <Dashboard />
        ) : (
          <Navigate to={ROUTES.LOGIN} replace />
        )
        } />
        <Route path={ROUTES.QUIZ} element={
          isAuthenticated ? (
            <div className="content-wrapper">Quiz Page</div>
          ) : (
            <Navigate to={ROUTES.LOGIN} replace />
          )
        } />
        <Route path={ROUTES.ACHIEVEMENTS} element={
          isAuthenticated ? (
            <Achievements />
          ) : (
            <Navigate to={ROUTES.LOGIN} replace />
          )
        } />
        <Route path={ROUTES.LEADERBOARD} element={
          isAuthenticated ? (
            <Leaderboard />
          ) : (
            <Navigate to={ROUTES.LOGIN} replace />
          )
        } />
        <Route path={ROUTES.STATISTICS} element={
          isAuthenticated ? (
            <Statistics />
          ) : (
            <Navigate to={ROUTES.LOGIN} replace />
          )
        } />

        {/* Catch all other routes */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      
      <ToastContainer position="top-center" autoClose={2000} />

      <style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #242424;
          color: white;
          font-size: 1.5rem;
        }
      `}</style>
    </>
  );
}

export default App;