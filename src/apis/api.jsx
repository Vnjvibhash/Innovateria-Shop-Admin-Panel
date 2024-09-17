// api.jsx
import axios from 'axios';

const getToken = () => localStorage.getItem('token');

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Function to handle login
export const loginUser = async (email, password) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  try {
    const response = await api.post('/users/login', formData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Function to add a new user
export const addUser = async (userData) => {
  try {
    const response = await api.post('/users/create', userData);
    return response.data;
  } catch (error) {
    console.error('Error during adding user:', error);
    throw error;
  }
};

// Function to log out
export const logoutUser = async () => {
  try {
    const response = await api.post('/users/logout');
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

// Function to get all categories
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

// Function to get all Users
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};

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

