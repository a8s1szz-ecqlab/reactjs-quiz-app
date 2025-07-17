import { useState, useEffect } from 'react'
import LandingPage from './components/LandingPage'
import AdminDashboard from './components/AdminDashboard'
import StudentProfile from './components/StudentProfile'
import ExamTaker from './components/ExamTaker'
import QuizApiService from './services/api'
import config from './config'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('landing') // 'landing', 'admin', 'student', 'exam'
  const [userType, setUserType] = useState(null) // 'admin', 'student', 'attempt'
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const [backendConnected, setBackendConnected] = useState(false)

  // Check for URL parameters on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const identifier = urlParams.get('id')
    
    if (identifier) {
      handleIdentifierSubmit(null, { identifier })
    } else {
      checkBackend()
    }
  }, [])

  const checkBackend = async () => {
    try {
      await QuizApiService.healthCheck()
      setBackendConnected(true)
    } catch (error) {
      console.error('Backend connection failed:', error)
      setBackendConnected(false)
      setError('Unable to connect to the exam server. Please make sure the backend is running.')
    }
  }

  const handleIdentifierSubmit = async (type, data) => {
    setError(null)
    
    try {
      // If called from URL parameter, validate the identifier first
      if (!type && data.identifier) {
        const validationResult = await QuizApiService.validateIdentifier(data.identifier)
        if (validationResult.success) {
          type = validationResult.type
          data = validationResult.data
        } else {
          setError(validationResult.message)
          return
        }
      }

      setUserType(type)
      setUserData(data)

      switch (type) {
        case 'admin':
          setCurrentView('admin')
          break
        case 'student':
          setCurrentView('student')
          break
        case 'attempt':
          setCurrentView('exam')
          break
        default:
          setError('Unknown user type')
      }

      // Clear URL parameters after processing
      if (window.location.search) {
        window.history.replaceState({}, document.title, window.location.pathname)
      }
      
    } catch (error) {
      console.error('Error handling identifier:', error)
      setError(error.message || 'Failed to validate identifier')
    }
  }
  const handleLogout = () => {
    setCurrentView('landing')
    setUserType(null)
    setUserData(null)
    setError(null)
  }

  const handleExitExam = () => {
    setCurrentView('landing')
    setUserType(null)
    setUserData(null)
    setError(null)
  }

  // Show error state if backend is not connected
  if (!backendConnected && error) {
    return (
      <div className="app">
        <div className="error-container">
          <div className="error-card">
            <h1>🚫 Connection Error</h1>
            <p>{error}</p>
            <p>Please ensure the backend server is running on <code>http://localhost:3001</code></p>
            <button 
              onClick={() => window.location.reload()} 
              className="retry-button"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      {currentView === 'landing' && (
        <LandingPage onIdentifierSubmit={handleIdentifierSubmit} />
      )}
      
      {currentView === 'admin' && userData && (
        <AdminDashboard 
          adminToken={userData.role === 'admin' ? config.ADMIN_TOKEN : ''}
          onLogout={handleLogout}
        />
      )}
      
      {currentView === 'student' && userData && (
        <StudentProfile 
          studentId={userData.studentId}
          onLogout={handleLogout}
        />
      )}
      
      {currentView === 'exam' && userData && (
        <ExamTaker 
          attemptId={userData.attemptId}
          onExit={handleExitExam}
        />
      )}
    </div>
  )
}

export default App
