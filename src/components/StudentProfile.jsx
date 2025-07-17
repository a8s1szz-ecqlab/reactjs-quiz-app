import React, { useState, useEffect } from 'react';
import QuizApiService from '../services/api';
import PDFService from '../services/pdfService';
import './StudentProfile.css';

const StudentProfile = ({ studentId, onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [attemptDetails, setAttemptDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('profile');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    loadStudentProfile();
  }, [studentId]);

  const loadStudentProfile = async () => {
    setIsLoading(true);
    try {
      const profileData = await QuizApiService.getStudentProfile(studentId);
      setProfile(profileData);
      
      const attemptsData = await QuizApiService.getStudentAttempts(studentId);
      setAttempts(attemptsData);
    } catch (error) {
      console.error('Error loading student profile:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAttemptDetails = async (attemptId) => {
    try {
      const data = await QuizApiService.getAttemptResults(attemptId, studentId);
      setAttemptDetails(data);
      setSelectedAttempt(attemptId);
      setActiveView('attempt-details');
    } catch (error) {
      console.error('Error loading attempt details:', error);
      setError('Failed to load attempt details');
    }
  };

  const formatTime = (seconds) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getPerformanceEmoji = (percentage) => {
    if (percentage >= 90) return '🏆';
    if (percentage >= 80) return '🎉';
    if (percentage >= 70) return '👍';
    if (percentage >= 60) return '👌';
    return '💪';
  };

  const getStatusBadge = (status) => {
    const statusClass = {
      assigned: 'status-assigned',
      in_progress: 'status-progress',
      completed: 'status-completed'
    }[status] || 'status-assigned';

    const statusText = {
      assigned: 'Assigned',
      in_progress: 'In Progress',
      completed: 'Completed'
    }[status] || status;

    return <span className={`status-badge ${statusClass}`}>{statusText}</span>;
  };

  const getProficiencyColor = (level) => {
    const colors = {
      'Beginner': '#e74c3c',
      'Intermediate': '#f39c12',
      'Advanced': '#27ae60',
      'Expert': '#8e44ad'
    };
    return colors[level] || '#666';
  };

  const handleDownloadAttemptPDF = async (attemptData) => {
    setIsGeneratingPDF(true);
    try {
      const resultData = {
        score: attemptData.results.score,
        totalQuestions: attemptData.results.totalQuestions,
        percentage: attemptData.results.percentage,
        proficiencyLevel: attemptData.results.proficiencyLevel,
        totalTime: attemptData.results.totalTime,
        incorrectAnswers: attemptData.results.incorrectAnswers || [],
        skippedCount: attemptData.results.skippedCount || 0,
        detailedResults: attemptData.results.detailedResults || [],
        attemptId: attemptData.attemptId,
        completedAt: attemptData.completedAt
      };
      
      const studentInfo = {
        name: profile.student.name,
        studentId: profile.student.studentId
      };
      
      await PDFService.generateQuizResultsPDF(resultData, studentInfo);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadSummaryPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const completedAttempts = attempts.filter(a => a.status === 'completed');
      const studentInfo = {
        name: profile.student.name,
        studentId: profile.student.studentId
      };
      
      await PDFService.generateStudentSummaryPDF(completedAttempts, studentInfo);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#27ae60';
    if (percentage >= 60) return '#f39c12';
    return '#e74c3c';
  };

  if (isLoading) {
    return (
      <div className="student-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="student-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={onLogout} className="primary-button">
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="student-profile">
      <header className="student-header">
        <div className="header-content">
          <div className="header-info">
            <h1>Student Profile</h1>
            <p>{profile?.student?.name}</p>
          </div>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <nav className="student-nav">
        <div className="nav-container">
          <button
            className={`subpage ${activeView === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveView('profile')}
          >
            Overview
          </button>
          <button
            className={`subpage ${activeView === 'attempts' ? 'active' : ''}`}
            onClick={() => setActiveView('attempts')}
          >
            Quiz Attempts
          </button>
        </div>
      </nav>

      <main className="student-content">
        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={() => setError('')}>✕</button>
          </div>
        )}

        {activeView === 'profile' && profile && (
          <div className="profile-overview">
            <div className="profile-stats">
              <div className="student-info-card">
                <h3>Student Information</h3>
                <div className="info-row">
                  <label>Student ID:</label>
                  <span>{profile.student.studentId}</span>
                </div>
                <div className="info-row">
                  <label>Name:</label>
                  <span>{profile.student.name}</span>
                </div>
                <div className="info-row">
                  <label>Email:</label>
                  <span>{profile.student.email}</span>
                </div>
                <div className="info-row">
                  <label>Joined:</label>
                  <span>{formatDate(profile.student.createdAt)}</span>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <h4>Total Attempts</h4>
                  <div className="stat-number">{profile.statistics.totalAttempts}</div>
                </div>
                <div className="stat-card">
                  <h4>Completed</h4>
                  <div className="stat-number">{profile.statistics.completedAttempts}</div>
                </div>
                <div className="stat-card">
                  <h4>Average Score</h4>
                  <div 
                    className="stat-number"
                    style={{ color: getScoreColor(profile.statistics.averageScore) }}
                  >
                    {profile.statistics.averageScore}%
                  </div>
                </div>
                <div className="stat-card">
                  <h4>Best Score</h4>
                  <div 
                    className="stat-number"
                    style={{ color: getScoreColor(profile.statistics.bestScore) }}
                  >
                    {profile.statistics.bestScore}%
                  </div>
                </div>
              </div>
            </div>

            {profile.recentAttempts && profile.recentAttempts.length > 0 && (
              <div className="recent-attempts">
                <h3>Recent Quiz Attempts</h3>
                <div className="attempts-list">
                  {profile.recentAttempts.slice(0, 3).map((attempt) => (
                    <div key={attempt.id} className="attempt-card">
                      <div className="attempt-header">
                        <span className="attempt-id">{attempt.attemptId}</span>
                        {getStatusBadge(attempt.status)}
                      </div>
                      <div className="attempt-info">
                        <div className="attempt-date">
                          Assigned: {formatDate(attempt.assignedAt)}
                        </div>
                        {attempt.status === 'completed' && attempt.results && (
                          <div className="attempt-score">
                            Score: {attempt.results.score}/{attempt.results.totalQuestions} 
                            ({attempt.results.percentage}%)
                          </div>
                        )}
                      </div>
                      {attempt.status === 'completed' && (
                        <button 
                          onClick={() => loadAttemptDetails(attempt.attemptId)}
                          className="view-details-button"
                        >
                          View Details
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeView === 'attempts' && (
          <div className="attempts-view">
            <div className="attempts-header">
              <h2>All Quiz Attempts</h2>
              {attempts.filter(a => a.status === 'completed').length > 0 && (
                <button 
                  onClick={handleDownloadSummaryPDF}
                  className="action-button download-summary"
                  disabled={isGeneratingPDF}
                >
                  {isGeneratingPDF ? '⏳ Generating...' : '📄 Download Summary PDF'}
                </button>
              )}
            </div>
            <div className="attempts-table">
              <table>
                <thead>
                  <tr>
                    <th>Attempt ID</th>
                    <th>Status</th>
                    <th>Assigned</th>
                    <th>Started</th>
                    <th>Completed</th>
                    <th>Score</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((attempt) => (
                    <tr key={attempt.id}>
                      <td>{attempt.attemptId}</td>
                      <td>{getStatusBadge(attempt.status)}</td>
                      <td>{formatDate(attempt.assignedAt)}</td>
                      <td>{attempt.startedAt ? formatDate(attempt.startedAt) : '-'}</td>
                      <td>{attempt.completedAt ? formatDate(attempt.completedAt) : '-'}</td>
                      <td>
                        {attempt.results?.score !== undefined ? 
                          `${attempt.results.score}/${attempt.results.totalQuestions} (${attempt.results.percentage}%)` : '-'}
                      </td>
                      <td>
                        {attempt.status === 'completed' && (
                          <>
                            <button 
                              onClick={() => loadAttemptDetails(attempt.attemptId)}
                              className="action-button"
                            >
                              View Details
                            </button>
                            <button 
                              onClick={() => handleDownloadAttemptPDF(attempt)}
                              className="action-button download-pdf"
                              disabled={isGeneratingPDF}
                            >
                              {isGeneratingPDF ? '⏳' : '📄'} PDF
                            </button>
                          </>
                        )}
                        {attempt.status === 'assigned' && (
                          <a 
                            href={`/?id=${attempt.attemptId}`}
                            className="action-button take-quiz"
                          >
                            Take Quiz
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeView === 'attempt-details' && attemptDetails && (
          <div className="attempt-details">

            <div className="results-overview">
              <div className="results-header">
                <div className="emoji-display">{getPerformanceEmoji(attemptDetails.results.percentage)}</div>
                <h1 className="results-title">ReactJS Assessment Complete!</h1>
                <p className="results-message">{attemptDetails.results.proficiencyLevel?.message || 'Assessment completed'}</p>
              </div>

              <div className="score-display">
                <div className="score-circle" style={{ '--grade-color': attemptDetails.results.proficiencyLevel?.color || '#666' }}>
                  <div className="score-percentage">{attemptDetails.results.percentage}%</div>
                  <div className="score-grade">{attemptDetails.results.proficiencyLevel?.grade || 'N/A'}</div>
                </div>
                
                <div className="score-details">
                  <div className="score-fraction">
                    <span className="correct-answers">{attemptDetails.results.score}</span>
                    <span className="separator">/</span>
                    <span className="total-questions">{attemptDetails.results.totalQuestions}</span>
                  </div>
                  <div className="score-label">Correct Answers</div>
                </div>
              </div>

              <div className="stats-section">
                <div className="stat-item">
                  <div className="stat-value">{attemptDetails.results.score}</div>
                  <div className="stat-label">Correct</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{attemptDetails.results.incorrectAnswers?.filter(q => q.selectedAnswer !== null).length || 0}</div>
                  <div className="stat-label">Incorrect</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{attemptDetails.results.skippedCount || attemptDetails.results.incorrectAnswers?.filter(q => q.selectedAnswer === null).length || 0}</div>
                  <div className="stat-label">Skipped</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{formatTime(attemptDetails.results.totalTime || 0)}</div>
                  <div className="stat-label">Time Used</div>
                </div>
              </div>

              <div className="attempt-info">
                <div className="info-card">
                  <h3>Attempt Information</h3>
                  <div className="info-row">
                    <label>Attempt ID:</label>
                    <span>{attemptDetails.attempt.attemptId}</span>
                  </div>
                  <div className="info-row">
                    <label>Started:</label>
                    <span>{formatDate(attemptDetails.attempt.startedAt)}</span>
                  </div>
                  <div className="info-row">
                    <label>Completed:</label>
                    <span>{formatDate(attemptDetails.attempt.completedAt)}</span>
                  </div>
                  <div className="info-row">
                    <label>Time Limit:</label>
                    <span>{formatTime(attemptDetails.attempt.timeLimit)}</span>
                  </div>
                </div>
              </div>

              {attemptDetails.results.incorrectAnswers && attemptDetails.results.incorrectAnswers.filter(q => q.selectedAnswer !== null).length > 0 && (
                <div className="review-section">
                  <h3 className="review-title">Questions You Got Wrong</h3>
                  <div className="incorrect-answers">
                    {attemptDetails.results.incorrectAnswers.filter(q => q.selectedAnswer !== null).map((answer, index) => (
                      <div key={answer.questionId} className="incorrect-answer-item">
                        <div className="question-header">
                          <span className="question-number">Q{index + 1}</span>
                          <span className="answer-status incorrect">✗ Incorrect</span>
                        </div>
                        
                        <div className="question-content">
                          <h4 className="question-text">{answer.question}</h4>
                          
                          <div className="answer-options">
                            {answer.options?.map((option, optIndex) => (
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
                          
                          {answer.explanation && (
                            <div className="explanation">
                              <strong>Explanation:</strong> {answer.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {attemptDetails.results.incorrectAnswers && attemptDetails.results.incorrectAnswers.filter(q => q.selectedAnswer !== null).length === 0 && (
                <div className="perfect-score">
                  🎉 Perfect! You got all questions correct!
                </div>
              )}

              <div className="attempt-actions">
                <button 
                  onClick={() => handleDownloadAttemptPDF(attemptDetails)}
                  className="download-button"
                  disabled={isGeneratingPDF}
                >
                  <span className="button-icon">{isGeneratingPDF ? '⏳' : '📄'}</span>
                  {isGeneratingPDF ? 'Generating...' : 'Download PDF Report'}
                </button>
                
                <button 
                  onClick={() => setActiveView('attempts')}
                  className="back-button"
                >
                  <span className="button-icon">⬅️</span>
                  Back to Attempts
                </button>
              </div>

              <div className="motivational-section">
                <div className="motivational-text">
                  {attemptDetails.results.percentage >= 80 
                    ? "Excellent ReactJS knowledge! You're ready for advanced React projects! 🏆" 
                    : attemptDetails.results.percentage >= 60 
                      ? "Good ReactJS foundation! Practice with more complex React patterns! ⚛️" 
                      : "Keep learning ReactJS fundamentals! Check out the official React docs! 📚"
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentProfile;
