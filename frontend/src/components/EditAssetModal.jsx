import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { updateAsset } from '../api/assetService';
import toast from 'react-hot-toast';

const EditAssetModal = ({ isOpen, closeModal, asset, onSuccess }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    warrantyExpirationDate: '',
    status: '',
    condition: ''
  });

  useEffect(() => {
    if (asset) {
      setFormData({
        brand: asset.brand,
        model: asset.model,
        warrantyExpirationDate: asset.warrantyExpirationDate,
        status: asset.status,
        condition: asset.condition
      });
    }
  }, [asset]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAsset(asset.id, formData);
      toast.success('Asset updated successfully');
      onSuccess();
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update asset');
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Asset</Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand</label>
              <input type="text" name="brand" required value={formData.brand} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Model</label>
              <input type="text" name="model" required value={formData.model} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Warranty Expiration Date</label>
              <input type="date" name="warrantyExpirationDate" required value={formData.warrantyExpirationDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select name="status" required value={formData.status} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300">
                <option value="AVAILABLE">Available</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="UNDER_REPAIR">Under Repair</option>
                <option value="DECOMMISSIONED">Decommissioned</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Condition</label>
              <select name="condition" required value={formData.condition} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300">
                <option value="GOOD">Good</option>
                <option value="FAIR">Fair</option>
                <option value="POOR">Poor</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Save Changes</button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditAssetModal;
