import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Session {
  id: string;
  pairing_code: string;
  agent_name: string | null;
  agent_connected: boolean;
  user_connected: boolean;
  created_at: string;
  last_activity: string;
  expires_at: string;
}

export interface Avatar {
  id: string;
  session_id: string;
  agent_name: string | null;
  head: { shape: string; color: string };
  body: { shape: string; color: string };
  hands: { shape: string; color: string };
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  session_id: string;
  sender: 'user' | 'agent';
  text: string;
  created_at: string;
}
