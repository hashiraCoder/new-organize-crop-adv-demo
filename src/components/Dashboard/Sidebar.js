import React from 'react';

const Sidebar = ({ activePage, setActivePage, language }) => {
  const navItems = [
    { name: 'Dashboard', icon: '🏠' },
    { name: 'Weather', icon: '🌦️' },
    { name: 'Detect Disease', icon: '🐞' },
    { name: 'Market Prices', icon: '💲' },
    { name: 'AI Assistant', icon: '🤖' },
  ];

  return (
    <aside className="w-64 bg-green-800 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">Krishi Sahayak</h1>
      <nav>
        <ul>
          {navItems.map(item => (
            <li key={item.name} className="mb-4">
              <button
                onClick={() => setActivePage(item.name)}
                className={`flex items-center w-full text-left py-3 px-4 rounded-lg transition-colors ${activePage === item.name ? 'bg-green-700' : 'hover:bg-green-700'}`}
              >
                <span className="mr-4">{item.icon}</span>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
