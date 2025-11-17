import { aviationApi } from '@/services/aviationApi';

global.fetch = jest.fn();

describe('AviationApi Integration Tests', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should fetch airports successfully', async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          iata_code: 'JFK',
          name: 'John F. Kennedy International Airport',
          latitude: '40.6398',
          longitude: '-73.7789',
        },
      ],
      pagination: {
        limit: 25,
        offset: 0,
        count: 1,
        total: 1,
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await aviationApi.getAirports(0, 25);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.aviationstack.com/v1/airports')
    );
    expect(result.data).toHaveLength(1);
    expect(result.data[0].iata_code).toBe('JFK');
    expect(result.data[0].location.latitude).toBe(40.6398);
    expect(result.data[0].location.longitude).toBe(-73.7789);
    expect(result.pagination).toBeDefined();
  });

  it('should handle search parameter correctly', async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          iata_code: 'JFK',
          name: 'John F. Kennedy International Airport',
          latitude: '40.6398',
          longitude: '-73.7789',
        },
      ],
      pagination: {
        limit: 25,
        offset: 0,
        count: 1,
        total: 1,
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await aviationApi.getAirports(0, 25, 'JFK');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('search=JFK')
    );
  });

  it('should handle API errors correctly', async () => {
    const mockErrorResponse = {
      error: {
        message: 'Invalid API key',
        info: 'Please check your API key',
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockErrorResponse,
    });

    await expect(aviationApi.getAirports(0, 25)).rejects.toThrow(
      'Invalid API key'
    );
  });

  it('should handle network errors', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(aviationApi.getAirports(0, 25)).rejects.toThrow(
      'Network error'
    );
  });

  it('should handle HTTP errors', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
      json: async () => ({}),
    });

    await expect(aviationApi.getAirports(0, 25)).rejects.toThrow(
      'Error al obtener aeropuertos: Internal Server Error'
    );
  });

  it('should fetch airport by IATA code successfully', async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          iata_code: 'JFK',
          name: 'John F. Kennedy International Airport',
          latitude: '40.6398',
          longitude: '-73.7789',
        },
      ],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await aviationApi.getAirportByIata('JFK');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('iata_code=JFK')
    );
    expect(result).toBeDefined();
    expect(result?.iata_code).toBe('JFK');
    expect(result?.location.latitude).toBe(40.6398);
  });

  it('should return null when airport is not found by IATA code', async () => {
    const mockResponse = {
      data: [],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await aviationApi.getAirportByIata('XXX');

    expect(result).toBeNull();
  });

  it('should transform latitude and longitude to numbers', async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          iata_code: 'JFK',
          name: 'John F. Kennedy International Airport',
          latitude: '40.6398',
          longitude: '-73.7789',
        },
      ],
      pagination: {
        limit: 25,
        offset: 0,
        count: 1,
        total: 1,
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await aviationApi.getAirports(0, 25);

    expect(typeof result.data[0].location.latitude).toBe('number');
    expect(typeof result.data[0].location.longitude).toBe('number');
    expect(result.data[0].location.latitude).toBe(40.6398);
    expect(result.data[0].location.longitude).toBe(-73.7789);
  });

  it('should handle invalid latitude/longitude values', async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          iata_code: 'JFK',
          name: 'John F. Kennedy International Airport',
          latitude: 'invalid',
          longitude: 'invalid',
        },
      ],
      pagination: {
        limit: 25,
        offset: 0,
        count: 1,
        total: 1,
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await aviationApi.getAirports(0, 25);

    expect(result.data[0].location.latitude).toBe(0);
    expect(result.data[0].location.longitude).toBe(0);
  });
});

