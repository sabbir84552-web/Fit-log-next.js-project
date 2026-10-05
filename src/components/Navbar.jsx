'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedList } = usePlan();

  return (
    <header className="sticky top-0 z-50 bg-[#0f1115] border-b border-gray-800/80 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-black tracking-wider text-xl text-white">
          <div className="relative w-6 h-6">
            <Image 
              src="/assets/logo.png" 
              alt="FitLog Logo" 
              fill 
              className="object-contain" 
            />
          </div>
          <span>FITLOG</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2 bg-[#171b22] px-3 py-1.5 rounded-full border border-gray-800">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              pathname === '/' ? 'bg-[#222733] text-[#ccff00]' : 'text-gray-400 hover:text-[#ccff00]'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              pathname === '/my-plan' ? 'bg-[#222733] text-[#ccff00]' : 'text-gray-400 hover:text-[#ccff00]'
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Counter Badges */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-gray-300 hover:opacity-90"
          >
            <span>Plan</span>
            <span className="bg-[#ccff00] text-black w-5 h-5 flex items-center justify-center rounded-full font-bold text-xs">
              {todayPlan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-gray-300 border border-gray-700 hover:border-gray-500"
          >
            <span>Saved</span>
            <span className="text-gray-300 text-xs font-bold">{savedList.length}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}