import React from 'react';
import { Dialog } from '@headlessui/react';
import { createAsset } from '../api/assetService';
import toast from 'react-hot-toast';

const AddAssetModal = ({ isOpen, closeModal, onSuccess }) => {
  const [formData, setFormData] = React.useState({
    type: 'LAPTOP',
    brand: '',
    model: '',
    serialNumber: '',
    purchaseDate: '',
    warrantyExpirationDate: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAsset(formData);
      toast.success('Asset created successfully');
      onSuccess();
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create asset');
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">Add New Asset</Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select name="type" required value={formData.type} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300">
                <option value="LAPTOP">Laptop</option>
                <option value="MONITOR">Monitor</option>
                <option value="ACCESSORY">Accessory</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand</label>
              <input type="text" name="brand" required value={formData.brand} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Model</label>
              <input type="text" name="model" required value={formData.model} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Serial Number</label>
              <input type="text" name="serialNumber" required value={formData.serialNumber} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
              <input type="date" name="purchaseDate" required value={formData.purchaseDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Warranty Expiration Date</label>
              <input type="date" name="warrantyExpirationDate" required value={formData.warrantyExpirationDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300" />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Save Asset</button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddAssetModal;
