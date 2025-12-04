import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { ADDRESS, COMPANY_NAME } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 mt-auto">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h3 className="text-white font-semibold mb-4">{COMPANY_NAME}</h3>
        
        <div className="flex flex-col gap-3 items-center text-sm mb-6">
          <div className="flex items-center gap-2 justify-center">
            <MapPin className="w-4 h-4 text-royal-400" />
            <span>{ADDRESS}</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Phone className="w-4 h-4 text-royal-400" />
            <a href="tel:+8801704100775" className="hover:text-white transition-colors">+8801704100775</a>
          </div>
        </div>
        
        <div className="text-xs text-slate-600 border-t border-slate-800 pt-4">
          &copy; {new Date().getFullYear()} Asterisk Human Resources. All rights reserved.
        </div>
      </div>
    </footer>
  );
};