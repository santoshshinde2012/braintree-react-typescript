import apiFactory from '../utils/api-factory';

export const validateUserLoginCredentials = async () => {
  const response = await apiFactory().get('/mock-data/loginCredentials.json');

  return response.data;
};
