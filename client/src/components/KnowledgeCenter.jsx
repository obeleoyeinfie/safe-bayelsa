// src/components/KnowledgeCenter.jsx
import React, { useState } from 'react';

const articles = [
  {
    id: 1,
    title: "Understanding the Cycle of Abuse",
    excerpt: "Learn to recognize the patterns of tension, incident, reconciliation, and calm that characterize abusive relationships.",
    category: "Education",
    readTime: "5 min read",
    featured: true
  },
  {
    id: 2,
    title: "Safety Planning: A Step-by-Step Guide",
    excerpt: "Create a personalized plan to increase your safety and prepare for a quick departure if needed.",
    category: "Safety",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 3,
    title: "Legal Rights of Survivors in Nigeria",
    excerpt: "Know your rights regarding protection orders, custody, property, and divorce proceedings.",
    category: "Legal",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 4,
    title: "Supporting a Friend Who's Being Abused",
    excerpt: "How to help without judgment, what to say, and when to involve professionals.",
    category: "Community",
    readTime: "4 min read",
    featured: false
  },
  {
    id: 5,
    title: "Economic Abuse: Hidden Control",
    excerpt: "Financial control is abuse. Learn to recognize and escape economic dependence.",
    category: "Education",
    readTime: "7 min read",
    featured: true
  }
];

export default function KnowledgeCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Knowledge Center</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Evidence-based resources to understand, prevent, and respond to gender-based violence. 
            Inspired by leading research from VAWnet [^35^] and the IRC [^39^].
          </p>
        </div>

        {/* Search with curved input */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles, guides, and resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 bg-white rounded-full border border-gray-200 focus:border-red-500 focus:outline-none shadow-sm"
            />
            <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured article - large with curve */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-full">
              <div className="h-64 bg-gradient-to-br from-red-100 to-red-50 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">📖</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-red-600">
                    Featured Resource
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {articles[0].title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {articles[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{articles[0].category}</span>
                  <span>•</span>
                  <span>{articles[0].readTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article list */}
          <div className="space-y-4">
            {articles.slice(1).map((article) => (
              <div 
                key={article.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400">{article.readTime}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 hover:text-red-600 transition-colors">
                  {article.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            ))}
            
            <button className="w-full py-4 text-center text-red-600 font-medium hover:bg-red-50 rounded-2xl transition-colors">
              View All Resources →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}