import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UserDetails from './admin/pages/UserDetails';
import Users from './admin/pages/Users';
import Categories from './admin/pages/Categories';
import Profile from './admin/pages/Profile';
import Login from './frontend/pages/Login';
import AdminHome from './admin/pages/AdminHome';
import PrivateRoute from './components/PrivateRoute';
import Products from './admin/pages/Products';
import Home from './frontend/pages/Home';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<AdminHome />} />
          <Route path="users" element={<Users />} />
          <Route path="user_details" element={<UserDetails />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
