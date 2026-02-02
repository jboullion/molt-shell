import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Environment } from '@react-three/drei'
import { Avatar } from './components/Avatar'
import { ChatOverlay } from './components/ChatOverlay'
import './App.css'

function App() {
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Function to handle Agent speech
  const speak = (text: string) => {
    if (!window.speechSynthesis) return

    // Cancel any current speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    
    // Pick a voice (prefer something robotic if available)
    const voices = window.speechSynthesis.getVoices()
    // Try to find a good English voice
    const voice = voices.find(v => v.name.includes('Google US English')) || voices[0]
    if (voice) utterance.voice = voice

    utterance.pitch = 0.9
    utterance.rate = 1.0

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  const handleUserMessage = (text: string) => {
    // For now, just a simple echo/response logic
    // In the future, this is where we connect to the Agent backend!
    
    setTimeout(() => {
       const responses = [
         `Processing input: "${text}"`,
         "I am listening.",
         "Message received.",
         "Affirmative."
       ]
       const randomResponse = responses[Math.floor(Math.random() * responses.length)]
       
       // Note: We aren't updating the chat history UI for the agent response 
       // in this version because state is in the child. 
       // Ideally we lift state up, but for the "Voice" demo, the audio is key!
       
       speak(text) // Echoing the user's text for fun so you hear it!
    }, 500)
  }

  // Initial greeting
  useEffect(() => {
     // Small delay to allow voices to load
     setTimeout(() => {
        speak("System online. Molt Shell ready.")
     }, 1000)
  }, [])

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
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>MOLT_SHELL v0.2</h1>
        <p style={{ margin: 0, color: '#666' }}>STATUS: {isSpeaking ? 'TRANSMITTING' : 'LISTENING'}</p>
      </div>

      <ChatOverlay onSendMessage={handleUserMessage} isSpeaking={isSpeaking} />
    </div>
  )
}

export default App
