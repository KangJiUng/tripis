'use client';

interface Props {
  order: number;
  title: string;
  primaryType?: string;
  isEditing?: boolean;
  dragHandleProps?: any;
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
}

export default function PlanPlaceItem({
  order,
  title,
  primaryType,
  isEditing,
  dragHandleProps,
  setActivatorNodeRef,
}: Props) {
  return (
    <div className="flex items-start gap-3">
      <div className="relative flex shrink-0 items-start">
        {isEditing ? (
          <button className="mt-2.5 mr-2 h-6 w-6 rounded-full border" />
        ) : (
          <div className="text-medium12 mt-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#6B5CFF] text-white">
            {order}
          </div>
        )}
      </div>

      <div className="mr-1 flex max-w-[570px] flex-1 items-center gap-2 rounded-lg bg-white px-4 py-3 shadow">
        <div className="flex-1">
          <div className="text-medium15 text-gray-900">{title}</div>
          {primaryType && <div className="text-regular13 mt-0.5 text-gray-400">{primaryType}</div>}
        </div>

        {isEditing && (
          <button
            ref={setActivatorNodeRef}
            {...dragHandleProps}
            className="flex h-8 w-8 shrink-0 cursor-grab items-center justify-center rounded hover:bg-gray-100 active:cursor-grabbing"
            aria-label="드래그 핸들"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-500">
              <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z" fill="currentColor" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
