interface Props {
  places: {
    title: string;
    primaryType?: string;
  }[];
}

export default function ReviewPlaceList({ places }: Props) {
  if (places.length === 0) {
    return <div className="text-regular13 text-gray-400">방문한 장소가 없어요.</div>;
  }

  return (
    <ul className="mt-2 space-y-3">
      {places.map((place, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <div className="text-medium12 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6B5CFF] text-white">
            {idx + 1}
          </div>
          <div>
            <div className="text-medium14">{place.title}</div>
            {place.primaryType && <div className="text-regular12 text-gray-400">{place.primaryType}</div>}
          </div>
        </li>
      ))}
    </ul>
  );
}
