import './Welcome.css';

const Welcome = ({ onStartQuiz, totalQuestions, loading, error }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-header">
          <div className="logo-section">
            <div className="quiz-icon">⚛️</div>
            <h1 className="app-title">ReactJS Proficiency Quiz</h1>
          </div>
          <p className="welcome-subtitle">Test your ReactJS knowledge and assess your proficiency level!</p>
        </div>

        <div className="quiz-info">
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">⚛️</div>
              <div className="info-content">
                <h3>{totalQuestions} Questions</h3>
                <p>Randomly selected from 150+ ReactJS questions</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">⏰</div>
              <div className="info-content">
                <h3>20 Minutes</h3>
                <p>Total time limit for the entire quiz with free navigation</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">🏆</div>
              <div className="info-content">
                <h3>Proficiency Score</h3>
                <p>Detailed assessment of your ReactJS skills</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">💻</div>
              <div className="info-content">
                <h3>Backend Powered</h3>
                <p>Secure validation and comprehensive explanations</p>
              </div>
            </div>
          </div>
        </div>

        <div className="quiz-preview">
          <h3 className="preview-title">What You'll Be Tested On:</h3>
          <ul className="feature-list">
            <li>
              <span className="feature-icon">🔧</span>
              React Hooks (useState, useEffect, useContext, useMemo, etc.)
            </li>
            <li>
              <span className="feature-icon">⚡</span>
              Component lifecycle and state management
            </li>
            <li>
              <span className="feature-icon">🎯</span>
              JSX syntax and React best practices
            </li>
            <li>
              <span className="feature-icon">🔄</span>
              Virtual DOM, props, refs, and performance optimization
            </li>
            <li>
              <span className="feature-icon">🎲</span>
              Questions are randomized for each attempt
            </li>
          </ul>
        </div>

        <div className="difficulty-info">
          <div className="difficulty-badge">
            <span className="difficulty-label">Level:</span>
            <span className="difficulty-level moderate">Intermediate</span>
          </div>
          <p className="difficulty-description">
            Designed for developers with basic to intermediate ReactJS experience
          </p>
        </div>

        <div className="action-section">
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}
          <button 
            className={`start-button ${loading ? 'loading' : ''}`} 
            onClick={onStartQuiz}
            disabled={loading}
          >
            <span className="button-icon">{loading ? '⏳' : '🚀'}</span>
            <span className="button-text">
              {loading ? 'Loading Questions...' : 'Start Quiz'}
            </span>
            {!loading && <span className="button-arrow">→</span>}
          </button>
        </div>

        <div className="tips-section">
          <h4 className="tips-title">Pro Tips for ReactJS Quiz:</h4>
          <div className="tips-grid">
            <div className="tip-item">
              <span className="tip-number">1</span>
              <span className="tip-text">Think about React fundamentals and best practices</span>
            </div>
            <div className="tip-item">
              <span className="tip-number">2</span>
              <span className="tip-text">Consider modern React patterns and Hooks</span>
            </div>
            <div className="tip-item">
              <span className="tip-number">3</span>
              <span className="tip-text">Focus on practical React development scenarios</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
