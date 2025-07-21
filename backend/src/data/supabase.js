const { createClient } = require('@supabase/supabase-js');
const config = require('../config');

class SupabaseAdapter {
  constructor() {
    if (!config.SUPABASE_URL || !config.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase configuration is incomplete. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.');
    }
    
    this.supabase = createClient(
      config.SUPABASE_URL,
      config.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );
  }

  async init() {
    try {
      // Check if tables exist, if not create them
      await this.createTablesIfNotExist();
      
      // Initialize with sample data if tables are empty
      await this.initializeSampleData();
      
      console.log('Supabase database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Supabase database:', error);
      throw error;
    }
  }

  async createTablesIfNotExist() {
    // Create users table
    const { error: usersError } = await this.supabase.rpc('create_users_table_if_not_exists', {});
    if (usersError && !usersError.message.includes('already exists')) {
      console.error('Error creating users table:', usersError);
    }

    // Create quiz_attempts table
    const { error: attemptsError } = await this.supabase.rpc('create_quiz_attempts_table_if_not_exists', {});
    if (attemptsError && !attemptsError.message.includes('already exists')) {
      console.error('Error creating quiz_attempts table:', attemptsError);
    }

    // Create metadata table
    const { error: metadataError } = await this.supabase.rpc('create_metadata_table_if_not_exists', {});
    if (metadataError && !metadataError.message.includes('already exists')) {
      console.error('Error creating metadata table:', metadataError);
    }
  }

  async initializeSampleData() {
    // Check if we already have data
    const { data: existingUsers } = await this.supabase.from('users').select('id').limit(1);
    const { data: existingMetadata } = await this.supabase.from('metadata').select('key').limit(1);
    
    if (existingUsers?.length > 0 || existingMetadata?.length > 0) {
      console.log('Database already contains data, skipping sample data creation');
      return;
    }

    // Create sample users
    const sampleUsers = [
      {
        student_id: "STUD0001",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "student",
        is_active: true
      },
      {
        student_id: "STUD0002",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "student",
        is_active: true
      },
      {
        student_id: "RJSPE01819332",
        name: "Jan Erisse",
        email: "AAYVVZZ@company.com",
        role: "student",
        is_active: true
      },
      {
        student_id: "RJSPE02029879",
        name: "Rashmi",
        email: "ACKX3ZZ@company.com",
        role: "student",
        is_active: true
      }
    ];

    const { error: usersError } = await this.supabase.from('users').insert(sampleUsers);
    if (usersError) {
      console.error('Error inserting sample users:', usersError);
    }

    // Create sample quiz attempts
    const sampleAttempts = [
      {
        attempt_id: "ATT1079001",
        student_id: "STUD0001",
        assigned_by: "admin",
        status: "assigned",
        time_limit: 960,
        questions: [],
        answers: [],
        results: null
      },
      {
        attempt_id: "ATT1079002",
        student_id: "STUD0002",
        assigned_by: "admin",
        status: "assigned",
        time_limit: 960,
        questions: [],
        answers: [],
        results: null
      },
      {
        attempt_id: "ATT1079003",
        student_id: "RJSPE01819332",
        assigned_by: "admin",
        status: "assigned",
        time_limit: 960,
        questions: [],
        answers: [],
        results: null
      },
      {
        attempt_id: "ATT1079004",
        student_id: "RJSPE02029879",
        assigned_by: "admin",
        status: "assigned",
        time_limit: 960,
        questions: [],
        answers: [],
        results: null
      }
    ];

    const { error: attemptsError } = await this.supabase.from('quiz_attempts').insert(sampleAttempts);
    if (attemptsError) {
      console.error('Error inserting sample attempts:', attemptsError);
    }

    // Create metadata entries
    const metadata = [
      { key: 'next_user_id', value: '5' },
      { key: 'next_attempt_id', value: '5' },
      { key: 'admin_token', value: config.ADMIN_TOKEN },
      { key: 'initialized', value: new Date().toISOString() }
    ];

    const { error: metadataError } = await this.supabase.from('metadata').insert(metadata);
    if (metadataError) {
      console.error('Error inserting metadata:', metadataError);
    }
  }

