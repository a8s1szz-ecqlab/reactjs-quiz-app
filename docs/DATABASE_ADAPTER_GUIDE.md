# Database Adapter Development Guide

This guide explains how to add new database adapters to the ReactJS Quiz Application.

## Architecture Overview

The application uses a **Database Factory Pattern** that allows switching between different database backends:

- **Factory**: `backend/src/data/factory.js` - Creates appropriate database instances
- **Adapters**: Individual database implementations (LowDB, Supabase, etc.)
- **Interface**: Common method signatures across all adapters

## Existing Adapters

### LowDB Adapter (`backend/src/data/lowdb.js`)
- File-based JSON storage
- Default adapter for development
- No external dependencies

### Supabase Adapter (`backend/src/data/supabase.js`)
- PostgreSQL via Supabase
- Cloud-based, production-ready
- Requires Supabase project setup

## Creating a New Adapter

### Step 1: Implement the Adapter Interface

Create a new file `backend/src/data/your-adapter.js`:

```javascript
class YourAdapter {
  constructor() {
    // Initialize your database connection
  }

  async init() {
    // Database initialization logic
  }

  // User operations
  async createUser(name, email, studentId = null) { /* ... */ }
  async findUserByStudentId(studentId) { /* ... */ }
  async findUserById(id) { /* ... */ }
  async getAllUsers() { /* ... */ }
  async updateUser(id, updates) { /* ... */ }
  async deleteUser(id) { /* ... */ }
  async hardDeleteUser(id) { /* ... */ }

  // Quiz attempt operations
  async createQuizAttempt(studentId, assignedBy = 'admin') { /* ... */ }
  async findAttemptById(attemptId) { /* ... */ }
  async getAttemptsByStudentId(studentId) { /* ... */ }
  async getAllAttempts() { /* ... */ }
  async updateAttempt(attemptId, updates) { /* ... */ }
  async deleteAttempt(attemptId) { /* ... */ }

  // Admin operations
  getAdminToken() { /* ... */ }

  // Database maintenance
  async backup() { /* ... */ }
  async reset() { /* ... */ }
}

module.exports = YourAdapter;
```

### Step 2: Register the Adapter

Update `backend/src/data/factory.js`:

```javascript
static async createDatabase() {
  if (databaseInstance) {
    return databaseInstance;
  }

  const databaseType = config.DATABASE_TYPE;
  
  if (databaseType === 'supabase') {
    const SupabaseAdapter = require('./supabase');
    databaseInstance = new SupabaseAdapter();
  } else if (databaseType === 'your-adapter') {
    const YourAdapter = require('./your-adapter');
    databaseInstance = new YourAdapter();
  } else {
    // Default to LowDB
    const LowDBAdapter = require('./lowdb');
    databaseInstance = new LowDBAdapter();
  }

  await databaseInstance.init();
  return databaseInstance;
}
```

### Step 3: Add Configuration

Update `backend/src/config/index.js`:

```javascript
const config = {
  // ... existing config
  
  // Your adapter configuration
  YOUR_ADAPTER_URL: process.env.YOUR_ADAPTER_URL || null,
  YOUR_ADAPTER_KEY: process.env.YOUR_ADAPTER_KEY || null,
};
```

### Step 4: Update Environment Variables

Update `backend/.env.example`:

```bash
# Your Adapter Configuration (only required if DATABASE_TYPE=your-adapter)
YOUR_ADAPTER_URL=your-connection-string
YOUR_ADAPTER_KEY=your-api-key
```

### Step 5: Create Documentation

Create setup documentation similar to `docs/SUPABASE_SETUP.md` for your adapter.

## Required Methods

All adapters must implement these methods:

### User Operations
- `createUser(name, email, studentId?)`: Create a new user
- `findUserByStudentId(studentId)`: Find user by student ID
- `findUserById(id)`: Find user by internal ID
- `getAllUsers()`: Get all active users
- `updateUser(id, updates)`: Update user data
- `deleteUser(id)`: Soft delete user (set isActive = false)
- `hardDeleteUser(id)`: Permanently delete user and related data

