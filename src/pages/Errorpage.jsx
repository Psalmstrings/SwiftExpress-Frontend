import React, { useState, useEffect } from "react";
import "./Errorpage.css";

const Errorpage = () => {
  // ⏳ 20 minutes = 1200 seconds
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Convert sec → mm:ss
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="error-container">
      {!expired ? (
        <>
          <h1 className="error-title">⚠️ Account Reactivation</h1>

          <p className="error-message">
            <strong>Account Reactivation loading… 90%</strong>
          </p>

          <p className="error-message">
            ⏳ Time Left: <strong>{formatTime(timeLeft)}</strong>
          </p>

          <p className="error-note">
            <strong>Note:</strong> Kindly repay the <strong>$600</strong> fee
            now within <strong>20 minutes</strong> to avoid Account Blockage and
            Package being impounded.
          </p>
        </>
      ) : (
        <h1 className="error-title" style={{ color: "red" }}>
          ❌ Account Deleted! Package Impounded!
        </h1>
      )}
    </div>
  );
};

export default Errorpage;