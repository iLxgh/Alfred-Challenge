export interface Airport {
  id: number;
  airport_name: string;
  iata_code: string;
  icao_code: string;
  latitude: string;
  longitude: string;
  geoname_id: string;
  timezone: string;
  gmt: string;
  phone_number: string;
  country_name: string;
  country_iso2: string;
  city_iata_code: string;
  city_name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface AviationStackResponse {
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
  data: Airport[];
}

export interface AirportStore {
  airports: Airport[];
  loading: boolean;
  error: string | null;
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  } | null;
  searchQuery: string;
  setAirports: (airports: Airport[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPagination: (pagination: AviationStackResponse['pagination'] | null) => void;
  setSearchQuery: (query: string) => void;
  fetchAirports: (offset?: number, search?: string, limit?: number) => Promise<void>;
  selectedAirport: Airport | null;
  setSelectedAirport: (airport: Airport | null) => void;
}
