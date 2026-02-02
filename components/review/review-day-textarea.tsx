interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ReviewDayTextarea({ value, onChange }: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="이 날의 여행은 어떠셨나요?"
      className="text-regular14 mb-4 w-full resize-none rounded-lg border border-gray-200 p-4 placeholder:text-gray-400 focus:outline-none"
      rows={4}
    />
  );
}
