import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import QuizDifficulty from './QuizDifficulty';

/**
 * Parent Quiz component that handles routing to quiz subpages
 * - /quiz - redirects to difficulty selection
 * - /quiz/difficulty - difficulty selection page
 * - /quiz/questions - actual quiz questions (placeholder)
 * - /quiz/results - quiz results summary (placeholder)
 */
const Quiz = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="difficulty" replace />} />
      <Route path="difficulty" element={<QuizDifficulty />} />
      <Route path="questions" element={<div className="content-wrapper">Quiz Questions Placeholder</div>} />
      <Route path="results" element={<div className="content-wrapper">Quiz Results Placeholder</div>} />
    </Routes>
  );
};

export default Quiz;