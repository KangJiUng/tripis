import { addMonths, eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';

const YEAR_RANGE = 5;

export function useCalendar() {
  const today = new Date();
  const startYear = today.getFullYear() - YEAR_RANGE;
  const baseMonth = startOfMonth(new Date(startYear, 0, 1));
  const totalMonths = (YEAR_RANGE * 2 + 1) * 12;

  const months = Array.from({ length: totalMonths }).map((_, i) => {
    const monthDate = addMonths(baseMonth, i);
    return {
      yearMonth: format(monthDate, 'yyyy년 M월'),
      days: eachDayOfInterval({
        start: startOfMonth(monthDate),
        end: endOfMonth(monthDate),
      }),
    };
  });

  return { months };
}
