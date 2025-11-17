"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface AirportSearchProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export default function AirportSearch({
  onSearch,
  initialQuery = "",
}: AirportSearchProps) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-6 top-8 transform -translate-y-1/2 dark:text-white/50 text-black/50 w-5 h-5" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or IATA/ICAO code..."
        className="w-full bg-black/10 border-2 border-black/20 h-15 px-14 rounded-full hover:bg-black/20 transition-colors duration-700 text-black
        dark:bg-white/10 dark:text-white dark:border-white/20 dark:hover:bg-white/20
        "
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-6 top-8 transform -translate-y-1/2 text-black cursor-pointer hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
