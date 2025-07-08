const { 
  users, 
  quizAttempts, 
  createUser, 
  createQuizAttempt, 
  findUserById, 
  findUserByStudentId,
  updateUser, 
  deleteUser,
  getAttemptsByStudentId 
} = require('../data/users');

// Get all students
const getAllStudents = (req, res) => {
  try {
    const students = users.filter(user => user.isActive);
    res.json({
      success: true,
      data: students,
      total: students.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
};

// Get student by ID
const getStudentById = (req, res) => {
  try {
    const { id } = req.params;
    const student = findUserById(parseInt(id));
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Get student's quiz attempts
    const attempts = getAttemptsByStudentId(student.studentId);
    
    res.json({
      success: true,
      data: {
        ...student,
        quizAttempts: attempts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student',
      error: error.message
    });
  }
};

// Create new student
const createStudent = (req, res) => {
  try {
    const { name, email, studentId } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    // Check if email already exists
    const existingUser = users.find(user => user.email === email && user.isActive);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Check if studentId already exists (if provided)
    if (studentId) {
      const existingStudentId = findUserByStudentId(studentId);
      if (existingStudentId) {
        return res.status(409).json({
          success: false,
          message: 'Student ID already exists'
        });
      }
    }

    const newStudent = createUser(name, email, studentId);
    
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: newStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating student',
      error: error.message
    });
  }
};

// Update student
const updateStudent = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    const student = findUserById(parseInt(id));
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Check if email already exists (exclude current student)
    if (email && email !== student.email) {
      const existingUser = users.find(user => user.email === email && user.id !== parseInt(id) && user.isActive);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    updates.updatedAt = new Date().toISOString();

    const updatedStudent = updateUser(parseInt(id), updates);
    
    res.json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating student',
      error: error.message
    });
  }
};

// Delete student (soft delete)
const deleteStudent = (req, res) => {
  try {
    const { id } = req.params;
    
    const student = findUserById(parseInt(id));
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const deleted = deleteUser(parseInt(id));
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Student deleted successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error deleting student'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting student',
      error: error.message
    });
  }
};

// Assign quiz attempt to student
const assignQuizAttempt = (req, res) => {
  try {
    const { studentId } = req.body;
    
    if (!studentId) {
      return res.status(400).json({
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

    const attempt = createQuizAttempt(studentId, 'admin');
    
    res.status(201).json({
      success: true,
      message: 'Quiz attempt assigned successfully',
      data: attempt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error assigning quiz attempt',
      error: error.message
    });
  }
};

// Get all quiz attempts
const getAllQuizAttempts = (req, res) => {
  try {
    const attempts = quizAttempts.map(attempt => {
      const student = findUserByStudentId(attempt.studentId);
      return {
        ...attempt,
        studentName: student ? student.name : 'Unknown'
      };
    });
    
    res.json({
      success: true,
      data: attempts,
      total: attempts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quiz attempts',
      error: error.message
    });
  }
};

// Get quiz attempts by student
const getQuizAttemptsByStudent = (req, res) => {
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
      data: {
        student,
        attempts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quiz attempts',
      error: error.message
    });
  }
};

// Get dashboard statistics
const getDashboardStats = (req, res) => {
  try {
    const totalStudents = users.filter(user => user.isActive).length;
    const totalAttempts = quizAttempts.length;
    const completedAttempts = quizAttempts.filter(attempt => attempt.status === 'completed').length;
    const pendingAttempts = quizAttempts.filter(attempt => attempt.status === 'assigned').length;
    const inProgressAttempts = quizAttempts.filter(attempt => attempt.status === 'in_progress').length;

    res.json({
      success: true,
      data: {
        totalStudents,
        totalAttempts,
        completedAttempts,
        pendingAttempts,
        inProgressAttempts,
        completionRate: totalAttempts > 0 ? Math.round((completedAttempts / totalAttempts) * 100) : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message
    });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  assignQuizAttempt,
  getAllQuizAttempts,
  getQuizAttemptsByStudent,
  getDashboardStats
};
