'use client';

import { useEffect, useRef } from 'react';
import { GoogleMap as Map, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import type { LatLng } from '@/types';

type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  title: string;
  order: number;
};

interface Props {
  className: string;
  center: LatLng;
  markers?: MarkerData[];
}

export default function GoogleMap({ className, center, markers = [] }: Props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    if (markers.length === 0) {
      map.panTo(center);
      map.setZoom(12);
      return;
    }

    if (markers.length === 1) {
      map.panTo({ lat: markers[0].lat, lng: markers[0].lng });
      map.setZoom(15);
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    markers.forEach((m) => bounds.extend({ lat: m.lat, lng: m.lng }));
    map.fitBounds(bounds, { top: 40, bottom: 40, left: 40, right: 40 });

    const path = [...markers].sort((a, b) => a.order - b.order).map((m) => ({ lat: m.lat, lng: m.lng }));

    const polyline = new google.maps.Polyline({
      path,
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
    });

    polyline.setMap(map);
    polylineRef.current = polyline;
  }, [markers, center]);

  if (!isLoaded) return null;

  return (
    <Map
      mapContainerClassName={className}
      onLoad={(map) => {
        mapRef.current = map;
      }}
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
    </Map>
  );
}
