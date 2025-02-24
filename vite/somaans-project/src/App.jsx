import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ErrorPage from './ErrorPage';
import NavBar from './NavBar';
import CAPTCHA from './CAPTCHA';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ROUTES, PUBLIC_ROUTES, PROTECTED_ROUTES } from './Routes';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Dashboard from './Dashboard';

/** 
- Main application component
  - Handles routing logic and authentification state management
  - Controls Access to protected and public routes
*/

function App() {
  const location = useLocation();
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname.toLowerCase());
  const isErrorPage = !PUBLIC_ROUTES.includes(location.pathname.toLowerCase()) && 
                     !PROTECTED_ROUTES.includes(location.pathname.toLowerCase());

  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

  if (!isPublicRoute && !isAuthenticated && !isErrorPage) {
    return <ErrorPage />;
  }

  return (
    <>
      {!isPublicRoute && !isErrorPage && <NavBar />}
      
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
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
            <div className="content-wrapper">Achievements Page</div>
          ) : (
            <Navigate to={ROUTES.LOGIN} replace />
          )
        } />
        <Route path={ROUTES.LEADERBOARD} element={
          isAuthenticated ? (
            <div className="content-wrapper">Leaderboard Page</div>
          ) : (
            <Navigate to={ROUTES.LOGIN} replace />
          )
        } />
        <Route path={ROUTES.STATISTICS} element={
          isAuthenticated ? (
            <div className="content-wrapper">Statistics Page</div>
          ) : (
            <Navigate to={ROUTES.LOGIN} replace />
          )
        } />

        {/* Catch all other routes */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;

