'use client';

import { useRef, useEffect, useState } from 'react';
import PlanHeader from '@/components/headers/plan-header';
import GoogleMap from '@/components/plan/google-map';
import PlanDayList from '@/components/plan/plan-day-list';
import Link from 'next/link';
import { getTravelDays } from '@/utils/getTravelDays';

type Plan = {
  plan_id: string;
  title: string;
  start_date: string;
  end_date: string;
};

export default function Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [plans, setPlans] = useState<Plan[]>([]);

  const today = new Date();

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await fetch('/api/plans');
      if (!res.ok) return;

      const data = await res.json();
      setPlans(data.plans ?? []);
    };

    fetchPlans();
  }, []);

  const futurePlans = plans
    .filter((plan) => new Date(plan.start_date) >= today)
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

  const nearestPlan = futurePlans[0];

  const days = nearestPlan ? getTravelDays(nearestPlan.start_date, nearestPlan.end_date) : [];

  return (
    <div className="flex h-full flex-col">
      <PlanHeader
        tripName={nearestPlan?.title}
        tripDate={nearestPlan ? `${nearestPlan.start_date} - ${nearestPlan.end_date}` : undefined}
        scrollRootRef={scrollRef}
        titleRef={titleRef}
      />

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {nearestPlan ? (
          <>
            <div className="shrink-0 p-1">
              <h1 ref={titleRef} className="text-medium20">
                {nearestPlan.title}
              </h1>
              <p className="text-regular15 text-gray-500">
                {nearestPlan.start_date} - {nearestPlan.end_date}
              </p>
            </div>

            <div className="w-full py-2">
              <GoogleMap className="h-[200px] w-full" />
              <PlanDayList days={days} />
            </div>
          </>
        ) : (
          <div className="flex min-h-full flex-col items-center justify-center gap-3">
            <div className="text-regular15">등록된 일정이 없어요. 새 여행 계획을 세워보세요!</div>
            <Link href="/plan/create/destination" className="text-regular14 rounded-full border px-4 py-2">
              일정 등록하기
            </Link>
            <Link href="/plan/list" className="text-regular14 text-gray-400 underline">
              지난 일정 보기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
