import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { getSpareAssets } from '../api/assetService';
import AssetTypeBadge from './AssetTypeBadge';

const SpareAssetModal = ({ isOpen, closeModal }) => {
  const [spares, setSpares] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setLoading(true);
      getSpareAssets()
        .then(setSpares)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl rounded bg-white p-6">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">Spare Laptops</Dialog.Title>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : spares.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No spare laptops available.</div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Asset</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Serial</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Last Owner</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {spares.map((spare) => (
                    <tr key={spare.asset.id}>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        <AssetTypeBadge type={spare.asset.type} /> {spare.asset.brand} {spare.asset.model}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">{spare.asset.serialNumber}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{spare.asset.condition}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {spare.lastOwner ? spare.lastOwner.fullName : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4 flex justify-end">
            <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Close</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SpareAssetModal;
