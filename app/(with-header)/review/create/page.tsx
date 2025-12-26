import WriteHeader from '@/components/headers/write-header';
import SubmitButton from '@/components/submit-button';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <WriteHeader title="리뷰 작성" />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        <div className="mb-6">
          <button className="text-regular12 flex h-28 w-28 cursor-pointer items-center justify-center rounded-lg bg-[#ececec] text-gray-400">
            0/10
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="제목을 입력해주세요(필수)"
            className="text-medium16 placeholder:text-gray-00 w-full border-b border-gray-200 pb-2 focus:outline-none"
          />
        </div>

        <div className="mb-8">
          <textarea
            placeholder="• 여행은 어떠셨나요? 같은 나라를 여행할 여행자들에게 정보를 공유해 주세요!"
            className="text-regular14 h-40 w-full resize-none placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <div className="flex gap-3">
          <button className="rounded-full border px-4 py-2 text-sm">일정 불러오기</button>
          <button className="rounded-full border px-4 py-2 text-sm">일정 직접 등록</button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 flex w-full justify-center">
        <SubmitButton />
      </div>
    </div>
  );
}
