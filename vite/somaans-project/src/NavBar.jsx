/**
- Navigation bar components - provides main navigation for authenticated users
- Features:
    - Dynamic routing links
    - Active route highlighting
    - Logout functionality with confirmation
 */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTES } from './Routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHouse, 
    faQuestionCircle, 
    faTrophy, 
    faRankingStar, 
    faChartLine, 
    faLock 
} from '@fortawesome/free-solid-svg-icons';

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
                <NavLink to={ROUTES.DASHBOARD}>
                    <FontAwesomeIcon icon={faHouse} className="nav-icon" /> Dashboard
                </NavLink>
                <NavLink to={ROUTES.QUIZ}>
                    <FontAwesomeIcon icon={faQuestionCircle} className="nav-icon" /> Quiz
                </NavLink>
                <NavLink to={ROUTES.ACHIEVEMENTS}>
                    <FontAwesomeIcon icon={faTrophy} className="nav-icon" /> Achievements
                </NavLink>
                <NavLink to={ROUTES.LEADERBOARD}>
                    <FontAwesomeIcon icon={faRankingStar} className="nav-icon" /> Leaderboard
                </NavLink>
                <NavLink to={ROUTES.STATISTICS}>
                    <FontAwesomeIcon icon={faChartLine} className="nav-icon" /> Statistics
                </NavLink>
            </div>
            
            <button className="logout-btn" onClick={handleLogout}>
                <FontAwesomeIcon icon={faLock} className="nav-icon" /> Logout
            </button>

            <style jsx>{`
                .nav-icon {
                    margin-right: 10px;
                    width: 18px;
                }
                
                .nav-links-box a {
                    display: flex;
                    align-items: center;
                }
                
                .logout-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}</style>
        </nav>
    );
};

export default Navbar;