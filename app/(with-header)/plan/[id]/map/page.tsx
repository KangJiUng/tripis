'use client';

import { Suspense } from 'react';
import MapContent from '@/components/plan/map-content';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MapContent />
    </Suspense>
  );
}
