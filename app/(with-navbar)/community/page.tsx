'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/headers/header';
import ReviewCard from '@/components/feed/review-feed/review-card';
import FeedSearchBar from '@/components/searchbars/feed-searchbar';
import CommonCard from '@/components/feed/common-feed/common-card';

type TabType = '리뷰' | '질문' | '도움요청' | '여행톡';
type ReviewSort = 'latest' | 'likes';

type Post = {
  post_id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  image_urls: string[];
  countries: string[];
  tags: string | null;
  post_type: string;
  users: {
    nickname: string;
    profile_image_url: string | null;
  };
};

type Review = {
  review_id: string;
  title: string;
  content: string;
  image_urls: string[];
  like_count: number;
  comment_count: number;
  created_at: string;
  users: {
    nickname: string;
    profile_image_url: string | null;
  } | null;
  travel_plan: {
    title: string;
    country: string;
    start_date: string;
    end_date: string;
  } | null;
};

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabType>('리뷰');
  const [reviewSort, setReviewSort] = useState<ReviewSort>('latest');
  const [posts, setPosts] = useState<Post[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const url =
          activeTab === '리뷰'
            ? `/api/reviews?sort=${reviewSort}${query.trim() ? `&query=${encodeURIComponent(query)}` : ''}`
            : query.trim().length > 0
              ? `/api/search/feed?query=${encodeURIComponent(query)}&type=${activeTab}`
              : `/api/posts?type=${activeTab}`;

        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          console.error(data.error);
          if (activeTab === '리뷰') {
            setReviews([]);
          } else {
            setPosts([]);
          }
          return;
        }

        if (activeTab === '리뷰') {
          setReviews(data.reviews ?? []);
        } else {
          setPosts(data.posts ?? []);
        }
      } catch (e) {
        console.error('fetch posts error', e);
        if (activeTab === '리뷰') {
          setReviews([]);
        } else {
          setPosts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [activeTab, query, reviewSort]);

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

      <FeedSearchBar value={query} onChange={setQuery} />

      {activeTab === '리뷰' && (
        <div className="text-semi-bold12 flex gap-1.5 pt-4">
          <button onClick={() => setReviewSort('likes')} className={reviewSort === 'likes' ? 'text-black' : 'text-gray-400'}>
            • 추천순
          </button>
          <button
            onClick={() => setReviewSort('latest')}
            className={reviewSort === 'latest' ? 'text-black' : 'text-gray-400'}
          >
            • 최신순
          </button>
        </div>
      )}

      {/* 리스트 */}
      <div className="space-y-4">
        {activeTab === '리뷰' && (
          <section>
            {loading && <div className="text-regular13 pt-10 text-center text-gray-300">불러오는 중...</div>}
            {!loading && reviews.length === 0 && (
              <div className="text-regular13 pt-10 text-center text-gray-300">
                {query.trim() ? '찾는 리뷰가 없어요.' : '아직 리뷰가 없어요.'}
              </div>
            )}
            {!loading &&
              reviews.map((review, idx) => (
                <div key={review.review_id}>
                  <ReviewCard review={review} />
                  {idx < reviews.length - 1 && <div className="border-b border-[#ececec]" />}
                </div>
              ))}
          </section>
        )}

        {activeTab !== '리뷰' && (
          <section>
            {loading && <div className="text-regular13 pt-10 text-center text-gray-300">불러오는 중...</div>}

            {!loading && posts.length === 0 && (
              <div className="text-regular13 pt-10 text-center text-gray-300">
                {query.trim() ? '찾는 게시물이 없어요.' : '아직 게시글이 없어요.'}
              </div>
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
