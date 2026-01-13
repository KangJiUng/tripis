'use client';

import { useEffect, useState } from 'react';
import PlanPlaceItem from './plan-place-item';
import { DndContext, closestCenter, useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Place } from '@/types';

interface Props {
  dayIndex: number;
  date: Date;
  places: Place[];
  onAddPlace?: () => void;
  planId: string;
  onMoved?: () => void;
  isEditing?: boolean;
}

/* PlanDay 전용 Sortable wrapper */
function SortablePlaceItem({ id, children, disabled }: { id: string; children: React.ReactNode; disabled: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    disabled,
  });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} {...(!disabled ? attributes : {})} {...(!disabled ? listeners : {})}>
      {children}
    </div>
  );
}

export default function PlanDay({ dayIndex, date, places, onAddPlace, planId, onMoved, isEditing = false }: Props) {
  const formatted = `${date.getMonth() + 1}.${date.getDate()}`;
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  const [localPlaces, setLocalPlaces] = useState<Place[]>(places);

  useEffect(() => setLocalPlaces(places), [places]);

  // 드롭 가능한 컨테이너 등록 (각 Day)
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id: `day-${dayIndex}`, data: { dayIndex } });

  return (
    <section className="py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-medium15">
          {dayIndex}일차{' '}
          <span className="text-medium14 text-gray-400">
            {formatted}/{dayOfWeek}
          </span>
        </h3>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (!isEditing) return;
          if (!over) return;

          const activePlaceId = String(active.id);
          const overId = String(over.id);

          /** 1️⃣ 다른 day 컨테이너에 drop한 경우 */
          if (overId.startsWith('day-')) {
            const targetDayIndex = Number(overId.replace('day-', ''));

            fetch('/api/places/move', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                planId,
                targetDayIndex,
                placeId: activePlaceId,
              }),
            }).then(() => onMoved?.());

            return; // 🔥 중요: 여기서 끝내야 함
          }

          /** 2️⃣ 같은 day 안에서 reorder */
          const oldIndex = localPlaces.findIndex((p) => p.place_id === activePlaceId);
          const newIndex = localPlaces.findIndex((p) => p.place_id === overId);

          if (oldIndex === -1 || newIndex === -1) return;
          if (oldIndex === newIndex) return;

          setLocalPlaces((prev) => arrayMove(prev, oldIndex, newIndex));

          fetch('/api/places/reorder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              planId,
              dayIndex,
              activePlaceId,
              overPlaceId: overId,
            }),
          }).then(() => onMoved?.());
        }}
      >
        <SortableContext
          id={`day-${dayIndex}`}
          items={localPlaces.map((p) => p.place_id)}
          strategy={verticalListSortingStrategy}
        >
          <div
            ref={setDroppableRef}
            className={`mt-3 flex flex-col gap-2 ${isOver && isEditing ? 'rounded-md ring-2 ring-[#6B5CFF]/30' : ''}`}
          >
            {localPlaces.length === 0 ? (
              <div className="text-regular14 rounded border border-dashed py-3 text-center text-gray-400">
                아직 추가된 장소가 없어요
              </div>
            ) : (
              localPlaces.map((place, index) => (
                <SortablePlaceItem key={place.place_id} id={place.place_id} disabled={!isEditing}>
                  <PlanPlaceItem
                    order={index + 1}
                    title={place.title}
                    primaryType={place.primary_type}
                    isEditing={isEditing}
                  />
                </SortablePlaceItem>
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>

      <div className="mt-3 flex justify-center gap-2 text-center">
        <button onClick={onAddPlace} className="text-regular14 flex-1 cursor-pointer rounded border py-2">
          장소 추가
        </button>
      </div>
    </section>
  );
}
