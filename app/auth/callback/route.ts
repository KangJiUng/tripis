import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const kakaoNickname = user.user_metadata?.full_name;
  if (!kakaoNickname) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const { data: existingUser } = await supabase.from('users').select('user_id').eq('user_id', user.id).maybeSingle();

  if (!existingUser) {
    await supabase.from('users').insert({
      user_id: user.id,
      kakao_id: user.user_metadata?.provider_id,
      email: user.email,
      profile_image_url: user.user_metadata?.avatar_url,
      nickname: kakaoNickname,
    });
  }

  return NextResponse.redirect(`${origin}/`);
}
