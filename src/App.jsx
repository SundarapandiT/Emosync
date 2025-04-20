import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { SiAudiomack } from "react-icons/si";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import Home from "./components/Home";
import MusicPlayer from "./components/MusicPlayer";
import GetEmotion from "./components/GetEmotion";
import About from "./components/About";
import Songs from "./components/Songs";
import { supabase } from "./components/supabaseClient";
import "./about.css";
import "./musicplayer.css";
import "./songs.css";
import "./login.css"
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Check user authentication status on page load
  useEffect(() => {
    const getUser = async () => {
      setUser(JSON.parse(localStorage.getItem('user'))|| null);
    };
    getUser();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem("user");
  };

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
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/songs" onClick={() => setMenuOpen(false)}>
                  Songs
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => setMenuOpen(false)}>
                  Help
                </Link>
              </li>
            </ul>
          </nav>

          {/* Authentication Section */}
          <div className="auth">
            {user ? (
              <div className="user-menu">
                <FaUserCircle
                  size={32}
                  className="user-icon"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="dropdown">
                    <p style={{color:'green',fontWeight:"600"}}>{user.name}</p> <br />
                    <button onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="glow-button">
                Let's Connect
              </Link>
            )}
          </div>
        </header>

        {/* Routing for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getemotion" element={<GetEmotion />} />
          <Route path="/musicplayer" element={<MusicPlayer />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/songs" element={<Songs />} />
        </Routes>

        <footer className="footer">
          <div className="footer-content">
            <p>Created by BE(CSE) - 2025 Batch:</p>
            <p>
              <b>Sundarapandi T, Sasikumar R, Raviprakasham MT, Gokul R</b>
            </p>
            <div className="footer-links">
              <a href="" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} />
              </a>
              <a href="">
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
          <p className="footer-copyright">
            © 2025 Emosync. All Rights Reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
