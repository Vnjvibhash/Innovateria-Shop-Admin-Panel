import { api } from './api';

// Function to handle login
export const loginUser = async (identifier, password) => {
  const formData = new FormData();
  formData.append('identifier', identifier);
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

// Function to add a new user
export const addUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error during adding user:', error);
    throw error;
  }
};

// Function to update a user
export const updateUser = async (userId, userData) => {
  try {
    console.log(userId, userData);
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error during updating user:', error);
    throw error;
  }
};

// Function to delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error during deleting user:', error);
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
