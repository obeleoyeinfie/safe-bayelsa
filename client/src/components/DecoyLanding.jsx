import React, { useState, useEffect } from 'react';

export default function DecoyLanding({ onActivate }) {
  const [tapCount, setTapCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Show subtle hint after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Triple-tap detection with visual feedback
  const handleLogoClick = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    
    if (newCount >= 3) {
      onActivate();
    }
    
    // Visual feedback - brief scale effect
    const logo = document.getElementById('weather-logo');
    if (logo) {
      logo.style.transform = 'scale(0.95)';
      setTimeout(() => logo.style.transform = 'scale(1)', 100);
    }
    
    // Reset counter after 1.5 seconds
    setTimeout(() => setTapCount(0), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 font-sans text-gray-800">
      {/* Header with tappable logo */}
      <header className="text-center mb-8 pt-8">
        <div 
          id="weather-logo"
          onClick={handleLogoClick}
          className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center text-5xl cursor-pointer select-none shadow-lg hover:shadow-xl transition-all duration-300 relative"
        >
          ☀️
          {/* Subtle tap indicator */}
          {tapCount > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              {tapCount}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mt-4 tracking-tight">Weather Bayelsa</h1>
        <p className="text-gray-600 mt-1">Local forecast & community updates</p>
      </header>

      {/* Main Weather Card */}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 mb-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-6xl font-bold text-gray-800 tracking-tighter">32°C</div>
            <div className="text-gray-600 mt-2 font-medium">Partly cloudy, humid</div>
            <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Rain expected 4:00 PM
            </div>
          </div>
          <div className="text-7xl animate-pulse">⛅</div>
        </div>
        
        {/* Weather details */}
        <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Humidity</div>
            <div className="font-semibold text-gray-700">78%</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Wind</div>
            <div className="font-semibold text-gray-700">12 km/h</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">UV Index</div>
            <div className="font-semibold text-gray-700">High</div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 mb-4">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          5-Day Forecast
        </h3>
        <div className="flex justify-between">
          {[
            { day: 'Mon', icon: '🌤️', temp: 31, condition: 'Sunny' },
            { day: 'Tue', icon: '🌧️', temp: 29, condition: 'Rain' },
            { day: 'Wed', icon: '⛈️', temp: 27, condition: 'Storm' },
            { day: 'Thu', icon: '🌤️', temp: 32, condition: 'Sunny' },
            { day: 'Fri', icon: '🌧️', temp: 28, condition: 'Rain' },
          ].map((d, i) => (
            <div key={d.day} className={`text-center p-2 rounded-lg transition-colors ${i === 0 ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
              <div className="text-xs text-gray-500 mb-1">{d.day}</div>
              <div className="text-2xl mb-1">{d.icon}</div>
              <div className="font-semibold text-gray-800">{d.temp}°</div>
              <div className="text-[10px] text-gray-400">{d.condition}</div>
            </div>
          ))}
        </div>
      </div>

      {/* News Section */}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          Local News
        </h3>
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-3 hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer">
            <p className="text-sm font-medium text-gray-800 line-clamp-2">NDDC announces new road infrastructure projects across Bayelsa State...</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">2 hours ago</span>
              <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Infrastructure</span>
            </div>
          </div>
          <div className="hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer">
            <p className="text-sm font-medium text-gray-800 line-clamp-2">Fuel price adjustment: What drivers need to know this week...</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">5 hours ago</span>
              <span className="text-[10px] bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full">Economy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden hint - appears after delay */}
      {showHint && (
        <p className="text-center text-gray-300 text-xs mt-8 opacity-50 hover:opacity-100 transition-opacity cursor-help" title="Emergency access">
          Weather updates powered by community reports • v2.4.1
        </p>
      )}

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm mt-8 pb-4">
        <p>© 2024 Weather Bayelsa • Community Service</p>
      </footer>
    </div>
  );
}