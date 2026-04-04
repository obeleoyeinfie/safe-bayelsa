import React from 'react';

export default function CrisisCheck({ onCrisis, onSafe, onPlanning }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-md mx-auto pt-12">
        <h1 className="text-3xl font-bold text-center mb-2">SafeBayelsa</h1>
        <p className="text-gray-400 text-center mb-12 text-sm">
          Confidential support for survivors
        </p>

        <p className="text-center text-lg mb-8">
          Are you safe right now?
        </p>

        {/* Crisis Option */}
        <button
          onClick={onCrisis}
          className="w-full mb-4 p-5 border-2 border-red-500 rounded-xl text-left hover:bg-red-500/10 transition"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">⚠️</span>
            <div>
              <div className="font-bold text-lg">NO or UNSURE</div>
              <div className="text-gray-400 text-sm">I need help now</div>
            </div>
          </div>
        </button>

        {/* Safe Option */}
        <button
          onClick={onSafe}
          className="w-full mb-4 p-5 border-2 border-green-500 rounded-xl text-left hover:bg-green-500/10 transition"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">✅</span>
            <div>
              <div className="font-bold text-lg">YES, I'm safe</div>
              <div className="text-gray-400 text-sm">but need support</div>
            </div>
          </div>
        </button>

        {/* Planning Option */}
        <button
          onClick={onPlanning}
          className="w-full p-5 border-2 border-yellow-500 rounded-xl text-left hover:bg-yellow-500/10 transition"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">🕐</span>
            <div>
              <div className="font-bold text-lg">Planning to leave</div>
              <div className="text-gray-400 text-sm">Need preparation help</div>
            </div>
          </div>
        </button>

        <p className="text-center text-gray-500 text-xs mt-12">
          Your information is encrypted and confidential.<br/>
          You control who sees what, and when.
        </p>
      </div>
    </div>
  );
}