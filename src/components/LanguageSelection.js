import React from 'react';
import './LanguageSelection.css';

const LanguageSelection = ({ setLanguage }) => {
  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Kisan Saathi</h1>
        <p className="text-gray-600 mb-8 text-center text-lg">Please select your preferred language:</p>
        <div className="space-y-4">
          <button onClick={() => handleLanguageSelect('en')} className="w-full py-4 px-6 bg-blue-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-600 hover:shadow-xl">English</button>
          <button onClick={() => handleLanguageSelect('hi')} className="w-full py-4 px-6 bg-blue-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-600 hover:shadow-xl">हिंदी</button>
          <button onClick={() => handleLanguageSelect('pa')} className="w-full py-4 px-6 bg-blue-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-600 hover:shadow-xl">ਪੰਜਾਬੀ</button>
          <button onClick={() => handleLanguageSelect('mr')} className="w-full py-4 px-6 bg-blue-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-600 hover:shadow-xl">मराठी</button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;

