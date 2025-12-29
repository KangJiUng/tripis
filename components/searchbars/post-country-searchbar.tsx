import SearchIcon from '@/icons/search-icon';

export default function PostCountrySearchBar() {
  return (
    <div className="flex items-center pt-2">
      <div className="relative flex h-7 w-60 items-center justify-center rounded-[15px] border border-[#d4d4d4]">
        <span className="absolute top-1/2 left-2 -translate-y-1/2">
          <SearchIcon color="#aeaeae" />
        </span>
        <span className="text-regular14 absolute top-1/2 left-10 -translate-y-1/2"></span>
      </div>
    </div>
  );
}
