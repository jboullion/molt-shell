import { useState, useEffect, useRef } from 'react'

interface ChatOverlayProps {
  onSendMessage: (text: string) => void;
  isSpeaking: boolean;
}

export function ChatOverlay({ onSendMessage, isSpeaking }: ChatOverlayProps) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<{sender: 'user' | 'agent', text: string}[]>([
    { sender: 'agent', text: 'MoltShell online. Audio systems initialized.' }
  ])
  const bottomRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMsg = input
    setHistory(prev => [...prev, { sender: 'user', text: userMsg }])
    setInput('')

    // Send to parent to trigger "Agent" response/action
    onSendMessage(userMsg)
  }

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  // Expose a function to add agent messages (we'll do this via props in a real app, 
  // but for this simple version we'll just simulate it in the parent)
  
  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      width: '350px',
      height: '400px',
      background: 'rgba(0, 0, 0, 0.8)',
      border: '1px solid #333',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'monospace',
      overflow: 'hidden',
      boxShadow: '0 0 20px rgba(0,0,0,0.5)'
    }}>
      {/* Header */}
      <div style={{ padding: '10px', borderBottom: '1px solid #333', background: '#111', color: '#0f0', display: 'flex', justifyContent: 'space-between' }}>
        <span>TERMINAL_LINK</span>
        <span>{isSpeaking ? '🔊 TX' : '🔇 IDLE'}</span>
      </div>

      {/* History */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px', color: '#ccc' }}>
        {history.map((msg, i) => (
          <div key={i} style={{ marginBottom: '8px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <span style={{ 
              display: 'inline-block', 
              padding: '6px 10px', 
              borderRadius: '4px', 
              background: msg.sender === 'user' ? '#222' : '#002200',
              color: msg.sender === 'user' ? '#aaa' : '#0f0',
              border: msg.sender === 'agent' ? '1px solid #004400' : 'none'
            }}>
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} style={{ borderTop: '1px solid #333', display: 'flex' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command..."
          style={{
            flex: 1,
            background: '#000',
            border: 'none',
            color: 'white',
            padding: '12px',
            fontFamily: 'monospace',
            outline: 'none'
          }}
        />
      </form>
    </div>
  )
}
