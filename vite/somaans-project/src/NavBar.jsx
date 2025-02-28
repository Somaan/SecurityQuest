import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTES } from './Routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHouse, 
    faQuestionCircle, 
    faTrophy, 
    faRankingStar, 
    faChartLine, 
    faLock,
    faBars,
    faXmark
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // If clicked outside sidebar and sidebar is open, close it
            if (mobileMenuOpen && 
                !event.target.closest('.sidebar') && 
                !event.target.closest('.mobile-menu-toggle')) {
                setMobileMenuOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    // Close sidebar when window is resized to larger size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileMenuOpen]);

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
        // Set a flag to prevent auto-login right after logout
        sessionStorage.setItem('just_logged_out', 'true');
        
        // Clear authentication status
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('username');
        
        toast.success('Logging you out...', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "dark",
            onClose: () => {
                // Force a hard redirect to the login page
                window.location.href = ROUTES.LOGIN;
            }
        });
    };
    
    // Close menu when a link is clicked (mobile only)
    const closeMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile menu toggle button */}
            <div 
                className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
            >
                <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} />
            </div>
            
            {/* Background overlay for mobile */}
            <div 
                className={`mobile-menu-overlay ${mobileMenuOpen ? 'show' : ''}`} 
                onClick={() => setMobileMenuOpen(false)}
            ></div>
            
            <nav className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="nav-brand">
                    Social Engineering
                </div>

                <div className="nav-links-box">
                    <NavLink to={ROUTES.DASHBOARD} onClick={closeMenu}>
                        <FontAwesomeIcon icon={faHouse} className="nav-icon" /> Dashboard
                    </NavLink>
                    <NavLink to={ROUTES.QUIZ} onClick={closeMenu}>
                        <FontAwesomeIcon icon={faQuestionCircle} className="nav-icon" /> Quiz
                    </NavLink>
                    <NavLink to={ROUTES.ACHIEVEMENTS} onClick={closeMenu}>
                        <FontAwesomeIcon icon={faTrophy} className="nav-icon" /> Achievements
                    </NavLink>
                    <NavLink to={ROUTES.LEADERBOARD} onClick={closeMenu}>
                        <FontAwesomeIcon icon={faRankingStar} className="nav-icon" /> Leaderboard
                    </NavLink>
                    <NavLink to={ROUTES.STATISTICS} onClick={closeMenu}>
                        <FontAwesomeIcon icon={faChartLine} className="nav-icon" /> Statistics
                    </NavLink>
                </div>
                
                <button className="logout-btn" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faLock} className="nav-icon" /> Logout
                </button>
            </nav>
        </>
    );
};

export default Navbar;