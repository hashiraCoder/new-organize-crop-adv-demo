import React, { useState } from 'react';
import './Weather.css';
import { strings } from '../strings';

const Weather = ({ language }) => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeatherIcon = (wmoCode) => {
    // ... same as before
  };

  const handleFetchWeather = async () => {
    // ... same as before
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{strings[language].weatherTitle}</h1>
      <p className="text-gray-600 mb-4">{strings[language].weatherPrompt}</p>
      <div className="flex w-full max-w-lg">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter') handleFetchWeather(); }}
          placeholder={strings[language].enterLocation}
          className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={handleFetchWeather}
          disabled={isLoading || !location.trim()}
          className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-r-lg hover:bg-cyan-600 disabled:bg-gray-400"
        >
          {isLoading ? strings[language].fetchingWeather : strings[language].getWeather}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {weatherData && (
        <div className="mt-8">
          {/* Weather data display */}
        </div>
      )}
    </div>
  );
};

export default Weather;

