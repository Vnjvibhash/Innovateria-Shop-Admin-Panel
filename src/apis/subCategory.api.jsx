import { api } from './config';

// Function to get all subcategories
export const getSubcategories = async () => {
  try {
    const response = await api.get('/sub-categories');
    return response.data;
  } catch (error) {
    console.error('Error getting subcategories:', error);
    throw error;
  }
};
