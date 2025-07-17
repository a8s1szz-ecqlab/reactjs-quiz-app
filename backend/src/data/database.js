const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');
const fs = require('fs');
const config = require('../config');

// Database file path - use persistent directory for production
const getDbPath = () => {
  if (config.isProduction) {
    // In production, use configured data directory or fallback
    const dataDir = config.DATA_DIR || path.join(process.cwd(), 'data');
    
    // Create data directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    return path.join(dataDir, 'quiz_database.json');
  }
  
  // Development path
  return path.join(__dirname, 'quiz_database.json');
};

const dbPath = getDbPath();

// Database adapter
const adapter = new JSONFile(dbPath);
const db = new Low(adapter, {});

// Initialize database with default data
const initializeDatabase = async () => {
  await db.read();
  
  // Set default data if database is empty
  if (!db.data || Object.keys(db.data).length === 0) {
    db.data = {
      users: [],
      quizAttempts: [],
      metadata: {
        nextUserId: 1,
        nextAttemptId: 1,
        adminToken: config.ADMIN_TOKEN,
        initialized: new Date().toISOString()
      }
    };
    
    // Create sample data
    await createSampleData();
    await db.write();
  }
};

// Create sample data
const createSampleData = async () => {
  // Sample users
  const sampleUsers = [
    {
      id: 1,
      studentId: "STUD0001",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "student",
      createdAt: new Date().toISOString(),
      isActive: true
    },
    {
      id: 2,
      studentId: "STUD0002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "student",
      createdAt: new Date().toISOString(),
      isActive: true
    },
    {
      id: 3,
      studentId: "RJSPE01819332",
      name: "Jan Erisse",
      email: "AAYVVZZ@company.com",
      role: "student",
      createdAt: new Date().toISOString(),
      isActive: true
    },
    {
      id: 4,
      studentId: "RJSPE02029879",
      name: "Rashmi",
      email: "ACKX3ZZ@company.com",
      role: "student",
      createdAt: new Date().toISOString(),
      isActive: true
    }
  ];

  // Sample quiz attempts
  const sampleAttempts = [
    {
      id: 1,
      attemptId: "ATT1079001",
      studentId: "STUD0001",
      assignedBy: "admin",
      status: "assigned",
      assignedAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      timeLimit: 1200,
      questions: [],
      answers: [],
      results: null
    },
    {
      id: 2,
      attemptId: "ATT1079002",
      studentId: "STUD0002",
      assignedBy: "admin",
      status: "assigned",
      assignedAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      timeLimit: 1200,
      questions: [],
      answers: [],
      results: null
    },
    {
      id: 3,
      attemptId: "ATT1079003",
      studentId: "RJSPE01819332",
      assignedBy: "admin",
      status: "assigned",
      assignedAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      timeLimit: 960,
      questions: [],
      answers: [],
      results: null
    },
    {
      id: 4,
      attemptId: "ATT1079004",
      studentId: "RJSPE02029879",
      assignedBy: "admin",
      status: "assigned",
      assignedAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      timeLimit: 960,
      questions: [],
      answers: [],
      results: null
    }
  ];

  db.data.users = sampleUsers;
  db.data.quizAttempts = sampleAttempts;
  db.data.metadata.nextUserId = 5;
  db.data.metadata.nextAttemptId = 5;
};

// Database operations
const DatabaseOperations = {
  // Initialize
  async init() {
    await initializeDatabase();
  },

  // User operations
  async createUser(name, email, studentId = null) {
    await db.read();
    const id = db.data.metadata.nextUserId++;
    const generatedStudentId = studentId || `STUD${String(id).padStart(4, '0')}`;
    
    const user = {
      id,
      studentId: generatedStudentId,
      name,
      email,
      role: 'student',
      createdAt: new Date().toISOString(),
      isActive: true
    };
    
    db.data.users.push(user);
    await db.write();
    return user;
  },

  async findUserByStudentId(studentId) {
    await db.read();
    return db.data.users.find(user => user.studentId === studentId && user.isActive);
  },

  async findUserById(id) {
    await db.read();
    return db.data.users.find(user => user.id === id && user.isActive);
  },

  async getAllUsers() {
    await db.read();
    return db.data.users.filter(user => user.isActive);
  },

  async updateUser(id, updates) {
    await db.read();
    const userIndex = db.data.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      db.data.users[userIndex] = { ...db.data.users[userIndex], ...updates };
      await db.write();
      return db.data.users[userIndex];
    }
    return null;
  },

  async deleteUser(id) {
    await db.read();
    const userIndex = db.data.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      db.data.users[userIndex].isActive = false;
      await db.write();
      return true;
    }
    return false;
  },

  async hardDeleteUser(id) {
    await db.read();
    const userIndex = db.data.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      // Get the studentId before removing the user
      const studentId = db.data.users[userIndex].studentId;
      
      // Remove the user completely
      db.data.users.splice(userIndex, 1);
      
      // Also remove all quiz attempts for this user
      if (studentId) {
        db.data.quizAttempts = db.data.quizAttempts.filter(attempt => attempt.studentId !== studentId);
      }
      
      await db.write();
      return true;
    }
    return false;
  },

  // Quiz attempt operations
  async createQuizAttempt(studentId, assignedBy = 'admin') {
    await db.read();
    const id = db.data.metadata.nextAttemptId++;
    
    const attempt = {
      id,
      attemptId: `ATT1079${String(id).padStart(3, '0')}`,
      studentId,
      assignedBy,
      status: 'assigned',
      assignedAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      timeLimit: 960,
      questions: [],
      answers: [],
      results: null
    };
    
    db.data.quizAttempts.push(attempt);
    await db.write();
    return attempt;
  },

  async findAttemptById(attemptId) {
    await db.read();
    return db.data.quizAttempts.find(attempt => attempt.attemptId === attemptId);
  },

  async getAttemptsByStudentId(studentId) {
    await db.read();
    return db.data.quizAttempts.filter(attempt => attempt.studentId === studentId);
  },

  async getAllAttempts() {
    await db.read();
    return db.data.quizAttempts;
  },

  async updateAttempt(attemptId, updates) {
    await db.read();
    const attemptIndex = db.data.quizAttempts.findIndex(attempt => attempt.attemptId === attemptId);
    if (attemptIndex !== -1) {
      db.data.quizAttempts[attemptIndex] = { ...db.data.quizAttempts[attemptIndex], ...updates };
      await db.write();
      return db.data.quizAttempts[attemptIndex];
    }
    return null;
  },

  async deleteAttempt(attemptId) {
    await db.read();
    const attemptIndex = db.data.quizAttempts.findIndex(attempt => attempt.attemptId === attemptId);
    if (attemptIndex !== -1) {
      db.data.quizAttempts.splice(attemptIndex, 1);
      await db.write();
      return true;
    }
    return false;
  },

  // Admin operations
  getAdminToken() {
    return config.ADMIN_TOKEN; // Use config instead of hardcoded value
  },

  // Database maintenance
  async backup() {
    await db.read();
    const backupData = JSON.stringify(db.data, null, 2);
    const fs = require('fs');
    const backupPath = path.join(__dirname, `backup_${Date.now()}.json`);
    fs.writeFileSync(backupPath, backupData);
    return backupPath;
  },

  async reset() {
    db.data = {
      users: [],
      quizAttempts: [],
      metadata: {
        nextUserId: 1,
        nextAttemptId: 1,
        adminToken: config.ADMIN_TOKEN,
        initialized: new Date().toISOString()
      }
    };
    await createSampleData();
    await db.write();
  }
};

module.exports = DatabaseOperations;
