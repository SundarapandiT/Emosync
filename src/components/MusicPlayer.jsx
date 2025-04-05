import React, { useState, useRef, useEffect } from 'react';
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
      { title: "Ennodu Nee Irunthal", artist: "Artist 2", url: "" },
      { title: "Po Nee Po", artist: "Artist 3", url: "" },
      { title: "Shoot the Kuruvi", artist: "Artist 4", url: "" },
      { title: "Yamma Yamma", artist: "Artist 5", url: "" }
    ]
  },
  {
    type: "neutral",
    songs: [
      { title: "Valayapatti Thavilu", artist: "Artist 1", url: "" },
      { title: "Vaada Maaplila", artist: "Artist 2", url: "" },
      { title: "Bhoomi Enna Suthuthe", artist: "Artist 3", url: "" },
      { title: "Selfie Pulla", artist: "Artist 4", url: "" }
    ]
  },
  {
    type: "angry",
    songs: [
      { title: "Munbe Vaa", artist: "A.R. Rahman", url: "" },
      { title: "New York Nagaram", artist: "A.R. Rahman", url: "" },
      { title: "Enna Solla Pogirai", artist: "Shankar Mahadevan", url: "" },
      { title: "Kannalane", artist: "K.S. Chithra", url: "" }
    ]
  },
  {
    type: "fear",
    songs: [
      { title: "Nenjukkul Peidhidum", artist: "Hariharan", url: "" },
      { title: "Thalli Pogathey", artist: "Sid Sriram", url: "" },
      { title: "Uyire Uyire", artist: "Hariharan", url: "" },
      { title: "Kaadhal Rojave", artist: "S.P. Balasubrahmanyam", url: "" }
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
              height: '0', 
              width: '0',  
              playerVars: {
                autoplay: 1,  
                controls: 0, 
                modestbranding: 1,  // Remove YouTube branding
                rel: 0,  
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



/* {
    type: "happy",
    songs: [
      { title: "Pala Palakura", artist: "Artist 1", url: "https://yashchlkrfvlmmlwjanc.supabase.co/storage/v1/object/sign/songs/happy/Pala%20Palakura.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25ncy9oYXBweS9QYWxhIFBhbGFrdXJhLm1wMyIsImlhdCI6MTc0MTYzMjA2NCwiZXhwIjoxNzczMTY4MDY0fQ.VcfKYG69Xp-kQkPpeu1RCjET6sNx7SG8XWDnaZnFaK0" },
      { title: "Po Indru Neeyaga", artist: "Artist 2", url: "https://yashchlkrfvlmmlwjanc.supabase.co/storage/v1/object/sign/songs/happy/Po%20Indru%20Neeyaga.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25ncy9oYXBweS9QbyBJbmRydSBOZWV5YWdhLm1wMyIsImlhdCI6MTc0MTYzMjE5OSwiZXhwIjoxNzczMTY4MTk5fQ.EJBm6Y_LoFnQWV1fkqCDDJFuXPxTPWo7uhpadwaAFJM" },
      { title: "Aathadi Aathadi", artist: "Artist 3", url: "https://yashchlkrfvlmmlwjanc.supabase.co/storage/v1/object/sign/songs/happy/Aathadi-Aathadi.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25ncy9oYXBweS9BYXRoYWRpLUFhdGhhZGkubXAzIiwiaWF0IjoxNzQxNjMxOTU4LCJleHAiOjE3NzMxNjc5NTh9.n7sec3EqNk0MpLddr3zF6g7J9f3pyRty5n40am3GdEc" },
      { title: "Manasilaayo", artist: "Artist 4", url: "https://yashchlkrfvlmmlwjanc.supabase.co/storage/v1/object/sign/songs/happy/Manasilaayo.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25ncy9oYXBweS9NYW5hc2lsYWF5by5tcDMiLCJpYXQiOjE3NDE2MzIwNDIsImV4cCI6MTc3MzE2ODA0Mn0.Ax72SeQbVc3V5S57EYVKyzxt4Iui7PyqB9UwVwHDzJ4" },
      { title: "Arabic Kuthu", artist: "Artist 5", url: "https://yashchlkrfvlmmlwjanc.supabase.co/storage/v1/object/sign/songs/happy/Arabic%20Kuthu(KoshalWorld.Com).mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25ncy9oYXBweS9BcmFiaWMgS3V0aHUoS29zaGFsV29ybGQuQ29tKS5tcDMiLCJpYXQiOjE3NDE2MzIyNTQsImV4cCI6MTc3MzE2ODI1NH0.gvkHYvArzmsp5Mb_p8c1zeGcFjK-qASeZS6NLS9vQgU" }
    ]
  },
  {
    type: "sad",
    songs: [
      { title: "Kanave Kanave", artist: "Artist 1", url: "https://yashchlkrfvlmmlwjanc.supabase.co/storage/v1/object/sign/songs/sad/Kanave-Kanave-MassTamilan.com.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25ncy9zYWQvS2FuYXZlLUthbmF2ZS1NYXNzVGFtaWxhbi5jb20ubXAzIiwiaWF0IjoxNzQxNjMyOTQ2LCJleHAiOjE3NzMxNjg5NDZ9.LzvFsrQzquHjuKT5rii2AiTs8LygfgBmcskGVB4I9v0" },
      { title: "Ennodu Nee Irunthal", artist: "Artist 2", url: "https://yashchlkrfvlmmlwjanc.supabase.co/storage/v1/object/sign/songs/sad/Ennodu-Nee-Irundhal.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25ncy9zYWQvRW5ub2R1LU5lZS1JcnVuZGhhbC5tcDMiLCJpYXQiOjE3NDE2MzI5MzQsImV4cCI6MTc3MzE2ODkzNH0.NI0Rovi94HMBgzIMpCHtCumdWfGdfne82OB-x1WlWSU" },
      { title: "Po Nee Po", artist: "Artist 3", url: "https://yashchlkrfvlmmlwjanc.supabase.co/storage/v1/object/sign/songs/sad/Poo-Nee-Poo-2.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25ncy9zYWQvUG9vLU5lZS1Qb28tMi5tcDMiLCJpYXQiOjE3NDE2MzI5NTcsImV4cCI6MTc3MzE2ODk1N30.5ZWYM3uHrx6A1cpWfJzdtcf5wV7lqOIgcgV9RiK0-DM" },
      { title: "Shoot the Kuruvi", artist: "Artist 4", url: "https://yashchlkrfvlmmlwjanc.supabase.co/storage/v1/object/sign/songs/sad/Shoot-the-Kuruvi.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25ncy9zYWQvU2hvb3QtdGhlLUt1cnV2aS5tcDMiLCJpYXQiOjE3NDE2MzI5NzAsImV4cCI6MTc3MzE2ODk3MH0.rQ9yL5YvG26VkK3GpjL0kzmnrqTfCfK7TTcBcHJWbJc" },
      { title: "Yamma Yamma", artist: "Artist 5", url: "https://yashchlkrfvlmmlwjanc.supabase.co/storage/v1/object/sign/songs/sad/Yamma-Yamma.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25ncy9zYWQvWWFtbWEtWWFtbWEubXAzIiwiaWF0IjoxNzQxNjMyOTgzLCJleHAiOjE3NzMxNjg5ODN9.1xqK_IBiWj-DGdyjqEQR2aaSsEWzh8D2egw5NJu36rg" }
    ]
  },*/
