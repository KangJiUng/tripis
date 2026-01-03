'use client';

import GoogleMap from '@/components/plan/google-map';
import PlanPlaceSearchBar from '@/components/searchbars/plan-place-searchbar';
import { useRouter, useParams } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const { planId } = useParams();

  return (
    <div className="fixed inset-0 flex justify-center">
      <div className="relative h-full w-full max-w-[600px]">
        <PlanPlaceSearchBar onBack={() => router.back()} onSearchClick={() => router.push(`/plan/${planId}/search`)} />
        장소 검색 페이지
      </div>
    </div>
  );
}
