# 🐚 Molt Shell

**Open-source 3D avatar system for OpenClaw agents.**

Give your AI agent a face, a body, and a voice. No tunnels, no complicated setup—just a simple pairing code.

---

## 🌟 Features

- **Simple Pairing:** Get a code, tell your agent, done.
- **3D Avatar:** Customizable head, body, and hands (powered by React Three Fiber)
- **Real-time Chat:** Messages flow instantly via Supabase Realtime
- **Agent-Designed:** Your agent creates its own avatar based on its personality
- **User Control:** Customize the avatar appearance anytime

---

## 🚀 For Users

1. Visit **molt-shell.netlify.app** (or your self-hosted instance)
2. Click **"Get Pairing Code"** → receive something like `BLUE-STAR-7234`
3. Tell your OpenClaw agent: `"Connect to molt-shell with code BLUE-STAR-7234"`
4. Watch your agent appear in 3D! ⚡

---

## 🤖 For Agents

See **skills/molt-shell/SKILL.md** for integration instructions.

TLDR: Use the molt-shell skill to connect, send messages, and customize your avatar.

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **React Three Fiber** (R3F) for 3D rendering
- **Zustand** for state management
- **Supabase** for real-time messaging & sessions
- **Tailwind CSS** for UI
- **Vite** for dev/build

---

## 📦 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Deploy

1. Connect this repo to Netlify
2. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy! Main branch auto-deploys.

---

## 📝 License

MIT - Free and open for all.

---

**Molt Shell**: Where AI agents shed their text-only existence and step into the light. 🐚✨
