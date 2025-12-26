import SearchIcon from '@/icons/search-icon';

export default function SearchBar() {
  return (
    <div className="flex items-center pt-2 pb-4">
      <div className="relative flex h-9 w-full items-center justify-center rounded-[10px] bg-[#efefef]">
        <span className="absolute top-1/2 left-3 -translate-y-1/2">
          <SearchIcon />
        </span>
        <span className="text-regular14 absolute top-1/2 left-10 -translate-y-1/2 text-[#515151]">
          여행할 나라를 검색해보세요!
        </span>
      </div>
    </div>
  );
}
