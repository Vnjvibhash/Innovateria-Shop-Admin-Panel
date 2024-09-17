import React, { useState } from 'react';
import '../styles/style.css';
import { loginUser } from '../apis/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [checked, setCheckBox] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const setCheckBoxVal = (val) => {
    console.log(val.target.checked);
    setCheckBox(val.target.checked);
  };

  const handleSubmit = async (event) => {
    if (checked) {
      event.preventDefault();
      try {
        const result = await loginUser(values.email, values.password);
        if (result.success) {
          localStorage.setItem('valid', true);
          if (result.user.role === 'admin') {
            localStorage.setItem('role', 'admin');
            navigate('/dashboard');
          } else if (result.user.role === 'user') {
            localStorage.setItem('role', 'user');
            navigate('/');
          }
          setValues({ email: '', password: '' });
          setCheckBoxVal(false);
          console.log('Login successful', result);
        } else {
          console.log('Error:', result.message);
        }
      } catch (error) {
        console.error('Error during login', error);
      }
    } else {
      setError('Please agree with terms & conditions');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-50 border loginForm">
        <div className="text-warning">{error && error}</div>
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Log in
          </button>
          <div className="mb-1">
            <input
              type="checkbox"
              name="tick"
              id="tick"
              className="me-2"
              onChange={(val) => setCheckBoxVal(val)}
            />
            <label htmlFor="tick">You agree with terms & conditions</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
