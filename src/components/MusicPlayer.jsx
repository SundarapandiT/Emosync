
import React, { useState, useRef, useEffect } from 'react';

const playlist = [
  {
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
  },
  {
    type: "neutral",
    songs: [
      { title: "Valayapatti Thavilu", artist: "Artist 1", url: "path/to/song12.mp3" },
      { title: "Vaada Maaplila", artist: "Artist 2", url: "path/to/song13.mp3" },
      { title: "Bhoomi Enna Suthuthe", artist: "Artist 3", url: "path/to/song14.mp3" },
      { title: "Selfie Pulla", artist: "Artist 4", url: "path/to/song15.mp3" }
    ]
  },
  {
    type: "angry",
    songs: [
      { title: "Munbe Vaa", artist: "A.R. Rahman", url: "path/to/song16.mp3" },
      { title: "New York Nagaram", artist: "A.R. Rahman", url: "path/to/song17.mp3" },
      { title: "Enna Solla Pogirai", artist: "Shankar Mahadevan", url: "path/to/song18.mp3" },
      { title: "Kannalane", artist: "K.S. Chithra", url: "path/to/song19.mp3" }
    ]
  },
  {
    type: "fear",
    songs: [
      { title: "Nenjukkul Peidhidum", artist: "Hariharan", url: "path/to/song20.mp3" },
      { title: "Thalli Pogathey", artist: "Sid Sriram", url: "path/to/song21.mp3" },
      { title: "Uyire Uyire", artist: "Hariharan", url: "path/to/song22.mp3" },
      { title: "Kaadhal Rojave", artist: "S.P. Balasubrahmanyam", url: "path/to/song23.mp3" }
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
  const audioRef = useRef(null);

  // Update the progress bar as the song plays
  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    if (duration) {
      setProgress((currentTime / duration) * 100);
    }
  };

  // Reset the progress bar when a new song is selected
  useEffect(() => {
    if (audioRef.current) {
      setProgress(0);
    }
  }, [currentSong]);

  const filteredPlaylist = playlist.find((mylist) => mylist.type === emotion);

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
              onClick={() => setCurrentSong(song)}
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
          <audio
            ref={audioRef}
            src={currentSong.url}
            controls
            onTimeUpdate={handleTimeUpdate}
            autoPlay
          ></audio>
          <progress className="progress-bar" value={progress} max="100"></progress>
        </div>
      )}
    </div>
  );
}

export default MusicPlayer;
