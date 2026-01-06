'use client';

import { useRouter, useParams } from 'next/navigation';
import PlanDay from './plan-day';

interface Props {
  days: Date[];
  planId: string;
}

export default function PlanDayList({ days, planId }: Props) {
  const router = useRouter();

  return (
    <div>
      {days.map((date, index) => (
        <PlanDay
          key={date.toISOString()}
          dayIndex={index + 1}
          date={date}
          onAddPlace={() => router.push(`/plan/${planId}/map?day=${index + 1}`)}
        />
      ))}
    </div>
  );
}
