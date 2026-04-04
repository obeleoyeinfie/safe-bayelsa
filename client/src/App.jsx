import React, { useState } from 'react';
import DecoyLanding from './components/DecoyLanding';
import CrisisCheck from './components/CrisisCheck';
import PickupRequest from './components/PickupRequest';
import WaitingScreen from './components/WaitingScreen';

function App() {
  const [mode, setMode] = useState('decoy'); // decoy, crisis-check, pickup, waiting
  const [pickupData, setPickupData] = useState(null);

  // Quick exit - resets everything
  const handleQuickExit = () => {
    setMode('decoy');
    setPickupData(null);
    window.location.reload();
  };

  // Decoy activation
  const activateSafeMode = () => {
    setMode('crisis-check');
  };

  // Crisis flow handlers
  const handleCrisis = () => {
    setMode('pickup');
  };

  const handleSafe = () => {
    // For MVP, just show services (we'll build this next)
    alert('Services directory coming next. For now, use pickup if urgent.');
    setMode('pickup');
  };

  const handlePlanning = () => {
    alert('Safety planning tools coming soon.');
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
    <div className="relative">
      {/* Quick Exit Button - Always visible in safe mode */}
      {mode !== 'decoy' && (
        <button
          onClick={handleQuickExit}
          className="fixed top-4 right-4 z-50 px-3 py-2 bg-red-600 text-white text-sm font-bold rounded shadow-lg hover:bg-red-700"
        >
          🆘 EXIT
        </button>
      )}

      {mode === 'decoy' && (
        <DecoyLanding onActivate={activateSafeMode} />
      )}

      {mode === 'crisis-check' && (
        <CrisisCheck 
          onCrisis={handleCrisis}
          onSafe={handleSafe}
          onPlanning={handlePlanning}
        />
      )}

      {mode === 'pickup' && (
        <PickupRequest onPickupCreated={handlePickupCreated} />
      )}

      {mode === 'waiting' && pickupData && (
        <WaitingScreen 
          pickupId={pickupData.pickup_id}
          initialData={pickupData}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;