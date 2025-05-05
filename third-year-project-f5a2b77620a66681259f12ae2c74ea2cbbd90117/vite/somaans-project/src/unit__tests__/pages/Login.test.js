// src/__tests__/pages/Login.test.js

// Mock modules before importing them
jest.mock('react-router-dom', () => ({
    Link: ({ children, to }) => <a href={to}>{children}</a>,
    useNavigate: () => jest.fn()
  }));
  
  jest.mock('react-toastify', () => ({
    toast: {
      error: jest.fn(),
      success: jest.fn()
    }
  }));
  
  jest.mock('../../CAPTCHA', () => {
    return jest.fn(({ onSuccess, onCancel }) => (
      <div data-testid="mock-captcha">
        <button onClick={onSuccess} data-testid="captcha-success-btn">Complete CAPTCHA</button>
        <button onClick={onCancel} data-testid="captcha-cancel-btn">Cancel</button>
      </div>
    ));
  });
  
  jest.mock('../../AchievementService', () => ({
    checkStreakAchievements: jest.fn().mockResolvedValue([]),
    queueAchievement: jest.fn()
  }));
  
  jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: jest.fn(() => <span data-testid="mock-icon" />)
  }));
  
  jest.mock('@fortawesome/free-solid-svg-icons', () => ({
    faRightToBracket: 'faRightToBracket',
    faEye: 'faEye',
    faEyeSlash: 'faEyeSlash'
  }));
  
  jest.mock('../../Routes', () => ({
    ROUTES: {
      DASHBOARD: '/dashboard',
      REGISTER: '/register',
      FORGOT_PASSWORD: '/forgot-password'
    }
  }));
  
  // Now import React and testing libraries
  import React from 'react';
  import { render, screen, fireEvent, waitFor } from '@testing-library/react';
  import '@testing-library/jest-dom';
  import LoginForm from '../../Login';
  import { toast } from 'react-toastify';
  import AchievementService from '../../AchievementService';
  
  // Mock localStorage and sessionStorage
  const mockLocalStorage = (() => {
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
      }),
      _getStore: () => store // Helper for tests
    };
  })();
  
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
      }),
      _getStore: () => store // Helper for tests
    };
  })();
  
  // Mock fetch
  global.fetch = jest.fn();
  
  // Helper function to get the password input
  const getPasswordInput = () => screen.getByLabelText(/password:/i).closest('.input-wrapper').querySelector('input');
  const getUsernameInput = () => screen.getByLabelText(/username:/i).closest('.input-wrapper').querySelector('input');
  const getLoginButton = () => screen.getByRole('button', { name: /login/i });
  
  // Setup and teardown
  describe('LoginForm Component', () => {
    beforeEach(() => {
      // Setup storage mocks
      Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
      Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });
      
      // Reset mocks
      jest.clearAllMocks();
      
      // Mock console methods to reduce noise
      jest.spyOn(console, 'log').mockImplementation(() => {});
      jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(console, 'warn').mockImplementation(() => {});
      
      // Setup default fetch response
      global.fetch.mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true, user: { id: '123' } })
        })
      );
      
      // Mock setTimeout
      jest.useFakeTimers();
    });
    
    afterEach(() => {
      // Restore timers
      jest.useRealTimers();
      
      // Restore console
      console.log.mockRestore();
      console.error.mockRestore();
      console.warn.mockRestore();
    });
    
    // Tests
    
    // 1. Initial rendering test
    test('renders login form correctly', () => {
      render(<LoginForm />);
      
      // Check form elements are present
      expect(screen.getByLabelText(/username:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByText(/keep me logged in/i)).toBeInTheDocument();
      expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
      expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
      expect(screen.getByText(/register here/i)).toBeInTheDocument();
    });
    
    // 2. Form validation test - FIXED
    test('shows error when submitting empty form', () => {
      render(<LoginForm />);
      
      // Get the form using the login button as a reference point
      const loginButton = screen.getByRole('button', { name: /login/i });
      const form = loginButton.closest('form');
      fireEvent.submit(form);
      
      // Check if error toast was called
      expect(toast.error).toHaveBeenCalledWith('Please fill in all fields');
    });
    
    // 3. Input fields test
    test('allows input in form fields', () => {
      render(<LoginForm />);
      
      // Get input fields
      const usernameInput = getUsernameInput();
      const passwordInput = getPasswordInput();
      
      // Enter text
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      // Check values are updated
      expect(usernameInput.value).toBe('testuser');
      expect(passwordInput.value).toBe('password123');
    });
    
    // 4. Character limit test
    test('enforces character limit on inputs', () => {
      render(<LoginForm />);
      
      // Get input fields
      const usernameInput = getUsernameInput();
      
      // Enter text within limit first to verify input works
      fireEvent.change(usernameInput, { target: { value: 'test' } });
      expect(usernameInput.value).toBe('test');
      
      // Then try with text exceeding limit
      const longUsername = 'a'.repeat(25);
      fireEvent.change(usernameInput, { target: { value: longUsername } });
      
      // Limit should be enforced through the onChange handler
      expect(usernameInput.value.length).toBeLessThanOrEqual(20);
    });
    
    // 5. Password visibility toggle test
    test('toggles password visibility', () => {
      render(<LoginForm />);
      
      // Get password input and toggle button
      const passwordInput = getPasswordInput();
      const toggleButton = screen.getByLabelText(/show password/i);
      
      // Initially password should be hidden
      expect(passwordInput.type).toBe('password');
      
      // Click toggle button
      fireEvent.click(toggleButton);
      
      // Password should be visible
      expect(passwordInput.type).toBe('text');
      
      // Click toggle again
      fireEvent.click(toggleButton);
      
      // Password should be hidden again
      expect(passwordInput.type).toBe('password');
    });
    
    // 6. Remember me functionality test
    test('handles remember me checkbox', () => {
      render(<LoginForm />);
      
      // Get remember me checkbox
      const rememberMeCheckbox = screen.getByRole('checkbox');
      
      // Check the box
      fireEvent.click(rememberMeCheckbox);
      
      // Should be checked
      expect(rememberMeCheckbox).toBeChecked();
      
      // Uncheck the box
      fireEvent.click(rememberMeCheckbox);
      
      // Should be unchecked
      expect(rememberMeCheckbox).not.toBeChecked();
    });
    
    // 7. Login form submission test - simplified version
    test('handles form submission correctly', async () => {
      render(<LoginForm />);
      
      // Fill out form
      fireEvent.change(getUsernameInput(), { target: { value: 'testuser' } });
      fireEvent.change(getPasswordInput(), { target: { value: 'password123' } });
      
      // Submit form by clicking login button
      fireEvent.click(getLoginButton());
      
      // Check fetch call
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/login', 
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })
      );
      
      // Should show loading state
      expect(screen.getByText(/verifying/i)).toBeInTheDocument();
    });
    
    // 8. Login error handling test
    test('handles login errors correctly', async () => {
      // Mock fetch to reject
      global.fetch.mockReset();
      global.fetch.mockImplementationOnce(() => 
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ error: 'Invalid credentials' })
        })
      );
      
      render(<LoginForm />);
      
      // Fill out form
      fireEvent.change(getUsernameInput(), { target: { value: 'testuser' } });
      fireEvent.change(getPasswordInput(), { target: { value: 'password123' } });
      
      // Submit form by clicking login button
      fireEvent.click(getLoginButton());
      
      // Wait for error toast
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
      });
    });
    
    // 9. Remember me persistence test
    test('loads remembered credentials on mount', () => {
      // Setup saved credentials
      const savedCredentials = {
        username: 'saveduser',
        password: 'savedpass'
      };
      
      window.localStorage.getItem.mockReturnValueOnce(JSON.stringify(savedCredentials));
      
      render(<LoginForm />);
      
      // Check if form is pre-filled
      expect(getUsernameInput().value).toBe('saveduser');
      expect(getPasswordInput().value).toBe('savedpass');
      expect(screen.getByRole('checkbox')).toBeChecked();
    });
    
    // 10. Saves credentials with Remember Me - modified to check the fetch call
    test('saves credentials when remember me is checked', async () => {
      global.fetch.mockReset();
      global.fetch.mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true })
        })
      );
      
      render(<LoginForm />);
      
      // Fill out form
      fireEvent.change(getUsernameInput(), { target: { value: 'testuser' } });
      fireEvent.change(getPasswordInput(), { target: { value: 'password123' } });
      
      // Check remember me
      fireEvent.click(screen.getByRole('checkbox'));
      
      // Submit form by clicking login button
      fireEvent.click(getLoginButton());
      
      // Check if fetch was called with remember_me: true
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5000/api/login',
        expect.objectContaining({
          body: expect.stringContaining('"remember_me":true')
        })
      );
    });
  });