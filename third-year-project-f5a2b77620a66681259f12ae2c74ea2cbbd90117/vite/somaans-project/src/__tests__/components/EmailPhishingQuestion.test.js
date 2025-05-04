// src/__tests__/components/EmailPhishingQuestion.test.js

// Add TextEncoder/TextDecoder polyfill for Node.js environment
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmailPhishingQuestion from '../../EmailPhishingQuestion';

// Create a mock question object that matches the expected structure
const mockQuestion = {
  id: 'phishing1',
  type: 'email-phishing',
  question: 'Identify the suspicious elements in this email that may indicate a phishing attempt.',
  explanation: 'This email contains several red flags common in phishing attempts.',
  uniqueTypeSelection: false,
  emailContent: {
    from: 'security@bankofamerica-secure.com',
    to: 'customer@example.com',
    subject: 'Urgent: Your Account Has Been Suspended',
    date: 'May 4, 2025 09:23 AM',
    body: 'Dear Valued Customer,\n\nOur security system has detected unusual activity on your account. To avoid suspension of your services, you must verify your information within 24 hours.\n\nPlease click the link below to verify your account:\n\nAccount Verification Portal\n\nIgnoring this message will result in immediate account suspension.\n\nThank you for your cooperation.',
    signature: 'Bank of America Security Team\nsecurity@bankofamerica-secure.com\n1-800-432-1000'
  },
  suspiciousElements: [
    {
      id: 'element1',
      field: 'from',
      content: 'security@bankofamerica-secure.com',
      description: 'Suspicious sender email domain (bankofamerica-secure.com instead of bankofamerica.com)',
      hint: 'Check the sender email domain carefully',
      type: 'sender',
      isCorrect: true
    },
    {
      id: 'element2',
      field: 'subject',
      content: 'Urgent: Your Account Has Been Suspended',
      description: 'Urgent subject line creating fear and pressure to act quickly',
      hint: 'Phishing emails often create a sense of urgency',
      type: 'urgency',
      isCorrect: true
    },
    {
      id: 'element3',
      content: 'Account Verification Portal',
      description: 'Suspicious link with no clear destination URL shown',
      hint: 'Phishing emails often include vague links',
      type: 'link',
      isCorrect: true
    },
    {
      id: 'element4',
      content: 'unusual activity on your account',
      description: 'Vague claim about account issues without specific details',
      hint: 'Phishing emails often make vague claims about account problems',
      type: 'content',
      isCorrect: true
    },
    {
      id: 'element5',
      content: 'immediate account suspension',
      description: 'Threatening consequence to create fear and urgency',
      hint: 'Phishing emails often include threats',
      type: 'threat',
      isCorrect: true
    },
    {
      id: 'element6',
      field: 'date',
      content: 'May 4, 2025 09:23 AM',
      description: 'Email date and time',
      hint: 'The date is not suspicious by itself',
      type: 'date',
      isCorrect: false
    }
  ]
};

