import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UserDetails from './admin/pages/UserDetails';
import Users from './admin/pages/Users';
import Categories from './admin/pages/Categories';
import Login from './frontend/pages/Login';
import AdminHome from './admin/pages/AdminHome';
import PrivateRoute from './components/PrivateRoute';
import Products from './admin/pages/Products';
import SubCategories from './admin/pages/SubCategories';

import Home from './frontend/pages/Home';
import Variants from './admin/pages/Variants';
import VariantTypes from './admin/pages/VariantTypes';
import Coupons from './admin/pages/Coupons';
import Brands from './admin/pages/Brands';
import Posters from './admin/pages/Posters';
import Notifications from './admin/pages/Notifications';

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
          <Route path="subcategories" element={<SubCategories />} />
          <Route path="variants" element={<Variants />} />
          <Route path="variants-type" element={<VariantTypes />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="brands" element={<Brands />} />
          <Route path="posters" element={<Posters />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
