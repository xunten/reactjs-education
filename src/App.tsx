import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import DashboardPage from './components/DashboardPage';
import UserManagementPage from './components/UserManagementPage';
import ClassManagementPage from './components/ClassManagementPage';
import AssignmentManagementPage from './components/AssignmentManagementPage';
import SubmissionManagementPage from './components/SubmissionManagementPage';
import QuizManagementPage from './components/QuizManagementPage';
import AttendanceManagementPage from './components/AttendanceManagementPage';
import ActivityLogPage from './components/ActivityLogPage';
import SchedulePage from './components/SchedulePage';
import ProfilePage from './components/ProfilePage';
import MaterialsPage from './components/MaterialsPage'; // New import
import { ThemeProvider } from './components/ThemeContext';
import 'antd/dist/reset.css';

const mockUser = {
  isLoggedIn: true,
  role: 'admin'
};

const App: React.FC = () => {
  // Logic kiểm tra quyền truy cập
  const isAuthenticated = mockUser.isLoggedIn && mockUser.role === 'admin';

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<div>Trang Đăng nhập</div>} />
          
          {/* Các Route được bảo vệ */}
          <Route element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/classes" element={<ClassManagementPage />} />
            <Route path="/assignments" element={<AssignmentManagementPage />} />
            <Route path="/submissions" element={<SubmissionManagementPage />} />
            <Route path="/quizzes" element={<QuizManagementPage />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/attendance" element={<AttendanceManagementPage />} />
            <Route path="/users" element={<UserManagementPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/logs" element={<ActivityLogPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Trang Đăng xuất (không cần bảo vệ) */}
          <Route path="/logout" element={<div>Trang Đăng xuất</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;