import PlanHeader from '@/components/headers/plan-header';

export default function Page() {
  return (
    <div>
      <PlanHeader tripName="도쿄 여행" tripDate="2025.1.1 - 1.5" />

      <div className="p-4">
        <h1 className="text-2xl font-bold">도쿄 여행</h1>
        <p className="text-gray-500">2025.1.1 - 1.5</p>
      </div>
    </div>
  );
}
