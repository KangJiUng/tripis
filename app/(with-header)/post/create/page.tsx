'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user-store';
import WriteHeader from '@/components/headers/write-header';
import SubmitButton from '@/components/buttons/submit-button';
import CountrySelectorModal from '@/components/country-selector-modal';
import SearchIcon from '@/icons/search-icon';
import CloseIcon from '@/icons/close-icon';
import HorizontalScroll from '@/components/horizontal-scroll';

type Country = {
  id: string;
  name: string;
};

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isCountryModalOpen, setIsCountryModalOpen] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useUserStore();

  const categories = ['질문', '도움요청', '여행톡'];
  const topics = ['나라', '동행', '양도', '음식', '장소'];

  const isFormValid = selectedCategory && selectedCountries.length > 0 && title.trim() && content.trim();

  const handleTopicClick = (topic: string) => {
    setSelectedTopic((prev) => (prev === topic ? '' : topic));
  };

  async function handleSubmit() {
    if (isSubmitting) return;
    if (!isFormValid) return;
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      formData.append('post_type', selectedCategory);
      formData.append('title', title);
      formData.append('content', content);

      selectedCountries.forEach((country) => {
        formData.append('countries', country.name);
      });

      if (selectedTopic) {
        formData.append('tags', selectedTopic);
      }

      images.forEach((img) => {
        formData.append('images', img);
      });

      const res = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        alert('게시글 작성 실패');
        return;
      }
      alert('게시글이 성공적으로 작성되었습니다!');
      router.push('/');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 pt-4">
      <WriteHeader title="게시글 작성" />
      <div className="text-medium13">종류 선택(필수)</div>
      <div className="overflow-x-auto">
        <div className="flex gap-2 pt-1.5 pb-4 whitespace-nowrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-medium12 cursor-pointer rounded-[17px] border px-2 py-1 ${
                selectedCategory === category
                  ? 'border-[#5364FF] bg-[#5364FF] text-white'
                  : 'border-gray-300 bg-white text-black'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="text-medium13">나라 선택(필수)</div>
      <div className="pt-2 pb-4">
        <div
          className="flex min-h-8 w-fit max-w-[600px] min-w-60 cursor-pointer flex-wrap items-center gap-1 rounded-[15px] border border-gray-300 px-2 py-1"
          onClick={() => setIsCountryModalOpen(true)}
        >
          <SearchIcon color="#aeaeae" />

          {selectedCountries.map((country) => (
            <div
              key={country.id}
              className="text-medium12 flex items-center gap-1 rounded-full border border-[#5364FF] bg-[rgb(239,239,255)] px-2 py-0.5 text-[#5364FF]"
              onClick={(e) => e.stopPropagation()}
            >
              {country.name}
              <button
                className="rounded-full text-[#5364FF] hover:bg-[#d9d9ff]"
                onClick={() => setSelectedCountries((prev) => prev.filter((c) => c.id !== country.id))}
              >
                <div className="flex h-4 w-4 cursor-pointer items-center justify-center">
                  <CloseIcon />
                </div>
              </button>
            </div>
          ))}

          {selectedCountries.length === 0 && <span className="text-regular12 text-[#aeaeae]">나라를 검색해보세요</span>}
        </div>
      </div>

      <div className="text-medium13">주제 선택</div>
      <div className="overflow-x-auto">
        <div className="flex gap-2 pt-1.5 pb-4 whitespace-nowrap">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => handleTopicClick(topic)}
              className={`text-medium12 cursor-pointer rounded-[17px] border px-2 py-1 ${
                selectedTopic === topic
                  ? 'border-[#5364FF] bg-[#5364FF] text-white'
                  : 'border-gray-300 bg-white text-black'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <div className="mb-6 flex items-center gap-2 overflow-x-auto">
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            id="image-upload-input"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (files.length + images.length > 10) {
                alert('최대 10장까지 첨부 가능합니다.');
                return;
              }
              setImages((prev) => [...prev, ...files.slice(0, 10 - prev.length)]);
            }}
          />
          <button
            className="text-regular12 flex h-25 w-25 shrink-0 cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 text-gray-400"
            onClick={() => document.getElementById('image-upload-input')?.click()}
          >
            <span style={{ display: 'inline-block', transform: 'rotate(45deg)' }}>
              <CloseIcon />
            </span>
            {images.length}/10
          </button>
          {images.length > 0 && (
            <HorizontalScroll className="max-w-[70vw] items-center gap-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative h-25 w-25 shrink-0">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="pointer-events-none h-full w-full rounded-lg object-cover"
                  />
                  {idx === 0 && (
                    <span className="text-regular12 absolute top-1 left-1 z-10 rounded-lg bg-[rgba(30,30,30,0.77)] px-1.5 py-0.5 text-white">
                      대표
                    </span>
                  )}
                  <button
                    className="pointer-events-auto absolute top-1 right-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 shadow"
                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                    type="button"
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
            placeholder={'• 어떤 이야기를 나누고 싶나요? \n• 등록된 글은 검색엔진 결과에 노출될 수 있어요'}
            className="text-regular14 h-40 w-full resize-none placeholder:text-gray-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full">
        <div className="mx-auto max-w-[600px]">
          <SubmitButton
            text={isSubmitting ? '업로드중입니다...' : '작성 완료'}
            disabled={!isFormValid || isSubmitting}
            allowClickWhenDisabled={!isSubmitting}
            onClick={() => {
              if (isSubmitting) return;
              if (!isFormValid) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
              }
              handleSubmit();
            }}
          />
        </div>
      </div>

      <CountrySelectorModal
        isOpen={isCountryModalOpen}
        onClose={() => setIsCountryModalOpen(false)}
        initialSelected={selectedCountries}
        onSelect={(countries) => setSelectedCountries(countries)}
      />
    </div>
  );
}
