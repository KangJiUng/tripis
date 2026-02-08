'use client';

import { useRouter } from 'next/navigation';
import CloseIcon from '@/icons/close-icon';

type MockPlan = {
  id: string;
  title: string;
  dateRange: string;
  duration: string;
  places: number;
  status?: string | null;
  companions?: string | null;
};

const mockPlans: MockPlan[] = [
  {
    id: 'plan-1',
    title: '오사카 여행',
    dateRange: '2026.9.1 - 9.5',
    duration: '4박5일',
    places: 34,
  },
  {
    id: 'plan-2',
    title: '오사카 여행',
    dateRange: '2025.1.21 - 1.25',
    duration: '4박5일',
    places: 49,
  },
];

export default function Page() {
  const router = useRouter();

  return (
    <div className="mx-auto min-h-screen max-w-[600px] bg-white px-1 pb-10">
      <header className="-mx-2 flex h-12 items-center">
        <button onClick={() => router.back()} className="cursor-pointer">
          <CloseIcon />
        </button>
      </header>

      <section className="pt-6">
        <h1 className="text-semi-bold24 leading-9 text-[#3b3b3b]">
          리뷰를 작성할 일정을
          <br />
          선택해주세요.
        </h1>
      </section>

      <section className="pt-12">
        <h2 className="text-semi-bold14 mb-4 text-[#3b3b3b]">나의 여행</h2>

        <div className="space-y-4">
          {mockPlans.map((plan) => (
            <button
              key={plan.id}
              className="flex w-full items-center gap-4 rounded-xl border border-[#f0f0f0] bg-[#fbfbfb] p-4 text-left shadow-[0_1px_0_rgba(0,0,0,0.03)]"
            >
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#d9d9d9]" />

              <div className="flex-1">
                <div className="text-semi-bold16 text-[#3b3b3b]">{plan.title}</div>
                <div className="text-semi-bold15 mt-1 text-[#3b3b3b]">
                  {plan.dateRange} ({plan.duration})
                </div>
                <div className="text-regular13 mt-1 text-[#9a9a9a]">
                  {plan.status && <span className="text-[#4a6bff]">{plan.status}</span>}
                  {plan.status && <span className="px-1 text-[#9a9a9a]">|</span>}
                  {plan.places}개의 장소
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
