import React, { useState, useEffect } from 'react';
import { getMe } from '../api/userService';
import { searchAssets } from '../api/assetService';
import AssetTable from '../components/AssetTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { format } from 'date-fns';
import { UserCircle } from 'lucide-react';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [myAssets, setMyAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getMe();
        setProfile(userData);
        
        const assetsData = await searchAssets({ userId: userData.id, page: 0, size: 50 });
        setMyAssets(assetsData.content);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex items-center">
          <UserCircle className="h-16 w-16 text-gray-300 mr-4" />
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and assigned assets.</p>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.fullName}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.email}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.role}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Member since</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{format(new Date(profile.createdAt), 'PPP')}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div>
        <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">My Assigned Assets</h2>
        {myAssets.length > 0 ? (
          <AssetTable 
            assets={myAssets} 
            onEdit={() => {}} 
            onDelete={() => {}} 
            onAssign={() => {}} 
            onUnassign={() => {}} 
          />
        ) : (
          <div className="bg-white shadow sm:rounded-lg p-6 text-center text-gray-500">
            You do not currently have any assigned assets.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
