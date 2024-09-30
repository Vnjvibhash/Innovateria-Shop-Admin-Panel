import { api } from './config';

// Function to get all variants
export const getVariants = async () => {
  try {
    const response = await api.get('/variants');
    return response.data;
  } catch (error) {
    console.error('Error getting variants:', error);
    throw error;
  }
};
