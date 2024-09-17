import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiBox, FiLogOut } from 'react-icons/fi';
import {
  BsPeopleFill,
  BsFillBellFill,
  BsFillTagFill,
} from 'react-icons/bs';
import {
  FaClipboardCheck,
  FaBuilding,
  FaImage,
} from 'react-icons/fa';
import {
  AiOutlineAppstore,
  AiFillAppstore,
} from 'react-icons/ai';
import { RiPriceTag2Line } from 'react-icons/ri';

import { logoutUser } from '../apis/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('token');
      localStorage.removeItem('valid');
      localStorage.removeItem('role');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Code With Vnj
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/admin/dashboard"
                  className={`nav-link text-white px-0 align-middle ${
                    location.pathname === '/admin/dashboard' ? 'active' : ''
                  }`}
                >
                  <FiHome className="fs-4 ms-2 me-2" />
                  Dashboard
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin/users"
                  className={`nav-link px-0 align-middle text-white ${
                    location.pathname === '/admin/users' ? 'active' : ''
                  }`}
                >
                  <BsPeopleFill className="fs-4 ms-2 me-2" />
                  Users
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin/categories"
                  className={`nav-link px-0 align-middle text-white ${
                    location.pathname === '/admin/categories' ? 'active' : ''
                  }`}
                >
                  <AiFillAppstore className="fs-4 ms-2 me-2" />
                  Categories
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin/products"
                  className={`nav-link px-0 align-middle text-white ${
                    location.pathname === '/admin/products' ? 'active' : ''
                  }`}
                >
                  <FiBox className="fs-4 ms-2 me-2" />
                  Products
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin/subcategories"
                  className={`nav-link px-0 align-middle text-white ${
                    location.pathname === '/admin/subcategories' ? 'active' : ''
                  }`}
                >
                  <AiOutlineAppstore className="fs-4 ms-2 me-2" />
                  Sub Category
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin/variants"
                  className={`nav-link px-0 align-middle text-white ${
                    location.pathname === '/admin/variants' ? 'active' : ''
                  }`}
                >
                  <FaClipboardCheck className="fs-4 ms-2 me-2" />
                  Variants
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin/variants-type"
                  className={`nav-link px-0 align-middle text-white ${
                    location.pathname === '/admin/variants-type' ? 'active' : ''
                  }`}
                >
                  <RiPriceTag2Line className="fs-4 ms-2 me-2" />
                  Variants-Type
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin/coupons"
                  className={`nav-link px-0 align-middle text-white ${
                    location.pathname === '/admin/coupons' ? 'active' : ''
                  }`}
                >
                  <BsFillTagFill className="fs-4 ms-2 me-2" />
                  Coupons
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin/brand"
                  className={`nav-link px-0 align-middle text-white ${
                    location.pathname === '/admin/brand' ? 'active' : ''
                  }`}
                >
                  <FaBuilding className="fs-4 ms-2 me-2" />
                  Brand
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin/poster"
                  className={`nav-link px-0 align-middle text-white ${
                    location.pathname === '/admin/poster' ? 'active' : ''
                  }`}
                >
                  <FaImage className="fs-4 ms-2 me-2" />
                  Poster
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin/notifications"
                  className={`nav-link px-0 align-middle text-white ${
                    location.pathname === '/admin/notifications' ? 'active' : ''
                  }`}
                >
                  <BsFillBellFill className="fs-4 ms-2 me-2" />
                  Notifications
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <FiLogOut className="fs-4 ms-2 me-2" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Innovateria Shop Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
