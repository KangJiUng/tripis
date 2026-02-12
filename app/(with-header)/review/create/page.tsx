'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import WriteHeader from '@/components/headers/write-header';
import SubmitButton from '@/components/buttons/submit-button';
import ReviewPlanEditor from '@/components/review/review-plan-editor';
import CloseIcon from '@/icons/close-icon';
import HorizontalScroll from '@/components/horizontal-scroll';
import ReplayIcon from '@/icons/replay-icon';

function ReviewCreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dayReviews, setDayReviews] = useState<{ dayId: string; dayIndex: number; content: string }[]>([]);
  const isFormValid = selectedPlanId && title.trim() && content.trim() && images.length > 0;

  const handleSubmit = async () => {
    if (!isFormValid || !selectedPlanId) {
      alert('제목, 내용, 이미지, 일정을 모두 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('plan_id', selectedPlanId);
    formData.append('title', title);
    formData.append('content', content);
    formData.append(
      'day_reviews',
      JSON.stringify(
        dayReviews.map((day) => ({
          day_id: day.dayId,
          day_index: day.dayIndex,
          content: day.content,
        })),
      ),
    );

    images.forEach((img) => {
      formData.append('images', img);
    });

    const res = await fetch('/api/reviews', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      alert('리뷰 작성 실패');
      return;
    }

    const data = await res.json();
    alert('리뷰가 성공적으로 작성되었습니다!');
    if (data.review?.review_id) {
      router.push(`/review/${data.review.review_id}`);
      return;
    }
    router.push('/');
  };

  useEffect(() => {
    const planId = searchParams.get('planId');
    setSelectedPlanId(planId);
  }, [searchParams]);

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

        <button
          className="text-regular13 flex items-center gap-1 py-1.5 text-[#5364FF]"
          onClick={() => router.push('/review/create/select-plan')}
        >
          <ReplayIcon fill="#5364FF" />
          <span>일정 다시 불러오기</span>
        </button>

        {selectedPlanId && <ReviewPlanEditor planId={selectedPlanId} onChangeDays={setDayReviews} />}
      </div>

      <div className="fixed bottom-0 left-0 w-full">
        <div className="mx-auto max-w-[600px]">
          <SubmitButton disabled={!isFormValid} allowClickWhenDisabled onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <ReviewCreatePage />
    </Suspense>
  );
}
