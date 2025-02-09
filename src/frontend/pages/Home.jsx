import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div
      className="home-container"
      style={{ textAlign: 'center', marginTop: '50px' }}
    >
      <h1>Welcome to the Admin Panel</h1>
      <p>Please log in to access your dashboard.</p>
      <button onClick={handleLoginClick} variant="primary">
        Go to Login
      </button>
    </div>
  );
};

export default Home;
