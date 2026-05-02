import React from "react";
import "./Errorpage.css";

const Errorpage = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">✅ Account Restored!</h1>

      <p className="error-message">
        Your package will be dispatched soon. Stay active and keep checking to track your package.
      </p>
    </div>
  );
};

export default Errorpage;