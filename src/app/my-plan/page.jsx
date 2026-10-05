'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePlan } from '@/context/PlanContext';
import { ChevronDown } from 'lucide-react';
import PlanCard from '@/components/PlanCard';

export default function MyPlanPage() {
  const { todayPlan, savedList, markAsDone, removeFromPlan, removeFromSaved } = usePlan();
  const [activeTab, setActiveTab] = useState('today');
  const [sortBy, setSortBy] = useState('duration');

  const currentList = activeTab === 'today' ? todayPlan : savedList;

  // Live calculation for Metrics Summary
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0);
  const totalCalories = todayPlan.reduce((acc, curr) => acc + (Number(curr.caloriesBurned) || 0), 0);

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === 'duration') return (Number(b.duration) || 0) - (Number(a.duration) || 0);
    if (sortBy === 'calories') return (Number(b.caloriesBurned) || 0) - (Number(a.caloriesBurned) || 0);
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black uppercase text-white tracking-wide">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-xs mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row (3 Cards) */}
      <div className="bg-[#12151c] border border-gray-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-800">
        <div className="space-y-1">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            Exercises
          </span>
          <p className="text-4xl font-extrabold text-[#ccff00]">{totalExercises}</p>
        </div>
        <div className="space-y-1 md:pl-6 pt-4 md:pt-0">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            Minutes
          </span>
          <p className="text-4xl font-extrabold text-white">{totalMinutes}</p>
        </div>
        <div className="space-y-1 md:pl-6 pt-4 md:pt-0">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            Calories
          </span>
          <p className="text-4xl font-extrabold text-white">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs & Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="bg-[#161a22] p-1 rounded-xl flex items-center border border-gray-800 max-w-fit">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition ${
              activeTab === 'today' ? 'bg-[#222733] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition ${
              activeTab === 'saved' ? 'bg-[#222733] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#161a22] border border-gray-800 text-white rounded-lg px-3 py-1.5 pr-8 appearance-none focus:outline-none cursor-pointer text-xs"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Empty State vs List */}
      {sortedList.length === 0 ? (
        <div className="border border-dashed border-gray-800 rounded-3xl py-20 px-6 text-center space-y-3 bg-[#111318]/50">
          <h3 className="text-xl font-bold uppercase text-white tracking-wide">
            NOTHING HERE YET
          </h3>
          <p className="text-gray-400 text-xs max-w-md mx-auto">
            Browse the library and add a lift to get today moving.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-block bg-[#ccff00] text-black font-bold px-6 py-2.5 rounded-full text-xs uppercase hover:bg-[#b8e600] transition"
            >
              Go to workouts
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((item) => (
            <PlanCard
              key={item.id}
              item={item}
              activeTab={activeTab}
              onMarkDone={markAsDone}
              onRemove={activeTab === 'today' ? removeFromPlan : removeFromSaved}
            />
          ))}
        </div>
      )}
    </div>
  );
}