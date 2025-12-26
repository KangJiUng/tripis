'use client';

import { useState } from 'react';
import Header from '@/components/headers/header';
import ReviewCard from '@/components/feed/review-feed/review-card';
import SearchBar from '@/components/searchbar';

type TabType = 'review' | 'question' | 'help' | 'talk';

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabType>('review');

  return (
    <div className="min-h-screen bg-white px-2">
      <Header />

      <div className="flex gap-5">
        {[
          { key: 'review', label: '리뷰' },
          { key: 'question', label: '질문' },
          { key: 'help', label: '도움요청' },
          { key: 'talk', label: '여행톡' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as TabType)}
            className={`text-bold18 py-1 transition ${activeTab === tab.key ? 'text-black' : 'text-gray-400'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <SearchBar />

      <div className="text-bold12 flex gap-1.5">
        <button>• 추천순</button>
        <button>• 최신순</button>
      </div>

      <div className="space-y-4">
        {activeTab === 'review' && (
          <section>
            {[...Array(5)].map((_, idx) => (
              <div key={idx}>
                <ReviewCard />
                {idx < 4 && <div className="border-b-1 border-[#ececec]" />}
              </div>
            ))}
          </section>
        )}

        {activeTab !== 'review' && (
          <>
            {[...Array(5)].map((_, idx) => (
              <section key={idx} className="flex h-32 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                공통 피드 카드
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
