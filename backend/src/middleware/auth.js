const { ADMIN_TOKEN, findUserByStudentId, findAttemptById } = require('../data/users');

// Middleware to authenticate admin token
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization || req.body.token || req.query.token;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Admin token is required'
    });
  }
  
  if (token !== ADMIN_TOKEN) {
    return res.status(403).json({
      success: false,
      message: 'Invalid admin token'
    });
  }
  
  req.user = { role: 'admin' };
  next();
};

// Middleware to authenticate student
const authenticateStudent = (req, res, next) => {
  const studentId = req.headers['student-id'] || req.body.studentId || req.query.studentId;
  
  if (!studentId) {
    return res.status(401).json({
      success: false,
      message: 'Student ID is required'
    });
  }
  
  const student = findUserByStudentId(studentId);
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }
  
  req.user = student;
  next();
};

// Middleware to authenticate quiz attempt
const authenticateAttempt = (req, res, next) => {
  const attemptId = req.headers['attempt-id'] || req.body.attemptId || req.query.attemptId;
  
  if (!attemptId) {
    return res.status(401).json({
      success: false,
      message: 'Attempt ID is required'
    });
  }
  
  const attempt = findAttemptById(attemptId);
  if (!attempt) {
    return res.status(404).json({
      success: false,
      message: 'Quiz attempt not found'
    });
  }
  
  if (attempt.status === 'completed') {
    return res.status(400).json({
      success: false,
      message: 'This quiz attempt has already been completed'
    });
  }
  
  const student = findUserByStudentId(attempt.studentId);
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student associated with this attempt not found'
    });
  }
  
  req.user = student;
  req.attempt = attempt;
  next();
};

// Middleware to validate authentication type
const validateAuth = (req, res, next) => {
  const { identifier } = req.body;
  
  if (!identifier) {
    return res.status(400).json({
      success: false,
      message: 'Identifier is required'
    });
  }
  
  // Check if it's admin token
  if (identifier === ADMIN_TOKEN) {
    return res.json({
      success: true,
      data: {
        type: 'admin',
        message: 'Admin access granted'
      }
    });
  }
  
  // Check if it's student ID
  const student = findUserByStudentId(identifier);
  if (student) {
    return res.json({
      success: true,
      data: {
        type: 'student',
        student: {
          id: student.id,
          studentId: student.studentId,
          name: student.name,
          email: student.email
        },
        message: 'Student found'
      }
    });
  }
  
  // Check if it's attempt ID
  const attempt = findAttemptById(identifier);
  if (attempt) {
    const attemptStudent = findUserByStudentId(attempt.studentId);
    if (attempt.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'This quiz attempt has already been completed'
      });
    }
    
    return res.json({
      success: true,
      data: {
        type: 'attempt',
        attempt: {
          attemptId: attempt.attemptId,
          studentId: attempt.studentId,
          studentName: attemptStudent ? attemptStudent.name : 'Unknown',
          status: attempt.status,
          assignedAt: attempt.assignedAt
        },
        message: 'Quiz attempt found'
      }
    });
  }
  
  return res.status(404).json({
    success: false,
    message: 'Invalid identifier. Please enter a valid Student ID, Attempt ID, or Admin Token.'
  });
};

module.exports = {
  authenticateAdmin,
  authenticateStudent,
  authenticateAttempt,
  validateAuth
};
