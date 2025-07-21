import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import AdminDashboard from './components/AdminDashboard'
import StudentProfile from './components/StudentProfile'
import ExamTaker from './components/ExamTaker'
import Results from './components/Results'
import QuizApiService from './services/api'
import config from './config'
import './App.css'

// Error Boundary Component
function ErrorBoundary({ children, error, onRetry }) {
  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <div className="error-card">
            <h1>🚫 Connection Error</h1>
            <p>{error}</p>
            <p>Please ensure the backend server is running on <code>http://localhost:3001</code></p>
            <button onClick={onRetry} className="retry-button">
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    )
  }
  return children
}

// Loading Component
function LoadingScreen() {
  return (
    <div className="app">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2>Connecting to Exam Server...</h2>
        <p>Please wait while we establish connection</p>
      </div>
    </div>
  )
}

// Admin Route Wrapper
function AdminRoute() {
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check for admin token in localStorage or prompt for authentication
    const adminToken = localStorage.getItem('adminToken')
    if (adminToken === config.ADMIN_TOKEN) {
      setAuthenticated(true)
    } else {
      // Prompt for admin credentials
      const token = prompt('Enter admin token:')
      if (token === config.ADMIN_TOKEN) {
        localStorage.setItem('adminToken', token)
        setAuthenticated(true)
      } else {
        navigate('/')
        return
      }
    }
    setLoading(false)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/')
  }

  if (loading) return <LoadingScreen />
  if (!authenticated) return <Navigate to="/" replace />

  return <AdminDashboard />
}

// Student Route Wrapper
function StudentRoute() {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const [studentData, setStudentData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    validateStudent()
  }, [studentId])

  const validateStudent = async () => {
    try {
      const result = await QuizApiService.validateIdentifier(studentId)
      if (result.success && result.type === 'student') {
        setStudentData(result.data)
      } else {
        setError('Invalid student ID')
        setTimeout(() => navigate('/'), 2000)
      }
    } catch (err) {
      setError(err.message)
      setTimeout(() => navigate('/'), 2000)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    navigate('/')
  }

  if (loading) return <LoadingScreen />
  if (error) return <div className="error">Error: {error}</div>
  if (!studentData) return <Navigate to="/" replace />

  return <StudentProfile />
}

// Exam Route Wrapper
function ExamRoute() {
  const { attemptId } = useParams()
  const navigate = useNavigate()
  const [attemptData, setAttemptData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    validateAttempt()
  }, [attemptId])

  const validateAttempt = async () => {
    try {
      const result = await QuizApiService.validateIdentifier(attemptId)
      if (result.success && result.type === 'attempt') {
        setAttemptData(result.data)
      } else {
        setError('Invalid attempt ID')
        setTimeout(() => navigate('/'), 2000)
      }
    } catch (err) {
      setError(err.message)
      setTimeout(() => navigate('/'), 2000)
    } finally {
      setLoading(false)
    }
  }

  const handleExit = () => {
    navigate('/')
  }

  if (loading) return <LoadingScreen />
  if (error) return <div className="error">Error: {error}</div>
  if (!attemptData) return <Navigate to="/" replace />

  return <ExamTaker attemptId={attemptId} />
}

// Results Route Wrapper
function ResultsRoute() {
  const { attemptId } = useParams()
  const navigate = useNavigate()
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadResults()
  }, [attemptId])

  const loadResults = async () => {
    try {
      const data = await QuizApiService.getAttemptResults(attemptId)
      setResults(data)
    } catch (err) {
      setError(err.message)
      setTimeout(() => navigate('/'), 3000)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingScreen />
  if (error) return <div className="error">Error: {error}</div>
  if (!results) return <Navigate to="/" replace />

  return (
    <Results 
      results={results}
      onBackToHome={() => navigate('/')}
      attemptId={attemptId}
    />
  )
}

// Main App Component
function App() {
  const [backendConnected, setBackendConnected] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkBackend()
  }, [])

  const checkBackend = async () => {
    try {
      await QuizApiService.healthCheck()
      setBackendConnected(true)
      setError(null)
    } catch (error) {
      console.error('Backend connection failed:', error)
      setBackendConnected(false)
      setError('Unable to connect to the exam server. Please make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    setLoading(true)
    setError(null)
    checkBackend()
  }

  if (loading) {
    return <LoadingScreen />
  }

  if (!backendConnected) {
    return <ErrorBoundary error={error} onRetry={handleRetry} />
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Landing page - main entry point */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="/admin/*" element={<AdminRoute />} />
          
          {/* Student routes */}
          <Route path="/student/:studentId" element={<StudentRoute />} />
          <Route path="/student/:studentId/*" element={<StudentRoute />} />
          
          {/* Exam routes */}
          <Route path="/exam/:attemptId" element={<ExamRoute />} />
          
          {/* Results routes */}
          <Route path="/results/:attemptId" element={<ResultsRoute />} />
          
          {/* Catch-all redirect to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
