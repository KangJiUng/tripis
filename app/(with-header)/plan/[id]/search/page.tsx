'use client';

import { Suspense } from 'react';
import SearchContent from '@/components/plan/search-content';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
