// frontend/src/components/Dashboard/Weather.js

import React, { useState, useEffect } from 'react';
import './Weather.css';
import { strings } from '../../strings'; // Using the manual strings object

// Helper to map WMO weather codes to icons
const getWeatherIcon = (code) => {
    if ([0, 1].includes(code)) return '☀️'; // Clear/Mainly clear
    if ([2].includes(code)) return '⛅️'; // Partly cloudy
    if ([3].includes(code)) return '☁️'; // Overcast
    if ([45, 48].includes(code)) return '🌫️'; // Fog
    if ([61, 63, 65, 66, 67].includes(code)) return '🌧️'; // Rain
    if ([71, 73, 75, 77].includes(code)) return '❄️'; // Snow
    if ([80, 81, 82].includes(code)) return '🌦️'; // Rain showers
    if ([95, 96, 99].includes(code)) return '⛈️'; // Thunderstorm
    return '🌍'; // Default
};

const Weather = ({ language }) => { // Receiving 'language' as a prop
  const [location, setLocation] = useState('Bhagalpur');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const handleFetchWeather = async (loc) => {
    setIsLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const response = await fetch('/api/weather-advisory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: loc, language: language }), // Using the language prop
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      console.error("Failed to fetch weather:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect to fetch weather on initial component load
  useEffect(() => {
    handleFetchWeather(location);
  }, []); // The empty array [] means this effect runs only once

  const onGetWeatherClick = () => {
    if (location.trim()) {
      handleFetchWeather(location);
    }
  };

  return (
    <div className="animate-fade-in-down">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{strings[language].weatherTitle}</h1>
      <p className="text-gray-600 mb-6">{strings[language].weatherPrompt}</p>

      <div className="flex w-full max-w-lg mb-8">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter') onGetWeatherClick(); }}
          placeholder={strings[language].enterLocation}
          className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={onGetWeatherClick}
          disabled={isLoading || !location.trim()}
          className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-r-lg hover:bg-cyan-600 disabled:bg-gray-400 transition-colors"
        >
          {isLoading ? strings[language].fetchingWeather : strings[language].getWeather}
        </button>
      </div>

      {isLoading && <p className="text-center text-gray-500 font-semibold">{strings[language].fetchingWeather}</p>}
      {error && <p className="text-center text-red-500 font-semibold">{error}</p>}

      {weatherData && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="weather-card current-weather-card p-6">
              <h2 className="card-title">{strings[language].currentWeather} for {weatherData.location.name}</h2>
              <div className="flex justify-between items-center">
                <div className="text-6xl">{getWeatherIcon(weatherData.currentWeather.weather_code)}</div>
                <div className="text-right">
                  <p className="text-5xl font-bold">{Math.round(weatherData.currentWeather.temperature_2m)}°C</p>
                  <p>{strings[language].humidity}: {weatherData.currentWeather.relative_humidity_2m}%</p>
                  <p>{strings[language].windSpeed}: {weatherData.currentWeather.wind_speed_10m} km/h</p>
                </div>
              </div>
            </div>
            <div className="weather-card alerts-card p-6">
              <h2 className="card-title">💡 {strings[language].farmingAlerts}</h2>
              <ul className="space-y-2">
                {weatherData.alerts.map((alert, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-green-600">✓</span>
                    <span>{alert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{strings[language].dailyForecast}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {weatherData.dailyForecast.time.map((day, index) => (
                <div key={day} className="weather-card forecast-day-card p-4 text-center">
                  <p className="font-bold">{new Date(day).toLocaleDateString(language, { weekday: 'short' })}</p>
                  <p className="text-4xl my-2">{getWeatherIcon(weatherData.dailyForecast.weather_code[index])}</p>
                  <p className="font-semibold">{Math.round(weatherData.dailyForecast.temperature_2m_max[index])}° / {Math.round(weatherData.dailyForecast.temperature_2m_min[index])}°</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;