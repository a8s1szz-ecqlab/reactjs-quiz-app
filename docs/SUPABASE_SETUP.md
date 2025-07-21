# Supabase Setup Guide

This guide will help you set up PostgreSQL using Supabase for the ReactJS Quiz Application.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js environment with the application already set up

## Step 1: Create a New Supabase Project

1. Log in to your Supabase dashboard
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Project name**: `reactjs-quiz-app` (or your preferred name)
   - **Database password**: Choose a strong password
   - **Region**: Select the region closest to your users
5. Click "Create new project"

## Step 2: Get Project Credentials

Once your project is created, you'll need to gather the following credentials:

1. **Project URL**: Found in Settings → API
2. **Service Role Key**: Found in Settings → API (keep this secret!)

> **Note**: We only need the Service Role Key for backend operations. The Anon Key is not required since all database access happens through our backend API, not directly from the frontend.

## Step 3: Set Up the Database Schema

1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `backend/src/data/migrations/001_initial_setup.sql`
3. Click "Run" to execute the migration

This will create:
- `users` table for student information
- `quiz_attempts` table for exam attempts
- `metadata` table for system configuration
- Appropriate indexes and triggers

## Step 4: Configure Environment Variables

1. Copy `backend/.env.example` to `backend/.env`
2. Update the configuration:

```bash
# Database Configuration
DATABASE_TYPE=supabase

# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Step 5: Start the Application

```bash
cd backend
npm install
npm run dev
```

The application will now use Supabase as the database backend.

## Database Structure

### Users Table
```sql
users (
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'student',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
```

### Quiz Attempts Table
```sql
quiz_attempts (
  id SERIAL PRIMARY KEY,
  attempt_id VARCHAR(50) UNIQUE NOT NULL,
  student_id VARCHAR(50) NOT NULL,
  assigned_by VARCHAR(50) DEFAULT 'admin',
  status VARCHAR(50) DEFAULT 'assigned',
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  time_limit INTEGER DEFAULT 960,
  questions JSONB DEFAULT '[]'::jsonb,
  answers JSONB DEFAULT '[]'::jsonb,
  results JSONB,
  time_taken INTEGER,
  time_exceeded BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
```

### Metadata Table
```sql
metadata (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
```

## Data Migration from LowDB

If you have existing data in LowDB format, you can migrate it:

1. Create a backup of your existing data:
   ```bash
   curl -X POST http://localhost:3001/api/admin/backup
   ```

2. With the new Supabase setup, the application will automatically create sample data

3. For custom migration, you can modify the `initializeSampleData()` method in `backend/src/data/supabase.js`

## Security Considerations

1. **Never expose your Service Role Key** in client-side code
2. Use Row Level Security (RLS) policies in Supabase for additional protection
3. Regularly rotate your API keys
4. Monitor access logs in your Supabase dashboard

## Troubleshooting

### Connection Issues
- Verify your SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are correct
- Check that your Supabase project is active
- Ensure your IP is not blocked by Supabase's network policies

### Migration Issues
- Make sure the SQL migration ran successfully
- Check the Supabase logs for any errors
- Verify that all tables and functions were created

### Data Issues
- Check the Supabase dashboard → Table Editor to view your data
- Use the SQL Editor to run diagnostic queries
- Monitor the application logs for database errors

## Switching Back to LowDB

To switch back to file-based storage:

1. Change `DATABASE_TYPE=lowdb` in your `.env` file
2. Restart the application
3. Your local JSON database will be used instead

## Performance Optimization

For production deployments:

1. **Enable Connection Pooling**: Supabase handles this automatically
2. **Index Optimization**: Additional indexes can be created based on query patterns
3. **Query Optimization**: Monitor slow queries in Supabase dashboard
4. **Backup Strategy**: Set up automated backups in Supabase

## Support

For Supabase-specific issues:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)

For application-specific issues:
- Check the application logs
- Review the database adapter code in `backend/src/data/supabase.js`
