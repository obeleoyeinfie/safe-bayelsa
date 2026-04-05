// src/App.jsx
import React from 'react';
import Hero from './components/Hero';
import ResourceHub from './components/ResourceHub';
import Statistics from './components/Statistics';
import KnowledgeCenter from './components/KnowledgeCenter';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Emergency exit button - fixed */}
      <button 
        onClick={() => window.location.href = 'https://weather.com'}
        className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-gray-900 text-white text-sm rounded-full shadow-lg hover:bg-red-600 transition-colors"
      >
        Quick Exit
      </button>
      
      <Hero />
      <ResourceHub />
      <Statistics />
      <KnowledgeCenter />
      <Footer />
    </div>
  );
}

export default App;