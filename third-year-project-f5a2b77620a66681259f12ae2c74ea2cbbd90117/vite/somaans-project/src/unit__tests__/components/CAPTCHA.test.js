// src/__tests__/components/CAPTCHA.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CAPTCHA from '../../CAPTCHA';
import { toast } from 'react-toastify';
import { ROUTES } from '../../Routes';

// Mock the toast module
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn()
  }
}));

// Mock the Routes module
jest.mock('../../Routes', () => ({
  ROUTES: {
    DASHBOARD: '/dashboard'
  }
}));

// Mock window.location
const originalLocation = window.location;
delete window.location;
window.location = { href: '' };

// Mock sessionStorage
const mockSessionStorage = {};
Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: jest.fn(key => mockSessionStorage[key] || null),
    setItem: jest.fn((key, value) => {
      mockSessionStorage[key] = value;
    }),
    removeItem: jest.fn(key => {
      delete mockSessionStorage[key];
    })
  },
  writable: true
});

// Mock Math.random to control which image is selected
const mockMath = Object.create(global.Math);
mockMath.random = jest.fn();
global.Math = mockMath;

describe('CAPTCHA Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    window.location.href = '';
    Object.keys(mockSessionStorage).forEach(key => {
      delete mockSessionStorage[key];
    });
  });

  // Restore original location after all tests
  afterAll(() => {
    window.location = originalLocation;
  });

  // --------------------------------
  // Test 1: Component Rendering
  // --------------------------------
  test('renders the CAPTCHA component correctly', () => {
    // Force random to select the first image
    Math.random.mockReturnValue(0);
    
    render(<CAPTCHA />);
    
    // Check for essential elements
    expect(screen.getByText('Select all images that includes:')).toBeInTheDocument();
    expect(screen.getByText('A bus')).toBeInTheDocument();
    expect(screen.getByAltText('CAPTCHA')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Verify' })).toBeInTheDocument();
    
    // Check grid cells are rendered
    const cells = screen.getAllByText(/[0-8]/); // Cells are numbered 0-8
    expect(cells).toHaveLength(9);
  });

  // --------------------------------
  // Test 2: Cell Selection
  // --------------------------------
  test('allows selection and deselection of cells', () => {
    render(<CAPTCHA />);
    
    // Find cells
    const cell0 = screen.getByText('0').closest('.captcha-cell');
    const cell5 = screen.getByText('5').closest('.captcha-cell');
    
    // Select cells
    fireEvent.click(cell0);
    fireEvent.click(cell5);
    
    // Check cells are selected
    expect(cell0).toHaveClass('selected');
    expect(cell5).toHaveClass('selected');
    
    // Deselect a cell
    fireEvent.click(cell0);
    
    // Check cell is no longer selected
    expect(cell0).not.toHaveClass('selected');
    expect(cell5).toHaveClass('selected');
  });

  // --------------------------------
  // Test 3: Successful Verification
  // --------------------------------
  test('handles successful verification', () => {
    // Force to select first image (index 0)
    Math.random.mockReturnValue(0);
    
    // Mock onSuccess callback
    const mockOnSuccess = jest.fn();
    
    render(<CAPTCHA onSuccess={mockOnSuccess} />);
    
    // Select correct cells for first image
    // correctCellsMap[0] = new Set([4, 5, 6, 7, 8])
    const correctCells = [4, 5, 6, 7, 8];
    correctCells.forEach(cellNumber => {
      const cell = screen.getByText(String(cellNumber)).closest('.captcha-cell');
      fireEvent.click(cell);
    });
    
    // Click verify button
    const verifyButton = screen.getByRole('button', { name: 'Verify' });
    fireEvent.click(verifyButton);
    
    // Check if successful
    expect(window.location.href).toBe(ROUTES.DASHBOARD);
    expect(mockSessionStorage['isAuthenticated']).toBe('true');
    expect(mockOnSuccess).toHaveBeenCalled();
  });

  // --------------------------------
  // Test 4: Failed Verification
  // --------------------------------
  test('handles failed verification', () => {
    // Force first image selection
    Math.random.mockReturnValue(0);
    
    // Mock onSuccess callback
    const mockOnSuccess = jest.fn();
    
    render(<CAPTCHA onSuccess={mockOnSuccess} />);
    
    // Select wrong cells (not matching correctCellsMap[0])
    const wrongCells = [0, 1, 2];
    wrongCells.forEach(cellNumber => {
      const cell = screen.getByText(String(cellNumber)).closest('.captcha-cell');
      fireEvent.click(cell);
    });
    
    // Click verify button
    const verifyButton = screen.getByRole('button', { name: 'Verify' });
    fireEvent.click(verifyButton);
    
    // Check failed verification behavior
    expect(toast.error).toHaveBeenCalledWith(
      "Incorrect selection. Please try again.",
      expect.any(Object)
    );
    expect(window.location.href).not.toBe(ROUTES.DASHBOARD);
    expect(mockSessionStorage['isAuthenticated']).not.toBe('true');
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  // --------------------------------
  // Test 5: Image Randomization
  // --------------------------------
  test('randomizes CAPTCHA image on load', () => {
    // Force a specific random value
    Math.random.mockReturnValue(0.3);
    
    render(<CAPTCHA />);
    
    // Get the image source
    const captchaImage = screen.getByAltText('CAPTCHA');
    
    // Check if the correct image was selected based on our mocked Math.random
    // 0.3 * 5 = 1.5, floored to 1 (second image)
    expect(captchaImage.src).toContain('/images/bus2.jpg');
  });

  // --------------------------------
  // Test 6: New Image on Failure
  // --------------------------------
  test('gets a new image after failed verification', () => {
    // First force image 0
    Math.random.mockReturnValueOnce(0);
    
    render(<CAPTCHA />);
    
    // Select wrong cells
    const wrongCell = screen.getByText('0').closest('.captcha-cell');
    fireEvent.click(wrongCell);
    
    // Click verify button
    const verifyButton = screen.getByRole('button', { name: 'Verify' });
    
    // Now force a new image (index 2) after failure
    Math.random.mockReturnValueOnce(0.5);
    
    fireEvent.click(verifyButton);
    
    // Check for error toast
    expect(toast.error).toHaveBeenCalled();
    
    // Get the current image source
    const captchaImage = screen.getByAltText('CAPTCHA');
    
    // Image should be changed to index 2 (0.5 * 5 = 2.5, floored to 2)
    expect(captchaImage.src).toContain('/images/bus3.jpg');
  });

  // --------------------------------
  // Test 7: Username Handling
  // --------------------------------
  test('sets username from session storage if available', () => {
    // Set a username in session storage
    mockSessionStorage['username'] = 'TestUser';
    
    // Force first image
    Math.random.mockReturnValue(0);
    
    render(<CAPTCHA />);
    
    // Select correct cells for verification
    const correctCells = [4, 5, 6, 7, 8];
    correctCells.forEach(cellNumber => {
      const cell = screen.getByText(String(cellNumber)).closest('.captcha-cell');
      fireEvent.click(cell);
    });
    
    // Click verify button
    const verifyButton = screen.getByRole('button', { name: 'Verify' });
    fireEvent.click(verifyButton);
    
    // Check if username is maintained
    expect(mockSessionStorage['username']).toBe('TestUser');
  });

  // --------------------------------
  // Test 8: Default Username Handling
  // --------------------------------
  test('sets default username when none is available', () => {
    // No username in session storage
    
    // Force first image
    Math.random.mockReturnValue(0);
    
    render(<CAPTCHA />);
    
    // Select correct cells for verification
    const correctCells = [4, 5, 6, 7, 8];
    correctCells.forEach(cellNumber => {
      const cell = screen.getByText(String(cellNumber)).closest('.captcha-cell');
      fireEvent.click(cell);
    });
    
    // Click verify button
    const verifyButton = screen.getByRole('button', { name: 'Verify' });
    fireEvent.click(verifyButton);
    
    // Check if default username is set
    expect(mockSessionStorage['username']).toBe('User');
  });

  // --------------------------------
  // Test 9: Incomplete Selection
  // --------------------------------
  test('fails verification with incomplete selection', () => {
    // Force first image
    Math.random.mockReturnValue(0);
    
    render(<CAPTCHA />);
    
    // Select only some of the correct cells
    const partialCells = [4, 5]; // Correct needs [4, 5, 6, 7, 8]
    partialCells.forEach(cellNumber => {
      const cell = screen.getByText(String(cellNumber)).closest('.captcha-cell');
      fireEvent.click(cell);
    });
    
    // Click verify button
    const verifyButton = screen.getByRole('button', { name: 'Verify' });
    fireEvent.click(verifyButton);
    
    // Check failed verification
    expect(toast.error).toHaveBeenCalled();
    expect(mockSessionStorage['isAuthenticated']).not.toBe('true');
  });
});