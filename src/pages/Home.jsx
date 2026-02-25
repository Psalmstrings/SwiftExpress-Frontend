import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Home() {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* NAVBAR */}
      <nav className="nav">
        <div className="logo">SwiftExpress</div>
        {/* <ul>
          <li>Home</li>
          <li>Services</li>
          <li>Track</li>
          <li>Contact</li>
        </ul> */}
      </nav>

      {/* HERO SECTION */}
      <header className="hero">
        <div className="hero-content">
          <h1>
            Fast, Secure & Reliable  
            <span> Delivery Service</span>
          </h1>
          <p>
            Track packages in real-time, enjoy swift deliveries, and experience 
            world-class logistics solutions designed for your comfort.
          </p>

          <div className="track-box">
            <input
              type="text"
              placeholder="Enter Tracking Number"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button onClick={() => navigate(`/track/${id}`)}>
              Track Package
            </button>
          </div>
        </div>

        {/* <div className="hero-img"></div> */}
      </header>

      {/* FEATURES */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">

          <div className="feature-card">
            <div className="icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Speed is our priority. Your package gets delivered swiftly and safely.</p>
          </div>

          <div className="feature-card">
            <div className="icon">📦</div>
            <h3>Real-Time Tracking</h3>
            <p>Stay updated every second with our advanced tracking system.</p>
          </div>

          <div className="feature-card">
            <div className="icon">🌍</div>
            <h3>Nationwide Coverage</h3>
            <p>We deliver across all states with maximum efficiency.</p>
          </div>

          <div className="feature-card">
            <div className="icon">🔒</div>
            <h3>Secure Handling</h3>
            <p>Your item is protected and handled with utmost care.</p>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta">
        <h2>Ready to Ship Something?</h2>
        <p>Let’s help you move your package safely and quickly.</p>
        <button className="cta-btn">Get Started</button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 SwiftExpress Logistics. All Rights Reserved.</p>
      </footer>
    </div>
  );
}