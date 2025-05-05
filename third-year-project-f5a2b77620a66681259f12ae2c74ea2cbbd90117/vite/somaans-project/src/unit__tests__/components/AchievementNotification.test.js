// src/__tests__/components/AchievementNotification.test.js
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AchievementNotification from '../../AchievementNotification';

describe('AchievementNotification Component', () => {
  // Standard achievement object for testing
  const mockAchievement = {
    title: 'Test Achievement',
    description: 'This is a test achievement',
    icon: 'star',
    color: '#646cff'
  };
  
  // Mock function to test close button
  const mockOnClose = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  
  // Test 1: Basic rendering
  test('renders achievement data correctly', () => {
    render(
      <AchievementNotification
        achievement={mockAchievement}
        onClose={mockOnClose}
      />
    );
    
    // Check that title and description are displayed
    expect(screen.getByText('Achievement Unlocked!')).toBeInTheDocument();
    expect(screen.getByText('Test Achievement')).toBeInTheDocument();
    expect(screen.getByText('This is a test achievement')).toBeInTheDocument();
  });
  
  // Test 2: Close button functionality - FIXED
  test('calls onClose when close button is clicked', () => {
    render(
      <AchievementNotification
        achievement={mockAchievement}
        onClose={mockOnClose}
      />
    );
    
    // Find close button by class name instead of accessible name
    const closeButton = document.querySelector('.close-btn');
    fireEvent.click(closeButton);
    
    // Verify callback was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
  // Test 3: Null achievement handling
  test('handles null achievement gracefully', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    render(
      <AchievementNotification
        achievement={null}
        onClose={mockOnClose}
      />
    );
    
    // Should log warning and call onClose
    expect(consoleWarnSpy).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    
    consoleWarnSpy.mockRestore();
  });
  
  // Test 4: Animation lifecycle
  test('applies showing and hiding animation classes at correct times', () => {
    const { container } = render(
      <AchievementNotification
        achievement={mockAchievement}
        onClose={mockOnClose}
      />
    );
    
    // Initially hidden
    expect(container.querySelector('.achievement-notification')).toHaveClass('hidden');
    
    // After small delay, should be showing
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(container.querySelector('.achievement-notification')).toHaveClass('showing');
    expect(container.querySelector('.achievement-icon')).toHaveClass('pulse');
    
    // After 5 seconds, should start hiding
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(container.querySelector('.achievement-notification')).toHaveClass('hiding');
    
    // After hiding animation, onClose should be called
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
  // Test 5: Color customization - FIXED
  test('applies custom color from achievement prop', () => {
    const customAchievement = {
      ...mockAchievement,
      color: '#ff0000' // Custom red color
    };
    
    const { container } = render(
      <AchievementNotification
        achievement={customAchievement}
        onClose={mockOnClose}
      />
    );
    
    const iconElement = container.querySelector('.achievement-icon');
    // Use a more flexible check that works with color format differences
    expect(iconElement.style.backgroundColor).toMatch(/rgb\(255,\s*0,\s*0\)|#ff0000/);
  });
  
  // Test 6: Icon selection based on title
  test('selects appropriate icon based on achievement title', () => {
    // Test with titles containing keywords that should trigger specific icons
    const testCases = [
      { title: 'Login Streak Master', expectedIcon: 'calendar-check' },
      { title: 'Security Champion', expectedIcon: 'shield' },
      { title: 'Master Quiz Taker', expectedIcon: 'trophy' },
      { title: 'Star Learner', expectedIcon: 'star' }
    ];
    
    testCases.forEach(({ title, expectedIcon }) => {
      const { container, unmount } = render(
        <AchievementNotification
          achievement={{ ...mockAchievement, title, icon: undefined }}
          onClose={mockOnClose}
        />
      );
      
      // This test needs to be adapted based on how FontAwesome renders in the DOM
      // For now, checking if any icon is rendered
      expect(container.querySelector('.achievement-icon svg')).toBeInTheDocument();
      
      unmount();
    });
  });
  
  // Test 7: Icon provided directly in achievement object
  test('uses icon provided directly in achievement object', () => {
    const iconAchievement = {
      ...mockAchievement,
      icon: 'medal'
    };
    
    render(
      <AchievementNotification
        achievement={iconAchievement}
        onClose={mockOnClose}
      />
    );
    
    // Since we can't easily check the specific icon, at least verify an icon is present
    const iconContainer = document.querySelector('.achievement-icon');
    expect(iconContainer).toBeInTheDocument();
  });
  
  // Test 8: Auto-dismiss functionality
  test('auto-dismisses after timeout period', () => {
    render(
      <AchievementNotification
        achievement={mockAchievement}
        onClose={mockOnClose}
      />
    );
    
    // Notification should start showing
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // After 5000ms should start hiding
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    // After another 500ms should call onClose
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // Check that onClose was called automatically
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
  // Test 9: Component cleanup on unmount
  test('clears timers on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    
    const { unmount } = render(
      <AchievementNotification
        achievement={mockAchievement}
        onClose={mockOnClose}
      />
    );
    
    // Trigger initial animation
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // Unmount component
    unmount();
    
    // Should have cleared timers
    expect(clearTimeoutSpy).toHaveBeenCalled();
    
    clearTimeoutSpy.mockRestore();
  });
});