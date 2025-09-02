// frontend/src/components/MarketPrices.js

import React, { useState, useEffect } from 'react';
import { strings } from '../strings';

const allStates = ["Bihar", "Punjab", "Uttar Pradesh", "Maharashtra", "West Bengal", "Karnataka"];

const MarketPrices = ({ language }) => {
  const [crop, setCrop] = useState('');
  const [selectedStates, setSelectedStates] = useState(["Bihar", "Punjab"]);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Fetch the broadcast data when the component loads
  useEffect(() => {
    const fetchBroadcast = async () => {
      setIsSearching(true);
      const response = await fetch('/api/market-broadcast');
      const data = await response.json();
      setResults(data);
      setIsSearching(false);
    };
    fetchBroadcast();
  }, []);

  const handleStateChange = (state) => {
    setSelectedStates(prev =>
      prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]
    );
  };

  const handleSearch = async () => {
    if (!crop.trim() || selectedStates.length === 0) {
      setError(strings[language].marketFillAll);
      return;
    }
    setIsSearching(true);
    setError('');
    setMessage('');
    setResults([]);
    
    const response = await fetch('/api/market', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ crop, states: selectedStates }),
    });
    const data = await response.json();
    
    if (data.message) setMessage(data.message);
    else setResults(data);
    
    setIsSearching(false);
  };

  return (
    <div className="animate-fade-in-down">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{strings[language].marketPricesTitle}</h1>
      <p className="text-gray-600 mb-6">{strings[language].marketPricesPrompt}</p>

      {/* Search and Comparison Tool */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">{strings[language].marketCompare}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            placeholder={strings[language].marketEnterCrop}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {allStates.map(state => (
                <label key={state} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStates.includes(state)}
                    onChange={() => handleStateChange(state)}
                    className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span>{state}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="mt-4 w-full px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 disabled:bg-gray-400 transition-colors"
        >
          {isSearching ? strings[language].marketSearching : strings[language].marketSearch}
        </button>
      </div>

      {/* Results Display */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{crop ? `${strings[language].marketResultsFor} "${crop}"` : strings[language].marketBroadcastTitle}</h2>
        {isSearching && <p className="text-center text-gray-500">{strings[language].marketSearching}</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {message && <p className="text-center text-gray-700">{message}</p>}
        {results.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">{results[0].state ? strings[language].marketState : strings[language].marketCrop}</th>
                  <th className="py-3 px-4 text-left">{strings[language].marketMarket}</th>
                  <th className="py-3 px-4 text-left">{strings[language].marketPrice} (₹/Quintal)</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold">{item.state || item.crop}</td>
                    <td className="py-3 px-4">{item.market}</td>
                    <td className="py-3 px-4 font-bold text-green-700">{item.price || item.modalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPrices;