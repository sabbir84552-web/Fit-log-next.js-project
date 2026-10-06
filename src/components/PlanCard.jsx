import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Flame, Star, Check, X } from 'lucide-react';

export default function PlanCard({ item, activeTab, onMarkDone, onRemove }) {
  return (
    <div
      className={`bg-[#14171f] border border-gray-800 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition w-full ${
        item.isDone ? 'opacity-50' : ''
      }`}
    >
      <div className="flex flex-row items-center gap-4 w-full md:w-auto">
        <div className="relative w-20 h-16 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-gray-800 shrink-0">
          <Image
            src={item.image || '/assets/pic.png'}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4
            className={`font-black uppercase text-[11px] sm:text-sm text-white truncate ${
              item.isDone ? 'line-through text-gray-500' : ''
            }`}
          >
            {item.name}
          </h4>
          <p className="text-[10px] sm:text-xs text-gray-400 truncate">{item.equipment}</p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-gray-400 mt-1">
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Clock className="w-3 h-3 shrink-0" /> {item.duration} min
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Flame className="w-3 h-3 text-orange-400 shrink-0" /> {item.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 shrink-0" /> {item.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 self-end md:self-center w-full justify-end md:w-auto mt-2 md:mt-0">
        <Link
          href={`/workout/${item.id}`}
          className="px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-semibold bg-[#1a1f29] text-gray-200 border border-gray-700 hover:bg-[#252b38] transition whitespace-nowrap"
        >
          View Details
        </Link>

        {/* Mark as Done বাটন শুধু Today's Plan ট্যাবে থাকবে */}
        {activeTab === 'today' && (
          <button
            onClick={() => onMarkDone(item.id)}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-bold transition whitespace-nowrap ${
              item.isDone
                ? 'bg-gray-700 text-white'
                : 'bg-[#ccff00] text-black hover:bg-[#b8e600]'
            }`}
          >
            <Check className="w-3.5 h-3.5 shrink-0" />
            {item.isDone ? 'Done' : 'Mark as Done'}
          </button>
        )}

        <button
          onClick={() => onRemove(item.id)}
          className="p-1.5 sm:p-2 text-gray-500 hover:text-red-400 transition"
          title="Remove"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}