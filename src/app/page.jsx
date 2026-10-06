'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ChevronDown } from 'lucide-react';
import WorkoutCard from '@/components/WorkoutCard';

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('duration');

  useEffect(() => {
    fetch('https://api.api-store.workers.dev/api/fitlog')
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === 'duration') return (b.duration || 0) - (a.duration || 0);
    if (sortBy === 'calories') return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-12 sm:space-y-16 w-full overflow-hidden">
      {/* Hero Section */}
      <section className="bg-[#14171f] border border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 w-full">
        <div className="space-y-4 max-w-xl w-full text-center md:text-left">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#ccff00] font-bold">
            WORKOUT LIBRARY
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            TRAIN WITH INTENT. <br className="hidden sm:block" /> LOG EVERY SET.
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="inline-flex items-center justify-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full hover:bg-[#b8e600] transition text-xs uppercase mt-4 tracking-wider w-full sm:w-auto"
          >
            BROWSE WORKOUTS <ArrowDown className="w-4 h-4" />
          </a>
        </div>

        {/* Hero Banner Image */}
        <div className="w-full md:w-1/3 flex justify-center mt-6 md:mt-0">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72">
            <Image
              src="/assets/banner.png"
              alt="Gym illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section id="library" className="space-y-6 scroll-mt-24 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wide">
              THE LIBRARY
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-gray-400 w-full sm:w-auto mt-2 sm:mt-0">
            <span>Sort By</span>
            <div className="relative w-[120px] sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#161a22] border border-gray-800 text-white rounded-lg px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#ccff00] cursor-pointer text-xs w-full"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center w-full">
            <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 text-sm">Loading workouts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            {sortedWorkouts.map((item) => (
              <WorkoutCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}