"use client";

import { Airport } from "@/types/airport";
import { Plane, MapPin, Globe, Clock, Code, CodeIcon } from "lucide-react";

interface AirportTableProps {
  airports: Airport[];
  loading: boolean;
  onRowClick: (airport: Airport) => void;
}

export default function AirportTable({
  airports,
  loading,
  onRowClick,
}: AirportTableProps) {
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 dark:border-white border-black border-t-transparent absolute top-0"></div>
        </div>
        <p className="mt-4 font-medium">Loading airports...</p>
      </div>
    );
  }

  if (airports.length === 0) {
    return (
      <div className="text-center py-20 bg-linear-to-tl dark:from-[#0a0a0a] from-[#f5f3f3] dark:to-[#111111] to-[#e4e4e4] rounded-2xl">
        <div className="dark:bg-[#161616] bg-[#ffffff] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Plane className="h-10 w-10 dark:text-white text-black" />
        </div>
        <h3 className="text-xl font-semibold mb-2 dark:text-white text-black">
          No airports found
        </h3>
        <p className="dark:text-white/40 text-black/40">
          {" "}
          Try adjusting your search filters
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border dark:border-white/15 border-black/15 rounded-2xl">
      <div className="overflow-x-auto rounded-2xl">
        <table className="min-w-full">
          <thead>
            <tr className="dark:bg-[#161616] bg-[#ffffff]">
              <th className="px-6 py-6 text-left text-sm font-bold uppercase border-r dark:border-white/10 border-black/10">
                <div className="flex items-center gap-2 justify-center dark:text-white text-black">
                  Airport
                  <Plane className="h-4 w-4 dark:text-white text-black" />
                </div>
              </th>

              <th className="px-6 py-6 text-left text-sm font-bold uppercase border-r dark:border-white/10 border-black/10">
                <div className="flex items-center gap-2 justify-center dark:text-white text-black">
                  Code
                  <CodeIcon className="h-4 w-4 dark:text-white text-black" />
                </div>
              </th>

              <th className="px-6 py-6 text-left text-sm font-bold uppercase border-r dark:border-white/10 border-black/10">
                <div className="flex items-center gap-2 justify-center dark:text-white text-black">
                  Location
                  <MapPin className="h-4 w-4 dark:text-white text-black" />
                </div>
              </th>
              <th className="px-6 py-6 text-left text-sm font-bold uppercase">
                <div className="flex items-center gap-2 justify-center dark:text-white text-black">
                  Time Zone
                  <Clock className="h-4 w-4 dark:text-white text-black" />
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="dark:bg-[#0a0a0a] bg-[#f5f3f3] divide-y dark:divide-white/15 divide-black/15">
            {airports.map((airport) => (
              <tr
                key={airport.id}
                onClick={() => onRowClick(airport)}
                className="cursor-pointer transition-all duration-500 bg-[#11111] dark:hover:bg-white/15 hover:bg-black/15"
              >
                <td className="px-6 py-4 border-r dark:border-white/10 border-black/10">
                  <div className="flex items-start gap-3">
                    <div className="dark:bg-[#161616] bg-[#ffffff] p-2 rounded-lg">
                      <Plane className="h-5 w-5 dark:text-white text-black" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold dark:text-white text-black">
                        {airport.airport_name || "N/A"}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 border-r dark:border-white/10 border-black/10">
                  <div className="flex gap-2 justify-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      {airport.iata_code || "N/A"}
                    </span>

                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium dark:bg-white bg-black dark:text-black text-white">
                      {airport.icao_code || "N/A"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 border-r dark:border-white/10 border-black/10">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 dark:text-gray-400 text-black/70" />
                    <div>
                      <div className="text-sm font-medium dark:text-white text-black">
                        {airport.country_name || "N/A"}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 ">
                  <div className="text-sm dark:text-black text-white font-mono dark:bg-white bg-black px-3 py-1 rounded-lg inline-block font-semibold">
                    {airport.timezone || "N/A"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
