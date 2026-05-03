import api from './axios';

export const getConfig = async () => {
  const response = await api.get('/alerts/config');
  return response.data;
};

export const updateConfig = async (configData) => {
  const response = await api.put('/alerts/config', configData);
  return response.data;
};
