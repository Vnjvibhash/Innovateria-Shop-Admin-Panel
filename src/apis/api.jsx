// api.jsx
import axios from 'axios';

// Create an instance of Axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});

// Function to get the Bearer token from localStorage
const getToken = () => localStorage.getItem('token');

// Set up an interceptor to include the Bearer token in headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
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
    const response = await api.post('/user/login', formData);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Function to add a new user
export const addUser = async (userData) => {
  try {
    const response = await api.post('/user/add', userData);
    return response.data;
  } catch (error) {
    console.error('Error during adding user:', error);
    throw error;
  }
};

// Function to log out
export const logoutUser = async () => {
  try {
    const response = await api.post('/user/logout');
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
