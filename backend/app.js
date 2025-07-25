// Load environment variables
require('dotenv').config({ path: __dirname + '/.env' });

const DatabaseOperations = require('./src/data/database');

// Initialize database before starting the server
async function initializeApp() {
  console.log('Initializing database...');
  try {
    await DatabaseOperations.init();
    console.log('Database initialized successfully');
    
    // Start the server after database is ready
    require('./server');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

initializeApp();
