import { AviationStackResponse } from '@/types/airport';

const API_KEY = process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY || '';
const BASE_URL = 'https://api.aviationstack.com/v1';

export const aviationApi = {
  async getAirports(offset: number = 0, limit: number = 100, search?: string): Promise<AviationStackResponse> {
    const params = new URLSearchParams({
      access_key: API_KEY,
      limit: limit.toString(),
      offset: offset.toString(),
    });

    if (search) {
      params.append('search', search);
    }

    const response = await fetch(`${BASE_URL}/airports?${params.toString()}`);

    const data = await response.json()

    if (data.error) {
       const errorMessage = data.error.message ?? data.error.info ?? 'Error desconocido en la API';
        throw new Error(errorMessage);
    }

    if (!response.ok) {
      throw new Error(`Error al obtener aeropuertos: ${response.statusText}`);
    }


    if (data.error) {
      const errorMessage = data.error.message ?? data.error.info  ?? 'Error desconocido en la API';
      throw new Error(errorMessage);
    }
    const transformedData = data.data.map((airport: any) => ({
      ...airport,
      location: {
        latitude: parseFloat(airport.latitude) || 0,
        longitude: parseFloat(airport.longitude) || 0,
      },
    }));

    return {
      ...data,
      data: transformedData,
    };
  },

  async getAirportByIata(iataCode: string): Promise<any> {
    const params = new URLSearchParams({
      access_key: API_KEY,
      limit: '1',
    });

    const response = await fetch(`${BASE_URL}/airports?${params.toString()}&iata_code=${iataCode}`);


    const data = await response.json()

    if (data.error) {
       const errorMessage = data.error.message ?? data.error.info ?? 'Error desconocido en la API';
        throw new Error(errorMessage);
    }

    if (!response.ok) {
      throw new Error(`Error al obtener aeropuerto: ${response.statusText}`);
    }

    if (data.error) {
      const errorMessage = data.error.message ?? data.error.info  ?? 'Error desconocido en la API';
      throw new Error(errorMessage);
    }

    if (data.data && data.data.length > 0) {
      const airport = data.data[0];
      return {
        ...airport,
        location: {
          latitude: parseFloat(airport.latitude) || 0,
          longitude: parseFloat(airport.longitude) || 0,
        },
      };
    }

    return null;
  },
};

