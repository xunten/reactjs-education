import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import ClassManagementPage from './pages/ClassManagementPage';
import AssignmentManagementPage from './pages/AssignmentManagementPage';
import SubmissionManagementPage from './pages/SubmissionManagementPage';
import QuizManagementPage from './pages/QuizManagementPage';
import AttendanceManagementPage from './pages/AttendanceManagementPage';
import ActivityLogPage from './pages/ActivityLogPage';
import SchedulePage from './pages/SchedulePage';
import ProfilePage from './pages/ProfilePage';
import MaterialsPage from './pages/MaterialsPage';
import { ThemeProvider } from './components/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import 'antd/dist/reset.css';
import { App as AntdApp } from 'antd';
import LoginPage from './pages/LoginPage';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

// Component để bảo vệ các route theo quyền
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles = [] }) => {
  const { isLoggedIn, user } = useAuth();
  const userRole = user?.role;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && (!userRole || !allowedRoles.includes(userRole))) {
    return <Navigate to="/unauthorized" />;
  }

  return <MainLayout />;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<div>Bạn không có quyền truy cập trang này.</div>} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} /> 
          <Route path="/" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/classes" element={<ClassManagementPage />} />
          <Route path="/assignments" element={<AssignmentManagementPage />} />
          <Route path="/submissions" element={<SubmissionManagementPage />} />
          <Route path="/quizzes" element={<QuizManagementPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/attendance" element={<AttendanceManagementPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/logs" element={<ActivityLogPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/users" element={<UserManagementPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {/* <-- QUAN TRỌNG: Bao bọc AppRoutes bên trong Antd.App */}
        <AntdApp>
          <AppRoutes />
        </AntdApp>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
