'use client';

import { create } from 'zustand';
import { AirportStore } from '@/types/airport';
import { aviationApi } from '@/services/aviationApi';

export const useAirportStore = create<AirportStore>((set, get) => ({
  airports: [],
  loading: false,
  error: null,
  pagination: null,
  searchQuery: '',
  selectedAirport: null,

  setAirports: (airports) => set({ airports }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  setPagination: (pagination) => set({ pagination }),
  
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  
  setSelectedAirport: (selectedAirport) => set({ selectedAirport }),

  fetchAirports: async (offset = 0, search = '', limit = 25) => {
    const { setLoading, setError, setAirports, setPagination, setSearchQuery } = get();
    
    setLoading(true);
    setError(null);
    setSearchQuery(search);

    try {
      const response = await aviationApi.getAirports(offset, limit, search);
      setAirports(response.data);
      setPagination(response.pagination);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
      setAirports([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  },
}));

