const { getQuizQuestions, validateAnswers, getProficiencyLevel } = require('../utils/questionUtils');

// Start a new quiz - return 50 random questions
const startQuiz = (req, res) => {
  try {
    const questions = getQuizQuestions(50);
    
    res.json({
      success: true,
      data: {
        questions: questions,
        totalQuestions: questions.length,
        timeLimit: 1200, // 20 minutes in seconds
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
const submitQuiz = (req, res) => {
  try {
    const { answers, totalTime, timeLeft } = req.body;
    
    // Validate request data
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid answers data'
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
      detailedResults: results.detailedResults
    };
    
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
const getQuizStats = (req, res) => {
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
