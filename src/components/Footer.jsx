import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0b0d10] border-t border-gray-800/60 py-8 px-4 sm:px-6 text-sm text-gray-500 mt-auto w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 w-full text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 font-bold text-white tracking-wider text-base w-full md:w-auto">
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
        <p className="text-xs text-gray-400 text-center md:text-right w-full md:w-auto">
          &copy; 2026 FitLog &mdash; Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}