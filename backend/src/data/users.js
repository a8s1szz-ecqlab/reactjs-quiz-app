const users = []; // In production, this would be a database
const quizAttempts = []; // In production, this would be a database
let nextUserId = 1;
let nextAttemptId = 1;

// Admin configuration
const ADMIN_TOKEN = "admin_2025_reactjs_quiz";

// User model structure
const createUser = (name, email, studentId = null) => {
  const user = {
    id: nextUserId++,
    studentId: studentId || `STUD${String(nextUserId).padStart(4, '0')}`,
    name,
    email,
    role: 'student',
    createdAt: new Date().toISOString(),
    isActive: true
  };
  users.push(user);
  return user;
};

// Quiz attempt model structure
const createQuizAttempt = (studentId, assignedBy = 'admin') => {
  const attempt = {
    id: nextAttemptId++,
    attemptId: `ATT${String(nextAttemptId).padStart(6, '0')}`,
    studentId,
    assignedBy,
    status: 'assigned', // assigned, in_progress, completed
    assignedAt: new Date().toISOString(),
    startedAt: null,
    completedAt: null,
    timeLimit: 1200, // 20 minutes in seconds
    questions: [], // Will be populated when quiz starts
    answers: [],
    results: null
  };
  quizAttempts.push(attempt);
  return attempt;
};

// Create some sample data
const sampleStudent1 = createUser("John Doe", "john.doe@example.com");
const sampleStudent2 = createUser("Jane Smith", "jane.smith@example.com");
const sampleStudent3 = createUser("Mike Johnson", "mike.johnson@example.com");

// Create some sample quiz attempts
createQuizAttempt(sampleStudent1.studentId);
createQuizAttempt(sampleStudent2.studentId);
createQuizAttempt(sampleStudent3.studentId);

// Helper functions
const findUserByStudentId = (studentId) => {
  return users.find(user => user.studentId === studentId && user.isActive);
};

const findUserById = (id) => {
  return users.find(user => user.id === id && user.isActive);
};

const findAttemptById = (attemptId) => {
  return quizAttempts.find(attempt => attempt.attemptId === attemptId);
};

const getAttemptsByStudentId = (studentId) => {
  return quizAttempts.filter(attempt => attempt.studentId === studentId);
};

const updateUser = (id, updates) => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updates };
    return users[userIndex];
  }
  return null;
};

const deleteUser = (id) => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    users[userIndex].isActive = false;
    return true;
  }
  return false;
};

const updateAttempt = (attemptId, updates) => {
  const attemptIndex = quizAttempts.findIndex(attempt => attempt.attemptId === attemptId);
  if (attemptIndex !== -1) {
    quizAttempts[attemptIndex] = { ...quizAttempts[attemptIndex], ...updates };
    return quizAttempts[attemptIndex];
  }
  return null;
};

module.exports = {
  users,
  quizAttempts,
  ADMIN_TOKEN,
  createUser,
  createQuizAttempt,
  findUserByStudentId,
  findUserById,
  findAttemptById,
  getAttemptsByStudentId,
  updateUser,
  deleteUser,
  updateAttempt
};
