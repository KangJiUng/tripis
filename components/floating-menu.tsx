'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ReviewCreateIcon from '../icons/review-create-icon';
import PostCreateIcon from '../icons/post-create-icon';

interface FloatingMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function FloatingMenu({ open, onClose }: FloatingMenuProps) {
  const router = useRouter();

  const goToReview = () => {
    onClose();
    router.push('/review/create/select-plan');
  };

  const goToPost = () => {
    onClose();
    router.push('/post/create');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="h-full w-full max-w-[600px] bg-black/20" onClick={onClose} />
          </motion.div>

          <motion.div
            className="fixed bottom-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-start gap-3 rounded-xl bg-[#4d4d4d] px-4 py-3 text-white shadow-lg"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          >
            <button
              onClick={goToReview}
              className="text-regular12 flex w-full cursor-pointer items-center gap-2 whitespace-nowrap"
            >
              <ReviewCreateIcon className="h-4 w-4" />
              <span>리뷰 작성</span>
            </button>

            <button
              onClick={goToPost}
              className="text-regular12 flex w-full cursor-pointer items-center gap-2 whitespace-nowrap"
            >
              <PostCreateIcon className="h-4 w-4" />
              <span>게시글 작성</span>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
