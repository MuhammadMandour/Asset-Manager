import React, { useState, useEffect } from 'react';
import { getConditionSummary, getUsageStatistics } from '../api/reportService';
import { getConfig, updateConfig } from '../api/alertConfigService';
import LoadingSpinner from '../components/LoadingSpinner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const ReportsPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const [conditionData, setConditionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({ warrantyWarningDays: 30, lowStockThreshold: 3 });

  // Usage Statistics state
  const today = new Date().toISOString().split('T')[0];
  const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const [fromDate, setFromDate] = useState(oneMonthAgo);
  const [toDate, setToDate] = useState(today);
  const [usageStats, setUsageStats] = useState(null);
  const [usageLoading, setUsageLoading] = useState(false);

  const fetchUsageStats = async () => {
    setUsageLoading(true);
    try {
      const data = await getUsageStatistics(fromDate, toDate);
      setUsageStats(data);
    } catch (e) {
      toast.error('Failed to load usage statistics');
    } finally {
      setUsageLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([
      getConditionSummary(),
      isAdmin ? getConfig() : Promise.resolve(null),
      getUsageStatistics(oneMonthAgo, today),
    ]).then(([conditionSummary, configData, usageData]) => {
      const formattedConditionData = Object.keys(conditionSummary).map(type => ({
        name: type,
        Good: conditionSummary[type].GOOD || 0,
        Fair: conditionSummary[type].FAIR || 0,
        Poor: conditionSummary[type].POOR || 0,
      }));
      setConditionData(formattedConditionData);
      if (configData) setConfig(configData);
      setUsageStats(usageData);
    }).catch(console.error).finally(() => setLoading(false));
  }, [isAdmin]);

  const handleConfigChange = (e) => {
    setConfig({ ...config, [e.target.name]: parseInt(e.target.value, 10) });
  };

  const saveConfig = async (e) => {
    e.preventDefault();
    try {
      await updateConfig(config);
      toast.success('Alert configuration saved');
    } catch (e) {
      toast.error('Failed to save configuration');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports & Settings</h1>

      {/* Row 1: Condition Chart + Alert Config */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Condition Summary Chart */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Asset Condition Summary</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conditionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="Good" fill="#10b981" />
                <Bar dataKey="Fair" fill="#f59e0b" />
                <Bar dataKey="Poor" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alert Configuration - Admin only */}
        {isAdmin && (
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Alert Configuration</h2>
            <form onSubmit={saveConfig} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Warranty Warning (Days before expiry)</label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="number"
                    name="warrantyWarningDays"
                    min="1"
                    required
                    value={config.warrantyWarningDays}
                    onChange={handleConfigChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <span className="text-sm text-gray-500">days</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Low Stock Threshold (Accessories)</label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="number"
                    name="lowStockThreshold"
                    min="1"
                    required
                    value={config.lowStockThreshold}
                    onChange={handleConfigChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <span className="text-sm text-gray-500">items</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Row 2: Usage Statistics */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Usage Statistics</h2>
        <div className="flex flex-wrap gap-4 items-end mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
              className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input
              type="date"
              value={toDate}
              onChange={e => setToDate(e.target.value)}
              className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button
            onClick={fetchUsageStats}
            disabled={usageLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {usageLoading ? 'Loading...' : 'Generate Report'}
          </button>
        </div>

        {usageStats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
              <p className="text-sm text-indigo-600 font-medium">Total Allocations</p>
              <p className="text-3xl font-bold text-indigo-900 mt-1">{usageStats.totalAllocations ?? '—'}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-sm text-blue-600 font-medium">Reporting Period</p>
              <p className="text-sm font-semibold text-blue-900 mt-2">{fromDate} → {toDate}</p>
            </div>
            {usageStats.message && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 sm:col-span-2 lg:col-span-1">
                <p className="text-sm text-gray-500 font-medium">Details</p>
                <p className="text-sm text-gray-700 mt-1">{usageStats.message}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Select a date range and click "Generate Report" to load statistics.</p>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
