'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo/logo';
import { supabase } from '@/lib/supabase/client';

export default function Page() {
  const handleKakaoLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[600px] flex-col bg-[#5B5FED] shadow-[0px_7px_15px_0px_rgba(100,100,111,0.2)]">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex items-center gap-1">
          <div className="-mt-5">
            <Logo />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-bold16 text-white">여행이란, 그래서</span>
            <span className="text-extra-bold40 text-white">트립이즈</span>
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-col items-center gap-4 pb-30">
        <p className="text-regular16 text-white">로그인하고 더 많은 서비스를 사용해보세요!</p>

        <div className="mt-5">
          <button onClick={handleKakaoLogin} className="cursor-pointer">
            <Image src="/images/kakao_login.png" alt="카카오 로그인" width={280} height={45} />
          </button>
        </div>

        <Link href="/" className="text-regular14 text-gray-200 underline">
          둘러보기
        </Link>
      </div>
    </div>
  );
}
