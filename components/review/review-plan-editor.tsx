'use client';

import { useEffect, useState } from 'react';
import ReviewDay from './review-day';

interface ReviewPlace {
  title: string;
  primaryType?: string;
}

interface ReviewDayData {
  dayIndex: number;
  dateLabel: string;
  places: ReviewPlace[];
  content: string;
}

interface Props {
  planId: string;
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  return `${year}.${month}.${day} (${week})`;
};

export default function ReviewPlanEditor({ planId }: Props) {
  const [days, setDays] = useState<ReviewDayData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDays = async () => {
      const planRes = await fetch(`/api/plans/${planId}`);
      const planData = await planRes.json();
      const startDate = new Date(planData.plan.start_date);
      const res = await fetch(`/api/plans/${planId}/days`);
      const data = await res.json();

      const mapped = (data.days ?? []).map((day: any) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + (day.day_index - 1));

        return {
          dayIndex: day.day_index,
          dateLabel: formatDate(date),
          places: day.places.map((p: any) => ({
            title: p.title,
            primaryType: p.primary_type,
          })),
          content: '',
        };
      });

      setDays(mapped);
      setLoading(false);
    };

    fetchDays();
  }, [planId]);

  const updateDayContent = (dayIndex: number, content: string) => {
    setDays((prev) => prev.map((d) => (d.dayIndex === dayIndex ? { ...d, content } : d)));
  };

  if (loading) {
    return <div className="text-regular14 py-6 text-center text-gray-400">일정을 불러오는 중...</div>;
  }

  return (
    <div className="mt-8 space-y-10">
      {days.map((day) => (
        <ReviewDay key={day.dayIndex} day={day} onChangeContent={updateDayContent} />
      ))}
    </div>
  );
}
