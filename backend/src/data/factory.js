const config = require('../config');

let databaseInstance = null;

/**
 * Database Factory - Creates and returns the appropriate database adapter
 * based on the configuration
 */
class DatabaseFactory {
  static async createDatabase() {
    if (databaseInstance) {
      return databaseInstance;
    }

    const databaseType = config.DATABASE_TYPE;
    
    if (databaseType === 'supabase') {
      const SupabaseAdapter = require('./supabase');
      databaseInstance = new SupabaseAdapter();
    } else {
      // Default to LowDB for backward compatibility
      const LowDBAdapter = require('./lowdb');
      databaseInstance = new LowDBAdapter();
    }

    // Initialize the database
    await databaseInstance.init();
    
    console.log(`Database initialized with adapter: ${databaseType}`);
    return databaseInstance;
  }

  static async getDatabase() {
    if (!databaseInstance) {
      return await DatabaseFactory.createDatabase();
    }
    return databaseInstance;
  }

  static reset() {
    databaseInstance = null;
  }
}

module.exports = DatabaseFactory;