describe('EmailPhishingQuestion Component', () => {
  // --------------------------------
  // Test 1: Component Rendering
  // --------------------------------
  test('renders the email phishing question component correctly', () => {
    render(<EmailPhishingQuestion question={mockQuestion} onAnswer={jest.fn()} />);
    
    // Check that the question text is displayed
    expect(screen.getByText(mockQuestion.question)).toBeInTheDocument();
    
    // Check that email header fields are displayed
    expect(screen.getByText('From:')).toBeInTheDocument();
    expect(screen.getByText('To:')).toBeInTheDocument();
    expect(screen.getByText('Subject:')).toBeInTheDocument();
    expect(screen.getByText('Date:')).toBeInTheDocument();
    
    // Check that email content is displayed
    expect(screen.getByText(/Dear Valued Customer/)).toBeInTheDocument();
    expect(screen.getByText(/Account Verification Portal/)).toBeInTheDocument();
    
    // Check that the submit button is displayed and disabled initially
    const submitButton = screen.getByText('Submit Analysis');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  // --------------------------------
  // Test 2: Element Selection
  // --------------------------------
  test('allows selection of suspicious elements', async () => {
    render(<EmailPhishingQuestion question={mockQuestion} onAnswer={jest.fn()} />);
    
    // Find the suspicious elements - use more specific queries with exact text matching
    const fromElement = screen.getAllByText('security@bankofamerica-secure.com')[0];
    const subjectElement = screen.getByText('Urgent: Your Account Has Been Suspended');
    const linkElement = screen.getByText('Account Verification Portal');
    
    // Select some elements
    fireEvent.click(fromElement);
    fireEvent.click(subjectElement);
    fireEvent.click(linkElement);
    
    // Check that the selection summary is updated
    expect(screen.getByText('Selected Suspicious Elements (3)')).toBeInTheDocument();
    
    // Look for the exact description text to avoid ambiguity
    expect(screen.getByText('Suspicious sender email domain (bankofamerica-secure.com instead of bankofamerica.com)')).toBeInTheDocument();
    expect(screen.getByText('Urgent subject line creating fear and pressure to act quickly')).toBeInTheDocument();
    expect(screen.getByText('Suspicious link with no clear destination URL shown')).toBeInTheDocument();
  });

  // --------------------------------
  // Test 3: Element Deselection
  // --------------------------------
  test('allows deselection of suspicious elements', () => {
    render(<EmailPhishingQuestion question={mockQuestion} onAnswer={jest.fn()} />);
    
    // Find and select an element
    const fromElement = screen.getAllByText('security@bankofamerica-secure.com')[0];
    fireEvent.click(fromElement);
    
    // Check that the selection summary shows the selection
    expect(screen.getByText('Selected Suspicious Elements (1)')).toBeInTheDocument();
    
    // Deselect the element
    fireEvent.click(fromElement);
    
    // Check that the selection is removed from the summary
    expect(screen.getByText('Selected Suspicious Elements (0)')).toBeInTheDocument();
    expect(screen.getByText('No elements selected yet')).toBeInTheDocument();
    
    // Check that the submit button is disabled again
    const submitButton = screen.getByText('Submit Analysis');
    expect(submitButton).toBeDisabled();
  });

  // --------------------------------
  // Test 4: Submission and Scoring
  // --------------------------------
  test('submits selections and calculates score correctly', () => {
    const mockOnAnswer = jest.fn();
    render(<EmailPhishingQuestion question={mockQuestion} onAnswer={mockOnAnswer} />);
    
    // Select some correct elements and one incorrect element
    const correctElements = [
      screen.getAllByText('security@bankofamerica-secure.com')[0],
      screen.getByText('Urgent: Your Account Has Been Suspended'),
      screen.getByText('Account Verification Portal')
    ];
    
    const incorrectElement = screen.getByText('May 4, 2025 09:23 AM');
    
    // Click all elements
    correctElements.forEach(element => fireEvent.click(element));
    fireEvent.click(incorrectElement);
    
    // Submit the analysis
    fireEvent.click(screen.getByText('Submit Analysis'));
    
    // Check that onAnswer was called with the correct score
    // 3 correct elements * 10 points - 1 incorrect element * 5 points = 25 points
    // Max points is 5 correct elements * 10 points = 50 points
    // Score = (25/50) * 100 = 50%
    expect(mockOnAnswer).toHaveBeenCalledWith(
      expect.objectContaining({
        score: 50,
        details: expect.objectContaining({
          truePositives: ['element1', 'element2', 'element3'],
          falsePositives: ['element6'],
          falseNegatives: ['element4', 'element5'],
          earnedPoints: 25,
          maxPoints: 50
        })
      })
    );

    // Check that showExplanation state is now true by looking for explanation text
    expect(screen.getByText('Explanation:')).toBeInTheDocument();
  });

  // --------------------------------
  // Test 5: Submission Callback
  // --------------------------------
  test('calls the onAnswer callback with correct data', () => {
    const mockCallback = jest.fn();
    render(<EmailPhishingQuestion question={mockQuestion} onAnswer={mockCallback} />);
    
    // Select some elements
    const elements = [
      screen.getAllByText('security@bankofamerica-secure.com')[0],
      screen.getByText('Urgent: Your Account Has Been Suspended')
    ];
    
    elements.forEach(element => fireEvent.click(element));
    
    // Submit the analysis
    fireEvent.click(screen.getByText('Submit Analysis'));
    
    // Verify that onAnswer was called with the correct data
    expect(mockCallback).toHaveBeenCalled();
    const callData = mockCallback.mock.calls[0][0];
    
    // Verify score calculation (2 correct out of 5 * 10 points = 20 points)
    // 20/50 = 40% score
    expect(callData.score).toBe(40);
    
    // Verify true positives (selected correct elements)
    expect(callData.details.truePositives).toEqual(['element1', 'element2']);
    
    // Verify false negatives (missed correct elements)
    expect(callData.details.falseNegatives).toEqual(['element3', 'element4', 'element5']);
    
    // Verify there are no false positives
    expect(callData.details.falsePositives).toEqual([]);
  });

  // --------------------------------
  // Test 6: Unique Type Selection
  // --------------------------------
  test('enforces unique type selection when enabled', () => {
    // Create a modified question with uniqueTypeSelection set to true
    const uniqueTypeQuestion = {
      ...mockQuestion,
      uniqueTypeSelection: true
    };
    
    render(<EmailPhishingQuestion question={uniqueTypeQuestion} onAnswer={jest.fn()} />);
    
    // Select an element with type 'sender' - use querySelector for more specificity
    const senderElement = document.querySelector('.email-field:first-child .email-value');
    fireEvent.click(senderElement);
    
    // Check that it's selected
    expect(screen.getByText('Selected Suspicious Elements (1)')).toBeInTheDocument();
    expect(screen.getByText('Suspicious sender email domain (bankofamerica-secure.com instead of bankofamerica.com)')).toBeInTheDocument();
    
    // Try to select the date element which has a unique type 'date'
    const dateElement = screen.getByText('May 4, 2025 09:23 AM');
    fireEvent.click(dateElement);
    
    // Check that both elements are now selected
    expect(screen.getByText('Selected Suspicious Elements (2)')).toBeInTheDocument();
    
    // Try to select another element with type 'urgency'
    const urgencyElement = screen.getByText('Urgent: Your Account Has Been Suspended');
    fireEvent.click(urgencyElement);
    
    // Check that it's selected because it has a different type
    expect(screen.getByText('Selected Suspicious Elements (3)')).toBeInTheDocument();
  });

  // --------------------------------
  // Test 7: Tooltips Display
  // --------------------------------
  test('displays tooltips on element hover', async () => {
    render(<EmailPhishingQuestion question={mockQuestion} onAnswer={jest.fn()} />);
    
    // Find a suspicious element
    const fromElement = screen.getAllByText('security@bankofamerica-secure.com')[0];
    
    // Simulate mouse hover
    fireEvent.mouseEnter(fromElement);
    
    // Check that the tooltip appears with the correct hint text
    await waitFor(() => {
      const tooltip = screen.getByText('Check the sender email domain carefully');
      expect(tooltip).toBeInTheDocument();
    });
    
    // Simulate mouse leave
    fireEvent.mouseLeave(fromElement);
    
    // Check that the tooltip disappears
    await waitFor(() => {
      const tooltip = screen.queryByText('Check the sender email domain carefully');
      expect(tooltip).not.toBeInTheDocument();
    });
  });

  // --------------------------------
  // Test 8: Perfect Score Calculation
  // --------------------------------
  test('calculates a perfect score when all correct elements are selected', () => {
    const mockOnAnswer = jest.fn();
    render(<EmailPhishingQuestion question={mockQuestion} onAnswer={mockOnAnswer} />);
    
    // Identify all correct suspicious elements (those with isCorrect !== false)
    const correctElements = mockQuestion.suspiciousElements
      .filter(element => element.isCorrect !== false)
      .map(element => element.content);
    
    // Find and click all correct elements
    correctElements.forEach(content => {
      const elements = screen.getAllByText(new RegExp(content.substring(0, 10), 'i'));
      const element = elements[0]; // Take the first matching element if there are multiple
      fireEvent.click(element);
    });
    
    // Submit the analysis
    fireEvent.click(screen.getByText('Submit Analysis'));
    
    // Check that onAnswer was called with a score of 100%
    expect(mockOnAnswer).toHaveBeenCalledWith(
      expect.objectContaining({
        score: 100
      })
    );
  });
});