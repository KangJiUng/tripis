import CommentIcon from '@/icons/comment-icon';
import LikeOutlineIcon from '@/icons/like-outline-icon';

interface InteractBarProps {
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

export default function InteractBar({ likeCount, commentCount, createdAt }: InteractBarProps) {
  return (
    <div className="flex w-full items-center justify-between py-1">
      <div className="flex items-center gap-4">
        <span className="text-medium12 flex items-center gap-1 text-[#aeaeae]">
          <LikeOutlineIcon /> {likeCount}
        </span>
        <span className="text-medium12 flex items-center gap-1 text-[#aeaeae]">
          <CommentIcon /> {commentCount}
        </span>
      </div>
      <div className="text-medium12 text-[#aeaeae]">{new Date(createdAt).toLocaleDateString('ko-KR')}</div>
    </div>
  );
}
