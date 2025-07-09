const { getQuizQuestions, validateAnswers, getProficiencyLevel } = require('../utils/questionUtils');
const { findAttemptById, updateAttempt } = require('../data/users');

// Start a quiz for a specific attempt - return 50 random questions
const startQuiz = async (req, res) => {
  try {
    const { attemptId } = req.params;
    
    if (!attemptId) {
      return res.status(400).json({
        success: false,
        message: 'Attempt ID is required'
      });
    }

    const attempt = await findAttemptById(attemptId);
    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: 'Quiz attempt not found'
      });
    }

    if (attempt.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Quiz attempt already completed'
      });
    }

    // Get questions if not already generated
    let questions = attempt.questions;
    if (!questions || questions.length === 0) {
      questions = getQuizQuestions(50);
      
      // Update attempt with questions and start time
      const updates = {
        questions: questions,
        status: 'in_progress',
        startedAt: new Date().toISOString()
      };
      await updateAttempt(attemptId, updates);
    }
    
    res.json({
      success: true,
      data: {
        attemptId: attempt.attemptId,
        questions: questions,
        totalQuestions: questions.length,
        timeLimit: attempt.timeLimit,
        startedAt: attempt.startedAt || new Date().toISOString(),
        message: 'Quiz started successfully'
      }
    });
  } catch (error) {
    console.error('Error starting quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start quiz',
      error: error.message
    });
  }
};

// Submit quiz answers and return results
const submitQuiz = async (req, res) => {
  try {
    const { attemptId, answers, totalTime, timeLeft } = req.body;
    
    // Validate request data
    if (!attemptId) {
      return res.status(400).json({
        success: false,
        message: 'Attempt ID is required'
      });
    }

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid answers data'
      });
    }

    // Find the quiz attempt
    const attempt = await findAttemptById(attemptId);
    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: 'Quiz attempt not found'
      });
    }

    if (attempt.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Quiz attempt already completed'
      });
    }
    
    // Validate and calculate results
    const results = validateAnswers(answers);
    const proficiencyLevel = getProficiencyLevel(results.percentage);
    
    // Prepare response data
    const responseData = {
      score: results.score,
      totalQuestions: results.totalQuestions,
      percentage: results.percentage,
      proficiencyLevel: proficiencyLevel,
      totalTime: totalTime || 0,
      timeLeft: timeLeft || 0,
      incorrectAnswers: results.incorrectAnswers,
      skippedCount: results.skippedCount,
      detailedResults: results.detailedResults
    };

    // Update attempt with results
    const updates = {
      status: 'completed',
      completedAt: new Date().toISOString(),
      answers: answers,
      results: responseData
    };
    await updateAttempt(attemptId, updates);
    
    res.json({
      success: true,
      data: responseData,
      message: 'Quiz submitted successfully'
    });
    
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quiz',
      error: error.message
    });
  }
};

// Get quiz statistics (optional endpoint)
const getQuizStats = async (req, res) => {
  try {
    const { quizData } = require('../data/questions');
    
    res.json({
      success: true,
      data: {
        totalQuestions: quizData.length,
        questionsPerQuiz: 50,
        topics: [
          'Component Fundamentals',
          'React Hooks',
          'State Management',
          'Performance Optimization',
          'Best Practices',
          'Advanced Concepts',
          'Modern React Features'
        ]
      }
    });
  } catch (error) {
    console.error('Error getting quiz stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get quiz statistics',
      error: error.message
    });
  }
};

module.exports = {
  startQuiz,
  submitQuiz,
  getQuizStats
};
