'use client';

import { useRef } from 'react';
import PlanHeader from '@/components/headers/plan-header';
import GoogleMap from '@/components/plan/google-map';
import PlanDayList from '@/components/plan/plan-day-list';
import Link from 'next/link';
import { getTravelDays } from '@/utils/getTravelDays';

type Plan = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
};

export default function Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // mock 데이터
  const plans: Plan[] = [
    {
      id: 1,
      title: '도쿄 여행',
      startDate: '2026-01-08',
      endDate: '2026-01-22',
    },
    {
      id: 2,
      title: '도쿄 여행',
      startDate: '2026-03-09',
      endDate: '2026-03-19',
    },
  ];

  const trip = {
    startDate: '2026-01-08',
    endDate: '2026-01-22',
  };

  const days = getTravelDays(trip.startDate, trip.endDate);

  const today = new Date();

  const futurePlans = plans
    .filter((plan) => new Date(plan.startDate) >= today)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const nearestPlan = futurePlans[0];

  return (
    <div className="flex h-full flex-col">
      <PlanHeader
        tripName={nearestPlan?.title}
        tripDate={nearestPlan ? `${nearestPlan.startDate} - ${nearestPlan.endDate}` : undefined}
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
                {nearestPlan.startDate} - {nearestPlan.endDate}
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
            <Link href="/plan/create/date" className="text-regular14 rounded-full border px-4 py-2">
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
