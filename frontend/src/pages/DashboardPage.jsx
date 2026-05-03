import React, { useState, useEffect } from 'react';
import { getDashboard } from '../api/dashboardService';
import LoadingSpinner from '../components/LoadingSpinner';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ShieldAlert, PackageMinus, MonitorSmartphone, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const COLORS = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!data) return <div>Failed to load dashboard</div>;

  const pieData = Object.keys(data.byType).map(key => ({ name: key, value: data.byType[key] }));
  const barData = Object.keys(data.byStatus).map(key => ({ name: key.replace('_', ' '), value: data.byStatus[key] }));
  
  return (
    <div className="space-y-6 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
        <LayoutDashboard className="h-6 w-6 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
              <MonitorSmartphone className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Assets</dt>
                <dd className="text-2xl font-semibold text-gray-900">{data.totalAssets}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <div className="h-6 w-6 text-green-600 font-bold flex items-center justify-center">A</div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Available</dt>
                <dd className="text-2xl font-semibold text-gray-900">{data.byStatus['AVAILABLE'] || 0}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
              <ShieldAlert className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Expiring Soon (Warranties)</dt>
                <dd className="text-2xl font-semibold text-gray-900">{data.expiringWarranties.length}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
              <PackageMinus className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Low Stock Items</dt>
                <dd className="text-2xl font-semibold text-gray-900">{data.lowStockItems.length}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Charts */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Asset Distribution by Type</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" label>
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Asset Distribution by Status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lists */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center justify-between">
            <span>Expiring Warranties</span>
            <Link to="/assets" className="text-sm text-indigo-600 hover:text-indigo-800">View all</Link>
          </h2>
          {data.expiringWarranties.length === 0 ? (
            <p className="text-sm text-gray-500">No warranties expiring soon.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {data.expiringWarranties.map(asset => (
                <li key={asset.id} className="py-3 flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{asset.brand} {asset.model}</p>
                    <p className="text-sm text-gray-500">{asset.serialNumber}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${asset.warrantyStatus === 'EXPIRED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {asset.warrantyStatus.replace('_', ' ')}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Top Users by Assignments</h2>
          {Object.keys(data.byUser).length === 0 ? (
            <p className="text-sm text-gray-500">No assets assigned yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {Object.keys(data.byUser).map((userName, index) => (
                <li key={userName} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center text-xs font-bold mr-3">{index + 1}</span>
                    <p className="text-sm font-medium text-gray-900">{userName}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-500">{data.byUser[userName]} assets</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
