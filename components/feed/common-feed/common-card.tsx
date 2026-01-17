import Link from 'next/link';

type CommonPost = {
  post_id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  image_urls: string[];
  countries: string[] | null;
  tags: string | null;
  users: {
    nickname: string;
  };
};

export default function CommonCard({ post }: { post: CommonPost }) {
  const hasImage = post.image_urls && post.image_urls.length > 0;
  const thumbnail = hasImage ? post.image_urls[0] : null;
  const countryTags = post.countries?.map((c) => `#${c}`) ?? [];

  const tagTags =
    post.tags
      ?.split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => `#${t}`) ?? [];

  const hashtags = [...countryTags, ...tagTags].join(' ');

  return (
    <Link href={`/post/${post.post_id}`} className="block">
      <div className="mt-3 flex w-full cursor-pointer">
        <div className="flex-1 pr-4">
          <div className="text-bold16 py-1">{post.title}</div>

          <div className="text-regular13 line-clamp-1 h-5 overflow-hidden text-ellipsis">{post.content}</div>

          {hashtags && <div className="text-medium13 line-clamp-1 pt-4 text-[#5364FF]">{hashtags}</div>}

          <div className="text-regular12 pt-1 pb-3 text-[#c4c4c4]">
            {post.users.nickname} • {new Date(post.created_at).toLocaleDateString()}
          </div>
        </div>

        {thumbnail && (
          <div className="shrink-0">
            <img src={thumbnail} alt="post thumbnail" className="h-[110px] w-[140px] rounded-[5px] object-cover" />
          </div>
        )}
      </div>
    </Link>
  );
}
