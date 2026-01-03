// PlanDayList.tsx
import PlanDay from './plan-day';

interface Props {
  days: Date[];
}

export default function PlanDayList({ days }: Props) {
  return (
    <div>
      {days.map((date, index) => (
        <PlanDay key={date.toISOString()} dayIndex={index + 1} date={date} />
      ))}
    </div>
  );
}
