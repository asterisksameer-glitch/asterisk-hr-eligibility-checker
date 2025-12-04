import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-royal-800 hover:bg-royal-900 text-white shadow-royal-200",
    secondary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200",
    outline: "border-2 border-royal-200 hover:border-royal-800 text-royal-800 hover:bg-royal-50",
    danger: "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};