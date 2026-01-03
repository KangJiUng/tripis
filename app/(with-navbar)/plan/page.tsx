import PlanHeader from '@/components/headers/plan-header';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex h-full flex-col">
      <PlanHeader tripName="도쿄 여행" tripDate="2025.1.1 - 1.5" />

      <div className="p-1">
        <h1 className="text-medium20">도쿄 여행</h1>
        <p className="text-regular15 text-gray-500">2025.1.1 - 1.5</p>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="text-regular15">등록된 일정이 없어요. 새 여행 계획을 세워보세요!</div>
          <button className="text-regular14 rounded-full border px-4 py-2">일정 등록하기</button>
          <Link href="/" className="text-regular14 text-gray-400 underline">
            지난 일정 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
