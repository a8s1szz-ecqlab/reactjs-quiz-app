import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Exam from './Exam';
import Results from './Results';
import QuizApiService from '../services/api';
import './ExamTaker.css';

const ExamTaker = () => {
  const navigate = useNavigate();
  const { attemptId } = useParams();
  const [currentView, setCurrentView] = useState('loading');
  const [attemptData, setAttemptData] = useState(null);
  const [examData, setExamData] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    validateAndLoadExam();
  }, [attemptId]);

  const validateAndLoadExam = async () => {
    try {
      setCurrentView('loading');
      
      // First, validate the exam attempt
      const validation = await QuizApiService.validateQuizAttempt(attemptId);
      setAttemptData(validation);

      if (validation.attempt.status === 'completed') {
        setCurrentView('already-completed');
        return;
      }

      // Start the exam and get questions
      const exam = await QuizApiService.startQuiz(attemptId);
      
      // Check if exam is already completed
      if (exam.alreadyCompleted && exam.results) {
        setResults(exam.results);
        setCurrentView('results');
        return;
      }
      
      // Check if exam time has exceeded
      if (exam.timeExceeded) {
        // Time exceeded but we still have the exam data
        // Set remaining time to 0 and let the exam component handle auto-submit
        setExamData(exam);
        setCurrentView('exam');
        return;
      }
      
      setExamData(exam);
      setCurrentView('exam');
      
    } catch (error) {
      console.error('Error loading exam:', error);
      setError(error.message);
      setCurrentView('error');
    }
  };

  const handleExamComplete = (examResults) => {
    setResults(examResults);
    setCurrentView('results');
  };

  const handleRetakeExam = () => {
    // Reset state for retake (if allowed)
    setResults(null);
    setCurrentView('loading');
    validateAndLoadExam();
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
          <h2>Loading Exam...</h2>
          <p>Please wait while we prepare your exam</p>
        </div>
      </div>
    );
  }

  if (currentView === 'error') {
    return (
      <div className="quiz-taker-error">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Exam Not Available</h2>
          <p className="error-message">{error}</p>
          <button onClick={() => navigate('/')} className="primary-button">
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
          <h2>Exam Already Completed</h2>
          <p>You have already completed this exam attempt.</p>
          
          {attemptData && (
            <div className="attempt-info">
              <div className="info-card">
                <h3>Attempt Details</h3>
                <div className="info-row">
                  <span>Attempt ID:</span>
                  <span>{attemptData.attemptId}</span>
                </div>
                <div className="info-row">
                  <span>Student:</span>
                  <span>{attemptData.studentName}</span>
                </div>
                <div className="info-row">
                  <span>Completed:</span>
                  <span>{attemptData.completedAt ? new Date(attemptData.completedAt).toLocaleString() : 'Not completed'}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="action-buttons">
            <button onClick={() => navigate('/')} className="primary-button">
              Back to Home
            </button>
            <a 
              href={`/student/${attemptData?.studentId}`} 
              className="secondary-button"
            >
              View Profile
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'exam' && examData) {
    return (
      <div className="exam-taker-active">
        <div className="exam-header">
          <div className="exam-info">
            <h1>{attemptData?.attempt?.topicName || 'Programming'} Proficiency Exam</h1>
            <div className="exam-details">
              <span>Attempt ID: {examData.attemptId}</span>
              <span>•</span>
              <span>{examData.totalQuestions} Questions</span>
              <span>•</span>
              <span>Time Limit: {formatTime(examData.timeLimit)}</span>
              {attemptData?.attempt?.topic && (
                <>
                  <span>•</span>
                  <span>Topic: {attemptData.attempt.topic.toUpperCase()}</span>
                </>
              )}
            </div>
          </div>
          <button onClick={() => navigate('/')} className="exit-button">
            Exit Exam
          </button>
        </div>
        
        <Exam
          attemptId={examData.attemptId}
          questions={examData.questions}
          timeLimit={examData.timeLimit}
          remainingTime={examData.remainingTime}
          onExamComplete={handleExamComplete}
        />
      </div>
    );
  }

  if (currentView === 'results' && results) {
    return (
      <div className="exam-taker-results">
        <Results
          results={results}
          onRetakeExam={handleRetakeExam}
          onBackToHome={() => navigate('/')}
          showRetake={false} // Disable retake for attempt-based exams
          studentInfo={attemptData ? { 
            studentId: attemptData.studentId, 
            name: attemptData.studentName 
          } : null}
          attemptId={attemptId}
          topicName={attemptData?.attempt?.topicName || 'Programming'}
        />
      </div>
    );
  }

  return null;
};

export default ExamTaker;
