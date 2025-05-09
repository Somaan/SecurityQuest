import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import QuizDifficulty from "./QuizDifficulty";
import QuizQuestions from "./QuizQuestions";
import QuizResults from "./QuizResults";

const Quiz = () => {
  // Get current location to determine if we're on the results page
  const location = useLocation();
  const isResultsPage = location.pathname.includes("/results");

  return (
    // Apply a class to the container based on whether we're in results mode
    <div
      className={`quiz-route-container ${isResultsPage ? "results-mode" : ""}`}
    >
      <Routes>
        <Route path="/" element={<Navigate to="difficulty" replace />} />
        <Route path="difficulty" element={<QuizDifficulty />} />
        <Route path="questions" element={<QuizQuestions />} />
        <Route path="results" element={<QuizResults />} />
      </Routes>

      {/* Add styles specifically for the quiz routes */}
      <style jsx>{`
        .quiz-route-container {
          width: 100%;
          min-height: 100vh;
        }

        /* In results mode, ensure content is visible and properly positioned */
        .quiz-route-container.results-mode {
          position: relative;
          z-index: 10;
          margin-left: 0;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Quiz;
