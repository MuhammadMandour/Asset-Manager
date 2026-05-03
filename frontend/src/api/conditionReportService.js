import api from './axios';

export const createReport = async (assetId, description) => {
  const response = await api.post(`/condition-reports/asset/${assetId}`, { description });
  return response.data;
};

export const getReportsForAsset = async (assetId) => {
  const response = await api.get(`/condition-reports/asset/${assetId}`);
  return response.data;
};

export const getUnresolvedReports = async () => {
  const response = await api.get('/condition-reports/unresolved');
  return response.data;
};

export const resolveReport = async (reportId) => {
  const response = await api.put(`/condition-reports/${reportId}/resolve`);
  return response.data;
};
