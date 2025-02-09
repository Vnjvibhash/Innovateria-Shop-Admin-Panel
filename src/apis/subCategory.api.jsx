import { api } from './config';

// Function to get all subcategories
export const getSubCategories = async () => {
  try {
    const response = await api.get('/sub-categories');
    return response.data;
  } catch (error) {
    console.error('Error getting subcategories:', error);
    throw error;
  }
};

// Function to get subcategories by category ID
export const getSubCategoriesByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/sub-categories/cat/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting subcategories by category ID:', error);
    throw error;
  }
};

// Function to add a new subcategory
export const createSubCategory = async (subcategoryData) => {
  try {
    const response = await api.post('/sub-categories', subcategoryData);
    return response.data;
  } catch (error) {
    console.error('Error adding subcategory:', error);
    throw error;
  }
};

// Function to update a subcategory
export const updateSubCategory = async (subcategoryId, subcategoryData) => {
  try {
    const response = await api.put(`/sub-categories/${subcategoryId}`, subcategoryData);
    return response.data;
  } catch (error) {
    console.error('Error updating subcategory:', error);
    throw error;
  }
};

// Function to delete a subcategory
export const deleteSubCategory = async (subcategoryId) => {
  try {
    const response = await api.delete(`/sub-categories/${subcategoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    throw error;
  }
};


