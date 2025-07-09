const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, 'quiz_database.json');

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
        adminToken: "admin_2025_reactjs_quiz",
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
      studentId: "STUD0003",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "student",
      createdAt: new Date().toISOString(),
      isActive: true
    }
  ];

  // Sample quiz attempts
  const sampleAttempts = [
    {
      id: 1,
      attemptId: "ATT000001",
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
      attemptId: "ATT000002",
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
      attemptId: "ATT000003",
      studentId: "STUD0003",
      assignedBy: "admin",
      status: "assigned",
      assignedAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      timeLimit: 1200,
      questions: [],
      answers: [],
      results: null
    }
  ];

  db.data.users = sampleUsers;
  db.data.quizAttempts = sampleAttempts;
  db.data.metadata.nextUserId = 4;
  db.data.metadata.nextAttemptId = 4;
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

  // Quiz attempt operations
  async createQuizAttempt(studentId, assignedBy = 'admin') {
    await db.read();
    const id = db.data.metadata.nextAttemptId++;
    
    const attempt = {
      id,
      attemptId: `ATT${String(id).padStart(6, '0')}`,
      studentId,
      assignedBy,
      status: 'assigned',
      assignedAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      timeLimit: 1200,
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

  // Admin operations
  getAdminToken() {
    return "admin_2025_reactjs_quiz"; // Fallback for synchronous access
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
        adminToken: "admin_2025_reactjs_quiz",
        initialized: new Date().toISOString()
      }
    };
    await createSampleData();
    await db.write();
  }
};

module.exports = DatabaseOperations;
