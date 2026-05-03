import React from 'react';
import { Dialog } from '@headlessui/react';

const ConfirmDeleteModal = ({ isOpen, closeModal, onConfirm, title, message }) => {
  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-2">{title}</Dialog.Title>
          <p className="text-sm text-gray-500 mb-4">{message}</p>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
            <button type="button" onClick={onConfirm} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Confirm</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
