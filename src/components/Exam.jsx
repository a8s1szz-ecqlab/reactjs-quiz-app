import { useState, useEffect, useRef } from 'react';
import QuizApiService from '../services/api';
import './Exam.css';

const Exam = ({ attemptId, questions, timeLimit, remainingTime, onExamComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(new Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(remainingTime !== undefined ? remainingTime : (timeLimit || 20 * 60)); // Use server-provided remaining time
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [examStartTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeWarning, setTimeWarning] = useState('');
  const submissionInProgress = useRef(false); // Use ref to prevent race conditions

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];

  // Check if time is already exceeded when component loads
  useEffect(() => {
    if (remainingTime <= 0) {
      setTimeLeft(0);
      setTimeWarning('Time is up! Submitting exam automatically...');
      setIsTimerActive(false);
      // Give a brief moment for user to see the message, then auto-submit
      setTimeout(() => {
        handleFinishExam();
      }, 1000);
    }
  }, [remainingTime]); // eslint-disable-line react-hooks/exhaustive-deps

  // Timer effect - runs for entire exam duration
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        
        // Show warning when time is running low
        if (timeLeft === 300) { // 5 minutes
          setTimeWarning('Warning: Only 5 minutes remaining!');
        } else if (timeLeft === 60) { // 1 minute
          setTimeWarning('Warning: Only 1 minute remaining!');
        } else if (timeLeft === 30) { // 30 seconds
          setTimeWarning('Warning: Only 30 seconds remaining!');
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isTimerActive && timeLeft <= 0) {
      // Time's up, finish exam automatically (only if timer is still active)
      setTimeWarning('Time is up! Submitting exam automatically...');
      setTimeLeft(0); // Ensure it doesn't go negative
      setIsTimerActive(false); // Stop the timer
      handleFinishExam();
    }
  }, [timeLeft, isTimerActive]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleFinishExam = async () => {
    // Prevent multiple submissions using ref for immediate check
    if (submissionInProgress.current || isSubmitting) {
      console.log('Submission already in progress, ignoring duplicate call');
      return;
    }
    
    submissionInProgress.current = true;
    setIsTimerActive(false);
    setIsSubmitting(true);
    
    try {
      // Prepare answers for backend submission
      const answersForSubmission = questions.map((question, index) => ({
        questionId: question.id,
        selectedAnswer: userAnswers[index],
        timeSpent: 0 // Could be enhanced to track individual question time
      }));

      const totalTime = Math.round((Date.now() - examStartTime) / 1000);
      
      // Submit to backend with attempt ID and get results
      const response = await QuizApiService.submitQuiz(attemptId, answersForSubmission, totalTime, timeLeft);
      
      // Handle server response - the server now validates time on its end
      if (response.warning) {
        // Show warning if exam was submitted overtime
        console.warn(response.warning);
      }
      
      // Pass results to parent component, including any warnings
      onExamComplete({
        ...response.data,
        warning: response.warning,
        message: response.message
      });
      
    } catch (error) {
      console.error('Failed to submit exam:', error);
      
      // Check if the error is due to time limit exceeded
      if (error.message && error.message.includes('time limit')) {
        onExamComplete({
          error: 'Time limit exceeded. Please contact your administrator.',
          timeExceeded: true
        });
        return;
      }
      
      // Fallback to local calculation if backend fails for other reasons
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
      const totalTime = Math.round((Date.now() - examStartTime) / 1000);

      onExamComplete({
        score,
        totalQuestions: questions.length,
        userAnswers: detailedAnswers,
        totalTime,
        timeLeft,
        error: 'Failed to submit to server, showing local results'
      });
    } finally {
      setIsSubmitting(false);
      submissionInProgress.current = false;
    }
  };

  const getTimerColor = () => {
    const percentage = (timeLeft / (timeLimit || 20 * 60)) * 100;
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
    <div className="exam-container">
      <div className="exam-header">
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
          {timeWarning && (
            <div className="time-warning">
              ⚠️ {timeWarning}
            </div>
          )}
        </div>

        <div className="score-section">
          <button 
            className={`finish-button ${isSubmitting ? 'submitting' : ''}`} 
            onClick={handleFinishExam}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner">⏳</span>
                Submitting...
              </>
            ) : (
              'Finish Exam'
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

export default Exam;
