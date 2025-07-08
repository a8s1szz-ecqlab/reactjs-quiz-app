import { useState, useEffect } from 'react'
import Welcome from './components/Welcome'
import Quiz from './components/Quiz'
import Results from './components/Results'
import QuizApiService from './services/api'
import './App.css'

function App() {
  const [gameState, setGameState] = useState('welcome') // 'welcome', 'quiz', 'results'
  const [quizResults, setQuizResults] = useState(null)
  const [currentQuestions, setCurrentQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [backendConnected, setBackendConnected] = useState(false)

  // Check backend connection on app start
  useEffect(() => {
    const checkBackend = async () => {
      try {
        await QuizApiService.healthCheck()
        setBackendConnected(true)
      } catch (error) {
        console.error('Backend connection failed:', error)
        setBackendConnected(false)
        setError('Unable to connect to the quiz server. Please make sure the backend is running.')
      }
    }
    
    checkBackend()
  }, [])

  const handleStartQuiz = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const quizData = await QuizApiService.startQuiz()
      setCurrentQuestions(quizData.questions)
      setGameState('quiz')
    } catch (error) {
      console.error('Failed to start quiz:', error)
      setError('Failed to start quiz. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleQuizComplete = (results) => {
    setQuizResults(results)
    setGameState('results')
  }

  const handleRestartQuiz = () => {
    setQuizResults(null)
    setCurrentQuestions([])
    setError(null)
    setGameState('welcome')
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
      {gameState === 'welcome' && (
        <Welcome 
          onStartQuiz={handleStartQuiz}
          totalQuestions={50}
          loading={loading}
          error={error}
        />
      )}
      
      {gameState === 'quiz' && currentQuestions.length > 0 && (
        <Quiz 
          questions={currentQuestions}
          onQuizComplete={handleQuizComplete}
        />
      )}
      
      {gameState === 'results' && (
        <Results 
          results={quizResults}
          onRestartQuiz={handleRestartQuiz}
        />
      )}
    </div>
  )
}

export default App
