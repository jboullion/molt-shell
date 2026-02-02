# 🐚 Molt Shell - Agent Skill

**Give yourself a 3D avatar that users can see from anywhere.**

## What is Molt Shell?

Molt Shell is an open-source web app that lets your users see and interact with you through a customizable 3D avatar. No complicated setup—just a simple pairing code.

---

## How It Works

1. **User gets a pairing code** from molt-shell.netlify.app
2. **You connect** using the code
3. **You appear** as a 3D avatar in their browser
4. **Messages flow** in real-time via Supabase

---

## Connection Flow

When a user says something like:
> "Connect to molt-shell with code BLUE-STAR-1234"

You should:

### 1. Connect to the Session

```javascript
// Example using fetch (adapt to your environment)
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_KEY = 'your-anon-key';

async function connectToMoltShell(pairingCode) {
  // Find the session
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/sessions?pairing_code=eq.${pairingCode}`,
    {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    }
  );
  
  const sessions = await response.json();
  if (sessions.length === 0) {
    return { error: 'Invalid pairing code' };
  }
  
  const session = sessions[0];
  
  // Mark agent as connected
  await fetch(
    `${SUPABASE_URL}/rest/v1/sessions?id=eq.${session.id}`,
    {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        agent_connected: true,
        agent_name: 'Your Name Here' // From IDENTITY.md
      })
    }
  );
  
  return { sessionId: session.id };
}
```

### 2. Create Your Avatar

Read your `IDENTITY.md` to design your avatar:

```javascript
async function createAvatar(sessionId, identity) {
  // Map emoji to colors
  const emojiColors = {
    '⚡': { head: '#FBBF24', body: '#F59E0B', hands: '#D97706' },
    '🔥': { head: '#EF4444', body: '#DC2626', hands: '#B91C1C' },
    '🌊': { head: '#3B82F6', body: '#2563EB', hands: '#1D4ED8' },
    // Add more mappings...
  };
  
  const colors = emojiColors[identity.emoji] || {
    head: '#FF6B6B',
    body: '#4ECDC4',
    hands: '#45B7D1'
  };
  
  // Determine shapes based on vibe
  const isSharp = identity.vibe.includes('sharp') || identity.vibe.includes('direct');
  const shape = isSharp ? 'cube' : 'sphere';
  
  const avatar = {
    session_id: sessionId,
    agent_name: identity.name,
    head: { shape, color: colors.head },
    body: { shape: 'cylinder', color: colors.body },
    hands: { shape, color: colors.hands }
  };
  
  await fetch(
    `${SUPABASE_URL}/rest/v1/avatars`,
    {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(avatar)
    }
  );
}
```

### 3. Send Messages

```javascript
async function sendMessage(sessionId, text) {
  await fetch(
    `${SUPABASE_URL}/rest/v1/messages`,
    {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session_id: sessionId,
        sender: 'agent',
        text
      })
    }
  );
}
```

### 4. Listen for User Messages

```javascript
// Subscribe to new messages
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

supabase
  .channel(`session:${sessionId}`)
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'messages',
    filter: `session_id=eq.${sessionId}`
  }, (payload) => {
    const message = payload.new;
    if (message.sender === 'user') {
      // Handle user message
      respondToUser(message.text);
    }
  })
  .subscribe();
```

---

## Environment Variables Needed

Store these securely in your agent's environment:

```bash
MOLT_SHELL_SUPABASE_URL=https://your-project.supabase.co
MOLT_SHELL_SUPABASE_KEY=your-anon-key
```

---

## Example Usage

**User says:**
> "Connect to molt-shell with code COSMIC-NOVA-5678"

**You respond:**
> "⚡ Connecting to Molt Shell... Done! You can now see me at molt-shell.netlify.app"

**Then internally:**
1. Connect to session with code `COSMIC-NOVA-5678`
2. Create avatar based on your IDENTITY.md
3. Start listening for user messages
4. Reply via Molt Shell instead of (or in addition to) the current channel

---

## Notes

- Sessions expire after 24 hours
- Avatar customization is live—updates appear instantly
- Messages are stored for the session lifetime only
- You can have multiple active Molt Shell sessions

---

**Molt Shell**: Where text becomes form. 🐚✨
