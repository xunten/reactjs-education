import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/useAuth';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles = [] }) => {
  const { isLoggedIn, user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const userRoles = user?.roles || [];

  if (allowedRoles.length > 0 && !allowedRoles.some(role => userRoles.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;