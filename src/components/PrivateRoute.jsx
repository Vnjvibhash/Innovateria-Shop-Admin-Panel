// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
  return localStorage.getItem('valid') === 'true';
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default PrivateRoute;
