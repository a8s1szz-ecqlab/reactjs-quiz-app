import React, { useState, useEffect } from 'react';
import './StudentProfile.css';

const StudentProfile = ({ studentId, onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [attemptDetails, setAttemptDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('profile');

  useEffect(() => {
    loadStudentProfile();
  }, [studentId]);

  const apiRequest = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'student-id': studentId,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }

    return response.json();
  };

  const loadStudentProfile = async () => {
    setIsLoading(true);
    try {
      const profileData = await apiRequest(`/api/student/profile/${studentId}`);
      setProfile(profileData.data);
      
      const attemptsData = await apiRequest(`/api/student/profile/${studentId}/attempts`);
      setAttempts(attemptsData.data);
    } catch (error) {
      console.error('Error loading student profile:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAttemptDetails = async (attemptId) => {
    try {
      const response = await fetch(`/api/student/attempt/${attemptId}/results`);
      const data = await response.json();
      
      if (data.success) {
        setAttemptDetails(data.data);
        setSelectedAttempt(attemptId);
        setActiveView('attempt-details');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error loading attempt details:', error);
      setError('Failed to load attempt details');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
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
    return colors[level] || '#95a5a6';
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
        <button
          className={`nav-button ${activeView === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveView('profile')}
        >
          📊 Overview
        </button>
        <button
          className={`nav-button ${activeView === 'attempts' ? 'active' : ''}`}
          onClick={() => setActiveView('attempts')}
        >
          📝 Quiz Attempts
        </button>
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
            <h2>All Quiz Attempts</h2>
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
                          <button 
                            onClick={() => loadAttemptDetails(attempt.attemptId)}
                            className="action-button"
                          >
                            View Details
                          </button>
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
            <div className="details-header">
              <button 
                onClick={() => setActiveView('attempts')}
                className="back-button"
              >
                ← Back to Attempts
              </button>
              <h2>Quiz Attempt Details</h2>
            </div>

            <div className="attempt-summary">
              <div className="summary-card">
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
              </div>

              <div className="summary-card">
                <h3>Results</h3>
                <div className="result-score">
                  <div className="score-circle">
                    <span className="score-percentage">
                      {attemptDetails.results.percentage}%
                    </span>
                    <span className="score-fraction">
                      {attemptDetails.results.score}/{attemptDetails.results.totalQuestions}
                    </span>
                  </div>
                  <div 
                    className="proficiency-level"
                    style={{ color: getProficiencyColor(attemptDetails.results.proficiencyLevel) }}
                  >
                    {attemptDetails.results.proficiencyLevel}
                  </div>
                </div>
              </div>
            </div>

            {attemptDetails.results.detailedResults && (
              <div className="detailed-results">
                <h3>Question-by-Question Analysis</h3>
                <div className="results-list">
                  {attemptDetails.results.detailedResults.map((result, index) => (
                    <div key={index} className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                      <div className="question-number">Q{index + 1}</div>
                      <div className="question-content">
                        <div className="question-text">{result.question}</div>
                        <div className="answers">
                          <div className="answer-row">
                            <span className="answer-label">Your answer:</span>
                            <span className={`answer-text ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                              {result.userAnswer}
                            </span>
                          </div>
                          {!result.isCorrect && (
                            <div className="answer-row">
                              <span className="answer-label">Correct answer:</span>
                              <span className="answer-text correct">
                                {result.correctAnswer}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="result-icon">
                        {result.isCorrect ? '✓' : '✗'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentProfile;
