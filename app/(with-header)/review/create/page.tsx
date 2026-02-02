'use client';

import { useState } from 'react';
import WriteHeader from '@/components/headers/write-header';
import SubmitButton from '@/components/buttons/submit-button';
import ReviewPlanEditor from '@/components/review/review-plan-editor';

export default function Page() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const handleLoadPlan = async () => {
    // 로그인한 유저의 plan 목록 가져오기
    const res = await fetch('/api/plans');
    if (!res.ok) return;

    const data = await res.json();

    if (!data.plans || data.plans.length === 0) {
      alert('불러올 여행 일정이 없어요.');
      return;
    }

    // 가장 최신 plan 사용
    setSelectedPlanId(data.plans[0].plan_id);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <WriteHeader title="리뷰 작성" />

      <div className="flex-1 overflow-y-auto px-2 pt-4 pb-24">
        <div className="mb-6">
          <button className="text-regular12 flex h-28 w-28 items-center justify-center rounded-lg bg-[#ececec] text-gray-400">
            0/10
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="제목을 입력해주세요(필수)"
            className="text-medium16 w-full border-b border-gray-200 pb-2 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <div className="mb-8">
          <textarea
            placeholder="• 여행은 어떠셨나요? 같은 나라를 여행할 여행자들에게 정보를 공유해 주세요!"
            className="text-regular14 h-40 w-full resize-none placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <div className="flex gap-3">
          <button className="text-regular13 rounded-full border px-2 py-1.5" onClick={handleLoadPlan}>
            일정 불러오기
          </button>

          <button className="text-regular13 rounded-full border px-2 py-1.5">일정 직접 등록</button>
        </div>

        {selectedPlanId && <ReviewPlanEditor planId={selectedPlanId} />}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white">
        <div className="mx-auto max-w-[600px]">
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}
