"use client";

import { MdSearch } from "react-icons/md";

export default function SearchBar({ placeholder, disabled }) {
  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 bg-zinc-800/80 border border-zinc-700 rounded-lg text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          disabled={disabled}
        />
        <div className="absolute left-3 top-2.5 text-zinc-500">
          <MdSearch className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
