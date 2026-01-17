import CommentInput from '@/components/comment-input';
import DetailHeader from '@/components/headers/detail-header';

type PostDetail = {
  post_id: string;
  title: string;
  content: string;
  created_at: string;
  image_urls: string[];
  countries: string[];
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

  return (
    <div>
      <DetailHeader />

      <div className="flex items-center gap-3 px-1 pt-4">
        <div className="h-10 w-10 rounded-full bg-gray-300" />
        <div className="flex flex-col">
          <span className="text-medium14 text-black">홍길동</span>
          <span className="text-regular12 text-gray-400">{post.countries?.[0] ?? ''}</span>
        </div>
      </div>

      <h1 className="text-bold18 px-2 pt-4 text-black">{post.title}</h1>

      <p className="text-regular13 px-2 pt-3 leading-relaxed whitespace-pre-wrap text-gray-700">{post.content}</p>

      {post.image_urls?.length > 0 && (
        <div className="mt-4 flex flex-col gap-3 px-2">
          {post.image_urls.map((url, idx) => (
            <img key={idx} src={url} alt={`post-image-${idx}`} className="w-full rounded-lg object-cover" />
          ))}
        </div>
      )}

      <div className="text-regular12 px-1 pt-8 text-right text-gray-400">
        {new Date(post.created_at).toLocaleDateString()}
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
