// api.jsx
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getToken = () => localStorage.getItem('token');

export const api = axios.create({
  baseURL: 'https://innovateria-shop-server.vercel.app/api/v1',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = "Berear "+token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      const navigate = useNavigate();
      localStorage.removeItem('token');
      navigate('/login');
    }
    return Promise.reject(error);
  },
);

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

// Function to get all orders

