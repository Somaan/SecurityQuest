// src/__tests__/components/ForgotPassword.test.jsx

// Mock the react-router-dom module before importing it
jest.mock('react-router-dom', () => ({
    Link: ({ to, className, children }) => (
      <a href={to} className={className} data-testid="mock-link">
        {children}
      </a>
    ),
    useNavigate: () => jest.fn(),
  }));
  
  import React from 'react';
  import { render, screen, fireEvent, waitFor } from '@testing-library/react';
  import '@testing-library/jest-dom';
  import { toast } from 'react-toastify';
  import ForgotPassword from '../../ForgotPassword';
  import { ROUTES } from '../../Routes';
  
  // Mock dependencies
  jest.mock('react-toastify', () => ({
    toast: {
      success: jest.fn(),
      error: jest.fn()
    }
  }));
  
  // Mock Routes
  jest.mock('../../Routes', () => ({
    ROUTES: {
      LOGIN: '/login'
    }
  }));
  
  // Mock fetch
  global.fetch = jest.fn();
  
  describe('ForgotPassword Component', () => {
    beforeEach(() => {
      // Reset mocks before each test
      jest.clearAllMocks();
      global.fetch.mockClear();
    });
  
    // Test 1
    test('renders forgot password form with all elements', () => {
      render(<ForgotPassword />);
      
      // Check sidebar
      expect(screen.getByText('Password Reset')).toBeInTheDocument();
      
      // Check form content
      expect(screen.getByText('Reset Your Password')).toBeInTheDocument();
      expect(screen.getByText('Enter your email address and we\'ll send you a link to reset your password.')).toBeInTheDocument();
      expect(screen.getByLabelText('Email:')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
      expect(screen.getByText('Send Reset Link')).toBeInTheDocument();
      expect(screen.getByText('Back to Login')).toBeInTheDocument();
    });
  
    // Test 2
    test('updates email state when input changes', () => {
      render(<ForgotPassword />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      expect(emailInput.value).toBe('test@example.com');
    });
  
    // Test 3
    test('shows loading state and disables button during form submission', async () => {
      // Mock a pending promise that doesn't resolve immediately
      global.fetch.mockImplementationOnce(() => new Promise(resolve => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve({ message: 'Success' })
          });
        }, 100);
      }));
      
      render(<ForgotPassword />);
      
      // Fill and submit the form
      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      const submitButton = screen.getByText('Send Reset Link');
      fireEvent.click(submitButton);
      
      // Button should show loading state and be disabled
      expect(screen.getByText('Sending...')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
    });
  
    // Test 4
    test('shows success message and email sent notice when reset link is sent', async () => {
      global.fetch.mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Success' })
      }));
      
      render(<ForgotPassword />);
      
      // Initially, email sent notice should not be visible
      expect(screen.queryByText('Please check your email for the reset link. Check your spam/junk folder.')).not.toBeInTheDocument();
      
      // Fill and submit the form
      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      const submitButton = screen.getByText('Send Reset Link');
      fireEvent.click(submitButton);
      
      // Wait for the async operation to complete
      await waitFor(() => {
        // Check if success toast was called
        expect(toast.success).toHaveBeenCalledWith('Password reset link sent to your email!');
        
        // Check if notification is shown
        expect(screen.getByText('Please check your email for the reset link. Check your spam/junk folder.')).toBeInTheDocument();
        
        // Email field should be cleared
        expect(emailInput.value).toBe('');
      });
    });
  
    // Test 5
    test('shows error message when reset link fails to send', async () => {
      const errorMessage = 'Email not found';
      global.fetch.mockImplementationOnce(() => Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: errorMessage })
      }));
      
      render(<ForgotPassword />);
      
      // Fill and submit the form
      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
      
      const submitButton = screen.getByText('Send Reset Link');
      fireEvent.click(submitButton);
      
      // Wait for the async operation to complete
      await waitFor(() => {
        // Check if error toast was called with correct message
        expect(toast.error).toHaveBeenCalledWith(errorMessage);
        
        // Email notification should not be shown
        expect(screen.queryByText('Please check your email for the reset link. Check your spam/junk folder.')).not.toBeInTheDocument();
      });
    });
  
    // Test 6
    test('handles network errors during form submission', async () => {
      // Mock network error
      const errorMessage = 'Network error';
      global.fetch.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
      
      render(<ForgotPassword />);
      
      // Fill and submit the form
      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      const submitButton = screen.getByText('Send Reset Link');
      fireEvent.click(submitButton);
      
      // Wait for the async operation to complete
      await waitFor(() => {
        // Check if error toast was called with network error message
        expect(toast.error).toHaveBeenCalledWith(errorMessage);
      });
    });
  
    // Test 7
    test('makes correct API call with email data', async () => {
      global.fetch.mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Success' })
      }));
      
      render(<ForgotPassword />);
      
      const testEmail = 'test@example.com';
      const emailInput = screen.getByPlaceholderText('Enter your email');
      fireEvent.change(emailInput, { target: { value: testEmail } });
      
      const submitButton = screen.getByText('Send Reset Link');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          'http://localhost:5000/api/forgot-password',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: testEmail }),
          }
        );
      });
    });
  
    // Test 8
    test('back to login link has correct route', () => {
      render(<ForgotPassword />);
      
      const loginLink = screen.getByText('Back to Login').closest('a');
      expect(loginLink).toHaveAttribute('href', ROUTES.LOGIN);
    });
  });