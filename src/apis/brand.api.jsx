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

// Function to add a new brand
export const createBrand = async (brandData) => {
  try {
    const response = await api.post('/brands', brandData);
    return response.data;
  } catch (error) {
    console.error('Error adding brand:', error);
    throw error;
  }
};

// Function to update a brand
export const updateBrand = async (brandId, brandData) => {
  try {
    const response = await api.put(`/brands/${brandId}`, brandData);
    return response.data;
  } catch (error) {
    console.error('Error updating brand:', error);
    throw error;
  }
};

// Function to delete a brand
export const deleteBrand = async (brandId) => {
  try {
    const response = await api.delete(`/brands/${brandId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting brand:', error);
    throw error;
  }
};
