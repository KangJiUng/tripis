'use client';

import BackIcon from '@/icons/back-icon';
import SearchIcon from '@/icons/search-icon';

interface Props {
  onBack?: () => void;
  onSearchClick?: () => void;
}

export default function PlanPlaceSearchBar({ onBack, onSearchClick }: Props) {
  return (
    <div className="top-4 right-0 left-0 z-10 p-4">
      <div className="flex w-full items-center">
        <button onClick={onBack} className="mr-2 -ml-1 flex cursor-pointer items-center">
          <BackIcon width={24} height={24} />
        </button>
        <div className="flex h-10 flex-1 items-center rounded-full bg-[#efefef] px-3 pr-4">
          <button
            onClick={onSearchClick}
            className="text-regular14 flex-1 cursor-pointer pl-1.5 text-left text-gray-400"
          >
            관광지/맛집/숙소 검색
          </button>
          <SearchIcon color="black" />
        </div>
      </div>
    </div>
  );
}
