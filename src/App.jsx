import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import MusicPlayer from './components/MusicPlayer';
import GetEmotion from './components/GetEmotion';
import About from './components/About';
import { SiAudiomack } from "react-icons/si";
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './about.css'
import './musicplayer.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <div className="logo">
            <h1>Emosync</h1>
            <SiAudiomack size={40} color="#ff00ff" />
          </div>
          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={menuOpen ? "bar open" : "bar"}></div>
            <div className={menuOpen ? "bar open" : "bar"}></div>
            <div className={menuOpen ? "bar open" : "bar"}></div>
          </div>
          <nav className={`nav ${menuOpen ? "active" : ""}`}>
            <ul className="nav-list">
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
              <li><Link to="/musicplayer" onClick={() => setMenuOpen(false)}>Songs</Link></li>
              {/* <li><Link to="/getemotion" onClick={() => setMenuOpen(false)}>Get Emotion</Link></li> */}
              <li><Link to="#" onClick={() => setMenuOpen(false)}>Help</Link></li>
            </ul>
          </nav>
          <div className="auth">
            <Link to="#" className="glow-button">Let's Connect</Link>
          </div>
        </header>

        {/* Routing for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getemotion" element={<GetEmotion />} />
          <Route path="/musicplayer" element={<MusicPlayer />} />
          <Route path="/about" element={<About />} />
          
        </Routes>

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
    </Router>
  );
}

export default App;
