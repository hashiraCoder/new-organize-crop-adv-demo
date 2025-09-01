import React, { useState } from 'react';
import './CropRecommendation.css';
import { strings } from '../strings';

const CropRecommendation = ({ language }) => {
  const [locationName, setLocationName] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getSoilAndRecommendCrop = async () => {
    if (!locationName.trim()) {
      setError('Please enter a location.');
      return;
    }
    setIsLoading(true);
    setRecommendation(null);
    setError('');

    try {
      const response = await fetch('/api/recommend-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: locationName,
          language: language
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const result = await response.json();
      setRecommendation(result);

    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setError(strings[language].recommendationError);
    } finally {
      setIsLoading(false);
    }
  };

  const DashboardCard = ({ title, icon, children }) => (
    <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
      <span className="text-3xl mb-2">{icon}</span>
      <h4 className="font-bold text-lg text-gray-700">{title}</h4>
      <div className="mt-1 text-gray-600 w-full">{children}</div>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{strings[language].recommendTitle}</h1>
      <p className="text-gray-600 mb-6">{strings[language].recommendPrompt}</p>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col space-y-4 w-full max-w-lg mx-auto">
          <input 
            type="text" 
            placeholder={strings[language].enterLocation} 
            value={locationName} 
            onChange={(e) => setLocationName(e.target.value)} 
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
          />
          <button 
            onClick={getSoilAndRecommendCrop} 
            disabled={isLoading || !locationName} 
            className={`w-full py-3 px-6 font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${isLoading || !locationName ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            {isLoading ? strings[language].gettingInfo : strings[language].getRecommendation}
          </button>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {recommendation && (
          <div className="mt-8">
             <h3 className="text-2xl font-bold mb-6 text-center">{strings[language].recommendedCrops} for {recommendation.location}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DashboardCard title={strings[language].soilAndClimate} icon="🌍">
                      <p className="whitespace-pre-wrap">{recommendation.soilAndClimate}</p>
                  </DashboardCard>
                  <DashboardCard title={strings[language].recommendedCrops} icon="🌾">
                      <ul className="list-none text-left w-full space-y-1">
                          {recommendation.recommendedCrops.map((crop, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2 text-gray-500">•</span>
                              <span>{crop}</span>
                            </li>
                          ))}
                      </ul>
                  </DashboardCard>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropRecommendation;

