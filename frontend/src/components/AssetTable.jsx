import React from 'react';
import { Link } from 'react-router-dom';
import AssetStatusBadge from './AssetStatusBadge';
import AssetTypeBadge from './AssetTypeBadge';
import { useAuth } from '../context/AuthContext';
import { Eye, Edit, Trash2, UserPlus, UserMinus } from 'lucide-react';

const AssetTable = ({ assets, onEdit, onDelete, onAssign, onUnassign }) => {
  const { user } = useAuth();
  const isAdminOrManager = user?.role === 'ADMIN' || user?.role === 'MANAGER';
  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial #</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warranty</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assets.map((asset) => (
            <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <AssetTypeBadge type={asset.type} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{asset.brand}</div>
                <div className="text-sm text-gray-500">{asset.model}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {asset.serialNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <AssetStatusBadge status={asset.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {asset.currentOwner ? asset.currentOwner.fullName : <span className="text-gray-400 italic">Unassigned</span>}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${asset.warrantyStatus === 'VALID' ? 'bg-green-100 text-green-800' : 
                    asset.warrantyStatus === 'EXPIRING_SOON' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {asset.warrantyStatus.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <Link to={`/assets/${asset.id}`} className="text-indigo-600 hover:text-indigo-900" title="View Details">
                    <Eye className="w-5 h-5" />
                  </Link>
                  {isAdminOrManager && (
                    <>
                      <button onClick={() => onEdit(asset)} className="text-blue-600 hover:text-blue-900" title="Edit">
                        <Edit className="w-5 h-5" />
                      </button>
                      {asset.status === 'AVAILABLE' ? (
                        <button onClick={() => onAssign(asset)} className="text-green-600 hover:text-green-900" title="Assign">
                          <UserPlus className="w-5 h-5" />
                        </button>
                      ) : asset.status === 'ASSIGNED' ? (
                        <button onClick={() => onUnassign(asset)} className="text-orange-600 hover:text-orange-900" title="Unassign">
                          <UserMinus className="w-5 h-5" />
                        </button>
                      ) : null}
                    </>
                  )}
                  {isAdmin && (
                    <button onClick={() => onDelete(asset)} className="text-red-600 hover:text-red-900" title="Delete">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
