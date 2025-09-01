import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Weather from './Weather';
import DiseaseDetection from '../DiseaseDetection';
import Chat from '../Chat';
import CropRecommendation from '../CropRecommendation';
import MarketPrices from '../MarketPrices'; // A new component for Market Prices
import { strings } from '../../strings';

const Dashboard = ({ language, setLanguage }) => {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'Weather':
        return <Weather language={language} />;
      case 'Detect Disease':
        return <DiseaseDetection language={language} />;
      case 'Market Prices':
        return <MarketPrices language={language} />;
      case 'AI Assistant':
        return <Chat language={language} />;
       case 'Crop Recommendation':
        return <CropRecommendation language={language} />;
      default:
        return <DashboardContent setActivePage={setActivePage} language={language} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} language={language} />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

const DashboardContent = ({ setActivePage, language }) => {
  // Placeholder content for the main dashboard view
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-600 mb-8">Key insights for Bhagalpur, Bihar</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
          <h2 className="text-xl font-semibold">Current Weather</h2>
          <span className="text-2xl">☀️</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
          <h2 className="text-xl font-semibold">Top Market Price</h2>
          <span className="text-2xl">💲</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <QuickActionButton onClick={() => setActivePage('Detect Disease')} color="red" label={strings[language].diseaseButton} />
        <QuickActionButton onClick={() => setActivePage('Weather')} color="blue" label="Full Forecast" />
        <QuickActionButton onClick={() => setActivePage('Market Prices')} color="yellow" label={strings[language].marketPricesButton || 'Market Prices'} />
        <QuickActionButton onClick={() => setActivePage('AI Assistant')} color="purple" label={strings[language].chatbotButton} />
      </div>
    </div>
  );
};

const QuickActionButton = ({ onClick, color, label }) => {
  const colors = {
    red: 'bg-red-500 hover:bg-red-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
  };

  return (
    <button onClick={onClick} className={`text-white font-bold py-6 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${colors[color]}`}>
      {label}
    </button>
  );
};

export default Dashboard;
