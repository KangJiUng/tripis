import SearchIcon from '@/icons/search-icon';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function PlanCountrySearchBar({ value, onChange }: Props) {
  return (
    <div className="flex items-center pt-2">
      <div className="relative flex h-9 w-full items-center border-b px-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="여행할 나라를 검색해보세요!"
          className="text-regular14 w-full bg-transparent outline-none placeholder:text-[#b3b3b3]"
        />
        <span className="absolute top-1/2 right-3 -translate-y-1/2">
          <SearchIcon color="#252525" />
        </span>
      </div>
    </div>
  );
}
