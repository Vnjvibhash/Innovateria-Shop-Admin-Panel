import { api } from './config';

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

// Function to get a coupon by ID
export const getCoupon = async (id) => {
  try {
    const response = await api.get(`/coupons/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting coupon:', error);
    throw error;
  }
};

// Function to create a coupon
export const createCoupon = async (coupon) => {
  try {
    const response = await api.post('/coupons', coupon);
    return response.data;
  } catch (error) {
    console.error('Error creating coupon:', error);
    throw error;
  }
};

// Function to update a coupon  
export const updateCoupon = async (id, coupon) => {
  try {
    const response = await api.put(`/coupons/${id}`, coupon);
    return response.data;
  } catch (error) {
    console.error('Error updating coupon:', error);
    throw error;
  }
};

// Function to delete a coupon
export const deleteCoupon = async (id) => {
  try {
    const response = await api.delete(`/coupons/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting coupon:', error);
    throw error;
  }
};

// Function to validate a coupon
export const validateCoupon = async (couponCode) => {
  try {
    const response = await api.post('/coupons/validate', { couponCode });
    return response.data;
  } catch (error) {
    console.error('Error validating coupon:', error);
    throw error;
  }
};

