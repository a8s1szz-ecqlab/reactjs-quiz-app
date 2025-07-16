import React, { useState, useEffect } from 'react';
import QuizApiService from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = ({ adminToken, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [quizAttempts, setQuizAttempts] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Student form state
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    studentId: ''
  });

  // Confirmation dialog state
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');

  // Sorting state for quiz attempts table
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        loadDashboardStats(),
        loadStudents(),
        loadQuizAttempts()
      ]);
    } catch (error) {
      console.error('Error loading initial data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const showConfirmation = (title, message, action) => {
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setShowConfirmDialog(true);
  };

  const handleConfirmAction = () => {
    if (confirmAction) {
      confirmAction();
    }
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  const loadDashboardStats = async () => {
    try {
      const data = await QuizApiService.getDashboardStats(adminToken);
      setDashboardStats(data);
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    }
  };

  const loadStudents = async () => {
    try {
      const data = await QuizApiService.getStudents(adminToken);
      setStudents(data);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const loadQuizAttempts = async () => {
    try {
      const data = await QuizApiService.getQuizAttempts(adminToken);
      setQuizAttempts(data);
    } catch (error) {
      console.error('Error loading quiz attempts:', error);
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingStudent) {
        // Update existing student
        await QuizApiService.updateStudent(adminToken, editingStudent.id, {
          name: studentForm.name,
          email: studentForm.email
        });
      } else {
        // Create new student
        await QuizApiService.createStudent(adminToken, studentForm);
      }
      
      setShowStudentForm(false);
      setEditingStudent(null);
      setStudentForm({ name: '', email: '', studentId: '' });
      await loadStudents();
      await loadDashboardStats();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setStudentForm({
      name: student.name,
      email: student.email,
      studentId: student.studentId
    });
    setShowStudentForm(true);
  };

  const handleDeleteStudent = async (studentId) => {
    const performDelete = async () => {
      try {
        await QuizApiService.deleteStudent(adminToken, studentId);
        await loadStudents();
        await loadDashboardStats();
      } catch (error) {
        setError(error.message);
      }
    };

    showConfirmation(
      'Delete Student',
      'Are you sure you want to delete this student? This will only deactivate their account.',
      performDelete
    );
  };

  const handleHardDeleteStudent = async (studentId) => {
    const performHardDelete = async () => {
      try {
        await QuizApiService.hardDeleteStudent(adminToken, studentId);
        await loadStudents();
        await loadQuizAttempts();
        await loadDashboardStats();
      } catch (error) {
        setError(error.message);
      }
    };

    showConfirmation(
      'Permanently Delete Student',
      'Are you sure you want to PERMANENTLY delete this student and ALL their quiz attempts? This action cannot be undone!',
      performHardDelete
    );
  };

  const handleDeleteQuizAttempt = async (attemptId) => {
    const performDeleteAttempt = async () => {
      try {
        await QuizApiService.deleteQuizAttempt(adminToken, attemptId);
        await loadQuizAttempts();
        await loadDashboardStats();
      } catch (error) {
        setError(error.message);
      }
    };

    showConfirmation(
      'Delete Quiz Attempt',
      'Are you sure you want to delete this quiz attempt?',
      performDeleteAttempt
    );
  };

  const handleAssignQuiz = async (studentId) => {
    try {
      await QuizApiService.assignQuizAttempt(adminToken, { studentId });
      await loadQuizAttempts();
      await loadDashboardStats();
    } catch (error) {
      setError(error.message);
    }
  };

  // Sorting functionality for quiz attempts
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      // Third click resets sorting
      setSortConfig({ key: null, direction: 'asc' });
      return;
    }
    setSortConfig({ key, direction });
  };

  const clearSort = () => {
    setSortConfig({ key: null, direction: 'asc' });
  };

  const getSortedAttempts = () => {
    if (!sortConfig.key) return quizAttempts;

    return [...quizAttempts].sort((a, b) => {
      let aValue, bValue;

      switch (sortConfig.key) {
        case 'attemptId':
          aValue = a.attemptId;
          bValue = b.attemptId;
          break;
        case 'studentName':
          aValue = a.studentName;
          bValue = b.studentName;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'assignedAt':
          aValue = new Date(a.assignedAt);
          bValue = new Date(b.assignedAt);
          break;
        case 'startedAt':
          aValue = a.startedAt ? new Date(a.startedAt) : new Date(0);
          bValue = b.startedAt ? new Date(b.startedAt) : new Date(0);
          break;
        case 'completedAt':
          aValue = a.completedAt ? new Date(a.completedAt) : new Date(0);
          bValue = b.completedAt ? new Date(b.completedAt) : new Date(0);
          break;
        case 'score':
          aValue = a.results?.score ?? -1;
          bValue = b.results?.score ?? -1;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <span className="sort-icon neutral">⇅</span>; // Default unsorted icon
    }
    return sortConfig.direction === 'asc' ? 
      <span className="sort-icon asc">↑</span> : 
      <span className="sort-icon desc">↓</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (status) => {
    const statusClass = {
      assigned: 'status-assigned',
      in_progress: 'status-progress',
      completed: 'status-completed'
    }[status] || 'status-assigned';

    const statusText = {
      assigned: 'Assigned',
      in_progress: 'In Progress',
      completed: 'Completed'
    }[status] || status;

    return <span className={`status-badge ${statusClass}`}>{statusText}</span>;
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <nav className="admin-nav">
        <div className="nav-container">
          <button
            className={`section ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
            data-tab="dashboard"
          >
            Dashboard
          </button>
          <button
            className={`section ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
            data-tab="students"
          >
            Students
          </button>
          <button
            className={`section ${activeTab === 'attempts' ? 'active' : ''}`}
            onClick={() => setActiveTab('attempts')}
            data-tab="attempts"
          >
            Quiz Attempts
          </button>
        </div>
      </nav>

      <main className="admin-content">
        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={() => setError('')}>✕</button>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="dashboard-tab">
            <h2>Overview</h2>
            {dashboardStats && (
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Students</h3>
                  <div className="stat-number">{dashboardStats.totalStudents}</div>
                </div>
                <div className="stat-card">
                  <h3>Total Attempts</h3>
                  <div className="stat-number">{dashboardStats.totalAttempts}</div>
                </div>
                <div className="stat-card">
                  <h3>Completed</h3>
                  <div className="stat-number">{dashboardStats.completedAttempts}</div>
                </div>
                <div className="stat-card">
                  <h3>Completion Rate</h3>
                  <div className="stat-number">{dashboardStats.completionRate}%</div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'students' && (
          <div className="students-tab">
            <div className="tab-header">
              <h2>Students Management</h2>
              <button
                onClick={() => {
                  setShowStudentForm(true);
                  setEditingStudent(null);
                  setStudentForm({ name: '', email: '', studentId: '' });
                }}
                className="primary-button"
              >
                + Add Student
              </button>
            </div>

            {showStudentForm && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
                  <form onSubmit={handleStudentSubmit}>
                    <div className="form-group">
                      <label>Name *</label>
                      <input
                        type="text"
                        value={studentForm.name}
                        onChange={(e) => setStudentForm({...studentForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        value={studentForm.email}
                        onChange={(e) => setStudentForm({...studentForm, email: e.target.value})}
                        required
                      />
                    </div>
                    {!editingStudent && (
                      <div className="form-group">
                        <label>Student ID (optional)</label>
                        <input
                          type="text"
                          value={studentForm.studentId}
                          onChange={(e) => setStudentForm({...studentForm, studentId: e.target.value})}
                          placeholder="Leave empty to auto-generate"
                        />
                      </div>
                    )}
                    <div className="form-actions">
                      <button type="button" onClick={() => setShowStudentForm(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="primary-button">
                        {editingStudent ? 'Update' : 'Create'} Student
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="students-table">
              <table>
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.studentId}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{formatDate(student.createdAt)}</td>
                      <td>
                        <div className="action-buttons">
                          <button onClick={() => handleEditStudent(student)} className="edit-btn">
                            Edit
                          </button>
                          <button onClick={() => handleAssignQuiz(student.studentId)} className="assign-btn">
                            Assign Quiz
                          </button>
                          <button 
                            onClick={() => handleDeleteStudent(student.id)}
                            className="danger-button delete-btn"
                          >
                            Delete
                          </button>
                          <button 
                            onClick={() => handleHardDeleteStudent(student.id)}
                            className="danger-button delete-btn"
                          >
                            Hard Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'attempts' && (
          <div className="attempts-tab">
            <div className="tab-header">
              <h2>Quiz Attempts</h2>
              {sortConfig.key && (
                <button onClick={clearSort} className="secondary-button">
                  Clear Sort
                </button>
              )}
            </div>
            <div className="attempts-table">
              <table>
                <thead>
                  <tr>
                    <th 
                      className="sortable-header" 
                      onClick={() => handleSort('attemptId')}
                      title="Click to sort by Attempt ID"
                    >
                      <span className="header-text">Attempt ID</span>
                      {getSortIcon('attemptId')}
                    </th>
                    <th 
                      className="sortable-header" 
                      onClick={() => handleSort('studentName')}
                      title="Click to sort by Student Name"
                    >
                      <span className="header-text">Student</span>
                      {getSortIcon('studentName')}
                    </th>
                    <th 
                      className="sortable-header" 
                      onClick={() => handleSort('status')}
                      title="Click to sort by Status"
                    >
                      <span className="header-text">Status</span>
                      {getSortIcon('status')}
                    </th>
                    <th 
                      className="sortable-header" 
                      onClick={() => handleSort('assignedAt')}
                      title="Click to sort by Assigned Date"
                    >
                      <span className="header-text">Assigned</span>
                      {getSortIcon('assignedAt')}
                    </th>
                    <th 
                      className="sortable-header" 
                      onClick={() => handleSort('startedAt')}
                      title="Click to sort by Started Date"
                    >
                      <span className="header-text">Started</span>
                      {getSortIcon('startedAt')}
                    </th>
                    <th 
                      className="sortable-header" 
                      onClick={() => handleSort('completedAt')}
                      title="Click to sort by Completed Date"
                    >
                      <span className="header-text">Completed</span>
                      {getSortIcon('completedAt')}
                    </th>
                    <th 
                      className="sortable-header" 
                      onClick={() => handleSort('score')}
                      title="Click to sort by Score"
                    >
                      <span className="header-text">Score</span>
                      {getSortIcon('score')}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedAttempts().map((attempt) => (
                    <tr key={attempt.id}>
                      <td>{attempt.attemptId}</td>
                      <td>{attempt.studentName}</td>
                      <td>{getStatusBadge(attempt.status)}</td>
                      <td>{formatDate(attempt.assignedAt)}</td>
                      <td>{attempt.startedAt ? formatDate(attempt.startedAt) : '-'}</td>
                      <td>{attempt.completedAt ? formatDate(attempt.completedAt) : '-'}</td>
                      <td>
                        {attempt.results?.score !== undefined ? 
                          `${attempt.results.score}/${attempt.results.totalQuestions}` : '-'}
                      </td>
                      <td>
                        <button onClick={() => handleDeleteQuizAttempt(attempt.attemptId)} className="danger-button delete-btn">
                          Delete Attempt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="modal-overlay">
          <div className="confirmation-dialog">
            <h3>{confirmTitle}</h3>
            <p>{confirmMessage}</p>
            <div className="form-actions">
              <button type="button" onClick={() => setShowConfirmDialog(false)}>
                Cancel
              </button>
              <button className="danger-button" onClick={handleConfirmAction}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
