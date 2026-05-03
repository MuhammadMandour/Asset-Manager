import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { createReport } from '../api/conditionReportService';
import toast from 'react-hot-toast';

const ConditionReportModal = ({ isOpen, closeModal, assetId, onSuccess }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    try {
      await createReport(assetId, description);
      toast.success('Condition report submitted successfully');
      setDescription('');
      if(onSuccess) onSuccess();
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit report');
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">Report Asset Condition</Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Describe the issue</label>
              <textarea 
                required 
                rows={4}
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="E.g., Screen flickering, battery won't charge..."
              ></textarea>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={!description.trim()} className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700 disabled:bg-yellow-300">Submit Report</button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConditionReportModal;
