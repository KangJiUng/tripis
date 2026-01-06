'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Calendar from '@/components/calendar/calendar';
import PlanCreateHeader from '@/components/headers/plan-create-header';
import SubmitButton from '@/components/buttons/submit-button';
import { differenceInCalendarDays, format } from 'date-fns';
import { allCities } from '@/utils/countryData';

export default function Page() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const isSingleDay = startDate && (!endDate || startDate.getTime() === endDate.getTime());
  const isRange = startDate && endDate && startDate.getTime() !== endDate.getTime();
  const shouldShowSummary = Boolean(startDate);
  const totalDays = startDate && endDate ? differenceInCalendarDays(endDate, startDate) + 1 : startDate ? 1 : 0;

  const searchParams = useSearchParams();
  const country = searchParams.get('country');

  const handleCreatePlan = async () => {
    if (!startDate || !country) return;

    const finalEndDate = endDate ?? startDate;

    const city = allCities.find((c) => c.id === country);
    const title = city ? `${city.name} 여행` : '여행';

    const res = await fetch('/api/plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        country,
        startDate: startDate.toISOString().slice(0, 10),
        endDate: finalEndDate.toISOString().slice(0, 10),
      }),
    });

    const data = await res.json();

    if (data.planId) {
      window.location.href = `/plan`;
    }
  };

  return (
    <div>
      <PlanCreateHeader />

      <div className="pt-12 pb-40">
        <Calendar startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      </div>

      {shouldShowSummary && (
        <div className="fixed bottom-12 left-0 z-40 flex w-full justify-center text-center">
          <div className="text-regular14 mx-4 w-full max-w-[600px] bg-[#f1f2ff] px-4 py-3">
            {isSingleDay && `${format(startDate!, 'yyyy.MM.dd')} · 당일 일정 (1일)`}

            {isRange && `${format(startDate!, 'yyyy.MM.dd')} ~ ${format(endDate!, 'yyyy.MM.dd')} · ${totalDays}일`}
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full bg-white">
        <div className="mx-auto max-w-[600px]">
          <SubmitButton text="선택 완료" disabled={!startDate} onClick={handleCreatePlan} />
        </div>
      </div>
    </div>
  );
}
