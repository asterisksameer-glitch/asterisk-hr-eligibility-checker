
import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onToggleLanguage }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
             {/* 
                LOGO INSTRUCTION:
                If you converted your image to SVG using a tool like vectorizer.ai, 
                you can replace the entire <svg>...</svg> block below with your code.
             */}
             <svg 
               viewBox="0 0 100 100" 
               fill="none" 
               xmlns="http://www.w3.org/2000/svg" 
               className="h-full w-full"
             >
                {/* A modern, rounded Asterisk shape in Brand Colors */}
                <circle cx="50" cy="50" r="48" className="fill-royal-50" />
                <path 
                  d="M50 20V80" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  strokeLinecap="round" 
                  className="text-royal-700" 
                />
                <path 
                  d="M24.02 35L75.98 65" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  strokeLinecap="round" 
                  className="text-royal-500" 
                />
                <path 
                  d="M24.02 65L75.98 35" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  strokeLinecap="round" 
                  className="text-royal-900" 
                />
             </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-royal-900 leading-tight">Asterisk HR</h1>
            <p className="text-xs text-slate-500 font-medium">
              {language === 'bn' ? 'ঢাকা টু সিঙ্গাপুর' : 'Dhaka to Singapore'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
            <ShieldCheck className="w-3 h-3" />
            <span>{language === 'bn' ? 'সরকারি অনুমোদিত' : 'Govt. Approved'}</span>
          </div>
          
          <button 
            onClick={onToggleLanguage}
            className="ml-2 px-3 py-1 rounded-md bg-royal-50 text-royal-700 font-semibold text-xs border border-royal-100 hover:bg-royal-100 transition-colors uppercase"
          >
            {language === 'bn' ? 'English' : 'বাংলা'}
          </button>
        </div>
      </div>
    </header>
  );
};
