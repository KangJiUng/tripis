'use client';

import { useEffect, useState } from 'react';
import PlanPlaceItem from './plan-place-item';
import { useSortable } from '@dnd-kit/sortable';
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

/* 각 장소 카드를 Sortable로 감싸기 */
function SortablePlaceItem({ place, order, isEditing }: { place: Place; order: number; isEditing: boolean }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: place.place_id,
    disabled: !isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <PlanPlaceItem
        order={order}
        title={place.title}
        primaryType={place.primary_type}
        isEditing={isEditing}
        setActivatorNodeRef={setActivatorNodeRef}
        dragHandleProps={isEditing ? { ...attributes, ...listeners } : undefined}
      />
    </div>
  );
}

export default function PlanDay({ dayIndex, date, places, onAddPlace, isEditing = false }: Props) {
  const formatted = `${date.getMonth() + 1}.${date.getDate()}`;
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

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

      <div className="mt-3 flex flex-col gap-2">
        {places.length === 0 ? (
          <div className="text-regular14 rounded border border-dashed py-3 text-center text-gray-400">
            아직 추가된 장소가 없어요
          </div>
        ) : (
          places.map((place, index) => (
            <SortablePlaceItem key={place.place_id} place={place} order={index + 1} isEditing={isEditing} />
          ))
        )}
      </div>

      <div className="mt-3 flex justify-center gap-2 text-center">
        <button onClick={onAddPlace} className="text-regular14 flex-1 cursor-pointer rounded border py-2">
          장소 추가
        </button>
      </div>
    </section>
  );
}
