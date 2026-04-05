// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Curved top */}
      <div className="absolute top-0 left-0 right-0 transform rotate-180">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto text-gray-50">
          <path d="M0 60L1440 60V0H0V60Z" fill="currentColor"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">SafeBayelsa</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Confidential support for survivors of gender-based violence in Bayelsa State. 
              Available 24/7. No judgment. No cost. Just help.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-red-400">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Get Help Now</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Donate</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-red-400">Emergency</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="text-white font-bold">0800-SAFE-NOW</li>
              <li>24/7 Crisis Line</li>
              <li>Text: 0800-HELP-ME</li>
              <li className="pt-2">
                <button className="text-sm text-red-400 hover:text-red-300">
                  Quick Exit →
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 SafeBayelsa. All rights reserved. Confidential and secure.
          </p>
          <button 
            onClick={scrollToTop}
            className="px-6 py-2 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}