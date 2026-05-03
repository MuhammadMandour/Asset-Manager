import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import { LayoutDashboard, MonitorSmartphone, Users, FileText, UserCircle, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Assets', path: '/assets', icon: MonitorSmartphone },
  ];

  if (user?.role === 'ADMIN') {
    navItems.push({ name: 'Users', path: '/users', icon: Users });
  }

  if (user?.role === 'ADMIN' || user?.role === 'MANAGER') {
    navItems.push({ name: 'Reports', path: '/reports', icon: FileText });
  }

  return (
    <nav className="bg-indigo-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 font-bold text-xl tracking-wider">
              <Link to="/">AssetTrack</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${location.pathname.startsWith(item.path) ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'}`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <NotificationBell />
              <div className="ml-4 relative flex items-center gap-4">
                <Link to="/profile" className="flex items-center text-indigo-200 hover:text-white">
                  <UserCircle className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">{user?.fullName}</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center text-sm font-medium text-red-300 hover:text-red-100">
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
