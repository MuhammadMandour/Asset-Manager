import React, { useState, useEffect } from 'react';
import { getAllAssets, searchAssets, deleteAsset, unassignAsset } from '../api/assetService';
import AssetTable from '../components/AssetTable';
import SearchBar from '../components/SearchBar';
import PaginationControls from '../components/PaginationControls';
import AddAssetModal from '../components/AddAssetModal';
import EditAssetModal from '../components/EditAssetModal';
import AssignAssetModal from '../components/AssignAssetModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import SpareAssetModal from '../components/SpareAssetModal';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { Plus, Search as SearchIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const AssetListPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  
  const [pagedData, setPagedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSpareModalOpen, setIsSpareModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [assigningAsset, setAssigningAsset] = useState(null);
  const [deletingAsset, setDeletingAsset] = useState(null);

  const fetchAssets = async (page = 0) => {
    setLoading(true);
    try {
      if (isSearching) {
        const data = await searchAssets({ ...filters, page, size: 10 });
        setPagedData(data);
      } else {
        const data = await getAllAssets(page, 10);
        setPagedData(data);
      }
    } catch (e) {
      console.error(e);
      toast.error('Failed to load assets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [isSearching]);

  const handleSearch = () => {
    if (Object.values(filters).some(v => v !== '')) {
      setIsSearching(true);
      fetchAssets(0); // If already searching, this triggers the fetch anyway since we call it directly here if state doesn't change
    } else {
      setIsSearching(false);
    }
  };

  const handlePageChange = (newPage) => fetchAssets(newPage);

  const handleDeleteConfirm = async () => {
    if (!deletingAsset) return;
    try {
      await deleteAsset(deletingAsset.id);
      toast.success('Asset deleted successfully');
      fetchAssets(pagedData.page);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to delete asset');
    } finally {
      setDeletingAsset(null);
    }
  };

  const handleUnassign = async (asset) => {
    if (window.confirm(`Are you sure you want to unassign asset ${asset.serialNumber}?`)) {
      try {
        await unassignAsset(asset.id);
        toast.success('Asset unassigned');
        fetchAssets(pagedData.page);
      } catch (e) {
        toast.error('Failed to unassign asset');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Asset Management</h1>
        <div className="flex gap-2">
          <button onClick={() => setIsSpareModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
            <SearchIcon className="w-4 h-4 mr-2" /> Find Spares
          </button>
          {isAdmin && (
            <button onClick={() => setIsAddModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
              <Plus className="w-4 h-4 mr-2" /> Add Asset
            </button>
          )}
        </div>
      </div>

      <SearchBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />

      {loading ? (
        <LoadingSpinner />
      ) : pagedData?.content?.length > 0 ? (
        <>
          <AssetTable 
            assets={pagedData.content} 
            onEdit={setEditingAsset}
            onDelete={setDeletingAsset}
            onAssign={setAssigningAsset}
            onUnassign={handleUnassign}
          />
          <PaginationControls pagedData={pagedData} onPageChange={handlePageChange} />
        </>
      ) : (
        <EmptyState title="No assets found" message="Try adjusting your filters or add a new asset." />
      )}

      <AddAssetModal isOpen={isAddModalOpen} closeModal={() => setIsAddModalOpen(false)} onSuccess={() => fetchAssets()} />
      <EditAssetModal isOpen={!!editingAsset} asset={editingAsset} closeModal={() => setEditingAsset(null)} onSuccess={() => fetchAssets(pagedData.page)} />
      <AssignAssetModal isOpen={!!assigningAsset} assetId={assigningAsset?.id} closeModal={() => setAssigningAsset(null)} onSuccess={() => fetchAssets(pagedData.page)} />
      <ConfirmDeleteModal isOpen={!!deletingAsset} closeModal={() => setDeletingAsset(null)} onConfirm={handleDeleteConfirm} title="Delete Asset" message={`Are you sure you want to delete asset ${deletingAsset?.serialNumber}? This action cannot be undone.`} />
      <SpareAssetModal isOpen={isSpareModalOpen} closeModal={() => setIsSpareModalOpen(false)} />
    </div>
  );
};

export default AssetListPage;
