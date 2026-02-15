'use client';

import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';

type UserState = {
  user: User | null;
  nickname: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setNickname: (nickname: string | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  nickname: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setNickname: (nickname) => set({ nickname }),
  setLoading: (isLoading) => set({ isLoading }),
}));
