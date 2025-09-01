import React from 'react';
import './Home.css';
import ScreenContainer from './ScreenContainer';
import { strings } from '../strings';

const Home = ({ setCurrentPage, language, setLanguage }) => {
  return (
    <ScreenContainer title={strings[language].homeTitle}>
      <p className="text-gray-600 mb-8 text-center text-lg">{strings[language].homeWelcome}</p>
      <div className="space-y-4">
        <button onClick={() => setCurrentPage('Chat')} className="w-full py-4 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">{strings[language].chatbotButton}</button>
        <button onClick={() => setCurrentPage('Weather')} className="w-full py-4 px-6 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">{strings[language].weatherButton}</button>
        <button onClick={() => setCurrentPage('Disease')} className="w-full py-4 px-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">{strings[language].diseaseButton}</button>
        <button onClick={() => setCurrentPage('Recommend')} className="w-full py-4 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">{strings[language].recommendButton}</button>
        <button onClick={() => { setLanguage(null); setCurrentPage('LanguageSelection'); }} className="w-full py-4 px-6 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">{strings[language].changeLanguageButton}</button>
      </div>
    </ScreenContainer>
  );
};

export default Home;

