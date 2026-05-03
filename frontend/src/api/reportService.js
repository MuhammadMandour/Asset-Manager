import api from './axios';

export const getUsageStatistics = async (from, to) => {
  const response = await api.get('/reports/usage', { params: { from, to } });
  return response.data;
};

export const getConditionSummary = async () => {
  const response = await api.get('/reports/conditions');
  return response.data;
};

export const getAllocationHistory = async (assetId) => {
  const response = await api.get(`/reports/allocation/${assetId}`);
  return response.data;
};
