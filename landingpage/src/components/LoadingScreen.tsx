'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900 transition-opacity duration-500">
      <div className="relative">
        {/* Animated Dog Icon */}
        <div className="w-32 h-32 relative animate-bounce">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] rounded-full animate-ping opacity-20" />
          <div className="relative w-full h-full bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] rounded-full flex items-center justify-center">
            <span className="text-5xl">🐕</span>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold gradient-text mb-2">DogeDigger</h2>
          <div className="flex items-center justify-center space-x-1">
            <span className="text-gray-600 dark:text-gray-400">Loading</span>
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-[#FF6B35] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-[#4ECDC4] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-[#FFE66D] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
