import React, { useState } from 'react';
import './App.css'; // Corrected path
import LanguageSelection from './components/LanguageSelection';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  // If a language is saved in localStorage, use it to persist login
  const [language, setLanguage] = useState(localStorage.getItem('kisan-saathi-lang'));

  const handleLogin = (lang) => {
    localStorage.setItem('kisan-saathi-lang', lang); // Save language choice
    setLanguage(lang);
  };

  const handleLogout = () => {
    localStorage.removeItem('kisan-saathi-lang'); // Clear saved language
    setLanguage(null);
  }

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50">
      {!language ? (
        <LanguageSelection setLanguage={handleLogin} />
      ) : (
        // Pass logout handler to Dashboard
        <Dashboard language={language} setLanguage={setLanguage} handleLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;