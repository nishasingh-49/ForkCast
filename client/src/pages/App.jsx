// client/src/pages/App.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [mood, setMood] = useState("");
  const [playlistLink, setPlaylistLink] = useState("");
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const moodPlaylists = {
    happy: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC",
    sad: "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1",
    angry: "https://open.spotify.com/playlist/37i9dQZF1DWYxwmBaMqxsl",
    tired: "https://open.spotify.com/playlist/37i9dQZF1DWZd79rJ6a7lp",
    excited: "https://open.spotify.com/playlist/37i9dQZF1DWZAfFsnPda0S",
    meh: "https://open.spotify.com/playlist/37i9dQZF1DWU0ScTcjJBdj"
  };

  const forkTips = [
    "💡 Craving spicy? Try pairing it with something sweet to balance it.",
    "🍽️ Mood swings? Carbs are brain’s cuddle buddies.",
    "🥑 Avocados help with stress — smooth, green therapists.",
    "🍫 Dark chocolate = serotonin magic.",
    "🧠 Weather impacts cravings — cozy rain calls for hot soup!",
    "🫖 Herbal teas can boost your mood and calm anxiety.",
    "💧 Drink water before snacking — hunger and thirst are messy twins.",
    "🔥 Angry? Crunchy snacks give a mini rage outlet."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % forkTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const res = await axios.get(url);

      if (res.data.cod !== 200) {
        throw new Error("City not found");
      }

      setWeather(res.data);
      setError("");
    } catch (err) {
      console.error("Weather Fetch Error:", err.response || err.message || err);
      setWeather(null);
      setError("Could not fetch the weather. Please check the city name and try again.");
    }
  };

  const handleRecommendations = () => {
    navigate("/recommendations", {
      state: { 
        mood, 
        weather: weather?.weather?.[0]?.main?.toLowerCase() || "unknown" 
      }
    });
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
        <button onClick={fetchWeather} disabled={!city}>
          Get Weather
        </button>

        {weather && (
          <div className="weather-info">
            <p>
              <strong>{weather.name}</strong>: {weather.weather[0].description}
            </p>
            <p>🌡️ Temp: {weather.main.temp.toFixed(1)}°C</p>
          </div>
        )}

        {error && <p className="error">{error}</p>}

        <div className="mood-section">
          <label>How are you feeling?</label>
          <select
            value={mood}
            onChange={(e) => {
              const selectedMood = e.target.value;
              setMood(selectedMood);
              setPlaylistLink(moodPlaylists[selectedMood]);
            }}
          >
            <option value="">--Select Mood--</option>
            <option value="happy">😄 Happy</option>
            <option value="sad">😢 Sad</option>
            <option value="angry">😡 Angry</option>
            <option value="tired">😴 Tired</option>
            <option value="excited">🤩 Excited</option>
            <option value="meh">😐 Meh</option>
          </select>
        </div>
{mood && (
  <div className="mood-feedback-box">
    <h3>🌈 Mood Selected: {mood.charAt(0).toUpperCase() + mood.slice(1)}</h3>
    <p>We’ve tuned the playlist for your vibe 🎶</p>
  </div>
)}

        {playlistLink && (
          <a
            href={playlistLink}
            target="_blank"
            rel="noreferrer"
            className="playlist-link"
          >
            🎧 Open Your Mood Playlist
          </a>
        )}

        {weather && mood && (
          <button onClick={handleRecommendations} className="recommend-btn">
            🍽️ Ready for Food Recommendations?
          </button>
        )}

        <div className="fork-tip">
          <p>{forkTips[currentTipIndex]}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
