import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import ErrorPage from '../../ErrorPage';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('ErrorPage Component', () => {
  // Setup mock navigate function
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    useNavigate.mockImplementation(() => mockNavigate);
  });

  test('renders error page correctly and navigates home when button is clicked', () => {
    // Render the component
    render(<ErrorPage />);
    
    // Check if main elements are rendered
    expect(screen.getByText('Oops, something went wrong!')).toBeInTheDocument();
    expect(screen.getByText('Tarnished, your page seizes to exist')).toBeInTheDocument();
    
    // Check if the button is rendered
    const homeButton = screen.getByText('Go to Home');
    expect(homeButton).toBeInTheDocument();
    
    // Simulate click on the button
    fireEvent.click(homeButton);
    
    // Check if navigation was called with correct path
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});