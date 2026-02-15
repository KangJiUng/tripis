'use client';

import { useEffect, useRef } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import { useUserStore } from '@/stores/user-store';

export default function Providers({ children }: { children: React.ReactNode }) {
  const { setUser, setNickname, setLoading } = useUserStore();
  const lastNicknameUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const syncNickname = async (user: User | null) => {
      if (!user) {
        lastNicknameUserIdRef.current = null;
        setNickname(null);
        return;
      }

      // Prevent duplicate nickname lookups for the same user session.
      if (lastNicknameUserIdRef.current === user.id) {
        return;
      }
      lastNicknameUserIdRef.current = user.id;

      const fallback = (user.user_metadata?.full_name as string | undefined) ?? null;
      const { data: profile } = await supabase.from('users').select('nickname').eq('id', user.id).maybeSingle();
      setNickname(profile?.nickname ?? fallback);
    };

    // 초기 세션 동기화
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      void syncNickname(data.session?.user ?? null);
      setLoading(false);
    });

    // 로그인 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      void syncNickname(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <>{children}</>;
}
