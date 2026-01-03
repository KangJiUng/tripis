// PlanDay.tsx
interface Props {
  dayIndex: number;
  date: Date;
}

export default function PlanDay({ dayIndex, date }: Props) {
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

      <div className="mt-3 flex gap-2">
        <button className="text-regular14 flex-1 cursor-pointer rounded border py-2">장소 추가</button>
      </div>
    </section>
  );
}
