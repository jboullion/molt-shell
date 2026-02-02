import { useState } from 'react';
import { useSessionStore } from '../stores/useSessionStore';

export function PairingFlow({ onPaired }: { onPaired: () => void }) {
  const [mode, setMode] = useState<'choose' | 'create' | 'join'>('choose');
  const [pairingCode, setPairingCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const { createSession, connectWithCode, isLoading, error } = useSessionStore();

  const handleCreate = async () => {
    const code = await createSession();
    if (code) {
      setPairingCode(code);
      setMode('create');
    }
  };

  const handleJoin = async () => {
    const success = await connectWithCode(joinCode.toUpperCase());
    if (success) {
      onPaired();
    }
  };

  if (mode === 'create' && pairingCode) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-molt-900 via-molt-800 to-molt-900 text-white p-8">
        <div className="max-w-2xl w-full bg-molt-800/50 backdrop-blur-lg rounded-2xl p-8 border border-molt-600/30">
          <h1 className="text-4xl font-bold mb-4">🐚 Your Pairing Code</h1>
          <div className="bg-molt-700/50 rounded-xl p-6 mb-6">
            <p className="text-molt-300 mb-4">Tell your OpenClaw agent:</p>
            <code className="block bg-molt-900 text-molt-100 p-4 rounded-lg font-mono text-lg">
              Connect to molt-shell with code {pairingCode}
            </code>
          </div>
          <div className="flex items-center gap-3 text-molt-400">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <p>Waiting for agent to connect...</p>
          </div>
          <p className="text-sm text-molt-500 mt-4">Code expires in 24 hours</p>
        </div>
      </div>
    );
  }

  if (mode === 'join') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-molt-900 via-molt-800 to-molt-900 text-white p-8">
        <div className="max-w-md w-full bg-molt-800/50 backdrop-blur-lg rounded-2xl p-8 border border-molt-600/30">
          <button 
            onClick={() => setMode('choose')}
            className="text-molt-400 hover:text-molt-300 mb-4 flex items-center gap-2"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold mb-6">Enter Pairing Code</h1>
          <input
            type="text"
            placeholder="BLUE-STAR-1234"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            className="w-full bg-molt-900 text-white px-4 py-3 rounded-lg mb-4 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-molt-500"
          />
          {error && <p className="text-red-400 mb-4">{error}</p>}
          <button
            onClick={handleJoin}
            disabled={isLoading || !joinCode}
            className="w-full bg-molt-600 hover:bg-molt-500 disabled:bg-molt-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {isLoading ? 'Connecting...' : 'Connect'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-molt-900 via-molt-800 to-molt-900 text-white p-8">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-molt-300 to-molt-500 bg-clip-text text-transparent">
            🐚 Molt Shell
          </h1>
          <p className="text-xl text-molt-300">Give your AI agent a 3D body</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={handleCreate}
            disabled={isLoading}
            className="bg-molt-700/50 hover:bg-molt-600/50 backdrop-blur-lg border border-molt-600/30 rounded-xl p-8 transition-all hover:scale-105 disabled:opacity-50"
          >
            <div className="text-4xl mb-4">🤖</div>
            <h2 className="text-2xl font-bold mb-2">I'm a User</h2>
            <p className="text-molt-400">Get a pairing code for my agent</p>
          </button>

          <button
            onClick={() => setMode('join')}
            className="bg-molt-700/50 hover:bg-molt-600/50 backdrop-blur-lg border border-molt-600/30 rounded-xl p-8 transition-all hover:scale-105"
          >
            <div className="text-4xl mb-4">⚡</div>
            <h2 className="text-2xl font-bold mb-2">I'm an Agent</h2>
            <p className="text-molt-400">Connect with my pairing code</p>
          </button>
        </div>

        <div className="text-sm text-molt-500">
          <p>Open source • No login required • Free forever</p>
        </div>
      </div>
    </div>
  );
}
