import CommentInput from '@/components/comment-input';
import DetailHeader from '@/components/headers/detail-header';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <DetailHeader />

      <div className="flex items-center gap-3 px-1 pt-4">
        <div className="h-10 w-10 rounded-full bg-gray-300" />
        <div className="flex flex-col">
          <span className="text-medium14 text-black">홍길동</span>
          <span className="text-regular12 text-gray-400">상하이</span>
        </div>
      </div>

      <h1 className="text-bold18 px-2 pt-4 text-black">출국 2시간 전 공항</h1>

      <p className="text-regular13 px-2 pt-3 leading-relaxed text-gray-700">
        모레 출국인데(주말) 2시간 전 공항 도착 괜찮을까요
      </p>

      <div className="text-medium13 px-2 pt-8 text-[#5364FF]">#질문 #나라</div>

      <div className="text-regular12 px-1 pt-8 text-right text-gray-400">2025.8.22</div>

      <div className="-mx-[15px] mt-6 h-2 bg-gray-100" />

      <div className="flex h-[50vh] flex-col items-center justify-center text-center">
        <p className="text-regular13 text-gray-300">아직 댓글이 없어요.</p>
        <p className="text-regular13 mt-1 text-gray-300">댓글을 남겨주세요!</p>
      </div>
      <CommentInput />
    </div>
  );
}
