import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const PrivateRoute = ({ children }) => {
  const { user, token, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return token && user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
