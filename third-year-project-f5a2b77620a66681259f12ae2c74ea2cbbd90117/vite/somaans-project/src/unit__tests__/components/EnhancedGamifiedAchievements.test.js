// src/__tests__/components/EnhancedGamifiedAchievements.test.js

// Add TextEncoder/TextDecoder polyfill for Node.js environment
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import EnhancedGamifiedAchievements from '../../EnhancedGamifiedAchievements';

// Create mock achievement data - this doesn't need to be exact, just representative
const mockAchievements = [
  {
    id: 'achievement-1',
    title: 'Login Streak Master',
    description: 'Log in for 7 consecutive days',
    icon: 'calendar-check',
    color: '#3498db',
    rarity: 'uncommon',
    category: 'login',
    unlocked: true,
    progress: 100,
    unlockDate: '2025-05-01T00:00:00.000Z'
  },
  {
    id: 'achievement-2',
    title: 'Security Champion',
    description: 'Complete all advanced security quizzes',
    icon: 'shield',
    color: '#e74c3c',
    rarity: 'epic',
    category: 'quiz',
    unlocked: false,
    progress: 50
  },
  {
    id: 'achievement-3',
    title: 'Perfect Score',
    description: 'Score 100% on any quiz',
    icon: 'star',
    color: '#f1c40f',
    rarity: 'rare',
    category: 'scores',
    unlocked: true,
    progress: 100,
    unlockDate: '2025-04-15T00:00:00.000Z'
  },
  {
    id: 'achievement-4',
    title: 'Social Engineer',
    description: 'Complete the social engineering quiz',
    icon: 'user',
    color: '#9b59b6',
    rarity: 'common',
    category: 'quiz',
    unlocked: false,
    progress: 0
  },
  {
    id: 'achievement-5',
    title: 'Weekly Warrior',
    description: 'Complete a quiz every day for a week',
    icon: 'trophy',
    color: '#2ecc71',
    rarity: 'uncommon',
    category: 'streaks',
    unlocked: false,
    progress: 70
  }
];

