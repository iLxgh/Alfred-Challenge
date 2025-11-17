"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useAirportStore } from "@/store/airportStore";
import { ArrowLeft, Plane, MapPin, Clock, Phone, Globe } from "lucide-react";
import { Airport } from "@/types/airport";
import { aviationApi } from "@/services/aviationApi";

const AirportMap = dynamic(() => import("@/components/AirportMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  ),
});

export default function AirportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { selectedAirport, setSelectedAirport } = useAirportStore();
  const [airport, setAirport] = useState<Airport | null>(selectedAirport);
  const [loading, setLoading] = useState(!selectedAirport);
  const [error, setError] = useState<string | null>(null);

  const iataCode = params.iata as string;

  useEffect(() => {
    const fetchAirport = async () => {
      if (selectedAirport && selectedAirport.iata_code === iataCode) {
        setAirport(selectedAirport);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await aviationApi.getAirportByIata(iataCode);

        if (data) {
          setAirport(data);
          setSelectedAirport(data);
        } else {
          setError("Airport not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading airport");
      } finally {
        setLoading(false);
      }
    };

    if (iataCode) {
      fetchAirport();
    }
  }, [iataCode, selectedAirport, setSelectedAirport]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 dark:border-white border-black border-t-transparent absolute top-0"></div>
        </div>
        <p className="mt-4 font-medium">Loading...</p>
      </div>
    );
  }

  if (error || !airport) {
    return (
      <div className="min-h-screen dark:bg-[#0a0a0a] bg-[#ffffff] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Plane className="mx-auto h-16 w-16 dark:text-white text-black mb-4" />
          <h1 className="text-2xl font-bold mb-2 dark:text-white text-black">
            Airport not found
          </h1>
          <p className="mb-6 dark:text-white text-black">
            {error || "The requested airport does not exist"}
          </p>
          <button
            onClick={() => router.push("/airports")}
            className="inline-flex items-center gap-2 mb-6 hover:text-white/15 cursor-pointer transition-colors duration-500"
          >
            <ArrowLeft className="h-5 w-6 dark:text-white text-black" />
            <span className="text-xl font-semibold uppercase dark:text-white text-black">
              Back to list
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen dark:bg-[#0a0a0a] bg-[#f5f3f3] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <button
          onClick={() => router.push("/airports")}
          className="inline-flex items-center gap-2 mb-6 hover:text-white/15 cursor-pointer transition-colors duration-500"
        >
          <ArrowLeft className="h-5 w-6 dark:text-white text-black" />
          <span className="text-xl font-semibold uppercase dark:text-white text-black">
            Back to list
          </span>
        </button>

        <div className="dark:bg-[#161616] bg-[#ffffff] rounded-2xl shadow-sm overflow-hidden mt-10">
          <div className="p-6 border-b border-white/15">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <div className="w-16 h-16 dark:bg-[#0a0a0a] bg-[#f5f3f3] rounded-full flex items-center justify-center">
                  <Plane className="h-8 w-8 dark:text-white text-black" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2 dark:text-white text-black">
                  {airport.airport_name}
                </h1>
                <div className="flex items-center gap-4 dark:text-white text-black">
                  {airport.iata_code && (
                    <span className="inline-flex items-center gap-1">
                      <span className="font-medium">IATA:</span>{" "}
                      {airport.iata_code}
                    </span>
                  )}
                  {airport.icao_code && (
                    <span className="inline-flex items-center gap-1">
                      <span className="font-medium">ICAO:</span>{" "}
                      {airport.icao_code}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 dark:text-white text-black">
                  General Information
                </h2>
                <dl className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-5 dark:text-white text-black mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-xl font-medium dark:text-white text-black">
                        Location
                      </dt>
                      <dd className="mt-1 text-lg dark:text-white text-black">
                        {airport.city_name && `${airport.city_name}, `}
                        {airport.country_name}
                        {airport.location?.latitude &&
                          airport.location?.longitude && (
                            <span className="block text-sm dark:text-white/60 text-black/60 mt-1">
                              {airport.location.latitude.toFixed(4)},{" "}
                              {airport.location.longitude.toFixed(4)}
                            </span>
                          )}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-6 w-5 dark:text-white text-black mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-xl font-medium dark:text-white text-black">
                        Time Zone
                      </dt>
                      <dd className="mt-1 text-lg dark:text-white text-black">
                        {airport.timezone || "N/A"}
                        {airport.gmt && (
                          <span className="block text-sm dark:text-white/60 text-black/60 mt-1">
                            GMT {airport.gmt}
                          </span>
                        )}
                      </dd>
                    </div>
                  </div>

                  {airport.phone_number && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-6 w-5 dark:text-white text-black mt-0.5 shrink-0" />
                      <div>
                        <dt className="text-xl font-medium dark:text-white text-black">
                          Phone
                        </dt>
                        <dd className="mt-1 text-lg dark:text-white text-black">
                          {airport.phone_number}
                        </dd>
                      </div>
                    </div>
                  )}

                  {airport.country_iso2 && (
                    <div className="flex items-start gap-3">
                      <Globe className="h-6 w-5 dark:text-white text-black mt-0.5 shrink-0" />
                      <div>
                        <dt className="text-xl font-medium dark:text-white text-black">
                          Country
                        </dt>
                        <dd className="mt-1 text-lg dark:text-white text-black">
                          {airport.country_name} ({airport.country_iso2})
                        </dd>
                      </div>
                    </div>
                  )}
                </dl>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 dark:text-white text-black">
                  Location on Map
                </h2>
                <AirportMap airport={airport} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
