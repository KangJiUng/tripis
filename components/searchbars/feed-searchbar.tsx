import SearchIcon from '@/icons/search-icon';

type FeedSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function FeedSearchBar({ value, onChange }: FeedSearchBarProps) {
  return (
    <div className="flex items-center pt-2">
      <div className="relative flex h-9 w-full items-center rounded-[10px] bg-[#efefef] px-3">
        <SearchIcon color="#252525" />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="여행할 나라를 검색해보세요!"
          className="text-regular14 ml-2 w-full bg-transparent text-[#515151] outline-none placeholder:text-[#515151]"
        />
      </div>
    </div>
  );
}
