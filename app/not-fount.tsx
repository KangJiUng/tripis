import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <div>잘못된 접근입니다.</div>
      <Link href="/" className="text-regular14 text-gray-400 underline">
        돌아가기
      </Link>
    </div>
  );
}
