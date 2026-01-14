'use client';

import CheckIcon from '@/icons/check-icon';
import DragHandleIcon from '@/icons/drag-handle-icon';
import { useState } from 'react';

interface Props {
  order: number;
  title: string;
  primaryType?: string;
  isEditing?: boolean;
  dragHandleProps?: any;
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  isSelected?: boolean;
  onToggleSelected?: () => void;
  isDragging?: boolean;
}

export default function PlanPlaceItem({
  order,
  title,
  primaryType,
  isEditing,
  dragHandleProps,
  setActivatorNodeRef,
  isSelected,
  onToggleSelected,
  isDragging,
}: Props) {
  const [internalSelected, setInternalSelected] = useState(false);
  const selected = isSelected ?? internalSelected;
  const toggle = onToggleSelected ?? (() => setInternalSelected((v) => !v));
  return (
    <div className={`flex items-start gap-3 ${isDragging ? 'opacity-70' : ''} transition-all duration-300 ease-in-out`}>
      <div className="relative flex shrink-0 items-start">
        {isEditing ? (
          <button
            className={`mt-5.5 h-6 w-6 cursor-pointer rounded-full border ${selected ? 'bg-[#6B5CFF]' : 'bg-white'} flex items-center justify-center transition-colors duration-200 ease-in-out`}
            onClick={toggle}
            aria-pressed={selected}
            aria-label="장소 선택"
          >
            {selected && (
              <div className="scale-80">
                <CheckIcon />
              </div>
            )}
          </button>
        ) : (
          <div className="mt-2.5 flex flex-col items-center">
            <div className="text-medium12 flex h-6 w-6 items-center justify-center rounded-full bg-[#6B5CFF] text-white transition-all duration-300 ease-in-out">
              {order}
            </div>
            <div className="mt-2 h-5 w-px bg-gray-200" />
          </div>
        )}
      </div>

      <div
        className={`mr-1 flex flex-1 items-center ${isEditing ? 'gap-2' : 'gap-0'} transition-all duration-300 ease-in-out`}
      >
        <div className="flex max-w-full flex-1 items-center gap-2 rounded-lg bg-white px-4 py-3 shadow transition-all duration-300 ease-in-out">
          {isEditing && (
            <div className="text-medium12 mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d9d9d9] text-white">
              {order}
            </div>
          )}
          <div className="flex-1">
            <div className="text-medium15 text-gray-900">{title}</div>
            {primaryType && <div className="text-regular13 mt-0.5 text-gray-400">{primaryType}</div>}
          </div>
        </div>
        <div
          className={`flex ${isEditing ? 'w-8' : 'w-0'} h-8 shrink-0 items-center justify-center overflow-hidden rounded transition-all duration-300 ease-in-out ${isEditing ? 'translate-x-0 opacity-100' : 'pointer-events-none -translate-x-1 opacity-0'}`}
        >
          <button
            ref={setActivatorNodeRef}
            {...(isEditing ? dragHandleProps : {})}
            className="flex h-8 w-8 cursor-grab items-center justify-center rounded hover:bg-gray-100 active:cursor-grabbing"
            aria-label="드래그 핸들"
          >
            <DragHandleIcon fill={'#777'} />
          </button>
        </div>
      </div>
    </div>
  );
}
