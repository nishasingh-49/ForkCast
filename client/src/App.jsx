import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      setError("");
      const res = await axios.get(`http://localhost:5000/api/weather/${city}`);
      setWeather(res.data);
    } catch (err) {
      console.error(err);
      setError("Could not fetch weather. Please check the city name.");
    }
  };

  return (
    <div className="app">
      <h1>🍴 ForkCast</h1>
      <p>Predict your cravings based on mood and weather!</p>
      <input
        type="text"
        placeholder="Enter city (e.g., delhi)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(1)}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
