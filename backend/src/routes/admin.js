const express = require('express');
const router = express.Router();
const { authenticateAdmin } = require('../middleware/auth');
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  assignQuizAttempt,
  getAllQuizAttempts,
  getQuizAttemptsByStudent,
  getDashboardStats
} = require('../controllers/adminController');

// All admin routes require authentication
router.use(authenticateAdmin);

// Dashboard stats
router.get('/dashboard/stats', getDashboardStats);

// Student management routes
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.post('/students', createStudent);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

// Quiz attempt management routes
router.get('/quiz-attempts', getAllQuizAttempts);
router.get('/quiz-attempts/student/:studentId', getQuizAttemptsByStudent);
router.post('/quiz-attempts/assign', assignQuizAttempt);

module.exports = router;
