import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0b0d10] border-t border-gray-800/60 py-8 px-6 text-sm text-gray-500 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold text-white tracking-wider text-base">
          <div className="relative w-5 h-5">
            <Image 
              src="/assets/logo.png" 
              alt="FitLog Logo" 
              fill 
              className="object-contain" 
            />
          </div>
          <span>FITLOG</span>
        </div>
        <p className="text-xs text-gray-400">
          &copy; 2026 FitLog &mdash; Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}