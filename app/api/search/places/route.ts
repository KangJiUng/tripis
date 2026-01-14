import { NextResponse } from 'next/server';
import placesData from '@/data/places.json';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query')?.toLowerCase() ?? '';

  const filtered = placesData.predictions
    .filter((p) => p.name.toLowerCase().includes(query))
    .map((p) => ({
      place_id: p.place_id,
      name: p.name,
      address: p.formatted_address,
      primary_type: p.primary_type,
      latitude: p.geometry.location.lat,
      longitude: p.geometry.location.lng,
    }));

  return NextResponse.json({ places: filtered });
}
