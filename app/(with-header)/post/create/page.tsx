'use client';

import { useState } from 'react';
import WriteHeader from '@/components/headers/write-header';
import SubmitButton from '@/components/buttons/submit-button';
import CountrySelectorModal from '@/components/country-selector-modal';
import SearchIcon from '@/icons/search-icon';
import CloseIcon from '@/icons/close-icon';

type Country = {
  id: string;
  name: string;
};

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isCountryModalOpen, setIsCountryModalOpen] = useState<boolean>(false);

  const categories = ['질문', '도움요청', '여행톡'];
  const topics = ['나라', '동행', '양도', '음식', '장소'];

  const isFormValid = selectedCategory && selectedCountry && title.trim() && content.trim();

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };
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
      <div className="relative flex items-center pt-2 pb-4">
        {selectedCountry && (
          <div className="text-medium12 absolute top-[13px] left-7.5 z-10 flex items-center gap-1 rounded-full border border-[#5364FF] bg-[rgb(239,239,255)] px-[7px] text-[#5364FF]">
            {selectedCountry.name}
            <button
              onClick={() => setSelectedCountry(null)}
              className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-[#5364FF] hover:bg-[#f1f1ff]"
            >
              <CloseIcon />
            </button>
          </div>
        )}
        <div
          className="relative flex h-8 w-60 cursor-pointer items-center justify-center rounded-[15px] border border-[#d4d4d4]"
          onClick={() => setIsCountryModalOpen(true)}
        >
          <span className="absolute top-1/2 left-2 -translate-y-1/2">
            <SearchIcon color="#aeaeae" />
          </span>
          <span
            className={`text-regular12 absolute top-[15px] left-8 -translate-y-1/2 ${
              selectedCountry ? 'text-black' : 'text-[#aeaeae]'
            }`}
          >
            {selectedCountry ? selectedCountry.name : '나라를 검색해보세요'}
          </span>
        </div>
      </div>

      <div className="text-medium13">주제 선택</div>
      <div className="overflow-x-auto">
        <div className="flex gap-2 pt-1.5 pb-4 whitespace-nowrap">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
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
        <div className="mb-6">
          <button className="text-regular12 flex h-28 w-28 cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-gray-400">
            0/10
          </button>
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
          <SubmitButton disabled={!isFormValid} />
        </div>
      </div>

      <CountrySelectorModal
        isOpen={isCountryModalOpen}
        onClose={() => setIsCountryModalOpen(false)}
        onSelect={handleCountrySelect}
      />
    </div>
  );
}
