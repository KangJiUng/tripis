'use client';

import { useState } from 'react';

export default function CommentInput() {
  const [comment, setComment] = useState('');

  return (
    <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[600px] -translate-x-1/2 border-t bg-white px-4 py-4">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="text-regular14 flex-1 placeholder:text-gray-300 focus:outline-none"
        />

        <button
          disabled={!comment.trim()}
          className={`text-medium14 ${comment.trim() ? 'text-[#5364FF]' : 'text-gray-300'}`}
        >
          등록
        </button>
      </div>
    </div>
  );
}
