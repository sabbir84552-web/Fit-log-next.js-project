import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 w-full overflow-hidden">
      <h1 className="text-6xl sm:text-7xl font-black text-[#ccff00] mb-2">404</h1>
      <h2 className="text-xl sm:text-2xl font-bold uppercase text-white mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-400 text-xs sm:text-sm max-w-xs sm:max-w-sm mx-auto mb-6">
        The workout route or page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full text-xs uppercase hover:bg-[#b8e600] transition"
      >
        Back to Home
      </Link>
    </div>
  );
}