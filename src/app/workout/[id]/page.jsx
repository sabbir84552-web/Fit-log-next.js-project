'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';
import { CalendarPlus, Bookmark } from 'lucide-react';

export default function WorkoutDetailsPage() {
  const { id } = useParams();
  const { addToTodayPlan, addToSaved } = usePlan();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-24 text-center">
        <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm">Loading details...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="max-w-7xl mx-auto py-24 text-center text-gray-400">
        Workout not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Big Visual Image */}
        <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-gray-800 bg-[#161a22]">
          <Image
            src={workout.image || '/assets/pic.png'}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Column: Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black uppercase text-white tracking-wide">
              {workout.name}
            </h1>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              {workout.description}
            </p>
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {workout.muscleGroups?.map((group, idx) => (
                <span
                  key={idx}
                  className="bg-[#ccff00] text-black text-xs font-bold uppercase px-3 py-1 rounded-full"
                >
                  {group}
                </span>
              ))}
            </div>
          </div>

          {/* Key Specs Table */}
          <div className="border-t border-b border-gray-800 divide-y divide-gray-800 text-xs">
            <div className="py-2.5 flex justify-between">
              <span className="text-gray-500 uppercase tracking-wider font-semibold">EQUIPMENT</span>
              <span className="text-white font-medium">{workout.equipment}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-gray-500 uppercase tracking-wider font-semibold">DIFFICULTY</span>
              <span className="text-white font-medium">{workout.difficulty || 'Intermediate'}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-gray-500 uppercase tracking-wider font-semibold">SETS</span>
              <span className="text-white font-medium">{workout.sets || '4'}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-gray-500 uppercase tracking-wider font-semibold">REPS</span>
              <span className="text-white font-medium">{workout.reps || '6-8'}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-gray-500 uppercase tracking-wider font-semibold">DURATION</span>
              <span className="text-white font-medium">{workout.duration} min</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-gray-500 uppercase tracking-wider font-semibold">CALORIES</span>
              <span className="text-white font-medium">{workout.caloriesBurned} kcal</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-gray-500 uppercase tracking-wider font-semibold">RATING</span>
              <span className="text-white font-medium">{workout.rating}</span>
            </div>
          </div>

          {/* Instructions List */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-wider uppercase text-white">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-2 text-xs text-gray-300 list-decimal list-inside leading-relaxed">
              {workout.instructions?.map((step, idx) => (
                <li key={idx} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => addToTodayPlan(workout)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#ccff00] text-black font-bold py-3.5 px-6 rounded-xl hover:bg-[#b8e600] transition text-sm"
            >
              <CalendarPlus className="w-4 h-4" /> Add to today&apos;s plan
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#171b22] border border-gray-700 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-[#202530] transition text-sm"
            >
              <Bookmark className="w-4 h-4" /> Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}