const express = require('express');
const router = express.Router();
const { startQuiz, submitQuiz, getQuizStats } = require('../controllers/quizController');

// Route to start a new quiz
router.get('/start', startQuiz);

// Route to submit quiz answers
router.post('/submit', submitQuiz);

// Route to get quiz statistics
router.get('/stats', getQuizStats);

module.exports = router;
