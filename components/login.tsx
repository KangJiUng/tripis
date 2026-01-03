import Link from 'next/link';
import Logo from '@/public/logo/logo';
import KakaoLoginButton from './kakao-login-button';

export default function Login() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[600px] flex-col bg-[#5B5FED] shadow-[0px_7px_15px_0px_rgba(100,100,111,0.2)]">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex items-center gap-1">
          <div className="-mt-5">
            <Logo />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-nanum-regular16 text-white">여행이란, 그래서</span>
            <span className="text-nanum-medium40 text-white">트립이즈</span>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 pb-30">
        <p className="text-regular16 text-white">로그인하고 더 많은 서비스를 사용해보세요!</p>

        <div className="mt-5">
          <KakaoLoginButton />
        </div>

        <div className="mt-8">
          <Link href="/" className="text-regular14 text-gray-200 underline">
            둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}
