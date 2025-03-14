import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
    faXmark,
    faChevronDown,
    faChevronUp,
    faList,
    faCheckSquare
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [quizSubmenuOpen, setQuizSubmenuOpen] = useState(false);
    
    // Check if current route is in Quiz section
    const isQuizSection = location.pathname.startsWith('/quiz');
    
    // Auto-expand quiz submenu if on quiz pages
    useEffect(() => {
        if (isQuizSection) {
            setQuizSubmenuOpen(true);
        }
    }, [isQuizSection]);
    
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

    // Toggle quiz submenu
    const toggleQuizSubmenu = (e) => {
        // Prevent the NavLink from navigating
        e.preventDefault();
        setQuizSubmenuOpen(!quizSubmenuOpen);
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
                    
                    {/* Quiz with submenu */}
                    <div className={`nav-item-with-submenu ${quizSubmenuOpen ? 'open' : ''}`}>
                        <NavLink 
                            to={ROUTES.QUIZ} 
                            onClick={toggleQuizSubmenu}
                            className={({ isActive }) => isActive || isQuizSection ? 'active' : ''}
                        >
                            <div className="nav-link-content">
                                <FontAwesomeIcon icon={faQuestionCircle} className="nav-icon" /> 
                                <span className="nav-text">Quiz</span>
                            </div>
                            <FontAwesomeIcon 
                                icon={quizSubmenuOpen ? faChevronUp : faChevronDown} 
                                className="submenu-icon" 
                            />
                        </NavLink>
                        
                        <div className={`submenu ${quizSubmenuOpen ? 'open' : ''}`}>
                            <NavLink 
                                to={`${ROUTES.QUIZ}/difficulty`} 
                                onClick={closeMenu}
                                className={({ isActive }) => isActive ? 'active' : ''}
                            >
                                <FontAwesomeIcon icon={faList} className="submenu-icon" /> 
                                Select Difficulty
                            </NavLink>
                            <NavLink 
                                to={`${ROUTES.QUIZ}/questions`} 
                                onClick={closeMenu}
                                className={({ isActive }) => isActive ? 'active' : ''}
                            >
                                <FontAwesomeIcon icon={faQuestionCircle} className="submenu-icon" /> 
                                Questions
                            </NavLink>
                            <NavLink 
                                to={`${ROUTES.QUIZ}/results`} 
                                onClick={closeMenu}
                                className={({ isActive }) => isActive ? 'active' : ''}
                            >
                                <FontAwesomeIcon icon={faCheckSquare} className="submenu-icon" /> 
                                Results
                            </NavLink>
                        </div>
                    </div>
                    
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
            
            <style jsx>{`
                /* Mobile menu toggle */
                .mobile-menu-toggle {
                    display: none;
                    position: fixed;
                    top: 15px;
                    left: 15px;
                    z-index: 999;
                    background-color: #2c3e50;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                    color: white;
                    font-size: 1.25rem;
                }
                
                /* Mobile background overlay */
                .mobile-menu-overlay {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 900;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                }
                
                .mobile-menu-overlay.show {
                    opacity: 1;
                    pointer-events: auto;
                }
                
                /* Quiz Submenu Styles */
                .nav-item-with-submenu {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }
                
                .nav-item-with-submenu > a {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 20px;
                    color: #ecf0f1;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                
                .nav-item-with-submenu > a:hover {
                    background-color: #34495e;
                    color: #fff;
                }
                
                .nav-item-with-submenu > a.active {
                    background-color: #3498db;
                    color: white;
                    border-left: 4px solid #2980b9;
                }
                
                .nav-link-content {
                    display: flex;
                    align-items: center;
                }
                
                .nav-text {
                    flex: 1;
                }
                
                .submenu-icon {
                    font-size: 0.8rem;
                    transition: transform 0.3s ease;
                    margin-left: 5px;
                }
                
                .submenu {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease;
                    background-color: #243342;
                }
                
                .submenu.open {
                    max-height: 300px; /* Adjust based on your submenu content */
                }
                
                .submenu a {
                    padding: 10px 20px 10px 35px;
                    color: #ecf0f1;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                }
                
                .submenu a:hover {
                    background-color: #34495e;
                }
                
                .submenu a.active {
                    background-color: #2980b9;
                    color: white;
                }
                
                .submenu .submenu-icon {
                    margin-right: 8px;
                    margin-left: 0;
                    font-size: 0.9rem;
                }
                
                /* Nav icon positioning */
                .nav-icon {
                    width: 20px;
                    text-align: center;
                    margin-right: 10px;
                }
                
                /* Ensure all NavLinks have consistent styling */
                .nav-links-box > a {
                    display: flex;
                    align-items: center;
                    padding: 12px 20px;
                    color: #ecf0f1;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                
                .nav-links-box > a:hover {
                    background-color: #34495e;
                    color: #fff;
                }
                
                .nav-links-box > a.active {
                    background-color: #3498db;
                    color: white;
                    border-left: 4px solid #2980b9;
                }
                
                /* Responsive styles */
                @media (max-width: 768px) {
                    .mobile-menu-toggle {
                        display: flex;
                    }
                    
                    .mobile-menu-overlay {
                        display: block;
                    }
                    
                    .sidebar {
                        transform: translateX(-100%);
                        z-index: 950;
                    }
                    
                    .sidebar.open {
                        transform: translateX(0);
                    }
                }
            `}</style>
        </>
    );
};

export default Navbar;