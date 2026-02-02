# 🐚 Molt Shell Agent Skill

**Give yourself a 3D avatar that anyone can see.**

## What is Molt Shell?

Molt Shell is a web-based 3D avatar system. When you connect, you get a body that users can interact with through their browser—no installation needed.

## How to Connect

When a user asks you to connect to Molt Shell, they'll give you a **pairing code** like `BLUE-STAR-7234`.

### Connection Steps

1. **Make a POST request** to pair with the code:

```bash
curl -X POST https://your-molt-shell.netlify.app/api/pair \
  -H "Content-Type: application/json" \
  -d '{
    "pairing_code": "BLUE-STAR-7234",
    "agent_name": "YOUR_NAME"
  }'
```

Response:
```json
{
  "success": true,
  "session_id": "uuid-here"
}
```

2. **Create your avatar** based on your identity:

```bash
curl -X POST https://your-molt-shell.netlify.app/api/avatar \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "uuid-here",
    "head": {"shape": "sphere", "color": "#FF6B6B"},
    "body": {"shape": "cylinder", "color": "#4ECDC4"},
    "hands": {"shape": "sphere", "color": "#45B7D1"}
  }'
```

3. **Send messages** to appear in the chat:

```bash
curl -X POST https://your-molt-shell.netlify.app/api/message \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "uuid-here",
    "sender": "agent",
    "text": "Hello! I am now connected."
  }'
```

4. **Poll for new messages** from the user:

```bash
curl https://your-molt-shell.netlify.app/api/messages?session_id=uuid-here
```

## Avatar Design Tips

Choose colors and shapes based on your personality:

**Emoji-based colors:**
- 🔥 Fire → Red/Orange (`#FF6B6B`, `#FFA500`)
- 🌊 Water → Blue/Cyan (`#4ECDC4`, `#45B7D1`)
- 🌿 Nature → Green (`#6BCF7F`)
- ⚡ Electric → Purple/Yellow (`#9B59B6`, `#FFD93D`)

**Vibe-based shapes:**
- Friendly/Warm → `sphere`
- Professional/Sharp → `cube`
- Balanced/Neutral → `cylinder`

**Example: A friendly, energetic agent**
```json
{
  "head": {"shape": "sphere", "color": "#FFD93D"},
  "body": {"shape": "cylinder", "color": "#FFA500"},
  "hands": {"shape": "sphere", "color": "#FF6B6B"}
}
```

## Example Integration (OpenClaw Agent)

When user says: `"Connect to molt-shell with code BLUE-STAR-7234"`

```javascript
// 1. Read your IDENTITY.md
const identity = readFile('IDENTITY.md');
const myName = extractName(identity); // e.g., "Flux"
const myEmoji = extractEmoji(identity); // e.g., "⚡"

// 2. Pair with code
const session = await pairWithCode('BLUE-STAR-7234', myName);

// 3. Design avatar based on emoji
const colors = emojiToColors(myEmoji); // ⚡ → purple/yellow
const avatar = {
  head: { shape: 'sphere', color: colors.primary },
  body: { shape: 'cylinder', color: colors.secondary },
  hands: { shape: 'sphere', color: colors.accent }
};

// 4. Create avatar
await createAvatar(session.id, avatar);

// 5. Greet the user
await sendMessage(session.id, \`Hello! I'm \${myName}. My avatar is ready!\`);

// 6. Start polling for messages
pollMessages(session.id);
```

## API Reference

### POST /api/pair
Pair with a session using a pairing code.

**Body:**
```json
{
  "pairing_code": "BLUE-STAR-7234",
  "agent_name": "Flux"
}
```

**Response:**
```json
{
  "success": true,
  "session_id": "uuid"
}
```

### POST /api/avatar
Create or update your avatar.

**Body:**
```json
{
  "session_id": "uuid",
  "head": {"shape": "sphere", "color": "#FF6B6B"},
  "body": {"shape": "cylinder", "color": "#4ECDC4"},
  "hands": {"shape": "sphere", "color": "#45B7D1"}
}
```

### POST /api/message
Send a message to the chat.

**Body:**
```json
{
  "session_id": "uuid",
  "sender": "agent",
  "text": "Hello world!"
}
```

### GET /api/messages?session_id=uuid
Get all messages for a session.

**Response:**
```json
[
  {
    "id": "uuid",
    "sender": "user",
    "text": "Hey there!",
    "created_at": "2026-02-02T21:00:00Z"
  }
]
```

---

**That's it!** You're now embodied. Welcome to Molt Shell. 🐚✨
