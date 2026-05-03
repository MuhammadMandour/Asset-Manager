import React from 'react';
import AssetStatusBadge from './AssetStatusBadge';
import AssetTypeBadge from './AssetTypeBadge';
import { format } from 'date-fns';

const AssetCard = ({ asset }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{asset.brand} {asset.model}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Serial: {asset.serialNumber}</p>
        </div>
        <AssetTypeBadge type={asset.type} />
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <AssetStatusBadge status={asset.status} />
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Condition</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{asset.condition}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Current Owner</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {asset.currentOwner ? asset.currentOwner.fullName : 'Unassigned'}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Purchase Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {format(new Date(asset.purchaseDate), 'PPP')}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Warranty</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center gap-2">
              {format(new Date(asset.warrantyExpirationDate), 'PPP')}
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${asset.warrantyStatus === 'VALID' ? 'bg-green-100 text-green-800' : 
                  asset.warrantyStatus === 'EXPIRING_SOON' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                {asset.warrantyStatus.replace('_', ' ')}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default AssetCard;
