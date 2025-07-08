const { 
  findUserByStudentId, 
  getAttemptsByStudentId,
  findAttemptById,
  updateAttempt 
} = require('../data/users');

// Get student profile
const getStudentProfile = (req, res) => {
  try {
    const { studentId } = req.params;
    const student = findUserByStudentId(studentId);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Get student's quiz attempts
    const attempts = getAttemptsByStudentId(studentId);
    
    // Calculate statistics
    const totalAttempts = attempts.length;
    const completedAttempts = attempts.filter(attempt => attempt.status === 'completed');
    const pendingAttempts = attempts.filter(attempt => attempt.status === 'assigned');
    const inProgressAttempts = attempts.filter(attempt => attempt.status === 'in_progress');
    
    let averageScore = 0;
    let bestScore = 0;
    
    if (completedAttempts.length > 0) {
      const scores = completedAttempts
        .filter(attempt => attempt.results && attempt.results.score !== undefined)
        .map(attempt => attempt.results.score);
      
      if (scores.length > 0) {
        averageScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
        bestScore = Math.max(...scores);
      }
    }

    res.json({
      success: true,
      data: {
        student: {
          studentId: student.studentId,
          name: student.name,
          email: student.email,
          createdAt: student.createdAt
        },
        statistics: {
          totalAttempts,
          completedAttempts: completedAttempts.length,
          pendingAttempts: pendingAttempts.length,
          inProgressAttempts: inProgressAttempts.length,
          averageScore,
          bestScore
        },
        recentAttempts: attempts
          .sort((a, b) => new Date(b.assignedAt) - new Date(a.assignedAt))
          .slice(0, 5)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student profile',
      error: error.message
    });
  }
};

// Get all quiz attempts for a student
const getStudentQuizAttempts = (req, res) => {
  try {
    const { studentId } = req.params;
    const student = findUserByStudentId(studentId);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const attempts = getAttemptsByStudentId(studentId);
    
    res.json({
      success: true,
      data: attempts.sort((a, b) => new Date(b.assignedAt) - new Date(a.assignedAt))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quiz attempts',
      error: error.message
    });
  }
};

// Get detailed results for a specific quiz attempt
const getQuizAttemptResults = (req, res) => {
  try {
    const { attemptId } = req.params;
    const attempt = findAttemptById(attemptId);
    
    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: 'Quiz attempt not found'
      });
    }

    // Verify student access (if not admin)
    if (req.user.role !== 'admin' && req.user.studentId !== attempt.studentId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    if (attempt.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Quiz attempt not completed yet'
      });
    }

    // Get student information
    const student = findUserByStudentId(attempt.studentId);
    
    res.json({
      success: true,
      data: {
        attempt: {
          attemptId: attempt.attemptId,
          status: attempt.status,
          assignedAt: attempt.assignedAt,
          startedAt: attempt.startedAt,
          completedAt: attempt.completedAt,
          timeLimit: attempt.timeLimit
        },
        student: student ? {
          studentId: student.studentId,
          name: student.name
        } : null,
        results: attempt.results,
        questions: attempt.questions,
        answers: attempt.answers
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quiz results',
      error: error.message
    });
  }
};

// Validate quiz attempt access for taking quiz
const validateQuizAttempt = (req, res) => {
  try {
    const { attemptId } = req.params;
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
        message: 'Quiz attempt already completed',
        data: {
          status: 'completed',
          completedAt: attempt.completedAt,
          results: attempt.results
        }
      });
    }

    // Get student information
    const student = findUserByStudentId(attempt.studentId);
    
    res.json({
      success: true,
      message: 'Quiz attempt is valid',
      data: {
        attempt: {
          attemptId: attempt.attemptId,
          status: attempt.status,
          timeLimit: attempt.timeLimit,
          assignedAt: attempt.assignedAt,
          startedAt: attempt.startedAt
        },
        student: student ? {
          studentId: student.studentId,
          name: student.name
        } : null
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error validating quiz attempt',
      error: error.message
    });
  }
};

// Start quiz attempt
const startQuizAttempt = (req, res) => {
  try {
    const { attemptId } = req.params;
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
        message: 'Quiz attempt already completed'
      });
    }

    if (attempt.status === 'in_progress') {
      return res.status(400).json({
        success: false,
        message: 'Quiz attempt already in progress'
      });
    }

    // Update attempt status and start time
    const updates = {
      status: 'in_progress',
      startedAt: new Date().toISOString()
    };

    const updatedAttempt = updateAttempt(attemptId, updates);
    
    res.json({
      success: true,
      message: 'Quiz attempt started',
      data: {
        attemptId: updatedAttempt.attemptId,
        status: updatedAttempt.status,
        startedAt: updatedAttempt.startedAt,
        timeLimit: updatedAttempt.timeLimit
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error starting quiz attempt',
      error: error.message
    });
  }
};

module.exports = {
  getStudentProfile,
  getStudentQuizAttempts,
  getQuizAttemptResults,
  validateQuizAttempt,
  startQuizAttempt
};