  // User operations
  async createUser(name, email, studentId = null) {
    const { data: metadata } = await this.supabase
      .from('metadata')
      .select('value')
      .eq('key', 'next_user_id')
      .single();

    const nextId = parseInt(metadata?.value || '1');
    const generatedStudentId = studentId || `STUD${String(nextId).padStart(4, '0')}`;

    const userData = {
      student_id: generatedStudentId,
      name,
      email,
      role: 'student',
      is_active: true
    };

    const { data, error } = await this.supabase
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }

    // Update next_user_id
    await this.supabase
      .from('metadata')
      .upsert([{ key: 'next_user_id', value: String(nextId + 1) }]);

    return this.transformUser(data);
  }

  async findUserByStudentId(studentId) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('student_id', studentId)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      throw new Error(`Failed to find user: ${error.message}`);
    }

    return data ? this.transformUser(data) : null;
  }

  async findUserById(id) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to find user: ${error.message}`);
    }

    return data ? this.transformUser(data) : null;
  }

  async getAllUsers() {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to get users: ${error.message}`);
    }

    return data.map(user => this.transformUser(user));
  }

  async updateUser(id, updates) {
    const updateData = this.transformUserToDb(updates);
    
    const { data, error } = await this.supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }

    return this.transformUser(data);
  }

  async deleteUser(id) {
    const { error } = await this.supabase
      .from('users')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }

    return true;
  }

  async hardDeleteUser(id) {
    // Get user's student_id first
    const { data: user } = await this.supabase
      .from('users')
      .select('student_id')
      .eq('id', id)
      .single();

    if (!user) {
      return false;
    }

    // Delete all quiz attempts for this user
    if (user.student_id) {
      await this.supabase
        .from('quiz_attempts')
        .delete()
        .eq('student_id', user.student_id);
    }

    // Delete the user
    const { error } = await this.supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to hard delete user: ${error.message}`);
    }

    return true;
  }

  // Quiz attempt operations
  async createQuizAttempt(studentId, assignedBy = 'admin') {
    const { data: metadata } = await this.supabase
      .from('metadata')
      .select('value')
      .eq('key', 'next_attempt_id')
      .single();

    const nextId = parseInt(metadata?.value || '1');
    const attemptId = `ATT1079${String(nextId).padStart(3, '0')}`;

    const attemptData = {
      attempt_id: attemptId,
      student_id: studentId,
      assigned_by: assignedBy,
      status: 'assigned',
      time_limit: 960,
      questions: [],
      answers: [],
      results: null
    };

    const { data, error } = await this.supabase
      .from('quiz_attempts')
      .insert([attemptData])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create quiz attempt: ${error.message}`);
    }

    // Update next_attempt_id
    await this.supabase
      .from('metadata')
      .upsert([{ key: 'next_attempt_id', value: String(nextId + 1) }]);

    return this.transformAttempt(data);
  }

  async findAttemptById(attemptId) {
    const { data, error } = await this.supabase
      .from('quiz_attempts')
      .select('*')
      .eq('attempt_id', attemptId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to find attempt: ${error.message}`);
    }

    return data ? this.transformAttempt(data) : null;
  }

  async getAttemptsByStudentId(studentId) {
    const { data, error } = await this.supabase
      .from('quiz_attempts')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to get attempts: ${error.message}`);
    }

    return data.map(attempt => this.transformAttempt(attempt));
  }

  async getAllAttempts() {
    const { data, error } = await this.supabase
      .from('quiz_attempts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to get all attempts: ${error.message}`);
    }

    return data.map(attempt => this.transformAttempt(attempt));
  }

  async updateAttempt(attemptId, updates) {
    const updateData = this.transformAttemptToDb(updates);
    
    const { data, error } = await this.supabase
      .from('quiz_attempts')
      .update(updateData)
      .eq('attempt_id', attemptId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update attempt: ${error.message}`);
    }

    return this.transformAttempt(data);
  }

  async deleteAttempt(attemptId) {
    const { error } = await this.supabase
      .from('quiz_attempts')
      .delete()
      .eq('attempt_id', attemptId);

    if (error) {
      throw new Error(`Failed to delete attempt: ${error.message}`);
    }

    return true;
  }

  // Admin operations
  getAdminToken() {
    return config.ADMIN_TOKEN;
  }

  // Database maintenance
  async backup() {
    // For Supabase, we'll export the data as JSON
    const { data: users } = await this.supabase.from('users').select('*');
    const { data: attempts } = await this.supabase.from('quiz_attempts').select('*');
    const { data: metadata } = await this.supabase.from('metadata').select('*');

    const backupData = {
      users: users || [],
      quiz_attempts: attempts || [],
      metadata: metadata || [],
      backup_date: new Date().toISOString()
    };

    return backupData;
  }

  async reset() {
    // Delete all data
    await this.supabase.from('users').delete().neq('id', 0);
    await this.supabase.from('quiz_attempts').delete().neq('id', 0);
    await this.supabase.from('metadata').delete().neq('key', '');

    // Reinitialize with sample data
    await this.initializeSampleData();
  }

  // Helper methods to transform between database and application formats
  transformUser(dbUser) {
    return {
      id: dbUser.id,
      studentId: dbUser.student_id,
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role,
      createdAt: dbUser.created_at,
      isActive: dbUser.is_active
    };
  }

  transformUserToDb(appUser) {
    const dbUser = {};
    if (appUser.studentId !== undefined) dbUser.student_id = appUser.studentId;
    if (appUser.name !== undefined) dbUser.name = appUser.name;
    if (appUser.email !== undefined) dbUser.email = appUser.email;
    if (appUser.role !== undefined) dbUser.role = appUser.role;
    if (appUser.isActive !== undefined) dbUser.is_active = appUser.isActive;
    return dbUser;
  }

  transformAttempt(dbAttempt) {
    return {
      id: dbAttempt.id,
      attemptId: dbAttempt.attempt_id,
      studentId: dbAttempt.student_id,
      assignedBy: dbAttempt.assigned_by,
      status: dbAttempt.status,
      assignedAt: dbAttempt.assigned_at || dbAttempt.created_at,
      startedAt: dbAttempt.started_at,
      completedAt: dbAttempt.completed_at,
      timeLimit: dbAttempt.time_limit,
      questions: dbAttempt.questions || [],
      answers: dbAttempt.answers || [],
      results: dbAttempt.results,
      timeTaken: dbAttempt.time_taken,
      timeExceeded: dbAttempt.time_exceeded
    };
  }

  transformAttemptToDb(appAttempt) {
    const dbAttempt = {};
    if (appAttempt.status !== undefined) dbAttempt.status = appAttempt.status;
    if (appAttempt.startedAt !== undefined) dbAttempt.started_at = appAttempt.startedAt;
    if (appAttempt.completedAt !== undefined) dbAttempt.completed_at = appAttempt.completedAt;
    if (appAttempt.timeLimit !== undefined) dbAttempt.time_limit = appAttempt.timeLimit;
    if (appAttempt.questions !== undefined) dbAttempt.questions = appAttempt.questions;
    if (appAttempt.answers !== undefined) dbAttempt.answers = appAttempt.answers;
    if (appAttempt.results !== undefined) dbAttempt.results = appAttempt.results;
    if (appAttempt.timeTaken !== undefined) dbAttempt.time_taken = appAttempt.timeTaken;
    if (appAttempt.timeExceeded !== undefined) dbAttempt.time_exceeded = appAttempt.timeExceeded;
    return dbAttempt;
  }
}

module.exports = SupabaseAdapter;
