'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PlanDay from './plan-day';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

interface Place {
  place_id: string;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  memo: string | null;
  order_index: number;
  primary_type?: string;
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

  // 모든 place_id를 펼쳐서 SortableContext에 전달
  const allPlaceIds = dayData.flatMap((d) => d.places.map((p) => p.place_id));

  return (
    <div>
      <div className="flex items-center justify-end px-1 pb-1">
        <button className="text-regular13 rounded px-2 py-1 text-[#6B5CFF]" onClick={() => setIsEditing((v) => !v)}>
          {isEditing ? '편집 종료' : '편집'}
        </button>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={async ({ active, over }) => {
          if (!isEditing || !over) return;

          const activePlaceId = String(active.id);
          const overPlaceId = String(over.id);

          // 활성 place가 속한 day 찾기
          let sourceDayIndex = -1;
          let targetDayIndex = -1;

          for (const d of dayData) {
            if (d.places.some((p) => p.place_id === activePlaceId)) {
              sourceDayIndex = d.day_index;
            }
            if (d.places.some((p) => p.place_id === overPlaceId)) {
              targetDayIndex = d.day_index;
            }
          }

          if (sourceDayIndex === -1 || targetDayIndex === -1) return;

          // 같은 day 내 재정렬
          if (sourceDayIndex === targetDayIndex) {
            const dayToUpdate = dayData.find((d) => d.day_index === sourceDayIndex);
            if (!dayToUpdate) return;

            const oldIndex = dayToUpdate.places.findIndex((p) => p.place_id === activePlaceId);
            const newIndex = dayToUpdate.places.findIndex((p) => p.place_id === overPlaceId);

            if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

            // 로컬 즉시 반영
            setDayData((prev) =>
              prev.map((d) =>
                d.day_index === sourceDayIndex ? { ...d, places: arrayMove(d.places, oldIndex, newIndex) } : d,
              ),
            );

            // 서버 반영
            await fetch('/api/places/reorder', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                planId,
                dayIndex: sourceDayIndex,
                activePlaceId,
                overPlaceId,
              }),
            });
            await fetchDays();
          } else {
            // 다른 day로 이동 (로컬 낙관적 업데이트)
            const sourceDay = dayData.find((d) => d.day_index === sourceDayIndex);
            const targetDay = dayData.find((d) => d.day_index === targetDayIndex);
            const movingPlace = sourceDay?.places.find((p) => p.place_id === activePlaceId);
            if (!movingPlace) return;

            setDayData((prev) => {
              return prev.map((d) => {
                if (d.day_index === sourceDayIndex) {
                  // 소스 day에서 제거
                  return { ...d, places: d.places.filter((p) => p.place_id !== activePlaceId) };
                }
                if (d.day_index === targetDayIndex) {
                  // 타겟 day에 over 위치로 삽입, 없으면 마지막에 추가
                  const overIdx = d.places.findIndex((p) => p.place_id === overPlaceId);
                  const insertIdx = overIdx >= 0 ? overIdx : d.places.length;
                  const newPlaces = [...d.places];
                  newPlaces.splice(insertIdx, 0, { ...movingPlace, order_index: insertIdx + 1 });
                  return { ...d, places: newPlaces };
                }
                return d;
              });
            });

            // 서버 반영
            await fetch('/api/places/move', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                planId,
                placeId: activePlaceId,
                targetDayIndex,
                // 서버에서도 정확한 삽입 위치를 알 수 있도록 전달
                overPlaceId,
              }),
            });
            await fetchDays();
          }
        }}
      >
        <SortableContext items={allPlaceIds} strategy={verticalListSortingStrategy}>
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
        </SortableContext>
      </DndContext>
    </div>
  );
}
