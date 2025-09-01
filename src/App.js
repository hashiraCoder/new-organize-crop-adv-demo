import React, { useState } from 'react';
import './App.css';
import LanguageSelection from './components/LanguageSelection';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  const [language, setLanguage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This would be replaced by a real login check
  const handleLogin = (lang) => {
    setLanguage(lang);
    setIsLoggedIn(true);
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50">
      {!isLoggedIn ? (
        <LanguageSelection setLanguage={handleLogin} />
      ) : (
        <Dashboard language={language} setLanguage={setLanguage} />
      )}
    </div>
  );
};

export default App;

