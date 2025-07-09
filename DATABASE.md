# Database Implementation

## Overview

The ReactJS Quiz Application now uses a lightweight, file-based database system using LowDB instead of in-memory storage. This provides data persistence across server restarts while maintaining simplicity.

## Database Features

### 🗄️ **File-Based Storage**
- **File**: `backend/src/data/quiz_database.json`
- **Format**: JSON for easy reading and debugging
- **Persistence**: Data survives server restarts
- **Backup**: Automatic backup functionality included

### 📊 **Data Structure**
```json
{
  "users": [/* Student records */],
  "quizAttempts": [/* Quiz attempt records */],
  "metadata": {
    "nextUserId": 4,
    "nextAttemptId": 4,
    "adminToken": "admin_2025_reactjs_quiz",
    "initialized": "2025-07-08T15:21:37.017Z"
  }
}
```

### 🔧 **Operations**

#### User Operations
- `createUser(name, email, studentId?)` - Create new student
- `findUserByStudentId(studentId)` - Find student by ID
- `findUserById(id)` - Find student by internal ID
- `getAllUsers()` - Get all active students
- `updateUser(id, updates)` - Update student record
- `deleteUser(id)` - Soft delete student (sets isActive=false)

#### Quiz Attempt Operations
- `createQuizAttempt(studentId, assignedBy?)` - Create new attempt
- `findAttemptById(attemptId)` - Find attempt by ID
- `getAttemptsByStudentId(studentId)` - Get student's attempts
- `getAllAttempts()` - Get all attempts
- `updateAttempt(attemptId, updates)` - Update attempt record

#### Database Maintenance
- `backup()` - Create timestamped backup file
- `reset()` - Reset database to initial state with sample data

## Sample Data

The database initializes with 3 sample students and their corresponding quiz attempts:

### Students
1. **John Doe** (STUD0001) - john.doe@example.com
2. **Jane Smith** (STUD0002) - jane.smith@example.com  
3. **Mike Johnson** (STUD0003) - mike.johnson@example.com

### Quiz Attempts
- **ATT000001** - Assigned to John Doe
- **ATT000002** - Assigned to Jane Smith
- **ATT000003** - Assigned to Mike Johnson

## Migration from In-Memory Storage

### ✅ **Completed Changes**

1. **New Database Module**: `src/data/database.js`
   - LowDB integration
   - Async/await support
   - Sample data initialization
   - Backup functionality

2. **Updated Users Module**: `src/data/users.js`
   - Compatibility layer for existing code
   - Async operation exports
   - Deprecation warnings for direct array access

3. **Controller Updates**: All controllers now use async/await
   - `adminController.js` - Admin dashboard operations
   - `studentController.js` - Student profile operations
   - `quizController.js` - Quiz execution operations
   - `authController.js` - Authentication operations

4. **Startup Process**: New `app.js` initialization script
   - Database initialization before server start
   - Error handling for database failures
   - Updated package.json scripts

### 🚀 **Benefits**

- **Data Persistence**: Quiz results and user data survive server restarts
- **Scalability**: Easy to migrate to a full database later
- **Debugging**: Human-readable JSON format
- **Backup**: Built-in backup functionality
- **Performance**: File-based storage for small datasets
- **Development**: No database server setup required

### 🔒 **Security & Maintenance**

- Database file added to `.gitignore`
- Backup files excluded from version control
- Admin token remains constant across restarts
- Soft delete preserves data integrity
- Transaction-like updates with LowDB

## Usage Examples

### Creating a New Student
```javascript
const newStudent = await createUser("Alice Wilson", "alice@example.com");
// Creates: STUD0004
```

### Assigning a Quiz
```javascript
const attempt = await createQuizAttempt("STUD0004", "admin");
// Creates: ATT000004
```

### Backing Up Data
```javascript
const backupPath = await backup();
// Creates: backup_1704729600000.json
```

This implementation provides a solid foundation for data persistence while maintaining the simplicity needed for development and testing.
