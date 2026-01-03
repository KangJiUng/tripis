'use client';

import { GoogleMap as Map, LoadScript } from '@react-google-maps/api';

const center = {
  lat: 35.681236,
  lng: 139.767125,
};

export default function GoogleMap({ className }: { className: string }) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <Map
        mapContainerClassName={className}
        center={center}
        zoom={7}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
        }}
      />
    </LoadScript>
  );
}
