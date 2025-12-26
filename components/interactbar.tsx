import CommentIcon from '@/icons/comment-icon';
import LikeOutlineIcon from '@/icons/like-outline-icon';

export default function InteractBar() {
  return (
    <div className="flex w-full items-center justify-between py-1">
      <div className="flex items-center gap-4">
        <span className="text-medium12 flex items-center gap-1 text-[#aeaeae]">
          <LikeOutlineIcon /> 0
        </span>
        <span className="text-medium12 flex items-center gap-1 text-[#aeaeae]">
          <CommentIcon /> 0
        </span>
      </div>
      <div className="text-medium12 text-[#aeaeae]">2025.8.22</div>
    </div>
  );
}
