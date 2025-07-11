import { useState } from 'react';
import './App.css';

const tabs = [
  { name: 'Home page' },
  { name: 'Information about the practicum' },
  { name: 'Appendices' },
];

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Header */}
      <header className="w-full h-20 bg-blue-700 text-white flex items-center px-8 text-2xl font-bold shadow">
        Practicum Portfolio
      </header>
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 border-r flex flex-col py-8 px-4">
          <nav className="flex flex-col gap-4">
            {tabs.map((tab, idx) => (
              <button
                key={tab.name}
                className={`text-left px-4 py-2 rounded transition font-medium ${
                  activeTab === idx
                    ? 'bg-blue-600 text-white shadow'
                    : 'hover:bg-blue-200 text-gray-700'
                }`}
                onClick={() => setActiveTab(idx)}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 bg-white flex items-center justify-center">
          {/* Blank for now */}
        </main>
      </div>
    </div>
  );
}

export default App;



