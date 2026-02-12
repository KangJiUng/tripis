import Link from 'next/link';
import InteractBar from '@/components/interactbar';
import Profile from '../profile';
import ReviewContent from './review-content';

type ReviewCardProps = {
  review: {
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
      start_date: string;
      end_date: string;
    } | null;
  };
};

const formatPlanDate = (startDate?: string, endDate?: string) => {
  if (!startDate || !endDate) return '';
  const start = new Date(startDate);
  const end = new Date(endDate);
  return `${start.getFullYear()}.${start.getMonth() + 1}.${start.getDate()}-${end.getFullYear()}.${
    end.getMonth() + 1
  }.${end.getDate()}`;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const profileText = review.travel_plan
    ? `${review.travel_plan.title} · ${formatPlanDate(review.travel_plan.start_date, review.travel_plan.end_date)}`
    : '';

  return (
    <Link href={`/review/${review.review_id}`} className="block">
      <article className="flex flex-col gap-3 bg-white py-4">
        <Profile
          nickname={review.users?.nickname ?? '알 수 없는 사용자'}
          profileImageUrl={review.users?.profile_image_url}
          subText={profileText}
        />
        <ReviewContent title={review.title} content={review.content} imageUrl={review.image_urls?.[0]} />
        <InteractBar likeCount={review.like_count ?? 0} commentCount={review.comment_count ?? 0} createdAt={review.created_at} />
      </article>
    </Link>
  );
}
