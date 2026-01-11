'use client';

interface Props {
  order: number;
  title: string;
  primaryType?: string;
}

export default function PlanPlaceItem({ order, title, primaryType }: Props) {
  return (
    <div className="flex items-start gap-3 space-y-10">
      <div className="relative flex shrink-0 items-start">
        <div className="text-medium12 mt-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#6B5CFF] text-white">
          {order}
        </div>
        <div className="absolute top-10 left-1/2 h-6 w-[0.5px] -translate-x-1/2 bg-[#dfdfdf]" />
      </div>

      <div className="mr-1 max-w-[570px] flex-1 rounded-lg bg-white px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="text-medium15 text-gray-900">{title}</div>
        {primaryType && <div className="text-regular13 mt-0.5 text-gray-400">{primaryType}</div>}
      </div>
    </div>
  );
}
