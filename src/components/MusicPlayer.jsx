import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube'; 
import { FaPlay, FaPause, FaBackward, FaForward } from 'react-icons/fa';


const playlist = [
  {
    type: "happy",
    songs: [
      { title: "Pala Palakura", artist: "Artist 1", url: "https://www.youtube.com/watch?v=MIr1BGfFx2w" }, 
      { title: "Po Indru Neeyaga", artist: "Artist 2", url: "https://www.youtube.com/watch?v=xSrgt6QG0nE" },
      { title: "Aathadi Aathadi", artist: "Artist 3", url: "https://www.youtube.com/watch?v=MGjBQDrtGbA" },
      { title: "Manasilaayo", artist: "Artist 4", url: "https://www.youtube.com/watch?v=AiD6SOOBKZI" },
      { title: "Arabic Kuthu", artist: "Artist 5", url: "https://www.youtube.com/watch?v=8FAUEv_E_xQ" }
    ]
  },
  {
    type: "sad",
    songs: [
      { title: "Kanave Kanave", artist: "Artist 1", url: "https://www.youtube.com/watch?v=MofM9B2NZpY" },
      { title: "Ennodu Nee Irunthal", artist: "Artist 2", url: "https://www.youtube.com/watch?v=1bQHXTUzX_k" },
      { title: "Po Nee Po", artist: "Artist 3", url: "https://www.youtube.com/watch?v=LFYdyFHVVR8" },
      { title: "Shoot the Kuruvi", artist: "Artist 4", url: "https://www.youtube.com/watch?v=3yPst9pIp7s" },
      { title: "Yamma Yamma", artist: "Artist 5", url: "https://www.youtube.com/watch?v=r9YH9ssOozk" }
    ]
  },
  {
    type: "neutral",
    songs: [
      { title: "Valayapatti Thavilu", artist: "Artist 1", url: "https://www.youtube.com/watch?v=Z3_W8qVf9Kw" },
      { title: "Vaada Maaplila", artist: "Artist 2", url: "https://www.youtube.com/watch?v=JUmqlpbqfJQ" },
      { title: "Bhoomi Enna Suthuthe", artist: "Artist 3", url: "https://www.youtube.com/watch?v=RqaOWVQw4us" },
      { title: "Selfie Pulla", artist: "Artist 4", url: "https://www.youtube.com/watch?v=XXVj8V1_M4w" }
    ]
  },
  {
    type: "angry",
    songs: [
      { title: "Munbe Vaa", artist: "A.R. Rahman", url: "https://www.youtube.com/watch?v=n1RSHgx8o2Q" },
      { title: "New York Nagaram", artist: "A.R. Rahman", url: "https://www.youtube.com/watch?v=XzYp9GJlgxI" },
      { title: "Enna Solla Pogirai", artist: "Shankar Mahadevan", url: "https://www.youtube.com/watch?v=Yx7fhdzY-QA" },
      { title: "Kannalane", artist: "K.S. Chithra", url: "https://www.youtube.com/watch?v=ZZfZvktgTbI" }
    ]
  },
  {
    type: "fear",
    songs: [
      { title: "Nenjukkul Peidhidum", artist: "Hariharan", url: "https://www.youtube.com/watch?v=HnmTSJKXNOM" },
      { title: "Thalli Pogathey", artist: "Sid Sriram", url: "https://www.youtube.com/watch?v=9uB5wzRgjAA" },
      { title: "Uyire Uyire", artist: "Hariharan", url: "https://www.youtube.com/watch?v=pRbREgHqgEA" },
      { title: "Kaadhal Rojave", artist: "S.P. Balasubrahmanyam", url: "https://www.youtube.com/watch?v=aeBfaYWQfpM" }
    ]
  }
];

// Function to display a motivational message based on the detected emotion
const getMessage = (emotion) => {
  switch (emotion) {
    case "angry":
      return "ANGRY:Take a deep breath! Here are some tracks to help you relax and feel better. 🎶";
    case "fear":
      return "FEAR:You're not alone! Here's something soothing to bring comfort and courage. 💙";
    case "happy":
      return "HAPPY:Enjoy the moment! Here are some songs to keep the good vibes going. 🎉";
    case "sad":
      return "SAD:Everything will be okay! These songs might bring you some comfort. 🌧️";
    default:
      return "Here are some songs for you! 🎧";
  }
};

function MusicPlayer({ emotion, loading }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);  // Reference to YouTube player

  const filteredPlaylist = playlist.find((mylist) => mylist.type === emotion);

  // Handle YouTube player's progress
  const handleProgress = (event) => {
    const progress = (event.target.getCurrentTime() / event.target.getDuration()) * 100;
    setProgress(progress);
  };

  // Handle Play/Pause
  const togglePlayPause = () => {
    if (isPlaying) {
      playerRef.current.internalPlayer.pauseVideo();
    } else {
      playerRef.current.internalPlayer.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle Next Song
  const nextSong = () => {
    const currentIndex = filteredPlaylist.songs.findIndex(song => song.title === currentSong.title);
    const nextIndex = (currentIndex + 1) % filteredPlaylist.songs.length;
    setCurrentSong(filteredPlaylist.songs[nextIndex]);
    playerRef.current.internalPlayer.loadVideoById(filteredPlaylist.songs[nextIndex].url.split('v=')[1]);
    setIsPlaying(true); // Automatically play the next song
  };

  // Handle Previous Song
  const prevSong = () => {
    const currentIndex = filteredPlaylist.songs.findIndex(song => song.title === currentSong.title);
    const prevIndex = (currentIndex - 1 + filteredPlaylist.songs.length) % filteredPlaylist.songs.length;
    setCurrentSong(filteredPlaylist.songs[prevIndex]);
    playerRef.current.internalPlayer.loadVideoById(filteredPlaylist.songs[prevIndex].url.split('v=')[1]);
    setIsPlaying(true); // Automatically play the previous song
  };

  return (
    <div className="music-player-container">
      <h2>{getMessage(emotion)}</h2>

      {loading ? (
        <p>Loading songs... 🎵</p>
      ) : filteredPlaylist ? (
        <div className="playlist">
          {filteredPlaylist.songs.map((song, index) => (
            <div
              key={index}
              className={`song-card ${currentSong?.title === song.title ? "active" : ""}`}
              onClick={() => {setCurrentSong(song); setIsPlaying(true)}}
            >
              <div className="song-info">
                <p><strong>{song.title}</strong></p>
                <p>{song.artist}</p>
              </div>
              <button className="play-button">▶️</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No songs available for the detected emotion.</p>
      )}

      {currentSong && (
        <div className="sticky-player">
          <p><strong>Now Playing:</strong> {currentSong.title} by {currentSong.artist}</p>
          <YouTube
            videoId={currentSong.url.split('v=')[1]} // Extract the video ID from the URL
            opts={{
              height: '0', // Set height to 0 to hide the video
              width: '0',  // Set width to 0 to hide the video
              playerVars: {
                autoplay: 1,  // Autoplay the video
                controls: 0,  // Hide video controls
                modestbranding: 1,  // Remove YouTube branding
                rel: 0,  // Don't show related videos at the end
                showinfo: 0,  // Hide video info
                iv_load_policy: 3,  // Hide annotations
              },
            }}
            onStateChange={handleProgress} // Handle progress
            ref={playerRef}
          />
          <progress className="progress-bar" value={progress} max="100"></progress>

          <div className="controls">
            <button onClick={prevSong}><FaBackward size={24} /></button>
            <button onClick={togglePlayPause}>
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>
            <button onClick={nextSong}><FaForward size={24} /></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MusicPlayer;
