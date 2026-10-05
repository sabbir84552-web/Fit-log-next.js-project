import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Flame, Star, Check, X } from 'lucide-react';

export default function PlanCard({ item, activeTab, onMarkDone, onRemove }) {
  return (
    <div
      className={`bg-[#14171f] border border-gray-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition ${
        item.isDone ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-gray-800 shrink-0">
          <Image
            src={item.image || '/assets/pic.png'}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4
            className={`font-black uppercase text-sm text-white ${
              item.isDone ? 'line-through text-gray-500' : ''
            }`}
          >
            {item.name}
          </h4>
          <p className="text-xs text-gray-400">{item.equipment}</p>
          <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {item.duration} min
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-400" /> {item.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {item.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 self-end md:self-center">
        <Link
          href={`/workout/${item.id}`}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1a1f29] text-gray-200 border border-gray-700 hover:bg-[#252b38] transition"
        >
          View Details
        </Link>

        {/* Mark as Done বাটন শুধু Today's Plan ট্যাবে থাকবে */}
        {activeTab === 'today' && (
          <button
            onClick={() => onMarkDone(item.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
              item.isDone
                ? 'bg-gray-700 text-white'
                : 'bg-[#ccff00] text-black hover:bg-[#b8e600]'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            {item.isDone ? 'Done' : 'Mark as Done'}
          </button>
        )}

        <button
          onClick={() => onRemove(item.id)}
          className="p-2 text-gray-500 hover:text-red-400 transition"
          title="Remove"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}