import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';
import Results from './Results';
import QuizApiService from '../services/api';
import './QuizTaker.css';

const QuizTaker = ({ attemptId, onExit }) => {
  const [currentView, setCurrentView] = useState('loading');
  const [attemptData, setAttemptData] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    validateAndLoadQuiz();
  }, [attemptId]);

  const validateAndLoadQuiz = async () => {
    try {
      setCurrentView('loading');
      
      // First, validate the quiz attempt
      const validation = await QuizApiService.validateQuizAttempt(attemptId);
      setAttemptData(validation);

      if (validation.attempt.status === 'completed') {
        setCurrentView('already-completed');
        return;
      }

      // Start the quiz and get questions
      const quiz = await QuizApiService.startQuiz(attemptId);
      setQuizData(quiz);
      setCurrentView('quiz');
      
    } catch (error) {
      console.error('Error loading quiz:', error);
      setError(error.message);
      setCurrentView('error');
    }
  };

  const handleQuizComplete = (quizResults) => {
    setResults(quizResults);
    setCurrentView('results');
  };

  const handleRetakeQuiz = () => {
    // Reset state for retake (if allowed)
    setResults(null);
    setCurrentView('loading');
    validateAndLoadQuiz();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (currentView === 'loading') {
    return (
      <div className="quiz-taker-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Loading Quiz...</h2>
          <p>Please wait while we prepare your quiz</p>
        </div>
      </div>
    );
  }

  if (currentView === 'error') {
    return (
      <div className="quiz-taker-error">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Quiz Not Available</h2>
          <p className="error-message">{error}</p>
          <button onClick={onExit} className="primary-button">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (currentView === 'already-completed') {
    return (
      <div className="quiz-taker-completed">
        <div className="completed-container">
          <div className="completed-icon">✅</div>
          <h2>Quiz Already Completed</h2>
          <p>You have already completed this quiz attempt.</p>
          
          {attemptData?.attempt && (
            <div className="attempt-info">
              <div className="info-card">
                <h3>Attempt Details</h3>
                <div className="info-row">
                  <span>Attempt ID:</span>
                  <span>{attemptData.attempt.attemptId}</span>
                </div>
                <div className="info-row">
                  <span>Student:</span>
                  <span>{attemptData.student?.name}</span>
                </div>
                <div className="info-row">
                  <span>Completed:</span>
                  <span>{new Date(attemptData.attempt.completedAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="action-buttons">
            <button onClick={onExit} className="primary-button">
              Back to Home
            </button>
            <a 
              href={`/?id=${attemptData?.student?.studentId}`} 
              className="secondary-button"
            >
              View Profile
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'quiz' && quizData) {
    return (
      <div className="quiz-taker-active">
        <div className="quiz-header">
          <div className="quiz-info">
            <h1>ReactJS Proficiency Quiz</h1>
            <div className="quiz-details">
              <span>Attempt ID: {quizData.attemptId}</span>
              <span>•</span>
              <span>{quizData.totalQuestions} Questions</span>
              <span>•</span>
              <span>Time Limit: {formatTime(quizData.timeLimit)}</span>
            </div>
          </div>
          <button onClick={onExit} className="exit-button">
            Exit Quiz
          </button>
        </div>
        
        <Quiz
          attemptId={quizData.attemptId}
          questions={quizData.questions}
          timeLimit={quizData.timeLimit}
          onQuizComplete={handleQuizComplete}
        />
      </div>
    );
  }

  if (currentView === 'results' && results) {
    return (
      <div className="quiz-taker-results">
        <Results
          results={results}
          onRetakeQuiz={handleRetakeQuiz}
          onBackToHome={onExit}
          showRetake={false} // Disable retake for attempt-based quizzes
        />
      </div>
    );
  }

  return null;
};

export default QuizTaker;
