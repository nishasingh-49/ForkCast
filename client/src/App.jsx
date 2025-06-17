import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [mood, setMood] = useState("");
  const [playlistLink, setPlaylistLink] = useState("");

  const moodPlaylists = {
    "happy": "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC",
    "sad": "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1",
    "angry": "https://open.spotify.com/playlist/37i9dQZF1DWYxwmBaMqxsl",
    "tired": "https://open.spotify.com/playlist/37i9dQZF1DWZd79rJ6a7lp",
    "excited": "https://open.spotify.com/playlist/37i9dQZF1DWZAfFsnPda0S",
    "meh": "https://open.spotify.com/playlist/37i9dQZF1DWU0ScTcjJBdj"
  };

  const fetchWeather = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/weather/${city}`);
      setWeather(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setWeather(null);
      setError("Could not fetch weather. Please check the city name.");
    }
  };

  return (
    <div className="app">
      <div className="glass-card">
        <h1>🍴 ForkCast</h1>
        <p>Predict your cravings based on mood and weather!</p>

        <input
          type="text"
          placeholder="Enter city (e.g., delhi)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>

        {weather && (
          <div className="weather-info">
            <p><strong>{weather.name}</strong>: {weather.weather[0].description}</p>
            <p>🌡️ Temp: {(weather.main.temp - 273.15).toFixed(1)}°C</p>
          </div>
        )}
        {error && <p className="error">{error}</p>}

        <div className="mood-section">
          <label>How are you feeling?</label>
          <select value={mood} onChange={(e) => {
            setMood(e.target.value);
            setPlaylistLink(moodPlaylists[e.target.value]);
          }}>
            <option value="">--Select Mood--</option>
            <option value="happy">😄 Happy</option>
            <option value="sad">😢 Sad</option>
            <option value="angry">😡 Angry</option>
            <option value="tired">😴 Tired</option>
            <option value="excited">🤩 Excited</option>
            <option value="meh">😐 Meh</option>
          </select>
        </div>

        {playlistLink && (
          <a href={playlistLink} target="_blank" rel="noreferrer" className="playlist-link">
            🎧 Open Your Mood Playlist
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
