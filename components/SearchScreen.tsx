"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useThemeStore from "@/store/useThemeStore";
import { GrainGradient } from "@paper-design/shaders-react";
import Link from "next/link";

export default function SearchScreen() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/airports?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/airports");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="flex w-full h-screen items-center justify-center flex-col px-4 md:px-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <GrainGradient
            className="w-full h-full absolute"
            colors={
              isDarkMode
                ? ["#000000", "#293fcb", "#50a3ef", "#b0dee7"]
                : ["#ffffff", "#bfdbfe", "#60a5fa", "#3b82f6"]
            }
            speed={1}
            colorBack={isDarkMode ? "#000000" : "#ffffff"}
            softness={0.5}
            intensity={0.5}
            noise={0.25}
            shape="corners"
          />
        </div>

        <h1
          className={`text-5xl sm:text-6xl md:text-[6rem] font-bold bg-clip-text text-transparent relative text-center h-28 ${
            isDarkMode
              ? "bg-linear-to-tl from-black from-0% via-white via-50% to-white"
              : "bg-linear-to-tl from-white from-0% via-black via-50% to-black"
          }`}
        >
          SkyConnect!
        </h1>

        <div
          className={`backdrop-blur-xl border-2 mt-5 p-6 sm:p-8 w-full max-w-[90vw] sm:max-w-[800px] md:w-200 h-auto md:h-80 rounded-3xl sm:rounded-[3.5rem] flex flex-col items-center justify-center transition-all duration-300 ${
            isDarkMode
              ? "bg-white/5 border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]"
              : "bg-black/5 border-black/20 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]"
          }`}
        >
          <div>
            <h2
              className={`text-center text-2xl sm:text-3xl md:text-4xl font-semibold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Search for your destination
            </h2>
            <p
              className={`text-center text-sm sm:text-base md:text-lg mt-3 sm:mt-5 w-full md:w-140 ${
                isDarkMode ? "text-white/90" : "text-black/90"
              }`}
            >
              Search for your destination and find the best airports to fly to.
              We have a wide range of airports to choose.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row mt-6 sm:mt-10 gap-4 sm:gap-10 w-full justify-center items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for airports"
              className={`w-full sm:w-[50%] border-2 h-12 sm:h-15 px-5 sm:px-7 rounded-full transition-colors duration-700 ${
                isDarkMode
                  ? "bg-white/10 border-white/20 hover:bg-white/20 text-white placeholder:text-white/60"
                  : "bg-black/10 border-black/20 hover:bg-black/20 text-black placeholder:text-gray-600"
              }`}
            />
            <button
              onClick={handleSearch}
              className={`rounded-full px-7 h-12 sm:h-15 transition-colors duration-700 cursor-pointer w-full sm:w-fit text-nowrap font-semibold ${
                isDarkMode
                  ? "bg-white text-black hover:bg-white/80"
                  : "bg-black text-white hover:bg-black/80"
              }`}
            >
              Search
            </button>
          </div>
        </div>

        <div className="relative w-fit flex justify-center mt-5">
          <Link href="/airports">
            <button
              className={`backdrop-blur-xl border-2 px-6 sm:px-7 h-12 sm:h-15 rounded-2xl cursor-pointer transition-colors duration-700 text-nowrap font-semibold ${
                isDarkMode
                  ? "bg-green-400/5 border-green-400/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] hover:bg-green-400/40 text-white"
                  : "bg-green-600/10 border-green-600/30 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] hover:bg-green-600/30 text-gray-900"
              }`}
            >
              View all airports
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
