const { 
  ADMIN_TOKEN, 
  findUserByStudentId, 
  findAttemptById 
} = require('../data/users');

// Validate and identify the type of identifier (admin token, student ID, or attempt ID)
const validateIdentifier = async (req, res) => {
  try {
    const { identifier } = req.body;
    
    if (!identifier || typeof identifier !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Identifier is required'
      });
    }

    const trimmedIdentifier = identifier.trim();

    // Check if it's an admin token
    if (trimmedIdentifier === ADMIN_TOKEN) {
      return res.json({
        success: true,
        type: 'admin',
        message: 'Admin token validated',
        data: {
          role: 'admin'
        }
      });
    }

    // Check if it's a student ID
    const student = await findUserByStudentId(trimmedIdentifier);
    if (student) {
      return res.json({
        success: true,
        type: 'student',
        message: 'Student ID validated',
        data: {
          studentId: student.studentId,
          name: student.name,
          email: student.email
        }
      });
    }

    // Check if it's an attempt ID
    const attempt = await findAttemptById(trimmedIdentifier);
    if (attempt) {
      const attemptStudent = await findUserByStudentId(attempt.studentId);
      return res.json({
        success: true,
        type: 'attempt',
        message: 'Quiz attempt ID validated',
        data: {
          attemptId: attempt.attemptId,
          studentId: attempt.studentId,
          studentName: attemptStudent ? attemptStudent.name : 'Unknown',
          status: attempt.status,
          assignedAt: attempt.assignedAt,
          timeLimit: attempt.timeLimit
        }
      });
    }

    // If none of the above match
    return res.status(404).json({
      success: false,
      message: 'Invalid identifier. Please check your admin token, student ID, or quiz attempt ID.',
      type: 'unknown'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error validating identifier',
      error: error.message
    });
  }
};

// Get system information (for landing page)
const getSystemInfo = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        appName: 'ReactJS Proficiency Quiz',
        version: '2.0.0',
        description: 'A comprehensive ReactJS proficiency assessment platform with role-based access',
        supportedIdentifiers: [
          'Admin Token - Access admin dashboard',
          'Student ID - View profile and quiz results',
          'Quiz Attempt ID - Take assigned quiz'
        ]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching system information',
      error: error.message
    });
  }
};

module.exports = {
  validateIdentifier,
  getSystemInfo
};
