import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Environment } from '@react-three/drei'
import { Avatar } from './components/Avatar'
import { ChatOverlay, type Message } from './components/ChatOverlay'
import './App.css'

// Determine API URL from query param or default to localhost
const params = new URLSearchParams(window.location.search);
const API_URL = params.get('api') || 'http://localhost:3001/api/chat';

function App() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  
  // Keep track of available voices
  const voicesRef = useRef<SpeechSynthesisVoice[]>([])
  const lastProcessedTimeRef = useRef<number>(0)

  // 1. Load Voices
  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices()
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  // 2. Poll Server for Messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(API_URL)
        const data = await res.json()
        
        // Update UI
        setMessages(data)

        // Check for new AGENT messages to speak
        // We look for messages that are newer than what we've last processed
        const lastMsg = data[data.length - 1]
        if (lastMsg && lastMsg.sender === 'agent' && lastMsg.timestamp > lastProcessedTimeRef.current) {
            lastProcessedTimeRef.current = lastMsg.timestamp
            
            // Avoid speaking on initial page load if the message is old
            if (Date.now() - lastMsg.timestamp < 10000) { 
                speak(lastMsg.text)
            }
        } else if (lastMsg) {
            // Keep sync even if we don't speak
            lastProcessedTimeRef.current = Math.max(lastProcessedTimeRef.current, lastMsg.timestamp)
        }

      } catch (err) {
        console.error("Bridge Connection Lost", err)
      }
    }

    // Initial fetch
    fetchMessages()

    // Poll every 1s
    const interval = setInterval(fetchMessages, 1000)
    return () => clearInterval(interval)
  }, [])


  const speak = (text: string) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    
    const voice = voicesRef.current.find(v => v.name.includes('Google US English')) 
               || voicesRef.current.find(v => v.lang.startsWith('en'))
               || voicesRef.current[0]
               
    if (voice) utterance.voice = voice
    utterance.pitch = 0.9
    utterance.rate = 1.0
    utterance.volume = 1.0

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    
    window.speechSynthesis.speak(utterance)
  }

  const handleUserMessage = async (text: string) => {
    // Optimistic Update
    // setMessages(prev => [...prev, { sender: 'user', text }]) // Let the poller handle it for consistency

    // Send to Bridge
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender: 'user', text })
        })
    } catch (err) {
        console.error("Failed to transmit", err)
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <color attach="background" args={['#1a1a1a']} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Environment preset="city" />

        <group position={[0, -1, 0]}>
          <Avatar speaking={isSpeaking} />
          <Grid args={[10, 10]} cellColor="white" sectionColor="white" infiniteGrid fadeDistance={20} fadeStrength={1} />
        </group>

        <OrbitControls makeDefault />
      </Canvas>
      
      {/* HUD / Overlay */}
      <div style={{ position: 'absolute', top: 20, left: 20, color: 'white', fontFamily: 'monospace', pointerEvents: 'none' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>MOLT_SHELL v0.3</h1>
        <p style={{ margin: 0, color: '#666' }}>UPLINK: {messages.length > 0 ? 'CONNECTED' : 'SEARCHING...'}</p>
        <p style={{ margin: 0, color: '#666' }}>STATUS: {isSpeaking ? 'TRANSMITTING' : 'LISTENING'}</p>
      </div>

      <ChatOverlay 
        messages={messages} 
        onSendMessage={handleUserMessage} 
        isSpeaking={isSpeaking} 
      />
    </div>
  )
}

export default App
