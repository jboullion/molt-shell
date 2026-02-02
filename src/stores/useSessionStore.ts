import { create } from 'zustand';
import { supabase, Session, Avatar, Message } from '../lib/supabase';

interface SessionStore {
  session: Session | null;
  avatar: Avatar | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;

  // Actions
  createSession: () => Promise<string | null>;
  connectWithCode: (code: string) => Promise<boolean>;
  sendMessage: (text: string, sender: 'user' | 'agent') => Promise<void>;
  updateAvatar: (updates: Partial<Avatar>) => Promise<void>;
  subscribeToSession: (sessionId: string) => void;
  unsubscribe: () => void;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  session: null,
  avatar: null,
  messages: [],
  isLoading: false,
  error: null,

  createSession: async () => {
    set({ isLoading: true, error: null });
    try {
      // Call Supabase RPC to generate pairing code
      const { data, error } = await supabase.rpc('generate_pairing_code');
      if (error) throw error;

      const pairingCode = data as string;

      // Create session
      const { data: session, error: sessionError } = await supabase
        .from('sessions')
        .insert({ pairing_code: pairingCode, user_connected: true })
        .select()
        .single();

      if (sessionError) throw sessionError;

      set({ session, isLoading: false });
      return pairingCode;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  connectWithCode: async (code: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data: session, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('pairing_code', code)
        .single();

      if (error) throw new Error('Invalid pairing code');

      // Load avatar
      const { data: avatar } = await supabase
        .from('avatars')
        .select('*')
        .eq('session_id', session.id)
        .single();

      // Load messages
      const { data: messages } = await supabase
        .from('messages')
        .select('*')
        .eq('session_id', session.id)
        .order('created_at', { ascending: true });

      set({ 
        session, 
        avatar: avatar || null, 
        messages: messages || [], 
        isLoading: false 
      });

      // Subscribe to real-time updates
      get().subscribeToSession(session.id);

      return true;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },

  sendMessage: async (text: string, sender: 'user' | 'agent') => {
    const { session } = get();
    if (!session) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({ session_id: session.id, sender, text })
        .select()
        .single();

      if (error) throw error;

      // Optimistically add to local state
      set((state) => ({ 
        messages: [...state.messages, data] 
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateAvatar: async (updates: Partial<Avatar>) => {
    const { session, avatar } = get();
    if (!session) return;

    try {
      if (avatar) {
        // Update existing
        const { data, error } = await supabase
          .from('avatars')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', avatar.id)
          .select()
          .single();

        if (error) throw error;
        set({ avatar: data });
      } else {
        // Create new
        const { data, error } = await supabase
          .from('avatars')
          .insert({ session_id: session.id, ...updates })
          .select()
          .single();

        if (error) throw error;
        set({ avatar: data });
      }
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  subscribeToSession: (sessionId: string) => {
    // Subscribe to messages
    supabase
      .channel(`session:${sessionId}`)
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `session_id=eq.${sessionId}` },
        (payload) => {
          set((state) => ({
            messages: [...state.messages, payload.new as Message]
          }));
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'avatars', filter: `session_id=eq.${sessionId}` },
        (payload) => {
          set({ avatar: payload.new as Avatar });
        }
      )
      .subscribe();
  },

  unsubscribe: () => {
    supabase.removeAllChannels();
  }
}));
