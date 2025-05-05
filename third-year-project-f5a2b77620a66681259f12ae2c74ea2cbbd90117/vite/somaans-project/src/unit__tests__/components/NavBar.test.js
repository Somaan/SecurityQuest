// src/__tests__/components/NavBar.test.js

// Mock modules before importing them
jest.mock('react-router-dom', () => ({
    NavLink: ({ children, to, onClick }) => (
      <a href={to} onClick={onClick} data-testid={`navlink-${to}`}>
        {children}
      </a>
    ),
    useLocation: jest.fn().mockReturnValue({ pathname: '/dashboard' })
  }));
  
  jest.mock('react-toastify', () => ({
    toast: {
      warn: jest.fn(),
      success: jest.fn(),
      dismiss: jest.fn()
    }
  }));
  
  jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: ({ icon }) => <span data-testid={`icon-${icon}`} />
  }));
  
  jest.mock('@fortawesome/free-solid-svg-icons', () => ({
    faHouse: 'faHouse',
    faQuestionCircle: 'faQuestionCircle',
    faTrophy: 'faTrophy',
    faRankingStar: 'faRankingStar',
    faChartLine: 'faChartLine',
    faLock: 'faLock',
    faBars: 'faBars',
    faXmark: 'faXmark',
    faChevronDown: 'faChevronDown',
    faChevronUp: 'faChevronUp',
    faList: 'faList',
    faCheckSquare: 'faCheckSquare',
    faSun: 'faSun',
    faMoon: 'faMoon'
  }));
  
  // Now import React and testing libraries
  import React from 'react';
  import { render, screen, fireEvent } from '@testing-library/react';
  import '@testing-library/jest-dom';
  import Navbar from '../../NavBar';
  import { toast } from 'react-toastify';
  import { useLocation } from 'react-router-dom';
  import { ThemeContext } from '../../ThemeContext';
  
  // Instead of mocking ThemeContext directly, we'll create a wrapper component
  const renderWithThemeContext = (ui, { theme = 'dark', toggleTheme = jest.fn() } = {}) => {
    return render(
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {ui}
      </ThemeContext.Provider>
    );
  };
  
  // Mock sessionStorage
  const mockSessionStorage = (() => {
    let store = {};
    return {
      getItem: jest.fn(key => store[key] || null),
      setItem: jest.fn((key, value) => {
        store[key] = value;
      }),
      removeItem: jest.fn(key => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      })
    };
  })();
  
  // Setup and teardown
  describe('Navbar Component', () => {
    let originalInnerWidth;
    let mockToggleTheme;
    
    beforeEach(() => {
      // Setup storage mocks
      Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });
      
      // Mock window properties
      originalInnerWidth = window.innerWidth;
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });
      
      // Reset mocks
      jest.clearAllMocks();
      mockToggleTheme = jest.fn();
      
      // Setup default location mock
      useLocation.mockReturnValue({ pathname: '/dashboard' });
    });
    
    afterEach(() => {
      // Restore window.innerWidth
      Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth });
    });
    
    // Tests
    
    // 1. Initial rendering test
    test('renders navbar with all navigation links', () => {
      renderWithThemeContext(<Navbar />);
      
      // Check main navigation links
      expect(screen.getByTestId('navlink-/dashboard')).toBeInTheDocument();
      expect(screen.getByText('Quiz')).toBeInTheDocument();
      expect(screen.getByTestId('navlink-/achievements')).toBeInTheDocument();
      expect(screen.getByTestId('navlink-/leaderboard')).toBeInTheDocument();
      expect(screen.getByTestId('navlink-/statistics')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });
    
    // 2. Mobile menu toggle test
    test('toggles mobile menu when clicking the menu button', () => {
      const { container } = renderWithThemeContext(<Navbar />);
      
      // Get elements
      const mobileToggle = container.querySelector('.mobile-menu-toggle');
      const sidebar = container.querySelector('.sidebar');
      
      // Initially sidebar should not have 'open' class
      expect(sidebar).not.toHaveClass('open');
      
      // Click the mobile toggle button
      fireEvent.click(mobileToggle);
      
      // Now sidebar should have 'open' class
      expect(sidebar).toHaveClass('open');
      
      // Click again to close
      fireEvent.click(mobileToggle);
      
      // Sidebar should no longer have 'open' class
      expect(sidebar).not.toHaveClass('open');
    });
    
    // 3. Quiz submenu toggle test
    test('toggles quiz submenu when clicking the quiz menu item', () => {
      const { container } = renderWithThemeContext(<Navbar />);
      
      // Get the quiz nav item with the chevron
      const quizNavItem = screen.getByText('Quiz').closest('div');
      
      // Get submenu
      const submenu = container.querySelector('.submenu');
      
      // Initially submenu should not have 'open' class
      expect(submenu).not.toHaveClass('open');
      
      // Click the quiz nav item to open submenu
      fireEvent.click(quizNavItem);
      
      // Now submenu should have 'open' class
      expect(submenu).toHaveClass('open');
      
      // Click again to close
      fireEvent.click(quizNavItem);
      
      // Submenu should no longer have 'open' class
      expect(submenu).not.toHaveClass('open');
    });
    
    // 4. Theme toggle test
    test('calls toggleTheme when clicking the theme toggle button', () => {
      const { container } = renderWithThemeContext(<Navbar />, { toggleTheme: mockToggleTheme });
      
      // Get the theme toggle button
      const themeToggleBtn = screen.getByRole('button', { name: /Switch to light mode/i });
      
      // Click the theme toggle button
      fireEvent.click(themeToggleBtn);
      
      // Check if toggleTheme was called
      expect(mockToggleTheme).toHaveBeenCalled();
    });
    
    // 5. Logout functionality test
    test('shows confirmation toast when clicking logout button', () => {
      renderWithThemeContext(<Navbar />);
      
      // Get the logout button
      const logoutBtn = screen.getByText('Logout');
      
      // Click the logout button
      fireEvent.click(logoutBtn);
      
      // Check if toast.warn was called
      expect(toast.warn).toHaveBeenCalled();
    });
    
    // 6. Auto-expand quiz submenu when on quiz pages
    test('auto-expands quiz submenu when on quiz pages', () => {
      // Mock the useLocation to return a quiz path
      useLocation.mockReturnValueOnce({ pathname: '/quiz/questions' });
      
      const { container } = renderWithThemeContext(<Navbar />);
      
      // Get submenu
      const submenu = container.querySelector('.submenu');
      
      // Submenu should be open because we're on a quiz page
      expect(submenu).toHaveClass('open');
    });
    
    // 7. Navigation links should close mobile menu 
    test('closes mobile menu when clicking a navigation link', () => {
      const { container } = renderWithThemeContext(<Navbar />);
      
      // Set to mobile size
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 });
      
      // Get elements
      const mobileToggle = container.querySelector('.mobile-menu-toggle');
      const sidebar = container.querySelector('.sidebar');
      const dashboardLink = screen.getByTestId('navlink-/dashboard');
      
      // Open the sidebar
      fireEvent.click(mobileToggle);
      expect(sidebar).toHaveClass('open');
      
      // Click a link
      fireEvent.click(dashboardLink);
      
      // Sidebar should now be closed
      expect(sidebar).not.toHaveClass('open');
    });
  });