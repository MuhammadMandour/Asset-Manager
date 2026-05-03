import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { assignAsset } from '../api/assetService';
import { getAllUsers } from '../api/userService';
import toast from 'react-hot-toast';

const AssignAssetModal = ({ isOpen, closeModal, assetId, onSuccess }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    if (isOpen) {
      getAllUsers().then(setUsers).catch(console.error);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      await assignAsset(assetId, selectedUser);
      toast.success('Asset assigned successfully');
      onSuccess();
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to assign asset');
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">Assign Asset</Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Select User</label>
              <select 
                required 
                value={selectedUser} 
                onChange={(e) => setSelectedUser(e.target.value)} 
                className="mt-1 block w-full rounded-md border-gray-300"
              >
                <option value="">-- Select a User --</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.fullName} ({u.email})</option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={!selectedUser} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300">Assign</button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AssignAssetModal;
