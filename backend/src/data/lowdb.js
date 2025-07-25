const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');
const fs = require('fs');
const config = require('../config');

class LowDBAdapter {
  constructor() {
    this.db = null;
    this.dbPath = this.getDbPath();
  }

  getDbPath() {
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
  }

  async init() {
    // Database adapter
    const adapter = new JSONFile(this.dbPath);
    this.db = new Low(adapter, {});
    
    await this.db.read();
    
    // Set default data if database is empty
    if (!this.db.data || Object.keys(this.db.data).length === 0) {
      this.db.data = {
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
      await this.createSampleData();
      await this.db.write();
    }
  }

  async createSampleData() {
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
        timeLimit: 960,
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
        timeLimit: 960,
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

    this.db.data.users = sampleUsers;
    this.db.data.quizAttempts = sampleAttempts;
    this.db.data.metadata.nextUserId = 5;
    this.db.data.metadata.nextAttemptId = 5;
  }

  // User operations
  async createUser(name, email, studentId = null) {
    await this.db.read();
    const id = this.db.data.metadata.nextUserId++;
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
    
    this.db.data.users.push(user);
    await this.db.write();
    return user;
  }

  async findUserByStudentId(studentId) {
    await this.db.read();
    return this.db.data.users.find(user => user.studentId === studentId && user.isActive);
  }

  async findUserById(id) {
    await this.db.read();
    return this.db.data.users.find(user => user.id === id && user.isActive);
  }

  async getAllUsers() {
    await this.db.read();
    return this.db.data.users.filter(user => user.isActive);
  }

  async updateUser(id, updates) {
    await this.db.read();
    const userIndex = this.db.data.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      this.db.data.users[userIndex] = { ...this.db.data.users[userIndex], ...updates };
      await this.db.write();
      return this.db.data.users[userIndex];
    }
    return null;
  }

  async deleteUser(id) {
    await this.db.read();
    const userIndex = this.db.data.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      this.db.data.users[userIndex].isActive = false;
      await this.db.write();
      return true;
    }
    return false;
  }

  async hardDeleteUser(id) {
    await this.db.read();
    const userIndex = this.db.data.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      // Get the studentId before removing the user
      const studentId = this.db.data.users[userIndex].studentId;
      
      // Remove the user completely
      this.db.data.users.splice(userIndex, 1);
      
      // Also remove all quiz attempts for this user
      if (studentId) {
        this.db.data.quizAttempts = this.db.data.quizAttempts.filter(attempt => attempt.studentId !== studentId);
      }
      
      await this.db.write();
      return true;
    }
    return false;
  }

  // Quiz attempt operations
  async createQuizAttempt(studentId, assignedBy = 'admin', topic = 'reactjs') {
    await this.db.read();
    const id = this.db.data.metadata.nextAttemptId++;
    
    // Get topic information for time limit and other settings
    const { getTopicById, DEFAULT_TOPIC } = require('./questions');
    let topicData;
    try {
      topicData = await getTopicById(topic);
      if (!topicData) {
        topicData = await getTopicById(DEFAULT_TOPIC);
      }
    } catch (error) {
      console.warn(`Failed to fetch topic data for ${topic}, using default:`, error.message);
      topicData = await getTopicById(DEFAULT_TOPIC);
    }
    
    const attempt = {
      id,
      attemptId: `ATT1079${String(id).padStart(3, '0')}`,
      studentId,
      assignedBy,
      topic: topic,
      topicName: topicData?.name || 'Programming',
      status: 'assigned',
      assignedAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      timeLimit: topicData?.timeLimit || 3600,
      passingScore: topicData?.passingScore || 70,
      questions: [],
      answers: [],
      results: null
    };
    
    this.db.data.quizAttempts.push(attempt);
    await this.db.write();
    return attempt;
  }

  async findAttemptById(attemptId) {
    await this.db.read();
    return this.db.data.quizAttempts.find(attempt => attempt.attemptId === attemptId);
  }

  async getAttemptsByStudentId(studentId) {
    await this.db.read();
    return this.db.data.quizAttempts.filter(attempt => attempt.studentId === studentId);
  }

  async getAllAttempts() {
    await this.db.read();
    return this.db.data.quizAttempts;
  }

  async updateAttempt(attemptId, updates) {
    await this.db.read();
    const attemptIndex = this.db.data.quizAttempts.findIndex(attempt => attempt.attemptId === attemptId);
    if (attemptIndex !== -1) {
      this.db.data.quizAttempts[attemptIndex] = { ...this.db.data.quizAttempts[attemptIndex], ...updates };
      await this.db.write();
      return this.db.data.quizAttempts[attemptIndex];
    }
    return null;
  }

  async deleteAttempt(attemptId) {
    await this.db.read();
    const attemptIndex = this.db.data.quizAttempts.findIndex(attempt => attempt.attemptId === attemptId);
    if (attemptIndex !== -1) {
      this.db.data.quizAttempts.splice(attemptIndex, 1);
      await this.db.write();
      return true;
    }
    return false;
  }

  // Admin operations
  getAdminToken() {
    return config.ADMIN_TOKEN;
  }

  // Database maintenance
  async backup() {
    await this.db.read();
    const backupData = JSON.stringify(this.db.data, null, 2);
    const backupPath = path.join(__dirname, `backup_${Date.now()}.json`);
    fs.writeFileSync(backupPath, backupData);
    return backupPath;
  }

  async reset() {
    this.db.data = {
      users: [],
      quizAttempts: [],
      metadata: {
        nextUserId: 1,
        nextAttemptId: 1,
        adminToken: config.ADMIN_TOKEN,
        initialized: new Date().toISOString()
      }
    };
    await this.createSampleData();
    await this.db.write();
  }
}

module.exports = LowDBAdapter;
