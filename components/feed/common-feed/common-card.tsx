import Link from 'next/link';

type CommonPost = {
  post_id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  image_urls: string[];
};

export default function CommonCard({ post }: { post: CommonPost }) {
  const hasImage = post.image_urls && post.image_urls.length > 0;
  const thumbnail = hasImage ? post.image_urls[0] : null;

  return (
    <Link href={`/post/${post.post_id}`} className="block">
      <div className="mt-3 flex w-full cursor-pointer">
        <div className="flex-1 pr-3">
          <div className="text-bold15 pt-1">{post.title}</div>

          <div className="text-regular13 h-10 overflow-hidden text-ellipsis">{post.content}</div>
          <div className="text-regular12 pt-6 pb-3 text-[#c4c4c4]">
            홍길동 • {new Date(post.created_at).toLocaleDateString()}
          </div>
        </div>

        {thumbnail && (
          <div className="shrink-0 pt-1.5">
            <img src={thumbnail} alt="post thumbnail" className="h-[100px] w-[120px] rounded-md object-cover" />
          </div>
        )}
      </div>
    </Link>
  );
}
