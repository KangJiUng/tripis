'use client';

interface Props {
  order: number;
  title: string;
  primaryType?: string;
  isEditing?: boolean;
}

export default function PlanPlaceItem({ order, title, primaryType, isEditing }: Props) {
  return (
    <div className="flex items-start gap-3">
      <div className="relative flex shrink-0 items-start">
        {isEditing ? (
          <button className="mt-2.5 mr-2 h-6 w-6 rounded-full border" />
        ) : (
          <div className="mt-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#6B5CFF] text-white">
            {order}
          </div>
        )}
      </div>

      <div className="mr-1 max-w-[570px] flex-1 rounded-lg bg-white px-4 py-3 shadow">
        <div className="text-medium15 text-gray-900">{title}</div>
        {primaryType && <div className="text-regular13 mt-0.5 text-gray-400">{primaryType}</div>}
      </div>
    </div>
  );
}