### Quiz Attempt Operations
- `createQuizAttempt(studentId, assignedBy?)`: Create new exam attempt
- `findAttemptById(attemptId)`: Find attempt by attempt ID
- `getAttemptsByStudentId(studentId)`: Get all attempts for a student
- `getAllAttempts()`: Get all attempts
- `updateAttempt(attemptId, updates)`: Update attempt data
- `deleteAttempt(attemptId)`: Delete attempt

### Admin Operations
- `getAdminToken()`: Return admin authentication token

### Database Maintenance
- `backup()`: Create database backup
- `reset()`: Reset database to initial state

## Data Models

### User Object
```javascript
{
  id: number,
  studentId: string,
  name: string,
  email: string,
  role: string,
  createdAt: string,
  isActive: boolean
}
```

### Quiz Attempt Object
```javascript
{
  id: number,
  attemptId: string,
  studentId: string,
  assignedBy: string,
  status: string,
  assignedAt: string,
  startedAt: string | null,
  completedAt: string | null,
  timeLimit: number,
  questions: array,
  answers: array,
  results: object | null,
  timeTaken: number,
  timeExceeded: boolean
}
```

## Testing Your Adapter

1. **Unit Tests**: Create tests for each method
2. **Integration Tests**: Test with the actual application
3. **Load Tests**: Test performance under load
4. **Data Integrity**: Verify data consistency

Use the test file template:

```javascript
// backend/src/data/test-your-adapter.js
const YourAdapter = require('./your-adapter');

async function testYourAdapter() {
  const adapter = new YourAdapter();
  await adapter.init();
  
  // Test user operations
  const user = await adapter.createUser('Test User', 'test@example.com');
  console.log('✓ User created:', user.name);
  
  // Test attempt operations
  const attempt = await adapter.createQuizAttempt(user.studentId);
  console.log('✓ Attempt created:', attempt.attemptId);
  
  // Cleanup
  await adapter.hardDeleteUser(user.id);
  console.log('✓ Test completed');
}

testYourAdapter().catch(console.error);
```

## Best Practices

1. **Error Handling**: Always handle database errors gracefully
2. **Data Validation**: Validate input parameters
3. **Performance**: Use appropriate indexes and queries
4. **Security**: Sanitize inputs and use parameterized queries
5. **Logging**: Add meaningful logs for debugging
6. **Documentation**: Document configuration and setup steps

## Examples of Additional Adapters

### MongoDB Adapter
```javascript
const { MongoClient } = require('mongodb');

class MongoAdapter {
  constructor() {
    this.client = new MongoClient(config.MONGODB_URL);
    this.db = null;
  }

  async init() {
    await this.client.connect();
    this.db = this.client.db('quiz_app');
  }

  async createUser(name, email, studentId) {
    const result = await this.db.collection('users').insertOne({
      studentId: studentId || `STUD${Date.now()}`,
      name,
      email,
      role: 'student',
      createdAt: new Date().toISOString(),
      isActive: true
    });
    return await this.db.collection('users').findOne({ _id: result.insertedId });
  }

  // ... implement other methods
}
```

### MySQL Adapter
```javascript
const mysql = require('mysql2/promise');

class MySQLAdapter {
  constructor() {
    this.connection = null;
  }

  async init() {
    this.connection = await mysql.createConnection({
      host: config.MYSQL_HOST,
      user: config.MYSQL_USER,
      password: config.MYSQL_PASSWORD,
      database: config.MYSQL_DATABASE
    });
  }

  async createUser(name, email, studentId) {
    const [result] = await this.connection.execute(
      'INSERT INTO users (student_id, name, email, role, created_at, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [studentId || `STUD${Date.now()}`, name, email, 'student', new Date().toISOString(), true]
    );
    
    const [rows] = await this.connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [result.insertId]
    );
    
    return rows[0];
  }

  // ... implement other methods
}
```

## Contributing

When contributing a new adapter:

1. Fork the repository
2. Create your adapter following this guide
3. Add comprehensive tests
4. Update documentation
5. Submit a pull request

## Support

For questions about database adapter development:
- Check existing adapters for reference
- Review the factory pattern implementation
- Test thoroughly with the provided test framework
