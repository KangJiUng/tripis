'use client';

import GoogleMap from '@/components/plan/google-map';
import BackIcon from '@/icons/back-icon';
import SearchIcon from '@/icons/search-icon';
import { useRouter, useParams } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const { planId } = useParams();

  return (
    <div className="fixed inset-0 flex justify-center">
      <div className="relative h-full w-full max-w-[600px]">
        <div className="absolute top-4 right-0 left-0 z-10 px-4">
          <div className="flex h-10 w-full items-center rounded-full bg-white px-3 pr-4 shadow-md">
            <button onClick={() => router.back()} className="flex cursor-pointer items-center">
              <BackIcon width={20} height={20} />
            </button>

            <button
              onClick={() => router.push(`/plan/${planId}/search`)}
              className="text-regular14 flex-1 cursor-pointer pl-1.5 text-left text-gray-400"
            >
              관광지/맛집/숙소 검색
            </button>

            <SearchIcon color="black" />
          </div>
        </div>

        <GoogleMap className="h-full w-full" />
      </div>
    </div>
  );
}
