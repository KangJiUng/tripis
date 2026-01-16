'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/headers/header';
import ReviewCard from '@/components/feed/review-feed/review-card';
import FeedSearchBar from '@/components/searchbars/feed-searchbar';
import CommonCard from '@/components/feed/common-feed/common-card';

type TabType = '리뷰' | '질문' | '도움요청' | '여행톡';

type Post = {
  post_id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  image_urls: string[];
  post_type: string;
};

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabType>('리뷰');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === '리뷰') return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts?type=${activeTab}`);
        const data = await res.json();

        if (!res.ok) {
          console.error(data.error);
          setPosts([]);
          return;
        }

        setPosts(data.posts ?? []);
      } catch (e) {
        console.error('fetch posts error', e);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white px-2">
      <Header />

      {/* 탭 */}
      <div className="flex gap-5">
        {(['리뷰', '질문', '도움요청', '여행톡'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-bold20 cursor-pointer py-1 transition ${
              activeTab === tab ? 'text-black' : 'text-gray-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <FeedSearchBar />

      {/* 정렬 (리뷰 전용) */}
      {activeTab === '리뷰' && (
        <div className="text-bold12 flex gap-1.5 pt-4">
          <button>• 추천순</button>
          <button>• 최신순</button>
        </div>
      )}

      {/* 리스트 */}
      <div className="space-y-4">
        {activeTab === '리뷰' && (
          <section>
            {[...Array(5)].map((_, idx) => (
              <div key={idx}>
                <ReviewCard />
                {idx < 4 && <div className="border-b border-[#ececec]" />}
              </div>
            ))}
          </section>
        )}

        {activeTab !== '리뷰' && (
          <section>
            {loading && <div className="text-regular13 pt-10 text-center text-gray-300">불러오는 중...</div>}

            {!loading && posts.length === 0 && (
              <div className="text-regular13 pt-10 text-center text-gray-300">아직 게시글이 없어요.</div>
            )}

            {!loading &&
              posts.map((post, idx) => (
                <div key={post.post_id}>
                  <CommonCard post={post} />
                  {idx < posts.length - 1 && <div className="border-b border-[#ececec]" />}
                </div>
              ))}
          </section>
        )}
      </div>
    </div>
  );
}
