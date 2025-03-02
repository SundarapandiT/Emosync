import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="hero-section">
      <div className='hero-text'>
        <h1>Music <span className="highlight">Recommendation</span> System</h1>
        <p>Our AI-powered system reads your emotions and recommends the perfect playlist to match your vibe.
           Discover the music that understands you. Sync your emotions with <b>Emosync!</b></p>
        <Link to="/getemotion" className="glow-button">Get Started and Listen!</Link>
      </div>
      {/* <div className='hero-image'>
        <img src="/emosync bg1.jpg" alt="Emosync UI" />
      </div> */}
    </main>
  );
};

export default Home;
