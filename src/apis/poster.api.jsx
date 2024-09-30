import { api } from './config';

// Function to get all posters
export const getPosters = async () => {
  try {
    const response = await api.get('/posters');
    return response.data;
  } catch (error) {
    console.error('Error getting posters:', error);
    throw error;
  }
};
