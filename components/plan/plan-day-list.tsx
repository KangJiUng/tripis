'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PlanDay from './plan-day';

interface Place {
  place_id: string;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  memo: string | null;
  order_index: number;
}

interface DayWithPlaces {
  day_id: string;
  day_index: number;
  places: Place[];
}

interface Props {
  days: Date[];
  planId: string;
}

export default function PlanDayList({ days, planId }: Props) {
  const router = useRouter();
  const [dayData, setDayData] = useState<DayWithPlaces[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDays = async () => {
      const res = await fetch(`/api/plans/${planId}/days`);
      if (!res.ok) return;

      const data = await res.json();
      setDayData(data.days ?? []);
      setLoading(false);
    };

    fetchDays();
  }, [planId]);

  if (loading) {
    return <div className="p-4 text-center">불러오는 중...</div>;
  }

  return (
    <div>
      {days.map((date, index) => {
        const dayIndex = index + 1;
        const matchedDay = dayData.find((d) => d.day_index === dayIndex);

        return (
          <PlanDay
            key={date.toISOString()}
            dayIndex={dayIndex}
            date={date}
            places={matchedDay?.places ?? []}
            onAddPlace={() => router.push(`/plan/${planId}/map?day=${dayIndex}`)}
          />
        );
      })}
    </div>
  );
}
