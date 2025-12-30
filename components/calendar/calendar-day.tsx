import { format, isSameDay } from 'date-fns';

type Props = {
  date: Date;
  startDate: Date | null;
  endDate: Date | null;
  isInRange: boolean;
  onSelect: (date: Date) => void;
};

export default function CalendarDay({ date, startDate, endDate, isInRange, onSelect }: Props) {
  const isStart = startDate && isSameDay(date, startDate);
  const isEnd = endDate && isSameDay(date, endDate);

  const hasRange = Boolean(startDate && endDate);

  const isSingleDay = startDate && endDate && startDate.getTime() === endDate.getTime();

  return (
    <div className="relative h-10">
      {!isSingleDay && hasRange && isInRange && <div className="absolute inset-y-0 right-0 left-0 bg-[#5364FF]/20" />}
      {!isSingleDay && hasRange && isStart && <div className="absolute inset-y-0 right-0 left-1/2 bg-[#5364FF]/20" />}
      {!isSingleDay && hasRange && isEnd && <div className="absolute inset-y-0 right-1/2 left-0 bg-[#5364FF]/20" />}

      <button
        onClick={() => onSelect(date)}
        className={`text-regular14 relative mx-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
          isStart || isEnd ? 'bg-[#5364FF] text-white' : 'text-black'
        }`}
      >
        {format(date, 'd')}
      </button>
    </div>
  );
}
