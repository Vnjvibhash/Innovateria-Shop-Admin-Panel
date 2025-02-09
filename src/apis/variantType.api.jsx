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

// Finction to create VariantTypes
export const createVariantType = async (variantType) => {
  try {
    const response = await api.post('/variant-types', variantType);
    return response.data;
  } catch (error) {
    console.error('Error creating variant type:', error);
    throw error;
  }
};

// Function to update VariantTypes
export const updateVariantType = async (id, variantType) => {
  try {
    const response = await api.put(`/variant-types/${id}`, variantType);
    return response.data;
  } catch (error) {
    console.error('Error updating variant type:', error);
    throw error;
  }
};

// Function to delete VariantTypes
export const deleteVariantType = async (id) => {
  try {
    const response = await api.delete(`/variant-types/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting variant type:', error);
    throw error;
  }
};

