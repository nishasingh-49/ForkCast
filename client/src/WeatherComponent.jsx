import { useEffect, useState } from 'react';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    const city = "Delhi";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Weather fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div>
      <h2>Weather Report</h2>
      {weatherData ? (
        <div>
          <p>City: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
