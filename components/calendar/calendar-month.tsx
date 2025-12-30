import CalendarDay from './calendar-day';

type Props = {
  title: string;
  days: Date[];
  startDate: Date | null;
  endDate: Date | null;
  isInRange: (date: Date) => boolean;
  onSelect: (date: Date) => void;
};

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function CalendarMonth({ title, days, startDate, endDate, isInRange, onSelect }: Props) {
  return (
    <div className="mb-8">
      <h3 className="text-medium16 mb-4">{title}</h3>

      <div className="text-regular14 mb-2 grid grid-cols-7 text-center text-gray-400">
        {WEEKDAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center">
        {days.map((date) => (
          <CalendarDay
            key={date.toISOString()}
            date={date}
            startDate={startDate}
            endDate={endDate}
            isInRange={isInRange(date)}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
