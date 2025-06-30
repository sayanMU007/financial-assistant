import React, { useState } from 'react';
import { Zap, Loader2, CheckCircle } from 'lucide-react';

const OptimizeButton = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsOptimizing(false);
    setIsOptimized(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsOptimized(false);
    }, 3000);
  };

  if (isOptimized) {
    return (
      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
        <CheckCircle className="w-5 h-5" />
        Optimization Complete!
      </button>
    );
  }

  return (
    <button
      onClick={handleOptimize}
      disabled={isOptimizing}
      className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
        isOptimizing ? 'animate-pulse' : ''
      }`}
    >
      {isOptimizing ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Optimizing Your Portfolio...
        </>
      ) : (
        <>
          <Zap className="w-5 h-5" />
          One-Click Optimize
        </>
      )}
    </button>
  );
};

export default OptimizeButton;