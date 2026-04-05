import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function PickupRequest({ onPickupCreated, onCancel }) {
  const [step, setStep] = useState(1); // 1: Location, 2: Details, 3: Confirm, 4: Submitting
  const [location, setLocation] = useState({ area: '', landmark: '', specific: '' });
  const [passengers, setPassengers] = useState(1);
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const areas = [
    { name: 'Biogbolo', description: 'Near FMC Hospital area' },
    { name: 'Ekeki', description: 'Government Residential Area' },
    { name: 'Okutukutu', description: 'Waterfront community' },
    { name: 'Swali', description: 'Market and business district' },
    { name: 'Kpansia', description: 'Residential area' },
    { name: 'Amarata', description: 'Near Government House' },
    { name: 'Ovom', description: 'Suburban area' },
    { name: 'Akenfa', description: 'Coastal community' },
    { name: 'Other', description: 'Specify in landmark field' }
  ];

  const specialNeedsOptions = [
    { id: 'wheelchair', label: 'Wheelchair accessible vehicle', icon: '♿' },
    { id: 'medical', label: 'Medical urgency - need immediate care', icon: '🏥', urgent: true },
    { id: 'infant', label: 'Traveling with infant/young children', icon: '👶' },
    { id: 'immediate', label: 'Must leave immediately - danger present', icon: '⚡', urgent: true },
    { id: 'multiple', label: 'More than 3 children', icon: '👨‍👩‍👧‍👦' }
  ];

  const generateCodePhrase = () => {
    const names = ['Ngozi', 'Ada', 'Chidi', 'Nneka', 'Ogechi', 'Amara'];
    const actions = ['sent me', 'is expecting me', 'asked me to come'];
    return `Mama ${names[Math.floor(Math.random() * names.length)]} ${actions[Math.floor(Math.random() * actions.length)]}`;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    const codePhrase = generateCodePhrase();
    
    try {
      // Create anonymous alias
      const { data: alias, error: aliasError } = await supabase
        .from('aliases')
        .insert({ 
          alias_name: `Survivor_${Date.now().toString().slice(-4)}`,
          preferred_language: 'english'
        })
        .select()
        .single();
      
      if (aliasError) throw aliasError;

      // Create pickup request
      const { data: pickup, error: pickupError } = await supabase
        .from('pickups')
        .insert({
          alias_id: alias.alias_id,
          pickup_location: {
            area: location.area,
            landmark: location.landmark,
            specific_instructions: location.specific
          },
          passenger_count: passengers,
          special_needs: needs,
          code_phrase: codePhrase,
          status: 'requested',
          requested_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (pickupError) throw pickupError;
      
      onPickupCreated({ ...pickup, aliasId: alias.alias_id, codePhrase });
      
    } catch (err) {
      console.error('Pickup creation failed:', err);
      setError('Unable to create pickup request. Please check your connection and try again, or call emergency services directly.');
      setLoading(false);
    }
  };

  // Progress indicator
  const ProgressBar = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3].map((s) => (
        <div key={s} className={`h-2 rounded-full transition-all duration-300 ${
          s === step ? 'w-8 bg-blue-500' : s < step ? 'w-8 bg-green-500' : 'w-8 bg-slate-700'
        }`} />
      ))}
    </div>
  );

  // Step 1: Location
  if (step === 1) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6 animate-fade-in">
        <div className="max-w-lg mx-auto pt-4">
          <ProgressBar />
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Where are you now?</h2>
            <p className="text-slate-400 text-sm">
              This helps us send the nearest available driver. Your exact location is only shared with the assigned driver.
            </p>
          </div>

          <div className="space-y-4">
            {/* Area selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Select your area in Yenagoa
              </label>
              <div className="grid grid-cols-2 gap-2">
                {areas.map((area) => (
                  <button
                    key={area.name}
                    onClick={() => setLocation({ ...location, area: area.name })}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      location.area === area.name
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-medium text-sm">{area.name}</div>
                    <div className="text-xs text-slate-500">{area.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Landmark */}
            {location.area && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nearby landmark <span className="text-slate-500">(required)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Near Total filling station, opposite Zenith Bank"
                  value={location.landmark}
                  onChange={(e) => setLocation({ ...location, landmark: e.target.value })}
                  className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Be specific but safe. Use public places visible from the road.
                </p>
              </div>
            )}

            {/* Specific instructions (optional) */}
            {location.landmark && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Specific instructions <span className="text-slate-500">(optional)</span>
                </label>
                <textarea
                  placeholder="e.g., I'm wearing a blue dress, sitting near the entrance"
                  value={location.specific}
                  onChange={(e) => setLocation({ ...location, specific: e.target.value })}
                  rows={2}
                  className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                />
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={onCancel}
                className="flex-1 p-4 border border-slate-600 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={() => location.area && location.landmark && setStep(2)}
                disabled={!location.area || !location.landmark}
                className="flex-1 p-4 bg-blue-600 rounded-lg font-semibold disabled:bg-slate-700 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                Continue →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Details
  if (step === 2) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6 animate-fade-in">
        <div className="max-w-lg mx-auto pt-4">
          <ProgressBar />
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Who is traveling?</h2>
            <p className="text-slate-400 text-sm">
              This helps us send the right vehicle and ensure everyone's safety.
            </p>
          </div>

          <div className="space-y-6">
            {/* Passenger count */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Total number of people <span className="text-slate-500">(including yourself)</span>
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 text-xl hover:bg-slate-700 transition-colors"
                >
                  −
                </button>
                <div className="text-3xl font-bold w-16 text-center">{passengers}</div>
                <button
                  onClick={() => setPassengers(Math.min(6, passengers + 1))}
                  className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 text-xl hover:bg-slate-700 transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Maximum 6 people per pickup. For larger groups, request multiple pickups.
              </p>
            </div>

            {/* Special needs */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Special requirements <span className="text-slate-500">(select all that apply)</span>
              </label>
              <div className="space-y-2">
                {specialNeedsOptions.map((need) => (
                  <label
                    key={need.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      needs.includes(need.id)
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                    } ${need.urgent ? 'border-l-4 border-l-red-500' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={needs.includes(need.id)}
                      onChange={(e) => {
                        if (e.target.checked) setNeeds([...needs, need.id]);
                        else setNeeds(needs.filter(n => n !== need.id));
                      }}
                      className="w-5 h-5 accent-blue-500"
                    />
                    <span className="text-xl">{need.icon}</span>
                    <span className={`flex-1 ${need.urgent ? 'text-red-400 font-medium' : ''}`}>
                      {need.label}
                    </span>
                    {need.urgent && (
                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">URGENT</span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 p-4 border border-slate-600 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 p-4 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Confirm
  if (step === 3) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6 animate-fade-in">
        <div className="max-w-lg mx-auto pt-4">
          <ProgressBar />
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Confirm your request</h2>
            <p className="text-slate-400 text-sm">
              Review your details before submitting. This request is confidential.
            </p>
          </div>

          {/* Summary card */}
          <div className="bg-slate-800 rounded-xl p-6 mb-6 space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b border-slate-700">
              <svg className="w-5 h-5 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <div className="text-sm text-slate-400">Pickup location</div>
                <div className="font-medium">{location.area}</div>
                <div className="text-sm text-slate-300">{location.landmark}</div>
                {location.specific && (
                  <div className="text-sm text-slate-500 mt-1">{location.specific}</div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b border-slate-700">
              <svg className="w-5 h-5 text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <div className="text-sm text-slate-400">Passengers</div>
                <div className="font-medium">{passengers} {passengers === 1 ? 'person' : 'people'}</div>
              </div>
            </div>

            {needs.length > 0 && (
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <div className="text-sm text-slate-400">Special needs</div>
                  <div className="text-sm">
                    {needs.map(id => specialNeedsOptions.find(n => n.id === id)?.label).join(', ')}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* What happens next */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              What happens next?
            </h3>
            <ul className="text-sm text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">1.</span>
                We'll find the nearest verified driver (usually 5-15 minutes)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">2.</span>
                You'll receive a code phrase to verify the driver's identity
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">3.</span>
                The pickup will be disguised as a delivery or ride service
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">4.</span>
                Driver takes you to a safe house, not your home address
              </li>
            </ul>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 p-4 border border-slate-600 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 p-4 bg-green-600 rounded-lg font-semibold disabled:bg-slate-700 disabled:cursor-not-allowed hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  🚗 Request Pickup Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}