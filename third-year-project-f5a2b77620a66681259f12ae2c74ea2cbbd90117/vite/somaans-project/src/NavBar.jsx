import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "./Routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quizSubmenuOpen, setQuizSubmenuOpen] = useState(false);

  // Check if current route is in Quiz section
  const isQuizSection = location.pathname.startsWith("/quiz");

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
      if (
        mobileMenuOpen &&
        !event.target.closest(".sidebar") &&
        !event.target.closest(".mobile-menu-toggle")
      ) {
        setMobileMenuOpen(false);
        setQuizSubmenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close sidebar when window is resized to larger size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
        setQuizSubmenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    toast.warn(
      <div className="custom-toast">
        <p>Are you sure you want to logout?</p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
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
        pauseOnHover: true,
      }
    );
  };

  const confirmLogout = () => {
    // Set a flag to prevent auto-login right after logout
    sessionStorage.setItem("just_logged_out", "true");

    // Clear authentication status
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("username");

    toast.success("Logging you out...", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      onClose: () => {
        // Force a hard redirect to the login page
        window.location.href = ROUTES.LOGIN;
      },
    });
  };

  // Close menu when a link is clicked (mobile only)
  const closeMenu = () => {
    setMobileMenuOpen(false);
    setQuizSubmenuOpen(false);
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
        className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} />
      </div>

      {/* Background overlay for mobile */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? "show" : ""}`}
        onClick={() => {
          setMobileMenuOpen(false);
          setQuizSubmenuOpen(false);
        }}
      ></div>

      <nav className={`sidebar ${mobileMenuOpen ? "open" : ""}`}>
        <div className="nav-brand">
          <img
            src="src/assets/logo.svg"
            alt="SecurityQuest"
            className="nav-logo"
          />
        </div>

        <div className="nav-links-box">
          <NavLink to={ROUTES.DASHBOARD} onClick={closeMenu}>
            <FontAwesomeIcon icon={faHouse} className="nav-icon" />
            <span className="nav-text">Dashboard</span>
          </NavLink>

          {/* Quiz with submenu */}
          <div
            className={`nav-item-with-submenu desktop-submenu ${
              quizSubmenuOpen ? "open" : ""
            }`}
            onClick={toggleQuizSubmenu}
          >
            <div className="nav-link-content">
              <div className="nav-link-wrapper">
                <FontAwesomeIcon icon={faQuestionCircle} className="nav-icon" />
                <span className="nav-text">Quiz</span>
              </div>
              <FontAwesomeIcon
                icon={quizSubmenuOpen ? faChevronUp : faChevronDown}
                className="submenu-icon"
              />
            </div>

            <div className={`submenu ${quizSubmenuOpen ? "open" : ""}`}>
              <NavLink
                to={`${ROUTES.QUIZ}/difficulty`}
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FontAwesomeIcon icon={faList} className="submenu-icon" />
                <span className="nav-text">Select Difficulty</span>
              </NavLink>
              <NavLink
                to={`${ROUTES.QUIZ}/questions`}
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className="submenu-icon"
                />
                <span className="nav-text">Questions</span>
              </NavLink>
              <NavLink
                to={`${ROUTES.QUIZ}/results`}
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FontAwesomeIcon
                  icon={faCheckSquare}
                  className="submenu-icon"
                />
                <span className="nav-text">Results</span>
              </NavLink>
            </div>
          </div>

          <NavLink to={ROUTES.ACHIEVEMENTS} onClick={closeMenu}>
            <FontAwesomeIcon icon={faTrophy} className="nav-icon" />
            <span className="nav-text">Achievements</span>
          </NavLink>
          <NavLink to={ROUTES.LEADERBOARD} onClick={closeMenu}>
            <FontAwesomeIcon icon={faRankingStar} className="nav-icon" />
            <span className="nav-text">Leaderboard</span>
          </NavLink>
          <NavLink to={ROUTES.STATISTICS} onClick={closeMenu}>
            <FontAwesomeIcon icon={faChartLine} className="nav-icon" />
            <span className="nav-text">Statistics</span>
          </NavLink>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faLock} className="nav-icon" />
          <span className="nav-text">Logout</span>
        </button>
      </nav>

      <style jsx>{`
        /* Desktop styles */
        .sidebar {
          width: 200px;
          background-color: #2c3e50;
          color: #fff;
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
          padding: 0;
          z-index: 100;
        }

        .nav-brand {
          padding: 15px 10px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .nav-logo {
          height: 100px;
          width: auto;
          max-width: 100%;
          display: block;
        }

        .nav-links-box {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .nav-links-box > a,
        .nav-link-content,
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 12px; /* Consistent gap for all nav items */
          padding: 12px 20px;
          color: #ecf0f1;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .nav-icon {
          width: 20px;
          text-align: center;
        }

        .nav-links-box > a:hover,
        .nav-link-content:hover {
          background-color: #34495e;
          color: #fff;
        }

        .nav-links-box > a.active,
        .nav-links-box > a.active:hover {
          background-color: #3498db;
          color: white;
          border-left: 4px solid #2980b9;
        }

        .nav-item-with-submenu {
          position: relative;
        }

        .nav-link-content {
          justify-content: space-between;
          cursor: pointer;
        }

        .nav-link-wrapper {
          display: flex;
          align-items: center;
          gap: 12px; /* Consistent spacing for icon and text */
        }

        .submenu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          background-color: #243342;
        }

        .submenu.open {
          max-height: 300px;
        }

        .submenu a {
          padding: 10px 20px 10px 35px;
          display: flex;
          align-items: center;
          gap: 12px; /* Consistent spacing in submenu */
          color: #ecf0f1;
          text-decoration: none;
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

        .logout-btn {
          margin-top: auto;
          margin-bottom: 20px;
          background-color: #e74c3c;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          width: 100%;
        }

        .logout-btn:hover {
          background-color: #c0392b;
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: flex;
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 1000;
            background-color: #2c3e50;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }

          .mobile-menu-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 900;
          }

          .mobile-menu-overlay.show {
            display: block;
          }

          .sidebar {
            width: 250px;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            z-index: 950;
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .nav-links-box {
            margin-top: 60px;
          }

          .nav-links-box > a,
          .nav-link-content,
          .logout-btn {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .submenu a {
            padding: 15px 20px 15px 40px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
