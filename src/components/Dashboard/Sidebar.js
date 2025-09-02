// import React from 'react';

// const Sidebar = ({ activePage, setActivePage, language }) => {
//   const navItems = [
//     { name: 'Dashboard', icon: '🏠' },
//     { name: 'Weather', icon: '🌦️' },
//     { name: 'Detect Disease', icon: '🐞' },
//     { name: 'Market Prices', icon: '💲' },
//     { name: 'AI Assistant', icon: '🤖' },
//   ];

//   return (
//     <aside className="w-64 bg-green-800 text-white p-6">
//       <h1 className="text-2xl font-bold mb-10">Krishi Sahayak</h1>
//       <nav>
//         <ul>
//           {navItems.map(item => (
//             <li key={item.name} className="mb-4">
//               <button
//                 onClick={() => setActivePage(item.name)}
//                 className={`flex items-center w-full text-left py-3 px-4 rounded-lg transition-colors ${activePage === item.name ? 'bg-green-700' : 'hover:bg-green-700'}`}
//               >
//                 <span className="mr-4">{item.icon}</span>
//                 {item.name}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

// frontend/src/components/Dashboard/Sidebar.js

import React from 'react';
import { strings } from '../../strings';

const Sidebar = ({ activePage, setActivePage, language, handleLogout }) => {
  const navItems = [
    { name: 'Dashboard', icon: '🏠' },
    { name: 'Weather', icon: '🌦️' },
    { name: 'Detect Disease', icon: '🐞' },
    { name: 'Market Prices', icon: '💲' },
    { name: 'Crop Recommendation', icon: '🌾' },
    { name: 'AI Assistant', icon: '🤖' },
  ];

  // Map strings to item names
  const getLabel = (name) => {
    const keyMap = {
      'Dashboard': 'dashboardTitle',
      'Weather': 'weatherButton',
      'Detect Disease': 'diseaseButton',
      'Market Prices': 'marketPricesButton',
      'Crop Recommendation': 'recommendButton',
      'AI Assistant': 'chatbotButton',
    };
    return strings[language][keyMap[name]] || name;
  };

  return (
    <aside className="w-64 bg-green-800 text-white p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-10 px-2">Kisan Saathi</h1>
      <nav className="flex-1">
        <ul>
          {navItems.map(item => (
            <li key={item.name} className="mb-2">
              <button
                onClick={() => setActivePage(item.name)}
                className={`flex items-center w-full text-left py-3 px-4 rounded-lg transition-colors ${
                  activePage === item.name ? 'bg-green-700 font-bold' : 'hover:bg-green-700'
                }`}
              >
                <span className="mr-4 text-xl">{item.icon}</span>
                {getLabel(item.name)}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* Logout/Change Language Button */}
      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-left py-3 px-4 rounded-lg hover:bg-green-700"
        >
          <span className="mr-4 text-xl">🔄</span>
          {strings[language].changeLanguageButton}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;