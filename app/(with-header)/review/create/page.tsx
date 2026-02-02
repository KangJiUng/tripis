'use client';

import { useState } from 'react';
import WriteHeader from '@/components/headers/write-header';
import SubmitButton from '@/components/buttons/submit-button';
import ReviewPlanEditor from '@/components/review/review-plan-editor';
import CloseIcon from '@/icons/close-icon';
import HorizontalScroll from '@/components/horizontal-scroll';

export default function Page() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleLoadPlan = async () => {
    const res = await fetch('/api/plans');
    if (!res.ok) return;

    const data = await res.json();

    if (!data.plans || data.plans.length === 0) {
      alert('불러올 여행 일정이 없어요.');
      return;
    }

    setSelectedPlanId(data.plans[0].plan_id);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <WriteHeader title="리뷰 작성" />

      <div className="flex-1 overflow-y-auto px-2 pt-4 pb-24">
        <div className="mb-6 flex items-center gap-2 overflow-x-auto">
          <input
            type="file"
            accept="image/*"
            multiple
            id="review-image-input"
            style={{ display: 'none' }}
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (files.length + images.length > 10) {
                alert('이미지는 최대 10장까지 첨부할 수 있어요.');
                return;
              }
              setImages((prev) => [...prev, ...files.slice(0, 10 - prev.length)]);
            }}
          />

          <button
            className="text-regular12 flex h-28 w-28 shrink-0 cursor-pointer flex-col items-center justify-center rounded-lg bg-[#ececec] text-gray-400"
            onClick={() => document.getElementById('review-image-input')?.click()}
          >
            +<div className="mt-1">{images.length}/10</div>
          </button>

          {images.length > 0 && (
            <HorizontalScroll className="max-w-[70vw] items-center gap-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative h-28 w-28 shrink-0">
                  <img src={URL.createObjectURL(img)} alt="preview" className="h-full w-full rounded-lg object-cover" />

                  {idx === 0 && (
                    <span className="text-regular12 absolute top-1 left-1 rounded bg-[rgba(0,0,0,0.7)] px-1.5 py-0.5 text-white">
                      대표
                    </span>
                  )}

                  <button
                    type="button"
                    className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow"
                    onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                  >
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </HorizontalScroll>
          )}
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요(필수)"
            className="text-medium16 w-full border-b border-gray-200 pb-2 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <div className="mb-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="• 여행은 어떠셨나요? 같은 나라를 여행할 여행자들에게 정보를 공유해 주세요!"
            className="text-regular14 h-40 w-full resize-none placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <div className="flex gap-3">
          <button className="text-regular13 cursor-pointer rounded-full border px-2 py-1.5" onClick={handleLoadPlan}>
            일정 불러오기
          </button>

          <button className="text-regular13 cursor-pointer rounded-full border px-2 py-1.5">일정 직접 등록</button>
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
