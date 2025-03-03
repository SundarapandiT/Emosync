import React from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="hero-section">
      <div className='hero-text'>
        <h1>Music <span className="highlight">Recommendation</span> System</h1>
        <p>Our AI-powered system reads your emotions and recommends the perfect playlist to match your vibe.
           Discover the music that understands you. Sync your emotions with <b>Emosync!</b></p>
         <button className="glow-button" onClick={() => navigate("/getemotion")}>
          Get Started and Listen!
        </button>
      </div>
      {/* <div className='hero-image'>
        <img src="/emosync bg1.jpg" alt="Emosync UI" />
      </div> */}
    </main>
  );
};

export default Home;
