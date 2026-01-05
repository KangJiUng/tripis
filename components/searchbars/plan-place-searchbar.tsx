'use client';

import BackIcon from '@/icons/back-icon';
import SearchIcon from '@/icons/search-icon';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onBack?: () => void;
}

export default function PlanPlaceSearchBar({ value, onChange, onBack }: Props) {
  return (
    <div className="top-4 right-0 left-0 z-10 p-4">
      <div className="flex w-full items-center">
        <button onClick={onBack} className="mr-2 -ml-1 flex items-center">
          <BackIcon width={24} height={24} />
        </button>

        <div className="flex h-10 flex-1 items-center rounded-full bg-[#efefef] px-3">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="관광지/맛집/숙소 검색"
            className="text-regular14 flex-1 bg-transparent pl-1.5 outline-none"
          />
          <SearchIcon color="black" />
        </div>
      </div>
    </div>
  );
}
