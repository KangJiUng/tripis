interface ProfileProps {
  nickname: string;
  profileImageUrl?: string | null;
  subText: string;
}

export default function Profile({ nickname, profileImageUrl, subText }: ProfileProps) {
  return (
    <div className="flex items-center gap-3">
      {profileImageUrl ? (
        <img src={profileImageUrl} alt={nickname} className="h-12 w-12 rounded-full object-cover" />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300" />
      )}
      <div>
        <div className="text-semi-bold14">{nickname}</div>
        <div className="text-regular12 text-[#c4c4c4]">{subText}</div>
      </div>
    </div>
  );
}
