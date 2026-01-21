import { GoogleMap as Map, useJsApiLoader, OverlayView, Polyline } from '@react-google-maps/api';
import type { LatLng } from '@/types';

type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  title: string;
  order: number;
};

export default function GoogleMap({
  className,
  center,
  markers = [],
}: {
  className: string;
  center: LatLng;
  markers?: MarkerData[];
}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const path =
    markers.length >= 2 ? [...markers].sort((a, b) => a.order - b.order).map((m) => ({ lat: m.lat, lng: m.lng })) : [];

  if (!isLoaded) return null;

  return (
    <Map
      mapContainerClassName={className}
      center={center}
      zoom={12}
      options={{
        disableDefaultUI: true,
        clickableIcons: false,
      }}
    >
      {markers.map((m) => (
        <OverlayView key={m.id} position={{ lat: m.lat, lng: m.lng }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div className="-translate-x-1/2 -translate-y-1/2">
            <div className="text-medium13 flex h-6 w-6 items-center justify-center rounded-full bg-[#6B5CFF] text-white shadow">
              {m.order}
            </div>
          </div>
        </OverlayView>
      ))}
      {markers.length >= 2 && (
        <Polyline
          path={path}
          options={{
            strokeOpacity: 0,
            icons: [
              {
                icon: {
                  path: 'M 0,-1 0,1',
                  strokeOpacity: 1,
                  strokeWeight: 2,
                },
                offset: '0',
                repeat: '12px',
              },
            ],
          }}
        />
      )}
    </Map>
  );
}
