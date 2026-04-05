// src/components/Statistics.jsx
import React from 'react';

const stats = [
  { number: "1 in 3", label: "Women experience physical or sexual violence", source: "UN Women" },
  { number: "24/7", label: "Crisis support availability", source: "Our Services" },
  { number: "15 min", label: "Average emergency response time", source: "Yenagoa Metro" },
  { number: "500+", label: "Survivors supported this year", source: "2024 Data" }
];

export default function Statistics() {
  return (
    <section className="relative py-24 bg-gray-900 overflow-hidden">
      {/* Curved top edge */}
      <div className="absolute top-0 left-0 right-0 transform rotate-180">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto text-white">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-gray-900" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              The Reality of <span className="text-red-500">Gender-Based Violence</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Behind every statistic is a person. In Nigeria, over 30% of women aged 15-49 
              have experienced physical violence [^39^]. In the Niger Delta, the crisis is 
              compounded by economic instability and environmental destruction. We're 
              working to change these numbers—one survivor at a time.
            </p>
            <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Read Our Impact Report
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl font-bold text-red-500 mb-2">{stat.number}</div>
                <div className="text-white font-medium mb-1">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.source}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}