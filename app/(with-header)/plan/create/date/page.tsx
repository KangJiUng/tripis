'use client';

import { Suspense } from 'react';
import PlanCreateHeader from '@/components/headers/plan-create-header';
import DateSelector from '@/components/plan/date-selector';

export default function Page() {
  return (
    <div>
      <PlanCreateHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <DateSelector />
      </Suspense>
    </div>
  );
}
