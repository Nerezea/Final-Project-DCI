import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './landing.module.scss';

const Landing = () => {
  const navigate = useNavigate();

  function handleLogin() {
    navigate('/login');
  }

  return (
    <>
      
    <div className={style.landing} >
      <h1>Landing</h1>
      <button onClick={handleLogin}>Go to Login</button>
    </div>
    </>
  );
};

export default Landing;
