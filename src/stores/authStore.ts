import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  initialize: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithDiscord: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  error: null,

  initialize: async () => {
    try {
      // Get the current session
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) throw error;

      set({
        session,
        user: session?.user ?? null,
        isLoading: false,
      });

      // Listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        set({
          session,
          user: session?.user ?? null,
        });
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to initialize auth',
        isLoading: false,
      });
    }
  },

  signInWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/space`,
        },
      });
      if (error) throw error;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to sign in with Google',
        isLoading: false,
      });
    }
  },

  signInWithDiscord: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: `${window.location.origin}/space`,
        },
      });
      if (error) throw error;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to sign in with Discord',
        isLoading: false,
      });
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, session: null, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to sign out',
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
