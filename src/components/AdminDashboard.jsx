import React, { useState, useEffect } from 'react';
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

  const apiRequest = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': adminToken,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }

    return response.json();
  };

  const loadDashboardStats = async () => {
    try {
      const data = await apiRequest('/api/admin/dashboard/stats');
      setDashboardStats(data.data);
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    }
  };

  const loadStudents = async () => {
    try {
      const data = await apiRequest('/api/admin/students');
      setStudents(data.data);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const loadQuizAttempts = async () => {
    try {
      const data = await apiRequest('/api/admin/quiz-attempts');
      setQuizAttempts(data.data);
    } catch (error) {
      console.error('Error loading quiz attempts:', error);
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingStudent) {
        // Update existing student
        await apiRequest(`/api/admin/students/${editingStudent.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            name: studentForm.name,
            email: studentForm.email
          }),
        });
      } else {
        // Create new student
        await apiRequest('/api/admin/students', {
          method: 'POST',
          body: JSON.stringify(studentForm),
        });
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
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }

    try {
      await apiRequest(`/api/admin/students/${studentId}`, {
        method: 'DELETE',
      });
      await loadStudents();
      await loadDashboardStats();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAssignQuiz = async (studentId) => {
    try {
      await apiRequest('/api/admin/quiz-attempts/assign', {
        method: 'POST',
        body: JSON.stringify({ studentId }),
      });
      await loadQuizAttempts();
      await loadDashboardStats();
    } catch (error) {
      setError(error.message);
    }
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
        <button
          className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`nav-button ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          👨‍🎓 Students
        </button>
        <button
          className={`nav-button ${activeTab === 'attempts' ? 'active' : ''}`}
          onClick={() => setActiveTab('attempts')}
        >
          📝 Quiz Attempts
        </button>
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
                          <button onClick={() => handleEditStudent(student)}>Edit</button>
                          <button onClick={() => handleAssignQuiz(student.studentId)}>
                            Assign Quiz
                          </button>
                          <button 
                            onClick={() => handleDeleteStudent(student.id)}
                            className="danger-button"
                          >
                            Delete
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
            <h2>Quiz Attempts</h2>
            <div className="attempts-table">
              <table>
                <thead>
                  <tr>
                    <th>Attempt ID</th>
                    <th>Student</th>
                    <th>Status</th>
                    <th>Assigned</th>
                    <th>Started</th>
                    <th>Completed</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {quizAttempts.map((attempt) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
