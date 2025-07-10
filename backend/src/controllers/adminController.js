const { 
  getAllUsers,
  getAllAttempts,
  createUser, 
  createQuizAttempt, 
  findUserById, 
  findUserByStudentId,
  updateUser, 
  deleteUser,
  hardDeleteUser,
  deleteAttempt,
  getAttemptsByStudentId 
} = require('../data/users');

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await getAllUsers();
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
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await findUserById(parseInt(id));
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Get student's quiz attempts
    const attempts = await getAttemptsByStudentId(student.studentId);
    
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
const createStudent = async (req, res) => {
  try {
    const { name, email, studentId } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    // Check if email already exists
    const allUsers = await getAllUsers();
    const existingUser = allUsers.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Check if studentId already exists (if provided)
    if (studentId) {
      const existingStudentId = await findUserByStudentId(studentId);
      if (existingStudentId) {
        return res.status(409).json({
          success: false,
          message: 'Student ID already exists'
        });
      }
    }

    const newStudent = await createUser(name, email, studentId);
    
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
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    const student = await findUserById(parseInt(id));
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

    const updatedStudent = await updateUser(parseInt(id), updates);
    
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
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const student = await findUserById(parseInt(id));
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const deleted = await deleteUser(parseInt(id));
    
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

// Hard delete student (permanently removes student and all their quiz attempts)
const hardDeleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const student = await findUserById(parseInt(id));
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const deleted = await hardDeleteUser(parseInt(id));
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Student and all associated quiz attempts permanently deleted'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error permanently deleting student'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error permanently deleting student',
      error: error.message
    });
  }
};

// Assign quiz attempt to student
const assignQuizAttempt = async (req, res) => {
  try {
    const { studentId } = req.body;
    
    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: 'Student ID is required'
      });
    }

    const student = await findUserByStudentId(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const attempt = await createQuizAttempt(studentId, 'admin');
    
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
const getAllQuizAttempts = async (req, res) => {
  try {
    const allAttempts = await getAllAttempts();
    const attempts = await Promise.all(allAttempts.map(async (attempt) => {
      const student = await findUserByStudentId(attempt.studentId);
      return {
        ...attempt,
        studentName: student ? student.name : 'Unknown'
      };
    }));
    
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
const getQuizAttemptsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    
    const student = await findUserByStudentId(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const attempts = await getAttemptsByStudentId(studentId);
    
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

// Delete quiz attempt
const deleteQuizAttempt = async (req, res) => {
  try {
    const { attemptId } = req.params;
    
    if (!attemptId) {
      return res.status(400).json({
        success: false,
        message: 'Attempt ID is required'
      });
    }

    const deleted = await deleteAttempt(attemptId);
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Quiz attempt deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Quiz attempt not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting quiz attempt',
      error: error.message
    });
  }
};

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    const allAttempts = await getAllAttempts();
    const totalStudents = allUsers.length;
    const totalAttempts = allAttempts.length;
    const completedAttempts = allAttempts.filter(attempt => attempt.status === 'completed').length;
    const pendingAttempts = allAttempts.filter(attempt => attempt.status === 'assigned').length;
    const inProgressAttempts = allAttempts.filter(attempt => attempt.status === 'in_progress').length;

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
  hardDeleteStudent,
  assignQuizAttempt,
  getAllQuizAttempts,
  getQuizAttemptsByStudent,
  deleteQuizAttempt,
  getDashboardStats
};
