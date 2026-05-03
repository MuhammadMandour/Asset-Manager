import React from 'react';
import { Laptop, Monitor, Mouse } from 'lucide-react';

const AssetTypeBadge = ({ type }) => {
  const getIcon = () => {
    switch (type) {
      case 'LAPTOP': return <Laptop className="w-4 h-4 mr-1" />;
      case 'MONITOR': return <Monitor className="w-4 h-4 mr-1" />;
      case 'ACCESSORY': return <Mouse className="w-4 h-4 mr-1" />;
      default: return null;
    }
  };

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
      {getIcon()}
      {type}
    </span>
  );
};

export default AssetTypeBadge;
