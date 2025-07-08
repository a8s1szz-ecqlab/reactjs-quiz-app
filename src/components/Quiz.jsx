import { useState, useEffect } from 'react';
import QuizApiService from '../services/api';
import './Quiz.css';

const Quiz = ({ questions, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(new Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [quizStartTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];

  // Timer effect - runs for entire quiz duration
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      // Time's up, finish quiz automatically
      handleFinishQuiz();
    }
  }, [timeLeft, isTimerActive]);

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinishQuiz = async () => {
    setIsTimerActive(false);
    setIsSubmitting(true);
    
    try {
      // Prepare answers for backend submission
      const answersForSubmission = questions.map((question, index) => ({
        questionId: question.id,
        selectedAnswer: userAnswers[index],
        timeSpent: 0 // Could be enhanced to track individual question time
      }));

      const totalTime = Math.round((Date.now() - quizStartTime) / 1000);
      
      // Submit to backend and get results
      const results = await QuizApiService.submitQuiz(answersForSubmission, totalTime, timeLeft);
      
      // Pass results to parent component
      onQuizComplete(results);
      
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      // Fallback to local calculation if backend fails
      const detailedAnswers = questions.map((question, index) => ({
        questionId: question.id,
        question: question.question,
        options: question.options,
        selectedAnswer: userAnswers[index],
        correctAnswer: question.correctAnswer,
        isCorrect: userAnswers[index] === question.correctAnswer,
        explanation: question.explanation
      }));

      const score = detailedAnswers.filter(answer => answer.isCorrect).length;
      const totalTime = Math.round((Date.now() - quizStartTime) / 1000);

      onQuizComplete({
        score,
        totalQuestions: questions.length,
        userAnswers: detailedAnswers,
        totalTime,
        timeLeft,
        error: 'Failed to submit to server, showing local results'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTimerColor = () => {
    const percentage = (timeLeft / (20 * 60)) * 100;
    if (percentage > 50) return '#4CAF50';
    if (percentage > 25) return '#FF9800';
    return '#F44336';
  };

  const formatTime = (seconds) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const getAnsweredCount = () => {
    return userAnswers.filter(answer => answer !== null).length;
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="answered-text">
            Answered: {getAnsweredCount()}/{questions.length}
          </span>
        </div>
        
        <div className="timer-section">
          <div 
            className="timer-circle" 
            style={{ '--timer-color': getTimerColor() }}
          >
            <div className="timer-text">{formatTime(timeLeft)}</div>
            <div className="timer-label">Time Left</div>
          </div>
        </div>

        <div className="score-section">
          <button 
            className={`finish-button ${isSubmitting ? 'submitting' : ''}`} 
            onClick={handleFinishQuiz}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner">⏳</span>
                Submitting...
              </>
            ) : (
              'Finish Quiz'
            )}
          </button>
        </div>
      </div>

      <div className="question-card">
        <h2 className="question-text">{currentQuestion.question}</h2>
        
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedAnswer === index ? 'selected' : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>

        <div className="navigation-section">
          <button 
            className="nav-button prev-button"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            ← Previous
          </button>
          
          <div className="question-status">
            {selectedAnswer !== null ? (
              <span className="answered-indicator">✓ Answered</span>
            ) : (
              <span className="unanswered-indicator">Not answered</span>
            )}
          </div>
          
          <button 
            className="nav-button next-button"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next →
          </button>
        </div>

        <div className="question-grid">
          <div className="question-numbers">
            {questions.map((_, index) => (
              <button
                key={index}
                className={`question-number ${
                  index === currentQuestionIndex ? 'current' : ''
                } ${
                  userAnswers[index] !== null ? 'answered' : 'unanswered'
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
