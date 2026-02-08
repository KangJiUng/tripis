import ReviewDayTextarea from './review-day-textarea';
import ReviewPlaceList from './review-place-list';

interface Props {
  day: {
    dayIndex: number;
    dateLabel: string;
    content: string;
    places: {
      title: string;
      primaryType?: string;
    }[];
  };
  onChangeContent: (dayIndex: number, content: string) => void;
}

export default function ReviewDay({ day, onChangeContent }: Props) {
  return (
    <section>
      <h3 className="text-semi-bold16 mb-3 flex items-center gap-2">
        DAY {day.dayIndex}
        <span className="text-regular13 text-gray-400">{day.dateLabel}</span>
      </h3>

      <ReviewDayTextarea value={day.content} onChange={(v) => onChangeContent(day.dayIndex, v)} />

      <ReviewPlaceList places={day.places} />
    </section>
  );
}
