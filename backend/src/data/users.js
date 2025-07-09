const DatabaseOperations = require('./database');

// Initialize database on module load
DatabaseOperations.init().catch(console.error);

// Export database operations with compatibility layer for existing code
module.exports = {
  // Data accessors (for backward compatibility)
  get users() {
    console.warn('Direct access to users array is deprecated. Use async methods instead.');
    return [];
  },
  get quizAttempts() {
    console.warn('Direct access to quizAttempts array is deprecated. Use async methods instead.');
    return [];
  },
  get ADMIN_TOKEN() {
    return DatabaseOperations.getAdminToken();
  },

  // User operations
  createUser: DatabaseOperations.createUser,
  findUserByStudentId: DatabaseOperations.findUserByStudentId,
  findUserById: DatabaseOperations.findUserById,
  getAllUsers: DatabaseOperations.getAllUsers,
  updateUser: DatabaseOperations.updateUser,
  deleteUser: DatabaseOperations.deleteUser,

  // Quiz attempt operations
  createQuizAttempt: DatabaseOperations.createQuizAttempt,
  findAttemptById: DatabaseOperations.findAttemptById,
  getAttemptsByStudentId: DatabaseOperations.getAttemptsByStudentId,
  getAllAttempts: DatabaseOperations.getAllAttempts,
  updateAttempt: DatabaseOperations.updateAttempt,

  // Database maintenance
  backup: DatabaseOperations.backup,
  reset: DatabaseOperations.reset
};
