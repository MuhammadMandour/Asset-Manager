import React from 'react';

const colors = {
  AVAILABLE: 'bg-green-100 text-green-800',
  ASSIGNED: 'bg-blue-100 text-blue-800',
  UNDER_REPAIR: 'bg-yellow-100 text-yellow-800',
  DECOMMISSIONED: 'bg-red-100 text-red-800'
};

const AssetStatusBadge = ({ status }) => (
  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
    {status.replace('_', ' ')}
  </span>
);

export default AssetStatusBadge;
