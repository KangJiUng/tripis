'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import GoogleMap from '@/components/plan/google-map';
import BackIcon from '@/icons/back-icon';
import SearchIcon from '@/icons/search-icon';
import { useRouter, useParams } from 'next/navigation';
import { allCities } from '@/utils/countryData';
import type { LatLng } from '@/types';

type Plan = {
  plan_id: string;
  country: string;
};

export default function MapContent() {
  const router = useRouter();
  const { id } = useParams();
  const planId = Array.isArray(id) ? id[0] : id;
  const searchParams = useSearchParams();
  const dayIndex = searchParams.get('day');

  const [plan, setPlan] = useState<Plan | null>(null);
  const [center, setCenter] = useState<LatLng | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!planId) return;

    const fetchPlan = async () => {
      const res = await fetch(`/api/plans/${planId}`);
      if (!res.ok) return;

      const data = await res.json();

      const city = allCities.find((c) => c.id === data.plan.country);
      if (!city) return;

      setCenter({ lat: city.lat, lng: city.lng });
      setLoading(false);
    };

    fetchPlan();
  }, [planId]);

  return (
    <div className="fixed inset-0 flex justify-center">
      <div className="relative h-full w-full max-w-[600px] cursor-pointer">
        {/* 상단 검색바 */}
        <div className="absolute top-4 right-0 left-0 z-10 px-4">
          <div className="flex h-10 w-full items-center rounded-full bg-white px-3 pr-4 shadow-md">
            <button onClick={() => router.back()} className="flex cursor-pointer items-center">
              <BackIcon width={20} height={20} />
            </button>

            <button
              onClick={() => router.push(`/plan/${planId}/search?day=${dayIndex}`)}
              className="text-regular14 flex-1 cursor-pointer pl-1.5 text-left text-gray-400"
            >
              관광지/맛집/숙소 검색
            </button>

            <div className="cursor-pointer">
              <SearchIcon color="black" />
            </div>
          </div>
        </div>

        {!loading && center && <GoogleMap className="h-full w-full" center={center} />}
      </div>
    </div>
  );
}
