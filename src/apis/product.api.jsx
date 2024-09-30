import { api } from './config';

// Function to get all products
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};
