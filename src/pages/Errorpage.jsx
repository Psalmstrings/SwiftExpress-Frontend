import React from 'react';
import './Errorpage.css';

const Errorpage = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">Server Down</h1>
      <p className="error-message">Server Down time due to delay in Pick up, 500$ to reactivate your delivery and get new tracking ID</p>
    </div>
  );
};

export default Errorpage;
