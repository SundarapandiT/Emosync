import React, { useState,useRef, } from 'react';
import YouTube from 'react-youtube'; 
import { FaPlay, FaPause, FaBackward, FaForward } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// import { SiAudiomack } from "react-icons/si";

const playlist = [
    {
      type: "cheerful",
      songs: [
        { title: "Pala Palakura", artist: "Artist 1", url: "https://www.youtube.com/watch?v=MIr1BGfFx2w" }, 
        { title: "Po Indru Neeyaga", artist: "Artist 2", url: "https://www.youtube.com/watch?v=xSrgt6QG0nE" },
        { title: "Aathadi Aathadi", artist: "Artist 3", url: "https://www.youtube.com/watch?v=MGjBQDrtGbA" },
        { title: "Manasilaayo", artist: "Artist 4", url: "https://www.youtube.com/watch?v=AiD6SOOBKZI" },
        { title: "Arabic Kuthu", artist: "Artist 5", url: "https://www.youtube.com/watch?v=8FAUEv_E_xQ" }
      ]
    },
    {
      type: "Melancholy",
      songs: [
        { title: "Kanave Kanave", artist: "Artist 1", url: "https://www.youtube.com/watch?v=MofM9B2NZpY" },
        { title: "Ennodu Nee Irunthal", artist: "Artist 2", url: "https://www.youtube.com/watch?v=1bQHXTUzX_k" },
        { title: "Po Nee Po", artist: "Artist 3", url: "https://www.youtube.com/watch?v=LFYdyFHVVR8" },
        { title: "Shoot the Kuruvi", artist: "Artist 4", url: "https://www.youtube.com/watch?v=3yPst9pIp7s" },
        { title: "Yamma Yamma", artist: "Artist 5", url: "https://www.youtube.com/watch?v=r9YH9ssOozk" }
      ]
    },
    {
      type: "Balanced Calm",
      songs: [
        { title: "Valayapatti Thavilu", artist: "Artist 1", url: "https://www.youtube.com/watch?v=Z3_W8qVf9Kw" },
        { title: "Vaada Maaplila", artist: "Artist 2", url: "https://www.youtube.com/watch?v=JUmqlpbqfJQ" },
        { title: "Bhoomi Enna Suthuthe", artist: "Artist 3", url: "https://www.youtube.com/watch?v=RqaOWVQw4us" },
        { title: "Selfie Pulla", artist: "Artist 4", url: "https://www.youtube.com/watch?v=XXVj8V1_M4w" }
      ]
    },
    {
      type: "Stormy",
      songs: [
        { title: "Munbe Vaa", artist: "A.R. Rahman", url: "https://www.youtube.com/watch?v=n1RSHgx8o2Q" },
        { title: "New York Nagaram", artist: "A.R. Rahman", url: "https://www.youtube.com/watch?v=XzYp9GJlgxI" },
        { title: "Enna Solla Pogirai", artist: "Shankar Mahadevan", url: "https://www.youtube.com/watch?v=Yx7fhdzY-QA" },
        { title: "Kannalane", artist: "K.S. Chithra", url: "https://www.youtube.com/watch?v=ZZfZvktgTbI" }
      ]
    },
    {
      type: "Haunting",
      songs: [
        { title: "Nenjukkul Peidhidum", artist: "Hariharan", url: "https://www.youtube.com/watch?v=HnmTSJKXNOM" },
        { title: "Thalli Pogathey", artist: "Sid Sriram", url: "https://www.youtube.com/watch?v=9uB5wzRgjAA" },
        { title: "Uyire Uyire", artist: "Hariharan", url: "https://www.youtube.com/watch?v=pRbREgHqgEA" },
        { title: "Kaadhal Rojave", artist: "S.P. Balasubrahmanyam", url: "https://www.youtube.com/watch?v=aeBfaYWQfpM" }
      ]
    }
  ];

  const Songs = () => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const playerRef = useRef(null);
    const navigate = useNavigate();
  
    const handleProgress = (e) => {
      if (e.data === 1) {
        const interval = setInterval(() => {
          const player = playerRef.current;
          if (player && player.getInternalPlayer) {
            const ytPlayer = player.getInternalPlayer();
            ytPlayer.getCurrentTime().then(currentTime => {
              ytPlayer.getDuration().then(duration => {
                setProgress((currentTime / duration) * 100);
              });
            });
          }
        }, 1000);
        return () => clearInterval(interval);
      }
    };
  
    const togglePlayPause = () => {
      const ytPlayer = playerRef.current.getInternalPlayer();
      if (isPlaying) {
        ytPlayer.pauseVideo();
      } else {
        ytPlayer.playVideo();
      }
      setIsPlaying(!isPlaying);
    };
  
    const prevSong = () => {
      const type = playlist.find(p => p.songs.some(s => s === currentSong));
      const idx = type.songs.indexOf(currentSong);
      if (idx > 0) {
        setCurrentSong(type.songs[idx - 1]);
        setProgress(0);
        setIsPlaying(true);
      }
    };
  
    const nextSong = () => {
      const type = playlist.find(p => p.songs.some(s => s === currentSong));
      const idx = type.songs.indexOf(currentSong);
      if (idx < type.songs.length - 1) {
        setCurrentSong(type.songs[idx + 1]);
        setProgress(0);
        setIsPlaying(true);
      }
    };
  
    return (
      <div className="--allsongs-container">
        <h1 className="--allsongs-title">🎧 Mood-Based Music Player</h1><br />
        <button className="glow-button" onClick={() => navigate("/getemotion")}>
          Lets find your mood and listen to music!
        </button>
  
        {playlist.map((type, index) => (
          <div key={index} className="--allsongs-section">
            <h2 className="--allsongs-type-title">{type.type.toUpperCase()}</h2>
            <div className="--allsongs-scroll-list">
              {type.songs.map((song, idx) => (
                <div
                  key={idx}
                  className={`--allsongs-song-card ${currentSong?.url === song.url ? '--playing' : ''}`}
                  onClick={() => {
                    setCurrentSong(song);
                    setProgress(0);
                    setIsPlaying(true);
                  }}
                >
                  <p className="--allsongs-song-title">{song.title}</p>
                  <p className="--allsongs-song-artist">{song.artist}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
  
        {currentSong && (
          <div className="--allsongs-player">
            <p><strong>Now Playing:</strong> {currentSong.title} by {currentSong.artist}</p>
            <YouTube
              videoId={currentSong.url.split('v=')[1]}
              opts={{
                height: '0',
                width: '0',
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                  iv_load_policy: 3
                }
              }}
              onStateChange={handleProgress}
              ref={playerRef}
            />
  
            <progress className="--allsongs-progress" value={progress} max="100"></progress>
  
            <div className="--allsongs-controls">
              <button onClick={prevSong}><FaBackward /></button>
              <button onClick={togglePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={nextSong}><FaForward /></button>
            </div>
          </div>
        )}
      </div>
    );
  };

export default Songs;
