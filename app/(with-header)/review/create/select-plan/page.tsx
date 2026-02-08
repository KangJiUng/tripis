'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CloseIcon from '@/icons/close-icon';
import CheckIcon from '@/icons/check-icon';
import SubmitButton from '@/components/buttons/submit-button';

type PlanItem = {
  plan_id: string;
  title: string;
  country: string;
  start_date: string;
  end_date: string;
  placeCount: number;
};

const formatDateRange = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startText = `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()}`;
  const endText =
    startDate.getFullYear() === endDate.getFullYear()
      ? `${endDate.getMonth() + 1}.${endDate.getDate()}`
      : `${endDate.getFullYear()}.${endDate.getMonth() + 1}.${endDate.getDate()}`;
  return `${startText} - ${endText}`;
};

const formatDuration = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const totalDays = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1);
  const nights = Math.max(0, totalDays - 1);
  return `${nights}박 ${totalDays}일`;
};

export default function Page() {
  const router = useRouter();
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await fetch('/api/plans');
      if (!res.ok) {
        setPlans([]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      const rawPlans = (data.plans ?? []) as Omit<PlanItem, 'placeCount'>[];

      const withCounts = await Promise.all(
        rawPlans.map(async (plan) => {
          try {
            const daysRes = await fetch(`/api/plans/${plan.plan_id}/days`);
            if (!daysRes.ok) {
              return { ...plan, placeCount: 0 };
            }
            const daysData = await daysRes.json();
            const placeCount = (daysData.days ?? []).reduce(
              (acc: number, day: { places?: unknown[] }) => acc + (day.places?.length ?? 0),
              0,
            );
            return { ...plan, placeCount };
          } catch {
            return { ...plan, placeCount: 0 };
          }
        }),
      );

      setPlans(withCounts);
      setLoading(false);
    };

    fetchPlans();
  }, []);

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

        {loading && <div className="text-regular14 py-10 text-center text-[#9a9a9a]">일정을 불러오는 중...</div>}

        {!loading && plans.length === 0 && (
          <div className="text-regular14 py-10 text-center text-[#9a9a9a]">작성 가능한 일정이 없어요.</div>
        )}

        <div className="space-y-4">
          {plans.map((plan) => {
            const isSelected = selectedPlanId === plan.plan_id;
            return (
              <button
                key={plan.plan_id}
                onClick={() => setSelectedPlanId((prev) => (prev === plan.plan_id ? null : plan.plan_id))}
                className={`flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 text-left shadow-[0_1px_0_rgba(0,0,0,0.03)] ${
                  isSelected ? 'border-[#5364FF] bg-[#f3f5ff]' : 'border-[#f0f0f0] bg-[#fbfbfb]'
                }`}
              >
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#d9d9d9]" />

                <div className="flex-1">
                  <div className="text-semi-bold16 text-[#3b3b3b]">{plan.title}</div>
                  <div className="text-semi-bold15 mt-1 text-[#3b3b3b]">
                    {formatDateRange(plan.start_date, plan.end_date)} ({formatDuration(plan.start_date, plan.end_date)})
                  </div>
                  <div className="text-regular13 mt-1 text-[#9a9a9a]">{plan.placeCount}개의 장소</div>
                </div>

                {isSelected && (
                  <div className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#5364FF]">
                    <CheckIcon />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <div className="fixed bottom-0 left-0 w-full">
        <div className="mx-auto max-w-[600px]">
          <SubmitButton
            text="선택 완료"
            disabled={!selectedPlanId}
            onClick={() => {
              if (!selectedPlanId) return;
              router.push(`/review/create?planId=${selectedPlanId}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
