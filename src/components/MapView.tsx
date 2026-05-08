import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import type { TripPlan } from '../services/geminiService';

interface MapViewProps {
  plan: TripPlan;
}

export default function MapView({ plan }: MapViewProps) {
  const apiKey = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';

  if (!apiKey) {
    return (
      <div className="w-full h-[600px] bg-surface-raised rounded-3xl flex items-center justify-center text-text-secondary border border-white/5">
        Google Maps API key missing. Please configure it in your secrets.
      </div>
    );
  }

  // Calculate center from all items
  const allLocations = plan.days.flatMap(day => day.items.map(item => item.location));
  const center = allLocations.length > 0 
    ? {
        lat: allLocations.reduce((sum, loc) => sum + loc.lat, 0) / allLocations.length,
        lng: allLocations.reduce((sum, loc) => sum + loc.lng, 0) / allLocations.length
      }
    : { lat: 0, lng: 0 };

  return (
    <div className="w-full h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={12}
          mapId="VELORA_MAP_DARK"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          style={{ width: '100%', height: '100%' }}
        >
          {plan.days.map((day) => 
            day.items.map((item, idx) => (
              <Marker 
                key={`${day.day}-${idx}`}
                position={{ lat: item.location.lat, lng: item.location.lng }}
                label={{
                  text: `${day.day}`,
                  color: 'white',
                  fontSize: '10px'
                }}
              />
            ))
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
