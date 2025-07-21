const DatabaseFactory = require('./factory');

// Initialize database on module load
let databaseInstance = null;

const getDatabase = async () => {
  if (!databaseInstance) {
    databaseInstance = await DatabaseFactory.getDatabase();
  }
  return databaseInstance;
};

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
    return require('../config').ADMIN_TOKEN;
  },

  // User operations
  createUser: async (...args) => {
    const db = await getDatabase();
    return db.createUser(...args);
  },
  findUserByStudentId: async (...args) => {
    const db = await getDatabase();
    return db.findUserByStudentId(...args);
  },
  findUserById: async (...args) => {
    const db = await getDatabase();
    return db.findUserById(...args);
  },
  getAllUsers: async (...args) => {
    const db = await getDatabase();
    return db.getAllUsers(...args);
  },
  updateUser: async (...args) => {
    const db = await getDatabase();
    return db.updateUser(...args);
  },
  deleteUser: async (...args) => {
    const db = await getDatabase();
    return db.deleteUser(...args);
  },
  hardDeleteUser: async (...args) => {
    const db = await getDatabase();
    return db.hardDeleteUser(...args);
  },

  // Quiz attempt operations
  createQuizAttempt: async (...args) => {
    const db = await getDatabase();
    return db.createQuizAttempt(...args);
  },
  findAttemptById: async (...args) => {
    const db = await getDatabase();
    return db.findAttemptById(...args);
  },
  getAttemptsByStudentId: async (...args) => {
    const db = await getDatabase();
    return db.getAttemptsByStudentId(...args);
  },
  getAllAttempts: async (...args) => {
    const db = await getDatabase();
    return db.getAllAttempts(...args);
  },
  updateAttempt: async (...args) => {
    const db = await getDatabase();
    return db.updateAttempt(...args);
  },
  deleteAttempt: async (...args) => {
    const db = await getDatabase();
    return db.deleteAttempt(...args);
  },

  // Database maintenance
  backup: async (...args) => {
    const db = await getDatabase();
    return db.backup(...args);
  },
  reset: async (...args) => {
    const db = await getDatabase();
    return db.reset(...args);
  }
};
