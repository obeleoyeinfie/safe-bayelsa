import React, { useState, useEffect } from 'react';
import DecoyLanding from './components/DecoyLanding';
import CrisisCheck from './components/CrisisCheck';
import PickupRequest from './components/PickupRequest';
import WaitingScreen from './components/WaitingScreen';
import './App.css';

function App() {
  const [mode, setMode] = useState('decoy'); // decoy, crisis, pickup, waiting
  const [pickupData, setPickupData] = useState(null);

  // Quick exit - clears everything and returns to decoy
  const handleQuickExit = () => {
    setMode('decoy');
    setPickupData(null);
    // Clear any sensitive data from memory
    window.location.reload();
  };

  // From decoy to crisis check
  const activateSafeMode = () => {
    setMode('crisis');
  };

  // Crisis flow handlers
  const handleCrisis = () => {
    setMode('pickup');
  };

  const handleSafe = () => {
    // For now, also go to pickup (can expand to services later)
    setMode('pickup');
  };

  const handlePlanning = () => {
    // Future: safety planning mode
    alert('Safety planning tools coming in next update. For immediate danger, use "NO or UNSURE".');
  };

  const handlePickupCreated = (data) => {
    setPickupData(data);
    setMode('waiting');
  };

  const handleReset = () => {
    setMode('decoy');
    setPickupData(null);
  };

  return (
    <div className="relative min-h-screen">
      {/* Quick Exit Button - Always visible in safe modes */}
      {mode !== 'decoy' && (
        <button
          onClick={handleQuickExit}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg shadow-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          title="Immediately return to weather site and clear session"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          EXIT
        </button>
      )}

      {/* Mode routing */}
      {mode === 'decoy' && (
        <DecoyLanding onActivate={activateSafeMode} />
      )}

      {mode === 'crisis' && (
        <CrisisCheck 
          onCrisis={handleCrisis}
          onSafe={handleSafe}
          onPlanning={handlePlanning}
        />
      )}

      {mode === 'pickup' && (
        <PickupRequest 
          onPickupCreated={handlePickupCreated}
          onCancel={() => setMode('crisis')}
        />
      )}

      {mode === 'waiting' && pickupData && (
        <WaitingScreen 
          pickupId={pickupData.pickup_id}
          codePhrase={pickupData.codePhrase}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;