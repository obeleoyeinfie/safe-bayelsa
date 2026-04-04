import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function PickupRequest({ onPickupCreated }) {
  const [step, setStep] = useState('location');
  const [location, setLocation] = useState({ area: '', landmark: '' });
  const [passengers, setPassengers] = useState(1);
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(false);

  const areas = [
    'Biogbolo', 'Ekeki', 'Okutukutu', 'Swali', 
    'Kpansia', 'Amarata', 'Ovom', 'Akenfa', 'Other'
  ];

  const specialNeedsOptions = [
    'Wheelchair accessible',
    'Medical urgency', 
    'Traveling with infant',
    'Need to leave immediately',
    'Multiple children (3+)'
  ];

  const handleSubmit = async () => {
    setLoading(true);
    
    // Generate code phrase
    const names = ['Ngozi', 'Ada', 'Chidi', 'Nneka', 'Ogechi'];
    const codePhrase = `Mama ${names[Math.floor(Math.random() * names.length)]} sent me`;
    
    try {
      // Create anonymous alias first
      const { data: alias, error: aliasError } = await supabase
        .from('aliases')
        .insert({ alias_name: `Survivor_${Date.now().toString().slice(-4)}` })
        .select()
        .single();
      
      if (aliasError) throw aliasError;

      // Create pickup
      const { data: pickup, error: pickupError } = await supabase
        .from('pickups')
        .insert({
          alias_id: alias.alias_id,
          pickup_location: location,
          passenger_count: passengers,
          special_needs: needs,
          code_phrase: codePhrase,
          status: 'requested'
        })
        .select()
        .single();
      
      if (pickupError) throw pickupError;
      
      onPickupCreated({ ...pickup, aliasId: alias.alias_id });
      
    } catch (err) {
      console.error('Pickup creation failed:', err);
      alert('Failed to create pickup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'location') {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6">
        <div className="max-w-md mx-auto pt-8">
          <h2 className="text-2xl font-bold mb-2">Safe Pickup Request</h2>
          <p className="text-gray-400 mb-6">We'll send someone to get you safely.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Your area:</label>
              <select 
                value={location.area}
                onChange={(e) => setLocation({...location, area: e.target.value})}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                required
              >
                <option value="">Select area...</option>
                {areas.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Nearby landmark:</label>
              <input
                type="text"
                placeholder="e.g., Near Total filling station, opposite market"
                value={location.landmark}
                onChange={(e) => setLocation({...location, landmark: e.target.value})}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                required
              />
            </div>

            <button
              onClick={() => location.area && location.landmark && setStep('details')}
              disabled={!location.area || !location.landmark}
              className="w-full p-4 bg-red-600 rounded-lg font-semibold disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'details') {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6">
        <div className="max-w-md mx-auto pt-8">
          <h2 className="text-2xl font-bold mb-6">Pickup Details</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">How many people total?</label>
              <input
                type="number"
                min="1"
                max="6"
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
              />
              <p className="text-xs text-gray-500 mt-1">Include yourself and children</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Special needs:</label>
              <div className="space-y-2">
                {specialNeedsOptions.map(need => (
                  <label key={need} className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded">
                    <input
                      type="checkbox"
                      checked={needs.includes(need)}
                      onChange={(e) => {
                        if (e.target.checked) setNeeds([...needs, need]);
                        else setNeeds(needs.filter(n => n !== need));
                      }}
                      className="w-5 h-5 accent-red-500"
                    />
                    <span className="text-sm">{need}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-yellow-500/20 p-4 rounded-lg">
              <p className="text-sm text-yellow-200">
                ℹ️ A driver will call you with a code phrase. The pickup will be disguised as a delivery.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full p-4 bg-green-600 rounded-lg font-semibold disabled:bg-gray-700"
            >
              {loading ? 'Requesting...' : '🚗 Request Pickup Now'}
            </button>

            <button
              onClick={() => setStep('location')}
              className="w-full p-3 text-gray-400 hover:text-white"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}