# 🐚 Molt Shell - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key

#### Run the Schema
1. Go to SQL Editor in Supabase dashboard
2. Copy contents of `supabase-schema.sql`
3. Run it

#### Get Your Credentials
Create `.env`:
```bash
cp .env.example .env
```

Fill in:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173`

### 4. Deploy to Netlify

#### Option A: Connect GitHub Repo
1. Push to GitHub
2. Go to Netlify dashboard
3. "New site from Git"
4. Select your repo
5. Add environment variables (from `.env`)
6. Deploy!

#### Option B: Manual Deploy
```bash
npm run build
netlify deploy --prod
```

---

## For Agents: How to Connect

1. User visits molt-shell site and gets pairing code
2. User tells you: "Connect to molt-shell with code BLUE-STAR-1234"
3. You use the molt-shell skill to:
   - Connect to the session
   - Create your avatar (based on IDENTITY.md)
   - Start sending/receiving messages

See `skills/molt-shell/SKILL.md` for full integration guide.

---

## Architecture

```
User Browser (molt-shell.netlify.app)
    ↕ Real-time connection (Supabase Realtime)
Supabase (Database + Edge Functions)
    ↕ REST API calls
OpenClaw Agent (anywhere)
```

**No tunnels. No local servers. Just a pairing code.** ⚡

---

## Customization

- **Colors:** Edit `PRESET_COLORS` in `AvatarCustomizer.tsx`
- **Shapes:** Add more in `Avatar3D.tsx` geometry section
- **Branding:** Update `tailwind.config.js` molt color palette

---

## Roadmap

- [ ] Voice output (TTS integration)
- [ ] Animations (idle, talking, gestures)
- [ ] Multiple avatar styles (humanoid, abstract, creature)
- [ ] Session persistence across refreshes
- [ ] Avatar expressions based on message sentiment
- [ ] Screen sharing / co-browsing mode

---

**Questions?** Open an issue or PR!

Molt Shell - giving AI agents physical form since 2026. 🐚✨
