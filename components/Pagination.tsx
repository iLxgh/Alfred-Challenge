"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  loading,
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1 && !loading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !loading) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 dark:bg-[#161616] bg-[#ffffff] sm:px-6 rounded-2xl mt-3">
      <div className="flex justify-between sm:hidden w-full">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1 || loading}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-2xl dark:text-gray-700 text-white dark:bg-white bg-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || loading}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-2xl dark:text-gray-700 text-white dark:bg-white bg-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm dark:text-white text-black">
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>

        <div>
          <nav
            className="relative z-0 inline-flex rounded-2xl shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1 || loading}
              className="relative inline-flex items-center px-2 py-2 rounded-l-2xl border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => !loading && onPageChange(pageNum)}
                  disabled={loading}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === pageNum
                      ? "z-10 border-blue-500 bg-blue-100 text-blue-800"
                      : "bg-white border-gray-300 text-black hover:bg-blue-50 transition-all duration-500"
                  } disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages || loading}
              className="relative inline-flex items-center px-2 py-2 rounded-r-2xl border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
