interface ReviewContentProps {
  title: string;
  content: string;
  imageUrl?: string | null;
}

export default function ReviewContent({ title, content, imageUrl }: ReviewContentProps) {
  return (
    <div className="flex items-center">
      <div className="w-full">
        <div className="text-semi-bold16">{title}</div>
        <div className="text-regular14 line-clamp-3 pb-4">{content}</div>
        {imageUrl && (
          <div className="flex h-70 w-full items-center justify-center overflow-hidden rounded-[5px] bg-gray-300">
            <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}
