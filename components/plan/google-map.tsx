'use client';

import { GoogleMap as Map, useJsApiLoader } from '@react-google-maps/api';
import type { LatLng } from '@/types';

export default function GoogleMap({ className, center }: { className: string; center: LatLng }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (!isLoaded) return null; // 로더가 완료되었을 때만 렌더링

  return (
    <Map
      key={`${center.lat}-${center.lng}`}
      mapContainerClassName={className}
      center={center}
      zoom={8}
      options={{
        disableDefaultUI: true,
        clickableIcons: false,
      }}
    />
  );
}
