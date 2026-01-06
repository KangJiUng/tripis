'use client';

import { GoogleMap as Map, LoadScript } from '@react-google-maps/api';

type LatLng = {
  lat: number;
  lng: number;
};

export default function GoogleMap({ className, center }: { className: string; center: LatLng }) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <Map
        mapContainerClassName={className}
        center={center}
        zoom={8}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
        }}
      />
    </LoadScript>
  );
}
