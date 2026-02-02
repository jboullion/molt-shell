import { useState } from 'react';
import { useSessionStore } from '../stores/useSessionStore';

export default function PairingFlow() {
  const [mode, setMode] = useState<'choose' | 'create' | 'join'>('choose');
  const [inputCode, setInputCode] = useState('');
  const { createSession, connectWithCode, isLoading, error } = useSessionStore();

  const handleCreate = async () => {
    const code = await createSession();
    if (code) {
      setMode('create');
    }
  };

  const handleJoin = async () => {
    const success = await connectWithCode(inputCode.toUpperCase());
    if (!success) {
      alert('Invalid pairing code. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">🐚 Molt Shell</h1>
          <p className="text-purple-200">Give your AI agent a body</p>
        </div>

        {mode === 'choose' && (
          <div className="space-y-4">
            <button
              onClick={handleCreate}
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create New Session'}
            </button>
            <button
              onClick={() => setMode('join')}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-6 rounded-lg transition"
            >
              Join Existing Session
            </button>
          </div>
        )}

        {mode === 'create' && (
          <div className="text-center space-y-6">
            <div className="bg-black/30 rounded-lg p-6">
              <p className="text-purple-200 mb-2">Your pairing code:</p>
              <p className="text-4xl font-bold text-white tracking-wider">
                {useSessionStore.getState().session?.pairing_code}
              </p>
            </div>
            <div className="bg-purple-600/20 rounded-lg p-4 text-left text-sm text-purple-100">
              <p className="font-bold mb-2">Tell your agent:</p>
              <code className="block bg-black/30 p-2 rounded">
                "Connect to molt-shell with code {useSessionStore.getState().session?.pairing_code}"
              </code>
            </div>
            <p className="text-white/70 text-sm">
              Waiting for agent to connect...
            </p>
          </div>
        )}

        {mode === 'join' && (
          <div className="space-y-4">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="BLUE-STAR-1234"
              className="w-full px-4 py-3 rounded-lg bg-black/30 text-white placeholder-white/50 border border-purple-500/30 focus:border-purple-500 focus:outline-none"
            />
            <button
              onClick={handleJoin}
              disabled={isLoading || !inputCode}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? 'Connecting...' : 'Connect'}
            </button>
            <button
              onClick={() => setMode('choose')}
              className="w-full text-purple-200 hover:text-white transition"
            >
              ← Back
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