describe('EnhancedGamifiedAchievements Component', () => {
  // --------------------------------
  // Test 1: Basic Rendering
  // --------------------------------
  test('renders all achievement cards correctly', () => {
    render(<EnhancedGamifiedAchievements achievements={mockAchievements} />);
    
    // Check if progress overview is rendered
    expect(screen.getByText('Achievement Progress')).toBeInTheDocument();
    
    // Check if filter options are rendered
    expect(screen.getByText('Category:')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    
    // Check if all achievement cards are rendered
    mockAchievements.forEach(achievement => {
      expect(screen.getByText(achievement.title)).toBeInTheDocument();
      expect(screen.getByText(achievement.description)).toBeInTheDocument();
    });
    
    // Check if rarity badges are rendered - use getAllByText for ones that appear multiple times
    expect(screen.getByText('common')).toBeInTheDocument();
    expect(screen.getAllByText('uncommon')).toHaveLength(2); 
    expect(screen.getByText('rare')).toBeInTheDocument();
    expect(screen.getByText('epic')).toBeInTheDocument();
  });

  // --------------------------------
  // Test 2: Progress Statistics
  // --------------------------------
  test('calculates and displays achievement statistics correctly', () => {
    render(<EnhancedGamifiedAchievements achievements={mockAchievements} />);
    
    // Use more specific container-based queries
    // Use within to find text within a specific context
    const statsContainer = screen.getByText('Achievement Progress').closest('.achievements-progress');
    
    // Get all counters within the stats container
    const unlockedCounter = within(statsContainer).getByText('Unlocked').closest('.stat-counter');
    const inProgressCounter = within(statsContainer).getByText('In Progress').closest('.stat-counter');
    const lockedCounter = within(statsContainer).getByText('Locked').closest('.stat-counter');
    
    // Verify counter values within their containers
    expect(within(unlockedCounter).getByText('2')).toBeInTheDocument();
    expect(within(inProgressCounter).getByText('2')).toBeInTheDocument();
    expect(within(lockedCounter).getByText('1')).toBeInTheDocument();
    
    // Check progress percentage
    expect(screen.getByText('40%')).toBeInTheDocument();
    
    // Check progress label - find exact match for "2 of 5 achievements"
    const progressLabel = screen.getByText(/2 of 5 achievements/);
    expect(progressLabel).toBeInTheDocument();
  });

  // --------------------------------
  // Test 3: Category Filtering
  // --------------------------------
  test('filters achievements by category', () => {
    render(<EnhancedGamifiedAchievements achievements={mockAchievements} />);
    
    // Verify all achievement titles are initially visible
    mockAchievements.forEach(achievement => {
      expect(screen.getByText(achievement.title)).toBeInTheDocument();
    });
    
    // Click on the Quiz category filter button
    const quizButton = screen.getByRole('button', { name: 'Quiz' });
    fireEvent.click(quizButton);
    
    // Get quiz and non-quiz achievements
    const quizAchievements = mockAchievements.filter(a => a.category === 'quiz');
    const nonQuizAchievements = mockAchievements.filter(a => a.category !== 'quiz');
    
    // Only quiz achievements should be visible
    quizAchievements.forEach(achievement => {
      expect(screen.getByText(achievement.title)).toBeInTheDocument();
    });
    
    // Non-quiz achievements should not be visible
    nonQuizAchievements.forEach(achievement => {
      expect(screen.queryByText(achievement.title)).not.toBeInTheDocument();
    });
  });

  // --------------------------------
  // Test 4: Status Filtering
  // --------------------------------
  test('filters achievements by unlock status', () => {
    render(<EnhancedGamifiedAchievements achievements={mockAchievements} />);
    
    // Click on the Unlocked status filter button in the filters section
    const filtersSection = screen.getByText('Status:').closest('.filter-group');
    const unlockedButton = within(filtersSection).getByRole('button', { name: 'Unlocked' });
    fireEvent.click(unlockedButton);
    
    // Check that only unlocked achievements are shown
    const unlockedAchievements = mockAchievements.filter(a => a.unlocked);
    unlockedAchievements.forEach(achievement => {
      expect(screen.getByText(achievement.title)).toBeInTheDocument();
    });
    
    // Check that locked achievements are not shown
    const lockedAchievements = mockAchievements.filter(a => !a.unlocked);
    lockedAchievements.forEach(achievement => {
      expect(screen.queryByText(achievement.title)).not.toBeInTheDocument();
    });
    
    // Click on the In Progress status filter button
    const inProgressButton = within(filtersSection).getByRole('button', { name: 'In Progress' });
    fireEvent.click(inProgressButton);
    
    // Check that only in-progress achievements are shown
    const inProgressAchievements = mockAchievements.filter(a => !a.unlocked && a.progress > 0);
    inProgressAchievements.forEach(achievement => {
      expect(screen.getByText(achievement.title)).toBeInTheDocument();
    });
  });

  // --------------------------------
  // Test 5: Search Functionality
  // --------------------------------
  test('filters achievements by search term', () => {
    render(<EnhancedGamifiedAchievements achievements={mockAchievements} />);
    
    // Type in the search box
    const searchInput = screen.getByPlaceholderText('Search achievements...');
    fireEvent.change(searchInput, { target: { value: 'streak' } });
    
    // Check that only achievements containing "streak" in title or description are shown
    const streakAchievements = mockAchievements.filter(
      a => a.title.toLowerCase().includes('streak') || a.description.toLowerCase().includes('streak')
    );
    
    streakAchievements.forEach(achievement => {
      expect(screen.getByText(achievement.title)).toBeInTheDocument();
    });
    
    // Check that non-matching achievements are not shown
    const nonStreakAchievements = mockAchievements.filter(
      a => !a.title.toLowerCase().includes('streak') && !a.description.toLowerCase().includes('streak')
    );
    
    nonStreakAchievements.forEach(achievement => {
      expect(screen.queryByText(achievement.title)).not.toBeInTheDocument();
    });
    
    // Clear search and check all achievements are shown again
    fireEvent.change(searchInput, { target: { value: '' } });
    mockAchievements.forEach(achievement => {
      expect(screen.getByText(achievement.title)).toBeInTheDocument();
    });
  });

  // --------------------------------
  // Test 6: Combined Filtering
  // --------------------------------
  test('combines category, status, and search filters', () => {
    render(<EnhancedGamifiedAchievements achievements={mockAchievements} />);
    
    // Apply multiple filters
    
    // Select quiz category
    const quizButton = screen.getByRole('button', { name: 'Quiz' });
    fireEvent.click(quizButton);
    
    // Select locked status
    const filtersSection = screen.getByText('Status:').closest('.filter-group');
    const lockedButton = within(filtersSection).getByRole('button', { name: 'Locked' });
    fireEvent.click(lockedButton);
    
    // Search for "Engineer"
    const searchInput = screen.getByPlaceholderText('Search achievements...');
    fireEvent.change(searchInput, { target: { value: 'Engineer' } });
    
    // Only "Social Engineer" should match all filters
    expect(screen.getByText('Social Engineer')).toBeInTheDocument();
    
    // Other achievements should not be visible
    expect(screen.queryByText('Security Champion')).not.toBeInTheDocument();
    expect(screen.queryByText('Login Streak Master')).not.toBeInTheDocument();
    expect(screen.queryByText('Perfect Score')).not.toBeInTheDocument();
    expect(screen.queryByText('Weekly Warrior')).not.toBeInTheDocument();
  });

  // --------------------------------
  // Test 7: Reset Filters
  // --------------------------------
  test('resets filters when no results are found', () => {
    render(<EnhancedGamifiedAchievements achievements={mockAchievements} />);
    
    // Apply filters that will return no results
    
    // Select quiz category
    const quizButton = screen.getByRole('button', { name: 'Quiz' });
    fireEvent.click(quizButton);
    
    // Select unlocked status
    const filtersSection = screen.getByText('Status:').closest('.filter-group');
    const unlockedButton = within(filtersSection).getByRole('button', { name: 'Unlocked' });
    fireEvent.click(unlockedButton);
    
    // Search for something that doesn't exist
    const searchInput = screen.getByPlaceholderText('Search achievements...');
    fireEvent.change(searchInput, { target: { value: 'NonExistent' } });
    
    // Check for "No achievements found" message
    expect(screen.getByText('No achievements found matching your filters.')).toBeInTheDocument();
    
    // Click the reset filters button
    const resetButton = screen.getByRole('button', { name: 'Reset Filters' });
    fireEvent.click(resetButton);
    
    // All achievements should be visible again
    mockAchievements.forEach(achievement => {
      expect(screen.getByText(achievement.title)).toBeInTheDocument();
    });
  });

  // --------------------------------
  // Test 8: Achievement Card Rendering States
  // --------------------------------
  test('renders different achievement states correctly', () => {
    render(<EnhancedGamifiedAchievements achievements={mockAchievements} />);
    
    // Check for unlocked achievement - should show "Unlocked!" text
    const unlockedCard = screen.getByText('Login Streak Master').closest('.achievement-card');
    expect(within(unlockedCard).getByText('Unlocked!')).toBeInTheDocument();
    
    // Check for in-progress achievement - should show progress percentage
    const inProgressCard = screen.getByText('Weekly Warrior').closest('.achievement-card');
    expect(within(inProgressCard).getByText('70%')).toBeInTheDocument();
    
    // Check for locked achievement - should show 0% progress
    const lockedCard = screen.getByText('Social Engineer').closest('.achievement-card');
    expect(within(lockedCard).getByText('0%')).toBeInTheDocument();
  });
});