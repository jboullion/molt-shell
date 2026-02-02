import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Environment } from '@react-three/drei'
import { Avatar } from './components/Avatar'
import './App.css'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <color attach="background" args={['#1a1a1a']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Environment / Reflections */}
        <Environment preset="city" />

        {/* Scene Contents */}
        <group position={[0, -1, 0]}>
          <Avatar />
          <Grid args={[10, 10]} cellColor="white" sectionColor="white" infiniteGrid fadeDistance={20} fadeStrength={1} />
        </group>

        {/* Controls */}
        <OrbitControls makeDefault />
      </Canvas>
      
      {/* UI Overlay */}
      <div style={{ position: 'absolute', top: 20, left: 20, color: 'white', fontFamily: 'monospace' }}>
        <h1>MoltShell v0.1</h1>
        <p>Status: ONLINE</p>
      </div>
    </div>
  )
}

export default App
