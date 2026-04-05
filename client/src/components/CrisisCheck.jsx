import React, { useState } from 'react';

export default function CrisisCheck({ onCrisis, onSafe, onPlanning }) {
  const [hoveredOption, setHoveredOption] = useState(null);

  const options = [
    {
      id: 'crisis',
      icon: '⚠️',
      title: 'NO or UNSURE',
      subtitle: 'I need immediate help',
      description: 'Request emergency pickup to a safe location within 15-30 minutes',
      color: 'red',
      onClick: onCrisis,
      urgent: true
    },
    {
      id: 'safe',
      icon: '✅',
      title: "YES, I'm safe now",
      subtitle: 'But I need support',
      description: 'Access shelter listings, legal aid, counseling, and safety planning tools',
      color: 'green',
      onClick: onSafe,
      urgent: false
    },
    {
      id: 'planning',
      icon: '🕐',
      title: 'Planning to leave',
      subtitle: 'Need preparation help',
      description: 'Create a personalized safety plan, document evidence, and prepare resources',
      color: 'yellow',
      onClick: onPlanning,
      urgent: false
    }
  ];

  const colorClasses = {
    red: {
      border: 'border-red-500',
      bg: 'bg-red-500/10',
      hover: 'hover:bg-red-500/20',
      text: 'text-red-400',
      badge: 'bg-red-500'
    },
    green: {
      border: 'border-green-500',
      bg: 'bg-green-500/10',
      hover: 'hover:bg-green-500/20',
      text: 'text-green-400',
      badge: 'bg-green-500'
    },
    yellow: {
      border: 'border-yellow-500',
      bg: 'bg-yellow-500/10',
      hover: 'hover:bg-yellow-500/20',
      text: 'text-yellow-400',
      badge: 'bg-yellow-500'
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 animate-fade-in">
      <div className="max-w-lg mx-auto pt-8">
        {/* Header with progress indicator */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
            <div className="w-8 h-1 bg-slate-700 rounded-full"></div>
            <div className="w-8 h-1 bg-slate-700 rounded-full"></div>
          </div>
          <h1 className="text-3xl font-bold mb-2">SafeBayelsa</h1>
          <p className="text-slate-400">Confidential survivor support network</p>
        </div>

        {/* Main question */}
        <div className="bg-slate-800/50 rounded-xl p-6 mb-6 backdrop-blur-sm border border-slate-700">
          <h2 className="text-xl font-semibold text-center mb-2">Are you in immediate danger?</h2>
          <p className="text-slate-400 text-center text-sm">
            Your response helps us connect you with the right resources quickly and safely.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {options.map((option) => {
            const colors = colorClasses[option.color];
            const isHovered = hoveredOption === option.id;
            
            return (
              <button
                key={option.id}
                onClick={option.onClick}
                onMouseEnter={() => setHoveredOption(option.id)}
                onMouseLeave={() => setHoveredOption(null)}
                className={`w-full p-5 border-2 rounded-xl text-left transition-all duration-300 relative overflow-hidden ${
                  colors.border
                } ${colors.bg} ${colors.hover} ${
                  isHovered ? 'transform scale-[1.02] shadow-lg' : ''
                }`}
              >
                {/* Urgent badge */}
                {option.urgent && (
                  <span className={`absolute top-3 right-3 ${colors.badge} text-white text-xs px-2 py-1 rounded-full animate-pulse`}>
                    URGENT
                  </span>
                )}

                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{option.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-1">{option.title}</div>
                    <div className={`text-sm ${colors.text} mb-2`}>{option.subtitle}</div>
                    
                    {/* Expanded description on hover */}
                    <div className={`text-sm text-slate-400 transition-all duration-300 ${
                      isHovered ? 'opacity-100 max-h-20' : 'opacity-70 max-h-12 overflow-hidden'
                    }`}>
                      {option.description}
                    </div>
                  </div>
                  
                  {/* Arrow indicator */}
                  <svg 
                    className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${
                      isHovered ? 'translate-x-1' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        {/* Privacy notice */}
        <div className="mt-8 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-slate-300 mb-1">Your privacy is protected</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                All data is encrypted. You control what information is shared and with whom. 
                No personal identifiers are required. This site leaves no trace in your browser history 
                when you use Quick Exit.
              </p>
            </div>
          </div>
        </div>

        {/* Help tooltip */}
        <div className="mt-6 text-center">
          <button className="text-slate-500 text-sm hover:text-slate-300 flex items-center justify-center gap-1 mx-auto transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How does this work?
          </button>
        </div>
      </div>
    </div>
  );
}