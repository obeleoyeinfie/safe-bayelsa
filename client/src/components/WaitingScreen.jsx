import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function WaitingScreen({ pickupId, codePhrase, onReset }) {
  const [status, setStatus] = useState('requested');
  const [driverInfo, setDriverInfo] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [showSafetyTips, setShowSafetyTips] = useState(true);

  // Poll for updates
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      const { data } = await supabase
        .from('pickups')
        .select('status, driver_id, assigned_at, estimated_arrival, actual_arrival')
        .eq('pickup_id', pickupId)
        .single();

      if (data) {
        setStatus(data.status);
        
        if (data.status === 'assigned' && data.driver_id && !driverInfo) {
          const { data: driver } = await supabase
            .from('drivers')
            .select('name, vehicle_color, license_plate, phone_masked')
            .eq('driver_id', data.driver_id)
            .single();
          
          setDriverInfo({
            ...driver,
            assignedAt: data.assigned_at,
            estimatedArrival: data.estimated_arrival
          });
        }
      }
    }, 5000);

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
    alert('Incoming call...\n\n"Hello, your delivery is arriving in 10 minutes. Please confirm your location near the landmark you provided."');
  };

  if (!driverInfo) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6 animate-fade-in">
        <div className="max-w-lg mx-auto pt-8">
          {/* Progress steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-1 bg-green-500 rounded-full"></div>
            <div className="w-8 h-1 bg-green-500 rounded-full"></div>
            <div className="w-8 h-1 bg-blue-500 animate-pulse rounded-full"></div>
          </div>

          <div className="text-center mb-8">
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-2">Finding your safe driver...</h2>
            <p className="text-slate-400 mb-2">This usually takes 5-15 minutes</p>
            <p className="text-blue-400 font-mono text-lg">{formatTime(elapsed)}</p>
          </div>

          {/* Safety tips toggle */}
          <div className="bg-slate-800 rounded-xl overflow-hidden mb-6">
            <button 
              onClick={() => setShowSafetyTips(!showSafetyTips)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-700 transition-colors"
            >
              <span className="font-medium flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Safety while waiting
              </span>
              <svg className={`w-5 h-5 transition-transform ${showSafetyTips ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showSafetyTips && (
              <div className="p-4 pt-0 text-sm text-slate-300 space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Stay in a public, visible area with other people around
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Pretend to be on a normal phone call or texting
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Keep your phone charged and volume on
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Don't tell anyone you're leaving or waiting for pickup
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  If approached, say you're waiting for a friend
                </p>
              </div>
            )}
          </div>

          {/* Fake call button */}
          <button
            onClick={triggerFakeCall}
            className="w-full p-4 bg-blue-600 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Fake Call (Create Cover Story)
          </button>

          <button
            onClick={onReset}
            className="w-full p-3 text-red-400 hover:text-red-300 text-sm"
          >
            Cancel Request
          </button>
        </div>
      </div>
    );
  }

  // Driver assigned view
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 animate-fade-in">
      <div className="max-w-lg mx-auto pt-8">
        {/* Progress steps - all complete */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-1 bg-green-500 rounded-full"></div>
          <div className="w-8 h-1 bg-green-500 rounded-full"></div>
          <div className="w-8 h-1 bg-green-500 rounded-full"></div>
        </div>

        {/* Driver assigned card */}
        <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-2xl">
              🚗
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-400">Driver Assigned!</h2>
              <p className="text-sm text-slate-300">Your safe pickup is confirmed</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Driver name</span>
              <span className="font-medium">{driverInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Vehicle</span>
              <span className="font-medium">{driverInfo.vehicle_color}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">License plate</span>
              <span className="font-mono text-xs bg-slate-800 px-2 py-1 rounded">{driverInfo.license_plate}</span>
            </div>
            {driverInfo.estimatedArrival && (
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated arrival</span>
                <span className="font-medium text-green-400">
                  {new Date(driverInfo.estimatedArrival).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Code phrase - CRITICAL */}
        <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-red-400 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Your Verification Code
          </h3>
          <p className="text-sm text-slate-300 mb-3">
            The driver MUST say this exact phrase first. If they don't, do NOT get in the vehicle.
          </p>
          <div className="bg-slate-900 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-white tracking-wide">"{codePhrase}"</p>
          </div>
          <p className="text-xs text-red-300 mt-3">
            Memorize this. Do not write it down where someone can find it.
          </p>
        </div>

        {/* Safety checklist */}
        <div className="bg-slate-800 rounded-xl p-6 mb-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Before getting in:
          </h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-4 h-4 accent-blue-500" readOnly />
              <span>Driver says the exact code phrase: <strong>"{codePhrase}"</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-4 h-4 accent-blue-500" readOnly />
              <span>Vehicle color matches: <strong>{driverInfo.vehicle_color}</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-4 h-4 accent-blue-500" readOnly />
              <span>License plate matches: <strong>{driverInfo.license_plate}</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-4 h-4 accent-blue-500" readOnly />
              <span>You feel safe and comfortable with the driver</span>
            </li>
          </ul>
        </div>

        {/* What happens next */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
          <h4 className="font-medium text-blue-400 mb-2">Where you're going:</h4>
          <p className="text-sm text-slate-300">
            The driver will take you to a verified safe house with food, medical care, and counseling services. 
            Your location is not shared with anyone else.
          </p>
        </div>

        <button
          onClick={triggerFakeCall}
          className="w-full p-4 bg-blue-600 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Trigger Fake Call (Cover)
        </button>
      </div>
    </div>
  );
}