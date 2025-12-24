interface UserInfoProps {
  user: any;
}

export default function UserInfo({ user }: UserInfoProps) {
  // 비로그인
  if (!user) {
    return (
      <div>
        <div className="text-regular16 px-2 py-4">로그인이 필요합니다.</div>
        <div className="mt-2 border-t border-gray-200" />
      </div>
    );
  }

  // 로그인
  return (
    <div className="px-6 py-4">
      <div className="text-lg font-bold">{user.user_metadata?.full_name || user.email}</div>
      <div className="text-sm text-gray-500">{user.email}</div>
    </div>
  );
}
