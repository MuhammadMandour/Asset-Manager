import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup as signupApi } from '../api/authService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { MonitorSmartphone } from 'lucide-react';

const SignupPage = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signupApi(formData);
      // Backend auto-logs in, but let's explicitly set token if returned
      login(data.token, { id: data.userId, email: data.email, fullName: data.fullName, role: data.role });
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-indigo-600 p-3 rounded-full">
            <MonitorSmartphone className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">sign in to existing account</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1">
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1">
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input type="password" name="password" required minLength="8" value={formData.password} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
