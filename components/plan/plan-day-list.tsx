'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PlanDay from './plan-day';
import { DndContext, closestCenter, DragEndEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core';
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
  onViewRoute?: (dayIndex: number) => void;
  onRouteDataChanged?: () => void;
}

export default function PlanDayList({ days, planId, onViewRoute, onRouteDataChanged }: Props) {
  const router = useRouter();
  const [dayData, setDayData] = useState<DayWithPlaces[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectionByDay, setSelectionByDay] = useState<Record<number, string[]>>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleSelectionChange = useCallback((idx: number, ids: string[]) => {
    setSelectionByDay((prev) => ({ ...prev, [idx]: ids }));
  }, []);

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

  // 빈 day의 첫 추가도 즉시 반영
  useEffect(() => {
    const onFocus = () => fetchDays();
    const onVisibility = () => {
      if (document.visibilityState === 'visible') fetchDays();
    };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [planId]);

  // 삭제 처리
  const handleDeleteSelected = async () => {
    const entries = Object.entries(selectionByDay);
    for (const [dayIndexStr, ids] of entries) {
      const dayIndex = Number(dayIndexStr);
      if (!ids || ids.length === 0) continue;
      await fetch('/api/places', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, dayIndex, placeIds: ids }),
      });
    }
    await fetchDays();
    setSelectionByDay({});

    onRouteDataChanged?.();
  };

  if (loading) {
    return <div className="p-4 text-center">불러오는 중...</div>;
  }

  // 모든 place_id를 펼쳐서 SortableContext에 전달
  const allPlaceIds = dayData.flatMap((d) => d.places.map((p) => p.place_id));

  return (
    <div>
      <div className="flex items-center justify-end gap-1 px-1 pb-1">
        {isEditing && (
          <button
            className="text-medium13 cursor-pointer rounded px-1 py-1 text-[#c4c4c4]"
            onClick={handleDeleteSelected}
          >
            선택 삭제
          </button>
        )}
        <button
          className="text-medium13 cursor-pointer rounded px-1 py-1 text-[#6B5CFF]"
          onClick={() => setIsEditing((v) => !v)}
        >
          {isEditing ? '편집 종료' : '편집'}
        </button>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={(event: DragStartEvent) => {
          const { active } = event;
          setActiveId(String(active.id));

          // 모바일에서 드래그 중 화면 스크롤 방지
          document.body.style.overflow = 'hidden';
          document.body.style.touchAction = 'none';
        }}
        onDragEnd={async (event: DragEndEvent) => {
          const { active, over } = event;
          setActiveId(null);

          // 드래그 종료 시 스크롤 복구
          document.body.style.overflow = '';
          document.body.style.touchAction = '';

          if (!isEditing || !over) return;

          const activePlaceId = String(active.id);
          const overId = String(over.id);

          // Day 컨테이너로 드롭된 경우
          const overIsDayContainer = overId.startsWith('day-') && overId.endsWith('-container');

          // 활성 place가 속한 day 찾기
          let sourceDayIndex = -1;
          let targetDayIndex = -1;

          for (const d of dayData) {
            if (d.places.some((p) => p.place_id === activePlaceId)) {
              sourceDayIndex = d.day_index;
            }
            if (!overIsDayContainer && d.places.some((p) => p.place_id === overId)) {
              targetDayIndex = d.day_index;
            }
          }

          // 컨테이너로 드롭이면 over에서 dayIndex 추출
          if (overIsDayContainer) {
            const match = overId.match(/^day-(\d+)-container$/);
            targetDayIndex = match ? Number(match[1]) : -1;
          }

          if (sourceDayIndex === -1 || targetDayIndex === -1) return;

          if (!overIsDayContainer && sourceDayIndex === targetDayIndex) {
            // 같은 day 내 재정렬
            const dayToUpdate = dayData.find((d) => d.day_index === sourceDayIndex);
            if (!dayToUpdate) return;

            const oldIndex = dayToUpdate.places.findIndex((p) => p.place_id === activePlaceId);
            const newIndex = dayToUpdate.places.findIndex((p) => p.place_id === overId);

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
                overPlaceId: overId,
              }),
            });
            await fetchDays();

            onRouteDataChanged?.();
          } else {
            // 다른 day로 이동
            const sourceDay = dayData.find((d) => d.day_index === sourceDayIndex);
            const movingPlace = sourceDay?.places.find((p) => p.place_id === activePlaceId);
            if (!movingPlace) return;

            setDayData((prev) => {
              return prev.map((d) => {
                if (d.day_index === sourceDayIndex) {
                  return { ...d, places: d.places.filter((p) => p.place_id !== activePlaceId) };
                }
                if (d.day_index === targetDayIndex) {
                  const newPlaces = [...d.places];
                  if (overIsDayContainer) {
                    // 빈 day 또는 컨테이너로 드롭
                    newPlaces.push({ ...movingPlace, order_index: newPlaces.length + 1 });
                  } else {
                    const overIdx = d.places.findIndex((p) => p.place_id === overId);
                    const insertIdx = overIdx >= 0 ? overIdx : newPlaces.length;
                    newPlaces.splice(insertIdx, 0, { ...movingPlace, order_index: insertIdx + 1 });
                  }
                  return { ...d, places: newPlaces };
                }
                return d;
              });
            });

            await fetch('/api/places/move', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                planId,
                placeId: activePlaceId,
                targetDayIndex,
                overPlaceId: overIsDayContainer ? undefined : overId,
              }),
            });
            await fetchDays();

            onRouteDataChanged?.();
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
                onSelectionChange={handleSelectionChange}
                onViewRoute={() => onViewRoute?.(dayIndex)}
              />
            );
          })}
        </SortableContext>
        <DragOverlay>
          {activeId
            ? (() => {
                const found = dayData.flatMap((d) => d.places).find((p) => p.place_id === activeId);
                if (!found) return null;
                return (
                  <div className="pointer-events-none">
                    <div className="mt-0">
                      <div className="mr-1 flex max-w-[570px] items-center gap-2 rounded-lg bg-white px-4 py-3 shadow">
                        <div className="flex-1">
                          <div className="text-medium15 text-gray-900">{found.title}</div>
                          {found.primary_type && (
                            <div className="text-regular13 mt-0.5 text-gray-400">{found.primary_type}</div>
                          )}
                        </div>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-gray-100">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-500">
                            <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z" fill="currentColor" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()
            : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
