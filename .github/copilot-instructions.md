# MoltShell AI Agent Instructions

## Project Overview
MoltShell is a 3D avatar system that bridges local AI agents with a web-based visual interface. It consists of two independent components:
- **Frontend**: React + TypeScript + Vite + Three.js/R3F app (runs on port 5180)
- **Backend**: Express.js chat bridge server (runs on port 3001)

**Architecture Pattern**: The system uses polling (1-second intervals) instead of WebSockets. The frontend polls `/api/chat` to sync chat history and trigger speech synthesis when new agent messages arrive.

## Critical Workflows

### Development
```bash
# Frontend (from molt-shell/)
npm run dev          # Starts Vite dev server on port 5180

# Backend (from server/)
node server.js       # Starts Express server on port 3001
```

**Important**: These are separate processes. The frontend connects to the backend via configurable `API_URL` (query param `?api=` or defaults to `http://localhost:3001/api/chat`).

### Deployment Context
- Frontend deploys to Netlify (static hosting)
- Backend runs locally and is exposed via ngrok tunnel
- Users connect with: `https://molt-shell.netlify.app/?api=<ngrok-url>/api/chat`

## Component Architecture

### Key Files
- [src/App.tsx](src/App.tsx): Main orchestrator—manages polling, speech synthesis, and Three.js Canvas
- [src/components/Avatar.tsx](src/components/Avatar.tsx): R3F animated 3D avatar with speaking states
- [src/components/ChatOverlay.tsx](src/components/ChatOverlay.tsx): Terminal-styled chat UI overlay
- [server/server.js](server/server.js): Express REST API with file-based persistence ([server/history.json](server/history.json))

### Data Flow
1. User types in ChatOverlay → POST to `/api/chat` with `{sender: 'user', text: '...'}`
2. Frontend polls GET `/api/chat` every 1 second
3. On new agent message (timestamp check), triggers browser speech synthesis
4. Avatar reacts to `isSpeaking` state with animation

## Project-Specific Patterns

### Message Handling ([src/App.tsx](src/App.tsx#L36-L51))
```typescript
// Use timestamp tracking to avoid re-speaking old messages
const lastProcessedTimeRef = useRef<number>(0)

// Only speak messages within 10s window to prevent speech on page load
if (Date.now() - lastMsg.timestamp < 10000) { 
    speak(lastMsg.text)
}
```

### Avatar Animation ([src/components/Avatar.tsx](src/components/Avatar.tsx#L8-L21))
Uses `useFrame` hook from R3F for continuous animations:
- **Idle**: Sine wave floating on Y-axis
- **Speaking**: High-frequency scale jitter (20Hz) + color/emissive change

### Backend Persistence ([server/server.js](server/server.js#L17-L22))
- History stored in `history.json` (max 50 messages, FIFO)
- CORS enabled for `origin: '*'` to support hosted frontend + local backend
- No authentication—designed for local development tunnels

## Important Conventions

1. **Port Configuration**: Frontend uses `port: 5180` (strict mode in [vite.config.ts](vite.config.ts)) to avoid conflicts
2. **Type Safety**: `Message` type exported from [ChatOverlay.tsx](src/components/ChatOverlay.tsx#L3-L6) and imported by App
3. **Speech Synthesis**: Prefers "Google US English" voice, falls back to any English voice
4. **Styling**: Terminal aesthetic with monospace fonts, green/black color scheme for agent messages

## Common Tasks

### Adding New Avatar Features
Edit [Avatar.tsx](src/components/Avatar.tsx). Use R3F `<mesh>` components with `drei` helpers. Animation logic lives in `useFrame` callback.

### Modifying Chat API
Backend in [server.js](server/server.js) has three endpoints:
- `GET /api/chat` - Retrieve history
- `POST /api/chat` - Add message
- `POST /api/reset` - Clear history

### Changing Polling Behavior
See [App.tsx](src/App.tsx#L29-L58) `useEffect`. Adjust interval time or add WebSocket support here.

## Known Issues
- Current TypeScript error: Missing `vite/client` types definition (non-blocking for development)
- Speech synthesis may not work on some mobile browsers (Web Speech API limitation)
- History.json grows unbounded if server runs for extended periods (50 message cap helps but doesn't prevent file bloat from frequent writes)
