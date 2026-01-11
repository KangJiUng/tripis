'use client';

import PlanPlaceItem from './plan-place-item';

interface Place {
  place_id: string;
  title: string;
  address: string;
  primary_type?: string;
  latitude: number;
  longitude: number;
  memo: string | null;
  order_index: number;
}

interface Props {
  dayIndex: number;
  date: Date;
  places: Place[];
  onAddPlace?: () => void;
}

export default function PlanDay({ dayIndex, date, places, onAddPlace }: Props) {
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

      <div className="mt-3 space-y-2">
        {places.length === 0 ? (
          <div className="text-regular14 rounded border border-dashed py-3 text-center text-gray-400">
            아직 추가된 장소가 없어요
          </div>
        ) : (
          places.map((place) => (
            <PlanPlaceItem
              key={place.place_id}
              order={place.order_index}
              title={place.title}
              primaryType={place.primary_type}
            />
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
