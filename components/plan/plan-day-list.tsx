'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PlanDay from './plan-day';
import { DndContext } from '@dnd-kit/core';

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
  const [isEditing, setIsEditing] = useState(false);

  const fetchDays = async () => {
    const res = await fetch(`/api/plans/${planId}/days`);
    if (!res.ok) return;

    const data = await res.json();
    setDayData(data.days ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchDays();
  }, [planId]);

  if (loading) {
    return <div className="p-4 text-center">불러오는 중...</div>;
  }

  return (
    <DndContext
      onDragEnd={({ active, over }) => {
        if (!isEditing || !over) return;

        const activePlaceId = String(active.id);

        // 🔥 핵심: containerId로 판단
        const containerId = over.data.current?.sortable?.containerId;

        if (typeof containerId === 'string' && containerId.startsWith('day-')) {
          const targetDayIndex = Number(containerId.replace('day-', ''));

          fetch('/api/places/move', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              planId,
              placeId: activePlaceId,
              targetDayIndex,
            }),
          }).then(fetchDays);
        }
      }}
    >
      <div>
        <div className="flex items-center justify-end px-1 pb-1">
          <button className="text-regular13 rounded px-2 py-1 text-[#6B5CFF]" onClick={() => setIsEditing((v) => !v)}>
            {isEditing ? '편집 종료' : '편집'}
          </button>
        </div>

        {days.map((date, index) => {
          const dayIndex = index + 1;
          const matchedDay = dayData.find((d) => d.day_index === dayIndex);

          return (
            <PlanDay
              key={date.toISOString()}
              dayIndex={dayIndex}
              date={date}
              places={matchedDay?.places ?? []}
              planId={planId}
              onAddPlace={() => router.push(`/plan/${planId}/map?day=${dayIndex}`)}
              onMoved={fetchDays}
              isEditing={isEditing}
            />
          );
        })}
      </div>
    </DndContext>
  );
}
