// src/components/ResourceHub.jsx
import React, { useState } from 'react';

const resources = [
  {
    id: 1,
    title: "Emergency Shelter",
    description: "Immediate safe housing for survivors and their children. 24/7 intake available.",
    category: "Housing",
    icon: "🏠",
    urgent: true,
    contact: "0800-SAFE-NOW"
  },
  {
    id: 2,
    title: "Medical & Forensic Care",
    description: "Confidential medical exams, injury documentation, and trauma-informed care.",
    category: "Health",
    icon: "🏥",
    urgent: true,
    contact: "0800-HEAL-24"
  },
  {
    id: 3,
    title: "Legal Aid & Protection",
    description: "Free legal representation for protection orders, custody, and divorce proceedings.",
    category: "Legal",
    icon: "⚖️",
    urgent: false,
    contact: "FIDA Bayelsa"
  },
  {
    id: 4,
    title: "Counseling & Therapy",
    description: "Individual and group therapy for trauma recovery and mental wellness.",
    category: "Mental Health",
    icon: "🧠",
    urgent: false,
    contact: "Book Appointment"
  },
  {
    id: 5,
    title: "Economic Empowerment",
    description: "Job training, micro-grants, and financial literacy for independence.",
    category: "Support",
    icon: "💼",
    urgent: false,
    contact: "Apply Now"
  },
  {
    id: 6,
    title: "Youth & Education",
    description: "School support, scholarships, and youth leadership programs.",
    category: "Education",
    icon: "📚",
    urgent: false,
    contact: "Learn More"
  }
];

const categories = ["All", "Housing", "Health", "Legal", "Mental Health", "Support", "Education"];

export default function ResourceHub() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredResources = activeCategory === "All" 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header with curved underline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Support</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-300 mx-auto rounded-full" />
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with verified services and resources. All referrals are confidential.
          </p>
        </div>

        {/* Category filter - pill shaped with curves */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resource cards with curved corners */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => (
            <div 
              key={resource.id}
              className="group relative bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top curved accent */}
              <div className={`h-2 ${resource.urgent ? 'bg-red-600' : 'bg-gray-900'}`} />
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{resource.icon}</span>
                  {resource.urgent && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                      URGENT
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {resource.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{resource.category}</span>
                  <button className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    resource.urgent 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}>
                    {resource.contact}
                  </button>
                </div>
              </div>
              
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}