import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import PrivateRoute from './routes/PrivateRoute';
import RoleRoute from './routes/RoleRoute';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AssetListPage from './pages/AssetListPage';
import AssetDetailPage from './pages/AssetDetailPage';
import UserManagementPage from './pages/UserManagementPage';
import NotificationsPage from './pages/NotificationsPage';
import ReportsPage from './pages/ReportsPage';
import ProfilePage from './pages/ProfilePage';
import UnauthorizedPage from './pages/UnauthorizedPage';

const MainLayout = () => (
  <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="assets" element={<AssetListPage />} />
            <Route path="assets/:id" element={<AssetDetailPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            
            {/* Admin only */}
            <Route path="users" element={<RoleRoute allowedRoles={['ADMIN']}><UserManagementPage /></RoleRoute>} />
            
            {/* Admin or Manager */}
            <Route path="reports" element={<RoleRoute allowedRoles={['ADMIN', 'MANAGER']}><ReportsPage /></RoleRoute>} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
