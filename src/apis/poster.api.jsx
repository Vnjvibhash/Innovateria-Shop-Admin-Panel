import { api } from './config';

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

// Function to add a new poster
export const createPoster = async (posterData) => {
  try {
    const response = await api.post('/posters', posterData);
    return response.data;
  } catch (error) {
    console.error('Error adding poster:', error);
    throw error;
  }
};

// Function to update a poster
export const updatePoster = async (posterId, posterData) => {
  try {
    const response = await api.put(`/posters/${posterId}`, posterData);
    return response.data;
  } catch (error) {
    console.error('Error updating poster:', error);
    throw error;
  }
};

// Function to delete a poster
export const deletePoster = async (posterId) => {
  try {
    const response = await api.delete(`/posters/${posterId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting poster:', error);
    throw error;
  }
};
