/**
 * Simple test to verify database factory works correctly
 */

const DatabaseFactory = require('./factory');

async function testDatabase() {
  try {
    console.log('Testing database factory...');
    
    // Test getting database instance
    const db = await DatabaseFactory.getDatabase();
    console.log('✓ Database instance created successfully');
    
    // Test basic operations
    const users = await db.getAllUsers();
    console.log(`✓ Found ${users.length} users in database`);
    
    const attempts = await db.getAllAttempts();
    console.log(`✓ Found ${attempts.length} attempts in database`);
    
    // Test creating a user
    const testUser = await db.createUser('Test User', 'test@example.com', 'TEST001');
    console.log(`✓ Created test user: ${testUser.name} (${testUser.studentId})`);
    
    // Test finding the user
    const foundUser = await db.findUserByStudentId('TEST001');
    console.log(`✓ Found user: ${foundUser.name}`);
    
    // Test creating an attempt
    const testAttempt = await db.createQuizAttempt('TEST001', 'test');
    console.log(`✓ Created test attempt: ${testAttempt.attemptId}`);
    
    // Clean up test data
    await db.hardDeleteUser(testUser.id);
    console.log('✓ Cleaned up test data');
    
    console.log('\n🎉 All database tests passed!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  }
}

// Run the test
testDatabase();
