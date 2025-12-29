import SearchIcon from '@/icons/search-icon';

export default function PlanCountrySearchBar() {
  return (
    <div className="flex items-center pt-2">
      <div className="relative flex h-9 w-full items-center justify-center border-b">
        <span className="text-regular14 absolute top-1/2 left-2 -translate-y-1/2 text-[#b3b3b3]">
          여행할 나라를 검색해보세요!
        </span>
        <span className="absolute top-1/2 right-3 -translate-y-1/2">
          <SearchIcon color="#252525" />
        </span>
      </div>
    </div>
  );
}
