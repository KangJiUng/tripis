import CommentInput from '@/components/comment-input';
import DetailHeader from '@/components/headers/detail-header';

type PostDetail = {
  post_id: string;
  title: string;
  content: string;
  created_at: string;
  image_urls: string[];
  countries: string[];
  tags: string | null;
  users: {
    nickname: string | null;
    profile_image_url: string | null;
  };
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts?id=${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <div className="p-4">게시글을 불러올 수 없습니다.</div>;
  }

  const { post }: { post: PostDetail } = await res.json();
  const profileImage = post.users.profile_image_url ?? '/images/basic_profile.jpg';
  const nickname = post.users.nickname ?? '알 수 없음';

  const countries = post.countries ?? [];
  const countryText =
    countries.length === 0 ? '' : countries.length === 1 ? countries[0] : `${countries[0]} 외 ${countries.length - 1}`;

  const countryTags = post.countries?.map((c) => `#${c}`) ?? [];

  const tagTags =
    post.tags
      ?.split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => `#${t}`) ?? [];

  const hashtags = [...countryTags, ...tagTags].join(' ');

  return (
    <div>
      <DetailHeader />

      <div className="flex items-center gap-3 px-1 pt-4">
        <img src={profileImage} alt="profile" className="h-10 w-10 rounded-full object-cover" />

        <div className="flex flex-col">
          <span className="text-medium14 text-black">{nickname}</span>
          <span className="text-regular12 text-gray-400">{countryText}</span>
        </div>
      </div>

      <h1 className="text-semi-bold18 px-2 pt-4 text-black">{post.title}</h1>

      <p className="text-regular13 px-2 pt-3 leading-relaxed whitespace-pre-wrap text-gray-700">{post.content}</p>

      {hashtags && <div className="text-medium13 px-2 pt-4 text-[#5364FF]">{hashtags}</div>}

      {post.image_urls?.length > 0 && (
        <div className="mt-4 flex flex-col gap-3 px-2">
          {post.image_urls.map((url, idx) => (
            <img key={idx} src={url} alt={`post-image-${idx}`} className="w-full rounded-[5px] object-cover" />
          ))}
        </div>
      )}

      <div className="text-regular12 px-1 pt-8 text-right text-gray-400">
        {new Date(post.created_at).toLocaleDateString('ko-KR')}
      </div>

      <div className="-mx-[15px] mt-6 h-2 bg-gray-100" />

      <div className="flex h-[50vh] flex-col items-center justify-center text-center">
        <p className="text-regular13 text-gray-300">아직 댓글이 없어요.</p>
        <p className="text-regular13 mt-1 text-gray-300">댓글을 남겨주세요!</p>
      </div>

      <CommentInput />
    </div>
  );
}
