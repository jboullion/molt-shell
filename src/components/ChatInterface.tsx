import { useState, useEffect, useRef } from 'react';
import { useSessionStore } from '../stores/useSessionStore';

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useSessionStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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
    <div className="bg-black/30 backdrop-blur-md rounded-t-2xl p-4 max-h-96">
      {/* Messages */}
      <div className="overflow-y-auto max-h-64 mb-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-white'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-lg bg-black/30 text-white placeholder-white/50 border border-purple-500/30 focus:border-purple-500 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition font-bold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
