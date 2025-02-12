// NavBar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTES } from './Routes';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        toast.warn(
            <div className="custom-toast">
                <p>Are you sure you want to logout?</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button 
                        onClick={() => {
                            toast.dismiss();
                            confirmLogout();
                        }}
                        className="toast-button-yes"
                    >
                        Yes
                    </button>
                    <button 
                        onClick={() => toast.dismiss()}
                        className="toast-button-cancel"
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                position: "top-center",
                autoClose: false,
                closeButton: false,
                draggable: true,
                closeOnClick: false,
                theme: "dark",
                hideProgressBar: true,
                pauseOnHover: true
            }
        );
    };

    const confirmLogout = () => {
        sessionStorage.removeItem('isAuthenticated');
        toast.success('Logging you out...', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "dark",
            onClose: () => navigate(ROUTES.LOGIN)
        });
    };

    return (
        <nav className="sidebar">
            <div className="nav-brand">
                Social Engineering
            </div>

            <div className="nav-links-box">
                <NavLink to={ROUTES.DASHBOARD}>Dashboard</NavLink>
                <NavLink to={ROUTES.QUIZ}>Quiz</NavLink>
                <NavLink to={ROUTES.ACHIEVEMENTS}>Achievements</NavLink>
                <NavLink to={ROUTES.LEADERBOARD}>Leaderboard</NavLink>
                <NavLink to={ROUTES.STATISTICS}>Statistics</NavLink>
            </div>
            
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
};

export default Navbar;

