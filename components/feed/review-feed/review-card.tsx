import InteractBar from '@/components/interactbar';
import Profile from '../profile';
import ReviewContent from './review-content';

export default function ReviewCard() {
  return (
    <article className="flex flex-col gap-3 bg-white py-4">
      <Profile />
      <ReviewContent />
      <InteractBar />
    </article>
  );
}
