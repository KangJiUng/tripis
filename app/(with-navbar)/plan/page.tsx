import PlanHeader from '@/components/headers/plan-header';
import Link from 'next/link';

type Plan = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
};

export default function Page() {
  // 🔹 mock 데이터
  const plans: Plan[] = [
    // 일정 테스트하려면 주석 해제
    {
      id: 1,
      title: '도쿄 여행',
      startDate: '2025-01-01',
      endDate: '2025-01-05',
    },
  ];

  const today = new Date();

  const futurePlans = plans
    .filter((plan) => new Date(plan.startDate) >= today)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const nearestPlan = futurePlans[0];

  return (
    <div className="flex h-full flex-col">
      {/* 헤더는 항상 존재, 값만 조건부 */}
      <PlanHeader
        tripName={nearestPlan?.title}
        tripDate={nearestPlan ? `${nearestPlan.startDate} - ${nearestPlan.endDate}` : undefined}
      />

      {/* 제목/기간: 일정 있을 때만 */}
      {nearestPlan && (
        <div className="p-1">
          <h1 className="text-medium20">{nearestPlan.title}</h1>
          <p className="text-regular15 text-gray-500">
            {nearestPlan.startDate} - {nearestPlan.endDate}
          </p>
        </div>
      )}

      {/* 본문 */}
      <div className="flex flex-1 items-center justify-center">
        {nearestPlan ? (
          <div>{/* 나중에 일정 카드/리스트 들어갈 자리 */}</div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="text-regular15">등록된 일정이 없어요. 새 여행 계획을 세워보세요!</div>
            <button className="text-regular14 rounded-full border px-4 py-2">일정 등록하기</button>
            <Link href="/" className="text-regular14 text-gray-400 underline">
              지난 일정 보기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
