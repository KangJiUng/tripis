import KakaoLoginButton from '../buttons/kakao-login-button';

export default function GuestMenu() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <div className="text-regular12 mt-7 flex justify-center py-4 text-[#9a9a9a]">카카오 계정으로 로그인하기</div>
      </div>
      <div className="justify-items-center">
        <KakaoLoginButton width={220} />
      </div>
    </div>
  );
}
