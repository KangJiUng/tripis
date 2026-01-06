'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import PlanPlaceSearchBar from '@/components/searchbars/plan-place-searchbar';
import { useSearch } from '@/hooks/useSearch';
import SubmitButton from '@/components/buttons/submit-button';

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
  const { id } = useParams();
  const planId = Array.isArray(id) ? id[0] : id;
  const searchParams = useSearchParams();
  const dayIndex = searchParams.get('day');

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

    fetch(`/api/search/places?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data.places ?? []);
      })
      .finally(() => setLoading(false));
  }, [query, isSearching]);

  const handleAddPlaces = async () => {
    if (!dayIndex || selectedPlaceIds.length === 0) return;

    try {
      const res = await fetch('/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          dayIndex,
          placeIds: selectedPlaceIds,
        }),
      });

      if (!res.ok) {
        throw new Error('장소 추가 실패');
      }

      router.replace(`/plan`);
    } catch (error) {
      console.error(error);
      alert('장소 추가 중 오류가 발생했습니다.');
    }
  };

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
        <div className="fixed bottom-0 left-0 w-full bg-white">
          <div className="mx-auto max-w-[600px]">
            <SubmitButton
              text={`day ${dayIndex} 일정에 ${selectedPlaceIds.length}개의 장소 추가`}
              disabled={selectedPlaceIds.length === 0}
              onClick={handleAddPlaces}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
