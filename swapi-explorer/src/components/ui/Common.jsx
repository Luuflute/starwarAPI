import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

export const Loading = () => (
  <div className="flex justify-center items-center p-12 text-blue-500">
    <Loader2 className="animate-spin w-8 h-8" />
  </div>
);

export const ErrorMsg = ({ msg }) => (
  <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded flex items-center gap-2">
    <AlertCircle size={20} />
    <span>Error: {msg}</span>
  </div>
);

export const Button = ({ children, onClick, disabled, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 
      disabled:opacity-50 disabled:cursor-not-allowed transition-colors
      ${className}
    `}
  >
    {children}
  </button>
);