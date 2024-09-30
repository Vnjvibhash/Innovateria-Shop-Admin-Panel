import { api } from './config';

// Function to get all variant types
export const getVariantTypes = async () => {
  try {
    const response = await api.get('/variant-types');
    return response.data;
  } catch (error) {
    console.error('Error getting variant types:', error);
    throw error;
  }
};
