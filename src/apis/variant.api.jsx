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

// Function to create a variant
export const createVariant = async (variant) => {
  try {
    const response = await api.post('/variants', variant);
    return response.data;
  } catch (error) {
    console.error('Error creating variant:', error);
    throw error;
  }
};

// Function to update a variant
export const updateVariant = async (id, variant) => {
  try {
    const response = await api.put(`/variants/${id}`, variant);
    return response.data;
  } catch (error) {
    console.error('Error updating variant:', error);
    throw error;
  }
};

// Function to delete a variant
export const deleteVariant = async (id) => {
  try {
    const response = await api.delete(`/variants/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting variant:', error);
    throw error;
  }
};

