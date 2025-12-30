'use client';

import { useCalendar } from '@/hooks/useCalendar';
import CalendarMonth from './calendar-month';

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (d: Date | null) => void;
  setEndDate: (d: Date | null) => void;
};

export default function Calendar({ startDate, endDate, setStartDate, setEndDate }: Props) {
  const { months } = useCalendar();

  const onSelectDate = (date: Date) => {
    if (!startDate) {
      setStartDate(date);
      setEndDate(null);
      return;
    }

    if (startDate && !endDate) {
      if (date.getTime() === startDate.getTime()) {
        setEndDate(date); // 하루 일정
        return;
      }
      if (date < startDate) {
        setStartDate(date);
        return;
      }
      setEndDate(date);
      return;
    }

    setStartDate(date);
    setEndDate(null);
  };

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  return (
    <div className="px-4">
      {months.map((month) => (
        <CalendarMonth
          key={month.yearMonth}
          title={month.yearMonth}
          days={month.days}
          startDate={startDate}
          endDate={endDate}
          isInRange={isInRange}
          onSelect={onSelectDate}
        />
      ))}
    </div>
  );
}
