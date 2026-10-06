import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Flame, Star } from 'lucide-react';

export default function WorkoutCard({ item }) {
  return (
    <Link
      href={`/workout/${item.id}`}
      className="bg-[#161a22] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition flex flex-col group w-full"
    >
      <div className="relative h-40 sm:h-48 w-full bg-[#1b202a]">
        <Image
          src={item.image || '/assets/pic.png'}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 sm:gap-4 w-full">
        <div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {item.muscleGroups?.map((group, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded"
              >
                {group}
              </span>
            ))}
          </div>
          <h3 className="font-extrabold text-white text-sm sm:text-base tracking-wide uppercase line-clamp-1">
            {item.name}
          </h3>
          <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5">{item.equipment}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between sm:justify-start sm:gap-4 text-[10px] sm:text-xs text-gray-400 pt-3 border-t border-gray-800/60 w-full">
          <span className="flex items-center gap-1 whitespace-nowrap">
            <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-gray-400 shrink-0" /> {item.duration} min
          </span>
          <span className="flex items-center gap-1 whitespace-nowrap">
            <Flame className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-orange-400 shrink-0" /> {item.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1 whitespace-nowrap">
            <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-yellow-400 fill-yellow-400 shrink-0" /> {item.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}