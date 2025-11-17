'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Airport } from '@/types/airport';
import { Plane } from 'lucide-react';


delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface AirportMapProps {
  airport: Airport;
}

function MapUpdater({ airport }: { airport: Airport }) {
  const map = useMap();
  
  useEffect(() => {
    if (airport.location?.latitude && airport.location?.longitude) {
      map.setView([airport.location.latitude, airport.location.longitude], 13);
    }
  }, [airport, map]);

  return null;
}

export default function AirportMap({ airport }: AirportMapProps) {
  const hasLocation = airport.location?.latitude && airport.location?.longitude;

  if (!hasLocation) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Plane className="mx-auto h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-500">Location not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <MapContainer
        center={[airport.location.latitude, airport.location.longitude]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater airport={airport} />
        <Marker position={[airport.location.latitude, airport.location.longitude]}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{airport.airport_name}</p>
              <p>{airport.iata_code} / {airport.icao_code}</p>
              <p>{airport.city_name}, {airport.country_name}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

