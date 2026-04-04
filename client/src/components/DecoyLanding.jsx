import React, { useState, useEffect } from 'react';

export default function DecoyLanding({ onActivate }) {
  const [tapCount, setTapCount] = useState(0);

  // Triple-tap detection
  const handleLogoClick = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    
    if (newCount >= 3) {
      onActivate();
    }
    
    // Reset after 1 second
    setTimeout(() => setTapCount(0), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      {/* Header with tappable logo */}
      <header className="text-center mb-8 pt-8">
        <div 
          onClick={handleLogoClick}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-4xl cursor-pointer select-none shadow-lg"
        >
          ☀️
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-4">Weather Bayelsa</h1>
        <p className="text-gray-600">Local forecast & news</p>
      </header>

      {/* Weather Card */}
      <div className="bg-white rounded-xl p-6 mb-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-5xl font-bold text-gray-800">32°C</div>
            <div className="text-gray-600 mt-1">Humid, partly cloudy</div>
            <div className="text-sm text-gray-500 mt-1">Rain expected by 4 PM</div>
          </div>
          <div className="text-6xl">⛅</div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="bg-white rounded-xl p-6 mb-4">
        <h3 className="font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
        <div className="flex justify-between">
          {[
            { day: 'Mon', icon: '🌤️', temp: 31 },
            { day: 'Tue', icon: '🌧️', temp: 29 },
            { day: 'Wed', icon: '⛈️', temp: 27 },
            { day: 'Thu', icon: '🌤️', temp: 32 },
            { day: 'Fri', icon: '🌧️', temp: 28 },
          ].map((d) => (
            <div key={d.day} className="text-center">
              <div className="text-2xl mb-1">{d.icon}</div>
              <div className="text-xs text-gray-600">{d.day}</div>
              <div className="text-sm font-semibold">{d.temp}°</div>
            </div>
          ))}
        </div>
      </div>

      {/* News */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Local News</h3>
        <div className="border-b border-gray-200 pb-3 mb-3">
          <p className="text-sm text-gray-800">NDDC announces new road projects in Bayelsa...</p>
          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
        </div>
        <div>
          <p className="text-sm text-gray-800">Fuel price adjustment at Yenagoa stations...</p>
          <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
        </div>
      </div>

      {/* Hidden hint */}
      <p className="text-center text-gray-400 text-xs mt-8 opacity-50">
        Tap sun icon 3 times rapidly for admin access
      </p>
    </div>
  );
}