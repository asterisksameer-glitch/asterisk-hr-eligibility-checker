import React from 'react';
import { WizardStep } from '../types';

interface WizardLayoutProps {
  currentStep: WizardStep;
  children: React.ReactNode;
}

export const WizardLayout: React.FC<WizardLayoutProps> = ({ currentStep, children }) => {
  // Map internal logic steps to visual progress (0 to 100)
  // 0: Category, 1: Basic, 2: Qual, 3: Specific, 4: Final, 5: Success
  let progress = 0;
  
  switch (currentStep) {
    case WizardStep.CATEGORY: progress = 10; break;
    case WizardStep.BASIC_INFO: progress = 30; break;
    case WizardStep.QUALIFICATIONS: progress = 50; break;
    case WizardStep.SPECIFIC_DETAILS: progress = 70; break;
    case WizardStep.FINAL_DETAILS: progress = 90; break;
    case WizardStep.SUCCESS: progress = 100; break;
    case WizardStep.FAIL: progress = 100; break;
    default: progress = 0;
  }
  
  const showProgress = currentStep !== WizardStep.SUCCESS && currentStep !== WizardStep.FAIL;

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 w-full max-w-2xl mx-auto">
      {showProgress && (
        <div className="w-full max-w-sm mb-6">
            <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                <span>Start</span>
                <span>Check</span>
                <span>Finish</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-royal-600 transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
      )}
      
      <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative min-h-[400px]">
         {/* Decorative top bar */}
         <div className="h-2 bg-gradient-to-r from-royal-700 to-royal-500 w-full" />
         
         <div className="p-6 sm:p-8">
            {children}
         </div>
      </div>
    </main>
  );
};
