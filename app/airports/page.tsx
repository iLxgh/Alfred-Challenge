"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAirportStore } from "@/store/airportStore";
import AirportSearch from "@/components/AirportSearch";
import AirportTable from "@/components/AirportTable";
import Pagination from "@/components/Pagination";
import { Airport } from "@/types/airport";

export default function AirportsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    airports,
    loading,
    error,
    pagination,
    searchQuery,
    fetchAirports,
    setSelectedAirport,
  } = useAirportStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {

    const urlSearchQuery = searchParams.get("search") || "";
    if (urlSearchQuery) {

      fetchAirports(0, urlSearchQuery, itemsPerPage);
    } else {
      fetchAirports(0, "", itemsPerPage);
    }
  }, [searchParams]);

  const handleSearch = useCallback(
    (query: string) => {
      setCurrentPage(1);
      fetchAirports(0, query);
    },
    [fetchAirports]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const offset = (page - 1) * itemsPerPage;
      setCurrentPage(page);
      fetchAirports(offset, searchQuery, itemsPerPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [fetchAirports, searchQuery, itemsPerPage]
  );

  const handleItemsPerPageChange = useCallback(
    (newItemsPerPage: number) => {
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1);
      fetchAirports(0, searchQuery, newItemsPerPage);
    },
    [fetchAirports, searchQuery]
  );

  const handleRowClick = useCallback(
    (airport: Airport) => {
      setSelectedAirport(airport);
      router.push(`/airports/${airport.iata_code || airport.id}`);
    },
    [router, setSelectedAirport]
  );

  const totalPages = pagination
    ? Math.ceil(pagination.total / itemsPerPage)
    : 1;

  return (
    <div className="min-h-screen bg-[#f5f3f3] dark:bg-[#0a0a0a] py-8 mx-auto">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-30 mt-20 w-full flex flex-col items-center justify-center">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-6xl text-center font-semibold bg-linear-to-tl from-white/20 from-0% via-black via-60% to-black bg-clip-text text-transparent h-64 sm:h-33 relative dark:from-black/20 dark:via-white/80 dark:to-white/80">
              Your best way to <br />
              find{" "}
              <span className="font-silk-serif-italic">yours Airports</span>
            </h1>
          </div>

          <p className="mt-2 text-lg max-w-105 text-center font-semibold text-black dark:text-white">
            Explore our complete database of airports around the world and find
            the best airports to fly to.
          </p>
        </div>

        <div className="mb-6 flex gap-4 items-center flex-wrap">
          <div className="flex-1">
            <AirportSearch
              onSearch={handleSearch}
              initialQuery={searchParams.get("search") || searchQuery}
            />
          </div>

          <div className="gap-2 relative">
            <div className="flex gap-1 dark:bg-[#161616] bg-[#ffffff] p-1 rounded-full">
              {[10, 25, 50, 100].map((value) => (
                <button
                  key={value}
                  onClick={() => handleItemsPerPageChange(value)}
                  disabled={loading}
                  className={`
           px-6 h-15  rounded-full text-sm font-medium transition-all duration-500
          ${
            itemsPerPage === value
              ? "dark:bg-white dark:text-black text-white bg-black shadow-sm"
              : "dark:text-white text-black dark:hover:text-white/40 hover:text-black/40 dark:hover:bg-white/15 hover:bg-black/15"
          }
          ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 border dark:border-white/15 border-black/15 px-6 py-4 rounded-2xl">
            <p className="font-medium text-red-700">Error:</p>
            <p className="text-red-700/60"> {error}</p>
          </div>
        )}

        <div className="overflow-hidden">
          <AirportTable
            airports={airports}
            loading={loading}
            onRowClick={handleRowClick}
          />
          {pagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              loading={loading}
            />
          )}
        </div>

        {pagination && !loading && (
          <div className="mt-4 text-center text-sm font-semibold dark:text-white text-black">
            Showing {airports.length} of {pagination.total} airports
          </div>
        )}
      </div>
    </div>
  );
}
