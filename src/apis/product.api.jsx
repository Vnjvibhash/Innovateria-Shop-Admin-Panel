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

// Function to get product by id
export const getProduct = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

// Function to create product
export const createProduct = async (product) => {
  try {
    const response = await api.post('/products', product);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Function to update product
export const updateProduct = async (productId,product) => {
  try {
    const response = await api.put(`/products/${productId}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Function to delete product
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};


