import { useState, useEffect } from 'react';
import { useSessionStore } from './stores/useSessionStore';
import PairingFlow from './components/PairingFlow';
import Avatar3D from './components/Avatar3D';
import ChatInterface from './components/ChatInterface';
import AvatarCustomizer from './components/AvatarCustomizer';

function App() {
  const { session, avatar } = useSessionStore();
  const [showCustomizer, setShowCustomizer] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {!session ? (
        <PairingFlow />
      ) : (
        <div className="relative h-screen overflow-hidden">
          {/* 3D Avatar */}
          <div className="absolute inset-0 z-0">
            <Avatar3D avatar={avatar} />
          </div>

          {/* UI Overlays */}
          <div className="relative z-10 flex flex-col h-full pointer-events-none">
            {/* Top Bar */}
            <div className="p-4 flex justify-between items-center pointer-events-auto">
              <div className="bg-black/30 backdrop-blur-md rounded-lg px-4 py-2 text-white">
                <span className="text-sm opacity-70">Connected:</span>
                <span className="ml-2 font-bold">{session.pairing_code}</span>
              </div>
              <button
                onClick={() => setShowCustomizer(!showCustomizer)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
              >
                {showCustomizer ? 'Close' : 'Customize Avatar'}
              </button>
            </div>

            {/* Customizer Panel */}
            {showCustomizer && (
              <div className="pointer-events-auto">
                <AvatarCustomizer />
              </div>
            )}

            {/* Chat Interface - Bottom */}
            <div className="mt-auto pointer-events-auto">
              <ChatInterface />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
