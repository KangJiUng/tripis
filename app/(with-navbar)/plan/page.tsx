import PlanHeader from '@/app/components/plan-header';

export default function Page() {
  return (
    <div>
      <PlanHeader tripName="도쿄 여행" tripDate="2025.1.1 - 1.5" />

      <div className="p-4">
        <h1 className="text-2xl font-bold">도쿄 여행</h1>
        <p className="text-gray-500">2025.1.1 - 1.5</p>
      </div>

      {/* 테스트용 스크롤 콘텐츠 */}
      <div className="space-y-4 p-4">
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} className="rounded-lg bg-gray-100 p-4">
            테스트 항목 {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
