-- Molt Shell Database Schema

-- Sessions table: Stores pairing codes and connection info
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pairing_code TEXT UNIQUE NOT NULL,
  agent_name TEXT,
  agent_connected BOOLEAN DEFAULT false,
  user_connected BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_activity TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ DEFAULT (now() + interval '24 hours')
);

CREATE INDEX idx_sessions_pairing_code ON sessions(pairing_code);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);

-- Avatars table: Stores avatar customization
CREATE TABLE IF NOT EXISTS avatars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  agent_name TEXT,
  head JSONB DEFAULT '{"shape": "sphere", "color": "#FF6B6B"}'::jsonb,
  body JSONB DEFAULT '{"shape": "cylinder", "color": "#4ECDC4"}'::jsonb,
  hands JSONB DEFAULT '{"shape": "sphere", "color": "#45B7D1"}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_avatars_session_id ON avatars(session_id);

-- Messages table: Stores chat history
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  sender TEXT NOT NULL, -- 'user' or 'agent'
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_messages_session_id ON messages(session_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- Enable Row Level Security
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE avatars ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Public read/write policies (for now - can tighten later)
CREATE POLICY "Public can read sessions" ON sessions FOR SELECT USING (true);
CREATE POLICY "Public can insert sessions" ON sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update sessions" ON sessions FOR UPDATE USING (true);

CREATE POLICY "Public can read avatars" ON avatars FOR SELECT USING (true);
CREATE POLICY "Public can insert avatars" ON avatars FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update avatars" ON avatars FOR UPDATE USING (true);

CREATE POLICY "Public can read messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Public can insert messages" ON messages FOR INSERT WITH CHECK (true);

-- Function to generate pairing codes
CREATE OR REPLACE FUNCTION generate_pairing_code()
RETURNS TEXT AS $$
DECLARE
  adjectives TEXT[] := ARRAY['BLUE', 'RED', 'GREEN', 'GOLD', 'SILVER', 'COSMIC', 'STELLAR', 'QUANTUM', 'NEON', 'CRYSTAL'];
  nouns TEXT[] := ARRAY['STAR', 'MOON', 'SUN', 'COMET', 'NOVA', 'NEBULA', 'ORBIT', 'PULSE', 'WAVE', 'FLUX'];
  code TEXT;
BEGIN
  code := adjectives[1 + floor(random() * array_length(adjectives, 1))::int] || '-' ||
          nouns[1 + floor(random() * array_length(nouns, 1))::int] || '-' ||
          floor(1000 + random() * 9000)::text;
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM sessions WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a scheduled job to clean up expired sessions
-- (Requires pg_cron extension)
-- SELECT cron.schedule('cleanup-sessions', '0 * * * *', 'SELECT cleanup_expired_sessions()');
