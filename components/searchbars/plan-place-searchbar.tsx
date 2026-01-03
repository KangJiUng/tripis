import BackIcon from '@/icons/back-icon';
import SearchIcon from '@/icons/search-icon';

export default function PlanPlaceSearchBar() {
  return (
    <div className="absolute top-4 right-0 left-0 z-10 px-4">
      <div className="flex h-10 w-full items-center rounded-full bg-white pr-4 pl-3 shadow-md">
        <BackIcon width={20} height={20} />
        <span className="text-regular14 flex-1 pl-1.5 text-gray-400">관광지/맛집/숙소 검색</span>
        <SearchIcon color="black" />
      </div>
    </div>
  );
}
