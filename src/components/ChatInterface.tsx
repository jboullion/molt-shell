import { useState, useEffect, useRef } from 'react';
import { useSessionStore } from '../stores/useSessionStore';

export function ChatInterface() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, session } = useSessionStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input, 'user');
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-molt-900/50 backdrop-blur-lg rounded-xl border border-molt-600/30 overflow-hidden">
      {/* Header */}
      <div className="bg-molt-800/50 border-b border-molt-600/30 p-4">
        <h2 className="text-lg font-semibold text-white">
          {session?.agent_name || 'Agent'} Chat
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-molt-400 mt-8">
            <p>No messages yet. Say hello! 👋</p>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-molt-600 text-white'
                  : 'bg-molt-800 text-molt-100'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              <p className="text-xs opacity-60 mt-1">
                {new Date(msg.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-molt-600/30 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-molt-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-molt-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-molt-600 hover:bg-molt-500 disabled:bg-molt-700 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
