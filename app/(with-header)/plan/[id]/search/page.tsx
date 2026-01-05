'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PlanPlaceSearchBar from '@/components/searchbars/plan-place-searchbar';
import { useSearch } from '@/hooks/useSearch';

type Place = {
  id: string;
  name: string;
  address: string;
  category?: string;
  latitude: number;
  longitude: number;
};

export default function Page() {
  const router = useRouter();
  const { id: planId } = useParams();

  const { query, setQuery, isSearching } = useSearch();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlaceIds, setSelectedPlaceIds] = useState<string[]>([]);

  const isSelected = (placeId: string) => {
    return selectedPlaceIds.includes(placeId);
  };

  const togglePlace = (placeId: string) => {
    setSelectedPlaceIds((prev) => (prev.includes(placeId) ? prev.filter((id) => id !== placeId) : [...prev, placeId]));
  };

  useEffect(() => {
    if (!isSearching) {
      setPlaces([]);
      return;
    }

    setLoading(true);

    fetch(`/api/places?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data.places ?? []);
      })
      .finally(() => setLoading(false));
  }, [query, isSearching]);

  return (
    <div className="fixed inset-0 flex justify-center bg-gray-50">
      <div className="relative h-full w-full max-w-[600px] bg-white shadow-[0px_7px_15px_0px_rgba(100,100,111,0.2)]">
        <PlanPlaceSearchBar value={query} onChange={setQuery} onBack={() => router.back()} />

        <div className="px-5">
          {loading && <div className="text-regular14 py-2 text-gray-400">검색 중...</div>}

          {!loading && places.length === 0 && isSearching && (
            <div className="text-regular14 py-2 text-gray-400">검색 결과가 없습니다.</div>
          )}

          <ul>
            {places.map((place) => (
              <li key={place.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-200" />
                  <div>
                    <div className="text-medium14">{place.name}</div>
                    <div className="text-regular13 text-gray-500">{place.category ?? place.address}</div>
                  </div>
                </div>

                <button
                  onClick={() => togglePlace(place.id)}
                  className={`text-regular12 cursor-pointer rounded-[17px] px-3 py-1.25 transition-colors ${
                    isSelected(place.id)
                      ? 'border border-[#5364FF] bg-white text-[#5364FF]'
                      : 'bg-[#eeeeee] text-[#000]'
                  }`}
                >
                  {isSelected(place.id) ? '취소' : '선택'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
