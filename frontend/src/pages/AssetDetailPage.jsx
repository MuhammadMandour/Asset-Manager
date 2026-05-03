import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAssetById } from '../api/assetService';
import { getReportsForAsset } from '../api/conditionReportService';
import AssetCard from '../components/AssetCard';
import ConditionReportModal from '../components/ConditionReportModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { AlertCircle, History, FileWarning, ArrowLeft } from 'lucide-react';

const AssetDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [assetDetail, setAssetDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const fetchAssetDetail = async () => {
    try {
      const data = await getAssetById(id);
      setAssetDetail(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssetDetail();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!assetDetail) return <div className="text-center py-10">Asset not found.</div>;

  const canReportCondition = assetDetail.currentOwner?.id === user?.id;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
      <div className="flex items-center space-x-2">
        <Link to="/assets" className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Assets
        </Link>
      </div>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Asset Details</h1>
        {canReportCondition && (
          <button onClick={() => setIsReportModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none">
            <AlertCircle className="w-4 h-4 mr-2" /> Report Condition
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AssetCard asset={assetDetail} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Condition Reports */}
          <div className="bg-white shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:px-6 flex items-center border-b border-gray-200">
              <FileWarning className="w-5 h-5 text-gray-400 mr-2" />
              <h3 className="text-lg leading-6 font-medium text-gray-900">Condition Reports</h3>
            </div>
            <div className="px-4 py-5 sm:p-0">
              {assetDetail.conditionReports.length === 0 ? (
                <p className="p-4 text-sm text-gray-500">No condition reports filed.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {assetDetail.conditionReports.map(report => (
                    <li key={report.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-900">{report.description}</p>
                          <p className="text-xs text-gray-500 mt-1">Reported by {report.reportedBy.fullName} on {format(new Date(report.reportedAt), 'PPP')}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${report.resolved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {report.resolved ? 'Resolved' : 'Unresolved'}
                        </span>
                      </div>
                      {report.resolved && (
                        <p className="text-xs text-gray-500 mt-2 italic">Resolved by {report.resolvedBy?.fullName} on {format(new Date(report.resolvedAt), 'PPP')}</p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Allocation History */}
          <div className="bg-white shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:px-6 flex items-center border-b border-gray-200">
              <History className="w-5 h-5 text-gray-400 mr-2" />
              <h3 className="text-lg leading-6 font-medium text-gray-900">Allocation History</h3>
            </div>
            <div className="px-4 py-5 sm:p-0">
              {assetDetail.allocationHistory.length === 0 ? (
                <p className="p-4 text-sm text-gray-500">No allocation history available.</p>
              ) : (
                <div className="flow-root p-4">
                  <ul className="-mb-8">
                    {assetDetail.allocationHistory.map((record, recordIdx) => (
                      <li key={record.id}>
                        <div className="relative pb-8">
                          {recordIdx !== assetDetail.allocationHistory.length - 1 ? (
                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                                <span className="text-white text-xs font-bold">{record.assignedTo.fullName.charAt(0)}</span>
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Assigned to <span className="font-medium text-gray-900">{record.assignedTo.fullName}</span> by {record.assignedBy.fullName}
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                <div><span className="font-medium">Assigned:</span> {format(new Date(record.assignedAt), 'PP')}</div>
                                {record.returnedAt && (
                                  <div><span className="font-medium">Returned:</span> {format(new Date(record.returnedAt), 'PP')}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <ConditionReportModal isOpen={isReportModalOpen} closeModal={() => setIsReportModalOpen(false)} assetId={assetDetail.id} onSuccess={fetchAssetDetail} />
    </div>
  );
};

export default AssetDetailPage;
