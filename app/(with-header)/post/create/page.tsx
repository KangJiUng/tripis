import WriteHeader from '@/components/headers/write-header';
import SubmitButton from '@/components/submit-button';
import PostCountrySearchBar from '@/components/searchbars/post-country-searchbar';

export default function Page() {
  return (
    <div className="flex-1 overflow-y-auto px-2 pt-4">
      <WriteHeader title="게시글 작성" />
      <div className="text-medium13">종류 선택(필수)</div>
      <div className="overflow-x-auto">
        <div className="flex gap-2 pt-1.5 pb-4 whitespace-nowrap">
          <button className="text-medium12 rounded-[17px] border px-2 py-1">질문</button>
          <button className="text-medium12 rounded-[17px] border px-2 py-1">도움요청</button>
          <button className="text-medium12 rounded-[17px] border px-2 py-1">여행톡</button>
        </div>
      </div>
      <div className="text-medium13">나라 선택(필수)</div>
      <div className="t-1.5 flex pb-4">
        <PostCountrySearchBar />
      </div>

      <div className="text-medium13">주제 선택</div>
      <div className="overflow-x-auto">
        <div className="flex gap-2 pt-1.5 pb-4 whitespace-nowrap">
          <button className="text-medium12 rounded-[17px] border px-2 py-1">나라</button>
          <button className="text-medium12 rounded-[17px] border px-2 py-1">동행</button>
          <button className="text-medium12 rounded-[17px] border px-2 py-1">양도</button>
          <button className="text-medium12 rounded-[17px] border px-2 py-1">음식</button>
          <button className="text-medium12 rounded-[17px] border px-2 py-1">장소</button>
        </div>
      </div>

      <div className="pt-4">
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
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white">
        <div className="mx-auto max-w-[600px]">
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}
