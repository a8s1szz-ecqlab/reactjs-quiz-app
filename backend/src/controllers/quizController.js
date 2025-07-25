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
      // If attempt is already completed, return the results instead of error
      if (attempt.results) {
        return res.json({
          success: false,
          message: 'Quiz attempt already completed',
          alreadyCompleted: true,
          results: attempt.results
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Quiz attempt already completed but no results found'
        });
      }
    }

        // Check if time limit has been exceeded for ongoing exams
    if (attempt.status === 'in_progress' && attempt.startedAt) {
      const startTime = new Date(attempt.startedAt);
      const currentTime = new Date();
      const timeElapsed = Math.floor((currentTime - startTime) / 1000);
      const timeLimit = attempt.timeLimit || (20 * 60);
      
      if (timeElapsed > timeLimit) {
        console.log(`Time limit exceeded for attempt ${attemptId}. Time: ${timeElapsed}s, Limit: ${timeLimit}s`);
        
        // Don't auto-submit here - let frontend submit with actual answers
        // Just return the exam data with a flag indicating time exceeded
        return res.json({
          success: true,
          data: {
            attemptId: attempt.attemptId,
            questions: attempt.questions,
            totalQuestions: attempt.questions.length,
            timeLimit: timeLimit,
            startedAt: attempt.startedAt,
            remainingTime: 0, // No time remaining
            serverTime: new Date().toISOString(),
            timeExceeded: true,
            message: 'Time limit exceeded - please submit immediately'
          }
        });
      }
    }

    // Get questions if not already generated
    let questions = attempt.questions;
    let startedAt = attempt.startedAt;
    
    if (!questions || questions.length === 0) {
      // Use topic-specific questions if available, otherwise default to all questions
      const topic = attempt.topic || 'reactjs';
      questions = await getQuizQuestions(50, topic);
      startedAt = new Date().toISOString();
      
      // Update attempt with questions and start time
      const updates = {
        questions: questions,
        status: 'in_progress',
        startedAt: startedAt
      };
      await updateAttempt(attemptId, updates);
    }
    
    // Calculate remaining time based on server-side validation
    const serverStartTime = new Date(startedAt);
    const currentTime = new Date();
    const timeElapsed = Math.floor((currentTime - serverStartTime) / 1000);
    const timeLimit = attempt.timeLimit || (20 * 60);
    const remainingTime = Math.max(0, timeLimit - timeElapsed);
    
    // Double-check if time has just exceeded while calculating
    if (remainingTime <= 0) {
      // Time just exceeded - return exam data but indicate time exceeded
      console.log(`Time limit just exceeded for attempt ${attemptId}. Time: ${timeElapsed}s, Limit: ${timeLimit}s`);
      
      return res.json({
        success: true,
        data: {
          attemptId: attempt.attemptId,
          questions: questions,
          totalQuestions: questions.length,
          timeLimit: timeLimit,
          startedAt: startedAt,
          remainingTime: 0,
          serverTime: new Date().toISOString(),
          timeExceeded: true,
          message: 'Time limit just exceeded - please submit immediately'
        }
      });
    }
    
    res.json({
      success: true,
      data: {
        attemptId: attempt.attemptId,
        questions: questions,
        totalQuestions: questions.length,
        timeLimit: timeLimit,
        startedAt: startedAt,
        remainingTime: remainingTime,
        serverTime: new Date().toISOString(),
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

    // Server-side time validation
    if (!attempt.startedAt) {
      return res.status(400).json({
        success: false,
        message: 'Quiz was never started properly'
      });
    }

    const startTime = new Date(attempt.startedAt);
    const currentTime = new Date();
    const actualTimeElapsed = Math.floor((currentTime - startTime) / 1000); // in seconds
    const timeLimit = attempt.timeLimit || (20 * 60); // Default 20 minutes

    // Check if time limit has been exceeded
    if (actualTimeElapsed > timeLimit) {
      // Time exceeded - force submission but mark as overtime
      console.log(`Time limit exceeded for attempt ${attemptId}. Actual: ${actualTimeElapsed}s, Limit: ${timeLimit}s`);
      
      const validationResults = await validateAnswers(answers, attempt.topic);
      const proficiencyLevel = getProficiencyLevel(validationResults.percentage, attempt.topicName);

      const results = {
        score: validationResults.score,
        totalQuestions: validationResults.totalQuestions,
        percentage: validationResults.percentage,
        proficiencyLevel: proficiencyLevel,
        detailedResults: validationResults.detailedResults,
        incorrectAnswers: validationResults.incorrectAnswers,
        skippedAnswers: validationResults.skippedAnswers,
        skippedCount: validationResults.skippedCount,
        timeTaken: timeLimit, // Use time limit as time taken since it was exceeded
        totalTime: timeLimit, // Frontend expects totalTime
        timeExceeded: true,
        actualTimeElapsed: actualTimeElapsed,
        submittedAt: new Date().toISOString()
      };

      const updates = {
        status: 'completed',
        completedAt: new Date().toISOString(),
        results: results,
        timeTaken: timeLimit,
        timeExceeded: true
      };

      await updateAttempt(attemptId, updates);

      return res.json({
        success: true,
        data: results,
        warning: 'Exam was submitted after the time limit. Results may be affected.',
        message: 'Quiz submitted successfully (overtime)'
      });
    }

    // Normal submission within time limit
    const validationResults = await validateAnswers(answers, attempt.topic);
    const proficiencyLevel = getProficiencyLevel(validationResults.percentage, attempt.topicName);
    
    // Use server-calculated time instead of client-reported time
    const serverTimeTaken = Math.min(actualTimeElapsed, timeLimit);
    
    const results = {
      score: validationResults.score,
      totalQuestions: validationResults.totalQuestions,
      percentage: validationResults.percentage,
      proficiencyLevel: proficiencyLevel,
      detailedResults: validationResults.detailedResults,
      incorrectAnswers: validationResults.incorrectAnswers,
      skippedAnswers: validationResults.skippedAnswers,
      skippedCount: validationResults.skippedCount,
      timeTaken: serverTimeTaken,
      totalTime: serverTimeTaken, // Frontend expects totalTime
      timeExceeded: false,
      submittedAt: new Date().toISOString()
    };

    // Update attempt with results
    const updates = {
      status: 'completed',
      completedAt: new Date().toISOString(),
      results: results,
      timeTaken: serverTimeTaken,
      timeExceeded: false
    };

    await updateAttempt(attemptId, updates);
    
    res.json({
      success: true,
      data: results,
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
