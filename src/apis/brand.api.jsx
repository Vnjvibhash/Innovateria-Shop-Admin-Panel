import { api } from './config';

// Function to get all brands
export const getBrands = async () => {
  try {
    const response = await api.get('/brands');
    return response.data;
  } catch (error) {
    console.error('Error getting brands:', error);
    throw error;
  }
};
