import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function WaitingScreen({ pickupId, initialData, onReset }) {
  const [driverInfo, setDriverInfo] = useState(null);
  const [status, setStatus] = useState('requested');
  const [elapsed, setElapsed] = useState(0);

  // Poll for driver assignment
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      const { data } = await supabase
        .from('pickups')
        .select('status, driver_id, assigned_at, estimated_arrival, code_phrase')
        .eq('pickup_id', pickupId)
        .single();

      if (data) {
        setStatus(data.status);
        
        if (data.status === 'assigned' && data.driver_id && !driverInfo) {
          // Fetch driver details
          const { data: driver } = await supabase
            .from('drivers')
            .select('name, vehicle_color, license_plate')
            .eq('driver_id', data.driver_id)
            .single();
          
          setDriverInfo({
            ...driver,
            codePhrase: data.code_phrase,
            estimatedArrival: data.estimated_arrival
          });
        }
      }
    }, 5000);

    // Elapsed time counter
    const timeInterval = setInterval(() => {
      setElapsed(e => e + 1);
    }, 1000);

    return () => {
      clearInterval(pollInterval);
      clearInterval(timeInterval);
    };
  }, [pickupId, driverInfo]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const triggerFakeCall = () => {
    // Play fake ringtone, show fake call screen
    alert('Fake call triggered: "Hello, your delivery is arriving soon..."');
  };

  if (!driverInfo) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6">
        <div className="max-w-md mx-auto pt-12 text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          
          <h2 className="text-2xl font-bold mb-2">Finding a safe driver...</h2>
          <p className="text-gray-400 mb-2">This usually takes 5-15 minutes</p>
          <p className="text-red-400 font-mono">{formatTime(elapsed)}</p>

          <div className="mt-8 p-4 bg-slate-800 rounded-lg">
            <p className="text-sm text-gray-300 mb-2">While waiting:</p>
            <ul className="text-sm text-gray-400 text-left space-y-1">
              <li>• Stay in a public, visible area</li>
              <li>• Pretend to be on a normal call</li>
              <li>• Keep your phone charged</li>
              <li>• Don't tell anyone you're leaving</li>
            </ul>
          </div>

          <button
            onClick={triggerFakeCall}
            className="mt-6 px-6 py-3 bg-blue-600 rounded-lg"
          >
            📞 Fake Call (Cover)
          </button>

          <button
            onClick={onReset}
            className="mt-8 text-red-400 hover:text-red-300"
          >
            Cancel Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-md mx-auto pt-8">
        <div className="bg-green-600 p-6 rounded-xl mb-4">
          <h2 className="text-xl font-bold mb-2">✅ Driver Assigned</h2>
          <div className="space-y-1 text-sm">
            <p><span className="text-green-200">Driver:</span> {driverInfo.name}</p>
            <p><span className="text-green-200">Vehicle:</span> {driverInfo.vehicle_color}</p>
            <p className="text-xs text-green-300">Plate: {driverInfo.license_plate}</p>
            {driverInfo.estimatedArrival && (
              <p><span className="text-green-200">ETA:</span> {new Date(driverInfo.estimatedArrival).toLocaleTimeString()}</p>
            )}
          </div>
        </div>

        <div className="bg-red-600 p-6 rounded-xl mb-4">
          <h3 className="font-bold mb-2">🔐 Your Code Phrase</h3>
          <p className="text-2xl font-bold text-center py-3 bg-red-700 rounded">
            "{driverInfo.codePhrase}"
          </p>
          <p className="text-sm text-red-200 mt-2">
            Driver will say this first. If they don't, do NOT get in.
          </p>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <h4 className="font-semibold mb-3">Safety reminders:</h4>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Verify the code phrase before entering</li>
            <li>• Check vehicle matches description</li>
            <li>• Share live location with trusted contact if possible</li>
            <li>• Driver will take you to a safe house, not your home</li>
          </ul>
        </div>

        <button
          onClick={triggerFakeCall}
          className="w-full mt-4 p-3 bg-blue-600 rounded-lg"
        >
          📞 Trigger Fake Call
        </button>
      </div>
    </div>
  );
}