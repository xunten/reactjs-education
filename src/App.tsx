import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import { AuthProvider } from "./components/Auth/AuthProvider";
import { useAuth } from "../src/context/AuthContext"
import { App as AntdApp } from "antd";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./components/Layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import UserManagementPage from "./pages/UserManagementPage";
import ClassManagementPage from "./pages/ClassManagementPage";
import AssignmentManagementPage from "./pages/AssignmentManagementPage";
import SubmissionManagementPage from "./pages/SubmissionManagementPage";
import QuizManagementPage from "./pages/QuizManagementPage";
import AttendanceManagementPage from "./pages/AttendanceManagementPage";
import ActivityLogPage from "./pages/ActivityLogPage";
import SchedulePage from "./pages/SchedulePage";
import MaterialsPage from "./pages/MaterialsPage";

import "antd/dist/reset.css";

const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>; 
  }
  
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/classes" element={<ClassManagementPage />} />
          <Route path="/assignments" element={<AssignmentManagementPage />} />
          <Route path="/submissions" element={<SubmissionManagementPage />} />
          <Route path="/quizzes" element={<QuizManagementPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/attendance" element={<AttendanceManagementPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/logs" element={<ActivityLogPage />} />
          <Route path="/users" element={<UserManagementPage />} />
        </Route>
      </Route>
    </Routes>
  </Router>
);

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <AntdApp>
        <AppRoutes />
      </AntdApp>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
