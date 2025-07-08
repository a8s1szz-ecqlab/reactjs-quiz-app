const express = require('express');
const router = express.Router();
const { authenticateStudent, authenticateAttempt } = require('../middleware/auth');
const {
  getStudentProfile,
  getStudentQuizAttempts,
  getQuizAttemptResults,
  validateQuizAttempt,
  startQuizAttempt
} = require('../controllers/studentController');

// Student profile routes (requires student authentication)
router.get('/profile/:studentId', authenticateStudent, getStudentProfile);
router.get('/profile/:studentId/attempts', authenticateStudent, getStudentQuizAttempts);

// Quiz attempt routes
router.get('/attempt/:attemptId/validate', validateQuizAttempt);
router.post('/attempt/:attemptId/start', startQuizAttempt);
router.get('/attempt/:attemptId/results', getQuizAttemptResults);

module.exports = router;
