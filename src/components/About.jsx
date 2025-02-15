import React from "react";

function About() {
  return (
    <div className="about-body">
      <h1>About Emosync - Emotion-Based Music Recommendation System</h1>
      <p>
        Welcome to <b>Emosync</b>, an innovative and interactive music recommendation platform that syncs your emotions with music.
        Our system uses advanced facial emotion detection technology to analyze your real-time emotions and provide personalized 
        music recommendations, creating a seamless and emotionally-driven music experience.
        <br />
        <i>Developed by BE(CSE)-2025: Sundarapandi T, Sasikumar R, Raviprakasham MT, Gokul R</i>
      </p>

      <h2>Why Emosync?</h2>
      <p>
        Emotions play a significant role in our daily lives, influencing our choices, behaviors, and even the music we listen to. 
        Traditional music recommendation systems rely on user preferences, playlists, or search history, which may not always 
        reflect your current emotional state. <b>Emosync</b> bridges this gap by:
      </p>
      <ul>
        <li>Detecting your facial expressions using <b>React (GetEmotion.jsx)</b> in the frontend.</li>
        <li>Analyzing your emotions with a <b>Flask backend</b> powered by Machine Learning.</li>
        <li>Recommending songs that align with your mood using our app playlist (<b>MusicPlayer.jsx</b>).</li>
      </ul>

      <h2>Future Enhancements</h2>
      <p>We are constantly working to improve Emosync and make it a more immersive experience. Here are some future enhancements:</p>
      <ul>
        <li><b>Spotify Login:</b> Allow users to log in to their Spotify accounts for personalized playlists.</li>
        <li><b>Advanced Emotion Analysis:</b> Incorporate nuanced emotions and combine them with user preferences.</li>
        <li><b>Mobile App Version:</b> Develop a mobile version of Emosync for easy access.</li>
        <li><b>Voice & Gesture Recognition:</b> Add support for voice commands and gesture controls.</li>
      </ul>

      <h2>Our Vision</h2>
      <p>
        At <b>Emosync</b>, our vision is to revolutionize the way people interact with music by making it more intuitive, emotional, and personal. 
        We believe that music has the power to heal, uplift, and connect people, and our goal is to provide a platform that resonates with every user's emotional journey.
      </p>
      <p>
        <b>Discover the music that understands you. Sync your emotions with Emosync!</b>
      </p>
    </div>
  );
}

export default About;
