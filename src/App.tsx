import { useState, useEffect } from 'react';
import { PairingFlow } from './components/PairingFlow';
import { Avatar3D } from './components/Avatar3D';
import { ChatInterface } from './components/ChatInterface';
import { AvatarCustomizer } from './components/AvatarCustomizer';
import { useSessionStore } from './stores/useSessionStore';

function App() {
  const [isPaired, setIsPaired] = useState(false);
  const { session, avatar } = useSessionStore();

  useEffect(() => {
    if (session) {
      setIsPaired(true);
    }
  }, [session]);

  if (!isPaired) {
    return <PairingFlow onPaired={() => setIsPaired(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-molt-900 via-molt-800 to-molt-900 text-white">
      {/* Header */}
      <div className="bg-molt-800/30 backdrop-blur-lg border-b border-molt-600/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">🐚 Molt Shell</h1>
            <p className="text-sm text-molt-400">
              Connected: {session?.pairing_code}
            </p>
          </div>
          {avatar && (
            <div className="text-right">
              <p className="font-semibold">{avatar.agent_name || 'Agent'}</p>
              <p className="text-xs text-molt-400">
                {session?.agent_connected ? '🟢 Online' : '🟡 Waiting...'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-100px)]">
        {/* Avatar Viewer */}
        <div className="relative bg-molt-900/30 backdrop-blur-lg rounded-xl border border-molt-600/30 overflow-hidden">
          <Avatar3D avatar={avatar} />
          <AvatarCustomizer />
        </div>

        {/* Chat Interface */}
        <ChatInterface />
      </div>
    </div>
  );
}

export default App;
