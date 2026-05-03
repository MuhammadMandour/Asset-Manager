import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const RoleRoute = ({ children, allowedRoles }) => {
  const { user, token, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleRoute;
