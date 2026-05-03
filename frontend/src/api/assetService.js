import api from './axios';

export const getAllAssets = async (page = 0, size = 10) => {
  const response = await api.get(`/assets?page=${page}&size=${size}`);
  return response.data;
};

export const searchAssets = async (params) => {
  const response = await api.get('/assets/search', { params });
  return response.data;
};

export const getAssetById = async (id) => {
  const response = await api.get(`/assets/${id}`);
  return response.data;
};

export const createAsset = async (assetData) => {
  const response = await api.post('/assets', assetData);
  return response.data;
};

export const updateAsset = async (id, assetData) => {
  const response = await api.put(`/assets/${id}`, assetData);
  return response.data;
};

export const deleteAsset = async (id) => {
  const response = await api.delete(`/assets/${id}`);
  return response.data;
};

export const assignAsset = async (id, userId) => {
  const response = await api.post(`/assets/${id}/assign`, { userId });
  return response.data;
};

export const unassignAsset = async (id) => {
  const response = await api.post(`/assets/${id}/unassign`);
  return response.data;
};

export const getSpareAssets = async () => {
  const response = await api.get('/assets/spares');
  return response.data;
};
