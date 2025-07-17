# ReactJS Proficiency Quiz Application

A comprehensive React.js quiz application wit4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 🚀 Deployment

### Deploy to Render (Free)

This application is configured for easy deployment to Render's free tier. Follow the detailed guide in [`DEPLOYMENT.md`](./DEPLOYMENT.md).

#### Quick Deployment Steps:

1. **Push your code to GitHub**
2. **Deploy Backend**:
   - Create new Web Service on Render
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Set environment variables (see DEPLOYMENT.md)

3. **Deploy Frontend**:
   - Create new Static Site on Render
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Set `VITE_API_URL` to your backend URL

#### Live Demo
- Frontend: `https://reactjs-quiz-frontend.onrender.com`
- Backend API: `https://reactjs-quiz-backend.onrender.com/api`

> **Note**: Free tier services may take 30-60 seconds for the first load after being idle.

## 💾 Databaseole-based access control** and **persistent file-based database**, designed to assess ReactJS proficiency through interactive quizzes with admin management and student tracking capabilities.

![Quiz Application](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-7.0.0-purple) ![Node.js](https://img.shields.io/badge/Node.js-16+-green) ![Database](https://img.shields.io/badge/Database-LowDB-orange) ![License](https://img.shields.io/badge/license-MIT-green) ![Deployment](https://img.shields.io/badge/Deploy-Render-brightgreen)

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Deployment](#-deployment)
- [Database](#-database)
- [Access Identifiers](#-access-identifiers)
- [User Workflows](#-user-workflows)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Features

### 🔐 Role-Based Access Control
- **Admin Dashboard**: Complete student and quiz management interface
- **Student Profiles**: Personal progress tracking and quiz history
- **Secure Authentication**: Token-based admin access and ID-based student access
- **Quiz Attempt Management**: Assign and track individual quiz sessions

### 👨‍💼 Admin Features
- **Student Management**: Create, edit, and delete student accounts
- **Quiz Assignment**: Assign multiple quiz attempts per student
- **Dashboard Analytics**: View completion rates and performance statistics
- **Attempt Monitoring**: Track all quiz attempts across the system
- **Comprehensive Reporting**: Export and analyze student performance data

### 👨‍🎓 Student Features
- **Personal Dashboard**: View profile statistics and quiz history
- **Detailed Results**: Question-by-question analysis with explanations
- **Progress Tracking**: Monitor improvement over multiple attempts
- **PDF Reports**: Download comprehensive PDF reports of quiz results
- **Quiz History Export**: Generate summary PDFs of all completed attempts
- **Responsive Interface**: Optimized for desktop and mobile devices

### 📝 Quiz System
- **Attempt-Based Security**: Each quiz session tied to a unique attempt ID
- **200+ Questions**: Comprehensive ReactJS question database
- **Intelligent Randomization**: Server-side question selection and shuffling
- **Time Management**: Configurable time limits with visual countdown
- **Immediate Feedback**: Detailed explanations for all questions
- **Progress Persistence**: Save and resume quiz sessions
- **PDF Generation**: Automatic PDF report generation for completed quizzes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd reactjs-quiz-app
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend && npm install && cd ..
   ```

3. **Start the application**
   ```bash
   # Option 1: Use the start script (recommended)
   ./start-app.sh
   
   # Option 2: Manual start
   # Terminal 1 - Backend
   cd backend && npm start
   
   # Terminal 2 - Frontend  
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## �️ Database

### Persistent File-Based Storage
The application now uses **LowDB**, a lightweight JSON database that provides data persistence across server restarts:

- **Database File**: `backend/src/data/quiz_database.json`
- **Format**: Human-readable JSON
- **Features**: Automatic initialization, backup functionality, async operations
- **Benefits**: No database server required, easy development setup

### Sample Data (Auto-Generated)
The database initializes with sample data:
- **3 Students**: John Doe, Jane Smith, Mike Johnson
- **3 Quiz Attempts**: One per student, all in "assigned" status
- **Admin Token**: `admin_2025_reactjs_quiz`

> 📖 **For detailed database documentation**, see [DATABASE.md](./DATABASE.md)

## �🔑 Access Identifiers

The application uses a unified landing page that accepts different types of identifiers:

### 🛡️ Admin Access
- **Token**: `admin_2025_reactjs_quiz`
- **Purpose**: Access admin dashboard for complete system management
- **Features**: Student management, quiz assignment, analytics

### 👤 Student Access (Sample Data)
- **Student IDs**: `STUD0001`, `STUD0002`, `STUD0003`
- **Purpose**: View personal profile and quiz history
- **Features**: Progress tracking, detailed results, attempt history

### 📝 Quiz Taking (Sample Data)
- **Attempt IDs**: `ATT000001`, `ATT000002`, `ATT000003`
- **Purpose**: Take assigned quizzes
- **Features**: Timed assessment, progress saving, immediate results

## 📋 User Workflows

### Admin Workflow
1. **Login**: Enter admin token on landing page
2. **Dashboard**: View system statistics and recent activity
3. **Student Management**: Create, edit, or delete student accounts
4. **Quiz Assignment**: Assign new quiz attempts to students
5. **Monitoring**: Track completion rates and performance analytics

### Student Profile Workflow
1. **Access**: Enter student ID on landing page
2. **Overview**: View personal statistics and progress
3. **History**: Browse previous quiz attempts and results
4. **Analysis**: Review detailed question-by-question breakdowns
5. **Export**: Download PDF reports of individual attempts or complete history

### Quiz Taking Workflow
1. **Start**: Enter attempt ID on landing page
2. **Validation**: System validates attempt and student information
3. **Quiz**: Complete assessment within time limit
4. **Results**: View immediate feedback and detailed analysis
5. **Download**: Generate and download a comprehensive PDF report

## 🏗️ Project Structure

```
reactjs-quiz-app/
├── src/                          # Frontend React application
│   ├── components/               # React components
│   │   ├── LandingPage.jsx       # Unified identifier entry
│   │   ├── AdminDashboard.jsx    # Admin management interface
│   │   ├── StudentProfile.jsx    # Student profile and history
│   │   ├── QuizTaker.jsx         # Quiz execution wrapper
│   │   ├── Quiz.jsx              # Core quiz component
│   │   └── Results.jsx           # Results display
│   ├── services/                 # API communication
│   │   ├── api.js                # API service layer
│   │   └── pdfService.js         # PDF generation utilities
│   └── data/                     # Quiz questions database
├── backend/                      # Node.js backend API
│   ├── src/
│   │   ├── controllers/          # API request handlers
│   │   │   ├── adminController.js    # Admin operations
│   │   │   ├── studentController.js  # Student operations
│   │   │   ├── authController.js     # Authentication
│   │   │   └── quizController.js     # Quiz operations
│   │   ├── routes/               # API route definitions
│   │   │   ├── admin.js          # Admin routes
│   │   │   ├── student.js        # Student routes
│   │   │   ├── auth.js           # Authentication routes
│   │   │   └── quiz.js           # Quiz routes
│   │   ├── middleware/           # Authentication middleware
│   │   │   └── auth.js           # Role-based authentication
│   │   ├── data/                 # Data management
│   │   │   └── users.js          # In-memory user/attempt storage
│   │   └── utils/                # Utility functions
│   └── server.js                 # Express server entry point
├── public/                       # Static assets
├── docs/                         # Documentation
└── scripts/                      # Utility scripts
    ├── start-app.sh              # Application launcher
    ├── git-workflow.sh           # Git workflow helper
    └── test-cors.sh              # Backend connectivity test
```

## 📊 API Documentation

### Authentication Endpoints
```bash
POST /api/auth/validate           # Validate identifier (admin/student/attempt)
GET  /api/auth/info               # Get system information
```

### Admin Endpoints (Requires admin token)
```bash
GET  /api/admin/dashboard/stats   # Dashboard statistics
GET  /api/admin/students          # List all students
POST /api/admin/students          # Create new student
PUT  /api/admin/students/:id      # Update student
DELETE /api/admin/students/:id    # Delete student
POST /api/admin/quiz-attempts/assign  # Assign quiz attempt
GET  /api/admin/quiz-attempts     # List all attempts
```

### Student Endpoints (Requires student ID)
```bash
GET /api/student/profile/:studentId           # Get student profile
GET /api/student/profile/:studentId/attempts  # Get student attempts
GET /api/student/attempt/:attemptId/results   # Get attempt results
```

### Quiz Endpoints
```bash
GET  /api/quiz/start/:attemptId   # Start quiz for attempt
POST /api/quiz/submit             # Submit quiz answers
GET  /api/quiz/stats              # Quiz statistics
```

## 🔧 Development

### Testing Backend APIs
```bash
# Test admin authentication
curl -X POST http://localhost:3001/api/auth/validate \
  -H "Content-Type: application/json" \
  -d '{"identifier": "admin_2025_reactjs_quiz"}'

# Test student ID validation
curl -X POST http://localhost:3001/api/auth/validate \
  -H "Content-Type: application/json" \
  -d '{"identifier": "STUD0002"}'

# Test admin endpoints
curl -X GET http://localhost:3001/api/admin/students \
  -H "Authorization: admin_2025_reactjs_quiz"
```

### Git Workflow
```bash
# Use the workflow helper
./git-workflow.sh

# Available commands:
./git-workflow.sh status           # Show git status
./git-workflow.sh new-feature      # Create feature branch
./git-workflow.sh commit           # Structured commit
./git-workflow.sh log              # View commit history
```

### Development Guidelines
- **Frontend**: Use functional components with hooks
- **Backend**: Follow RESTful API principles
- **Authentication**: Implement proper role-based access
- **Error Handling**: Provide user-friendly error messages
- **Testing**: Test both frontend and backend changes

## 🎯 Quiz Content

The application includes 200+ React.js questions covering:

### 📚 Fundamental Concepts
- Component creation and structure
- JSX syntax and best practices
- Props and component communication
- Event handling and user interaction

### 🎣 React Hooks
- useState for state management
- useEffect for lifecycle and side effects
- useContext for context consumption
- useMemo and useCallback for optimization
- Custom hooks development

### 🏗️ Advanced Patterns
- Higher-Order Components (HOCs)
- Render Props pattern
- Compound components
- Error boundaries

### ⚡ Performance Optimization
- React.memo for component memoization
- Virtual DOM understanding
- Bundle splitting and lazy loading
- Performance profiling techniques

### 🧪 Testing
- Unit testing with Jest
- React Testing Library
- Component testing strategies
- Integration testing approaches

## � PDF Export Features

### Individual Quiz Reports
- **Comprehensive Results**: Score breakdown, proficiency assessment, and time analysis
- **Question Review**: Detailed breakdown of incorrect answers with explanations
- **Student Information**: Includes student name, ID, and attempt details
- **Professional Format**: Clean, printable PDF layout with proper branding

### Student Summary Reports
- **Performance History**: Overview of all completed quiz attempts
- **Progress Tracking**: Visual representation of improvement over time
- **Aggregate Statistics**: Overall performance metrics and trends

### Download Options
- **Results Page**: Direct download from quiz completion screen
- **Student Profile**: Download individual attempt reports from history
- **Bulk Export**: Summary PDF of all student attempts
- **Mobile Friendly**: PDF generation works on all devices

## �🔒 Security Features

- **Role-based authentication** with middleware protection
- **Input validation** for all user inputs
- **XSS protection** with content sanitization
- **CORS configuration** for secure cross-origin requests
- **Session management** with proper logout handling
- **API rate limiting** to prevent abuse

## 🚦 Production Deployment

### Environment Configuration

**Frontend Environment Variables** (prefix with `VITE_`):
```bash
# API Configuration
VITE_API_URL=/api                              # Development
VITE_API_URL=https://your-api-domain.com/api   # Production

# Admin Authentication
VITE_ADMIN_TOKEN=admin_2025_reactjs_quiz       # Set your admin token
```

**Backend Environment Variables**:
```bash
PORT=3001
NODE_ENV=production
DATABASE_URL=your-database-connection
ADMIN_TOKEN=your-secure-admin-token
```

> 📋 **Note**: Copy `.env.example` to `.env` and customize for local development. See [`docs/ENVIRONMENT_VARIABLES.md`](./docs/ENVIRONMENT_VARIABLES.md) for detailed configuration guide.

### Build Process
```bash
# Build frontend
npm run build

# Deploy backend
cd backend && npm start
```

### Database Migration
For production, replace the in-memory storage in `backend/src/data/users.js` with a proper database solution like PostgreSQL or MongoDB.

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow coding guidelines** in `CONTRIBUTING.md`
4. **Write tests** for new functionality
5. **Update documentation** for new features
6. **Submit a pull request** with detailed description

### Contribution Areas
- Additional quiz questions and explanations
- UI/UX improvements and animations
- Performance optimizations
- Mobile responsiveness enhancements
- Accessibility improvements
- Test coverage expansion

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues
1. **Backend not starting**: Check if port 3001 is available
2. **API connection errors**: Verify backend is running and CORS is configured
3. **Authentication failures**: Ensure correct identifiers are being used

### Getting Help
- Check the console for error messages
- Review the API documentation for correct endpoints
- Verify all dependencies are installed correctly
- Look at existing issues in the repository

### Debug Information
```bash
# Check backend status
curl http://localhost:3001/api/health

# View backend logs
cd backend && npm start

# Check frontend build
npm run build
```

---

**Happy coding!** 🚀 This application demonstrates modern React.js development with role-based architecture, comprehensive testing, and professional UI/UX design.
