import { useState } from 'react';
import PDFService from '../services/pdfService';
import './Results.css';

const Results = ({ results, onBackToHome, onRestartQuiz, showRetake = true, studentInfo = null, attemptId = null }) => {
  const { 
    score, 
    totalQuestions, 
    percentage, 
    proficiencyLevel, 
    totalTime, 
    timeLeft, 
    incorrectAnswers = [], 
    skippedCount = 0,
    detailedResults = [],
    error,
    completedAt
  } = results;
  
  const [showReview, setShowReview] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  // Use proficiency level from backend or fallback to local calculation
  const gradeInfo = proficiencyLevel || {
    grade: 'Unknown',
    color: '#666',
    message: 'Assessment completed'
  };
  
  // Filter out skipped questions from incorrect answers for display
  const actualIncorrectAnswers = incorrectAnswers.filter(answer => answer.selectedAnswer !== null);
  
  // Calculate skipped count from local data if not provided by backend
  const skippedQuestions = skippedCount || detailedResults.filter(result => result.selectedAnswer === null).length;

  const formatTime = (seconds) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const getPerformanceEmoji = () => {
    if (percentage >= 90) return '🏆';
    if (percentage >= 80) return '🎉';
    if (percentage >= 70) return '👍';
    if (percentage >= 60) return '👌';
    return '💪';
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const resultData = {
        score,
        totalQuestions,
        percentage,
        proficiencyLevel,
        totalTime,
        incorrectAnswers,
        skippedCount,
        detailedResults,
        attemptId,
        completedAt
      };
      
      await PDFService.generateQuizResultsPDF(resultData, studentInfo);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="results-container">
      <div className="results-card">
        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}
        
        <div className="results-header">
          <div className="emoji-display">{getPerformanceEmoji()}</div>
          <h1 className="results-title">ReactJS Assessment Complete!</h1>
          <p className="results-message">{gradeInfo.message}</p>
        </div>

        <div className="score-display">
          <div className="score-circle" style={{ '--grade-color': gradeInfo.color }}>
            <div className="score-percentage">{percentage}%</div>
            <div className="score-grade">{gradeInfo.grade}</div>
          </div>
          
          <div className="score-details">
            <div className="score-fraction">
              <span className="correct-answers">{score}</span>
              <span className="separator">/</span>
              <span className="total-questions">{totalQuestions}</span>
            </div>
            <div className="score-label">Correct Answers</div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-value">{score}</div>
            <div className="stat-label">Correct</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{actualIncorrectAnswers.length}</div>
            <div className="stat-label">Incorrect</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{skippedQuestions}</div>
            <div className="stat-label">Skipped</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{formatTime(totalTime || 0)}</div>
            <div className="stat-label">Time Used</div>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className={`logout-button ${showReview ? 'active' : ''}`} 
            onClick={() => setShowReview(!showReview)}
          >
            <span className="button-icon">{showReview ? '👁️' : '🔍'}</span>
            {showReview ? 'Hide' : 'Review'} Incorrect Answers ({actualIncorrectAnswers.length})
          </button>
          
          <button 
            className="download-button" 
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
          >
            <span className="button-icon">{isGeneratingPDF ? '⏳' : '📄'}</span>
            {isGeneratingPDF ? 'Generating...' : 'Download PDF Report'}
          </button>
          
          {showRetake ? (
            <button className="restart-button" onClick={onRestartQuiz}>
              <span className="button-icon">🔄</span>
              Retake ReactJS Quiz
            </button>
          ) : (
            <button className="logout-button" onClick={onBackToHome}>
              <span className="button-icon">🏠</span>
              Back to Home
            </button>
          )}
        </div>

        {showReview && (
          <div className="review-section">
            <h3 className="review-title">Questions You Got Wrong</h3>
            {actualIncorrectAnswers.length === 0 ? (
              <div className="perfect-score">
                🎉 Perfect! You got all questions correct!
              </div>
            ) : (
              <div className="incorrect-answers">
                {actualIncorrectAnswers.map((answer, index) => {
                  const questionIndex = detailedResults.findIndex(ua => ua.questionId === answer.questionId);
                  return (
                    <div key={answer.questionId} className="incorrect-answer-item">
                      <div className="question-header">
                        <span className="question-number">{questionIndex + 1}</span>
                        <span className="answer-status incorrect">✗ Incorrect</span>
                      </div>
                      
                      <div className="question-content">
                        <h4 className="question-text">{answer.question}</h4>
                        
                        <div className="answer-options">
                          {answer.options.map((option, optIndex) => (
                            <div 
                              key={optIndex} 
                              className={`answer-option ${
                                optIndex === answer.correctAnswer ? 'correct-answer' : 
                                optIndex === answer.selectedAnswer ? 'your-answer' : ''
                              }`}
                            >
                              <span className="option-letter">
                                {String.fromCharCode(65 + optIndex)}
                              </span>
                              <span className="option-text">{option}</span>
                              {optIndex === answer.correctAnswer && (
                                <span className="correct-label">✓ Correct</span>
                              )}
                              {optIndex === answer.selectedAnswer && answer.selectedAnswer !== null && (
                                <span className="your-label">Your Answer</span>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <div className="explanation">
                          <strong>Explanation:</strong> {answer.explanation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="motivational-section">
          <div className="motivational-text">
            {percentage >= 80 
              ? "Excellent ReactJS knowledge! You're ready for advanced React projects!" 
              : percentage >= 60 
                ? "Good ReactJS foundation! Practice with more complex React patterns!" 
                : "Keep learning ReactJS fundamentals! Check out the official React docs!"
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
