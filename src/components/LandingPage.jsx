import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizApiService from '../services/api';
import config from '../config';
import './LandingPage.css';

const LandingPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
        // Navigate based on the type of identifier
        switch (data.type) {
          case 'admin':
            // Store admin token and navigate to admin
            localStorage.setItem('adminToken', config.ADMIN_TOKEN);
            navigate('/admin');
            break;
          case 'student':
            navigate(`/student/${data.data.studentId}`);
            break;
          case 'attempt':
            navigate(`/exam/${data.data.attemptId}`);
            break;
          default:
            setError('Unknown identifier type');
        }
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
          <h1>Programming Proficiency Exam</h1>
          <p className="landing-subtitle">
            A comprehensive programming proficiency assessment platform
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
                placeholder="Admin token, Student ID, or Exam Attempt ID"
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
              <p>Use your admin token to manage students and assign exam attempts</p>
            </div>
            <div className="access-card">
              <div className="access-icon student">👨‍🎓</div>
              <h4>Student Profile</h4>
              <p>Enter your Student ID to view your profile and exam results</p>
            </div>
            <div className="access-card">
              <div className="access-icon attempt">📝</div>
              <h4>Take Exam</h4>
              <p>Use your Exam Attempt ID to start an assigned exam</p>
            </div>
          </div>
        </div>

        <div className="landing-footer">
          <p>
            Multi-Topic Assessment Platform • Built with React.js
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
