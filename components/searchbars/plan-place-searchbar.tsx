'use client';

import BackIcon from '@/icons/back-icon';
import SearchIcon from '@/icons/search-icon';

interface Props {
  onBack?: () => void;
  onSearchClick?: () => void;
}

export default function PlanPlaceSearchBar({ onBack, onSearchClick }: Props) {
  return (
    <div className="absolute top-4 right-0 left-0 z-10 px-4">
      <div className="flex h-10 w-full items-center rounded-full bg-white px-3 pr-4 shadow-md">
        <button onClick={onBack} className="flex cursor-pointer items-center">
          <BackIcon width={20} height={20} />
        </button>

        <button onClick={onSearchClick} className="text-regular14 flex-1 cursor-pointer pl-1.5 text-left text-gray-400">
          관광지/맛집/숙소 검색
        </button>

        <SearchIcon color="black" />
      </div>
    </div>
  );
}
