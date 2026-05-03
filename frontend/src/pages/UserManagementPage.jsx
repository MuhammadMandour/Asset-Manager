import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserRole, deleteUser } from '../api/userService';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingUser, setDeletingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (e) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      await updateUserRole(id, newRole);
      toast.success('Role updated successfully');
      fetchUsers();
    } catch (e) {
      toast.error('Failed to update role');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingUser) return;
    try {
      await deleteUser(deletingUser.id);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to delete user');
    } finally {
      setDeletingUser(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">User Management</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                      {u.fullName.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{u.fullName}</div>
                      <div className="text-sm text-gray-500">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="DEVELOPER">Developer</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(u.createdAt), 'PP')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => setDeletingUser(u)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDeleteModal 
        isOpen={!!deletingUser} 
        closeModal={() => setDeletingUser(null)} 
        onConfirm={handleDeleteConfirm} 
        title="Delete User" 
        message={`Are you sure you want to delete ${deletingUser?.fullName}? This action cannot be undone.`} 
      />
    </div>
  );
};

export default UserManagementPage;
