import React from 'react';
import { FolderX } from 'lucide-react';

const EmptyState = ({ title, message }) => (
  <div className="text-center p-10 bg-white rounded-lg shadow-sm border border-gray-200">
    <FolderX className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
    <p className="mt-1 text-sm text-gray-500">{message}</p>
  </div>
);

export default EmptyState;
