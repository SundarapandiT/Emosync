import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MusicPlayer from './components/MusicPlayer';
import GetEmotion from './components/GetEmotion';
import About from './components/About';
import './index.css'; // Import the external CSS file
import "./about.css";
import './musicplayer.css';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import icons

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Intro Page Route */}
        <Route
          path="/"
          element={
            <div>
              
              <header className="header">
                <div className="logo">
                  <img src="emosync_logo.png" alt="logo" /><h1>Emosync</h1>
                </div>
              

                {/* Hamburger Menu Button */}
                <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                  <div className={menuOpen ? "bar open" : "bar"}></div>
                  <div className={menuOpen ? "bar open" : "bar"}></div>
                  <div className={menuOpen ? "bar open" : "bar"}></div>
                </div>

                <nav className={`nav ${menuOpen ? "active" : ""}`}>
                  <ul className="nav-list">
                    <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
                    <li><Link to="/musicplayer" onClick={() => setMenuOpen(false)}>Songs</Link></li>
                    <li><Link to="#" onClick={() => setMenuOpen(false)}>Help</Link></li>
                  </ul>
                </nav>

                <div className="auth">
                  <Link to="#" className="auth-button">Let's Connect</Link>
                </div>
              </header>

              <main>
                <div className='container'>
                  <h1>Music Recommendation System</h1>
                  <h3>Let Your Emotions Choose the Music!</h3>
                  <p>Our AI-powered system reads your emotions and recommends the perfect playlist to match your vibe.
                    Discover the music that understands you. Sync your emotions with <b>Emosync!</b>
                  </p>
                  <Link to="/getemotion">
                    <button>Get Started and Listening!</button>
                  </Link>
                </div>
                <div className='picture'>
                  <img src="emosync bg1.jpg" alt="emosync picture" />
                </div>
              </main>

              {/* Footer */}
              <footer className="footer">
                <div className="footer-content">
                  <p>Created by BE(CSE) - 2025 Batch:</p>
                  <p><b>Sundarapandi T, Sasikumar R, Raviprakasham MT, Gokul R</b></p>
                  <div className="footer-links">
                    <a href="https://www.linkedin.com/in/sundarapandi-t-5a1772247/" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin size={24} />
                    </a>
                    <a href="mailto:sundarapandi1707@gmail.com">
                      <FaEnvelope size={24} />
                    </a>
                  </div>
                </div>
                <p className="footer-copyright">© 2025 Emosync. All Rights Reserved.</p>
              </footer>

            </div>
          }
        />

        {/* Other Routes */}
        <Route path="/getemotion" element={<GetEmotion />} />
        <Route path="/musicplayer" element={<MusicPlayer />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
