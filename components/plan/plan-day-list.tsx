'use client';

import { useRouter, useParams } from 'next/navigation';
import PlanDay from './plan-day';

interface Props {
  days: Date[];
}

export default function PlanDayList({ days }: Props) {
  const router = useRouter();
  const { planId } = useParams();

  return (
    <div>
      {days.map((date, index) => (
        <PlanDay
          key={date.toISOString()}
          dayIndex={index + 1}
          date={date}
          onAddPlace={() => router.push(`/plan/${planId}/map`)}
        />
      ))}
    </div>
  );
}
