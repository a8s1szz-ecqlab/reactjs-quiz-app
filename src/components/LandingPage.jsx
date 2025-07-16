import React, { useState } from 'react';
import QuizApiService from '../services/api';
import './LandingPage.css';

const LandingPage = ({ onIdentifierSubmit }) => {
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!identifier.trim()) {
      setError('Please enter your identifier');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await QuizApiService.validateIdentifier(identifier.trim());

      if (data.success) {
        onIdentifierSubmit(data.type, data.data);
      } else {
        setError(data.message || 'Invalid identifier');
      }
    } catch (error) {
      console.error('Validation error:', error);
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="landing-header">
          <h1>ReactJS Proficiency Quiz</h1>
          <p className="landing-subtitle">
            A comprehensive ReactJS proficiency assessment platform
          </p>
        </div>

        <div className="landing-form-section">
          <form onSubmit={handleSubmit} className="identifier-form">
            <div className="form-group">
              <label htmlFor="identifier" className="form-label">
                Enter Your Identifier
              </label>
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Admin token, Student ID, or Quiz Attempt ID"
                className={`form-input ${error ? 'error' : ''}`}
                disabled={isLoading}
              />
              {error && <div className="error-message">{error}</div>}
            </div>

            <button 
              type="submit" 
              className={`submit-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Validating...
                </>
              ) : (
                'Continue'
              )}
            </button>
          </form>
        </div>

        <div className="landing-info">
          <h3>How to Access</h3>
          <div className="access-cards">
            <div className="access-card">
              <div className="access-icon admin">👨‍💼</div>
              <h4>Admin Access</h4>
              <p>Use your admin token to manage students and assign quiz attempts</p>
            </div>
            <div className="access-card">
              <div className="access-icon student">👨‍🎓</div>
              <h4>Student Profile</h4>
              <p>Enter your Student ID to view your profile and quiz results</p>
            </div>
            <div className="access-card">
              <div className="access-icon attempt">📝</div>
              <h4>Take Quiz</h4>
              <p>Use your Quiz Attempt ID to start an assigned quiz</p>
            </div>
          </div>
        </div>

        <div className="landing-footer">
          <p>
            Built with React.js • Designed for proficiency assessment
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
