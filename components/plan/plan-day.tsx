'use client';

import { useEffect, useState } from 'react';
import PlanPlaceItem from './plan-place-item';
import { useSortable, SortableContext } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
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
  onSelectionChange?: (dayIndex: number, selectedIds: string[]) => void;
  onViewRoute?: () => void;
}

function SortablePlaceItem({
  place,
  order,
  isEditing,
  onToggleSelected,
  isSelected,
}: {
  place: Place;
  order: number;
  isEditing: boolean;
  onToggleSelected: () => void;
  isSelected: boolean;
}) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: place.place_id,
    disabled: !isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: 'transform 200ms ease',
    willChange: 'transform',
    zIndex: isDragging ? 10 : 'auto',
  } as React.CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`transition-transform duration-200 ease-in-out ${isDragging ? 'pointer-events-none opacity-0' : ''}`}
    >
      <PlanPlaceItem
        order={order}
        title={place.title}
        primaryType={place.primary_type}
        isEditing={isEditing}
        setActivatorNodeRef={setActivatorNodeRef}
        dragHandleProps={isEditing ? { ...attributes, ...listeners } : undefined}
        isSelected={isSelected}
        onToggleSelected={onToggleSelected}
        isDragging={isDragging}
      />
    </div>
  );
}

export default function PlanDay({
  dayIndex,
  date,
  places,
  onAddPlace,
  isEditing = false,
  onSelectionChange,
  onViewRoute,
}: Props) {
  const formatted = `${date.getMonth() + 1}.${date.getDate()}`;
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleAll = () => {
    setSelectedIds((prev) => (prev.length === places.length ? [] : places.map((p) => p.place_id)));
  };
  const toggleOne = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleViewRoute = () => {
    if (places.length === 0) {
      alert('등록된 장소가 없어요. 장소를 추가해주세요.');
      return;
    }

    onViewRoute?.();
  };

  // 선택 변경 부모로 전달
  useEffect(() => {
    onSelectionChange?.(dayIndex, selectedIds);
  }, [dayIndex, selectedIds, onSelectionChange]);

  const { setNodeRef: setDayDroppableRef } = useDroppable({ id: `day-${dayIndex}-container` });

  // 각 일차를 독립적인 SortableContext로 분리
  const dayPlaceIds = places.map((p) => p.place_id);

  return (
    <section ref={setDayDroppableRef} className="py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-medium15">
          {dayIndex}일차{' '}
          <span className="text-medium14 text-gray-400">
            {formatted}/{dayOfWeek}
          </span>
        </h3>

        <button onClick={handleViewRoute} className="text-medium13 cursor-pointer text-[#6B5CFF]">
          동선보기
        </button>
      </div>

      <SortableContext items={dayPlaceIds}>
        <div className="mt-3 flex flex-col gap-2">
          {places.length === 0 ? (
            <div className="text-regular14 rounded border border-dashed py-3 text-center text-gray-400">
              아직 추가된 장소가 없어요
            </div>
          ) : (
            places.map((place, index) => (
              <SortablePlaceItem
                key={place.place_id}
                place={place}
                order={index + 1}
                isEditing={isEditing}
                onToggleSelected={() => toggleOne(place.place_id)}
                isSelected={selectedIds.includes(place.place_id)}
              />
            ))
          )}
        </div>
      </SortableContext>

      <div className="mt-3 flex justify-center gap-2 text-center">
        {isEditing ? (
          <button onClick={toggleAll} className="text-regular14 flex-1 cursor-pointer rounded border py-2">
            일차 전체 선택
          </button>
        ) : (
          <button onClick={onAddPlace} className="text-regular14 flex-1 cursor-pointer rounded border py-2">
            장소 추가
          </button>
        )}
      </div>
    </section>
  );
}
