const express = require('express');
const router = express.Router();
const { startQuiz, submitQuiz, getQuizStats } = require('../controllers/quizController');

// Route to start a quiz for a specific attempt
router.get('/start/:attemptId', startQuiz);

// Route to submit quiz answers
router.post('/submit', submitQuiz);

// Route to get quiz statistics
router.get('/stats', getQuizStats);

module.exports = router;
