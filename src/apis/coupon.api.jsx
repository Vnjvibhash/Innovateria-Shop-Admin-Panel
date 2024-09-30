import { api } from './config';

// Function to get all coupons
export const getCoupons = async () => {
  try {
    const response = await api.get('/coupons');
    return response.data;
  } catch (error) {
    console.error('Error getting coupons:', error);
    throw error;
  }
};
