import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'; // adjust path if needed


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Add this in your .env file

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London');
  const [input, setInput] = useState('London');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) setCity(input.trim());
  };

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (err) {
        setError('City not found or API error');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="app-container">
      <div className="bg-animation"></div>
      <form className="weather-card" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Go</button>

        {loading && <p>Loading…</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {weather && !error && (
          <div>
            <h2>{weather.name}</h2>
            <p>
              {weather.main.temp}°C • {weather.weather[0].description}
            </p>
          </div>
        )}
      </form>
       <footer className="footer">
  <p>
    🌤️ <strong>Weather App</strong> by <a href="https://github.com/himanshuu2611" target="_blank" rel="noopener noreferrer">Himanshu Tiwari</a> &nbsp;|&nbsp; Built with 💙 React + OpenWeatherMap API
  </p>
</footer>

    </div>
  );
}
