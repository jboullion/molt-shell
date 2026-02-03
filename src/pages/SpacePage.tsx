import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { UserMenu } from '../components/auth';
import { DEFAULT_AVATAR } from '../types';

// Temporary avatar component - will be replaced with Avatar3D
function Avatar({ config = DEFAULT_AVATAR, position = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position}>
      {/* Head */}
      <mesh position={config.head.offset}>
        <sphereGeometry args={[config.head.scale[0], 32, 32]} />
        <meshStandardMaterial color={config.head.color} />
      </mesh>
      {/* Body */}
      <mesh position={config.body.offset}>
        <capsuleGeometry args={[config.body.scale[0], config.body.scale[1], 8, 16]} />
        <meshStandardMaterial color={config.body.color} />
      </mesh>
      {/* Left Hand */}
      <mesh position={config.leftHand.offset}>
        <sphereGeometry args={[config.leftHand.scale[0], 16, 16]} />
        <meshStandardMaterial color={config.leftHand.color} />
      </mesh>
      {/* Right Hand */}
      <mesh position={config.rightHand.offset}>
        <sphereGeometry args={[config.rightHand.scale[0], 16, 16]} />
        <meshStandardMaterial color={config.rightHand.color} />
      </mesh>
    </group>
  );
}

export function SpacePage() {
  return (
    <div className="h-screen flex flex-col bg-[#0a0a0f]">
      {/* Header */}
      <header className="h-14 px-4 flex items-center justify-between border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-sm z-10">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-bold text-white">
            <span className="text-pink-500">Molt</span>Shell
          </Link>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400 text-sm">No Room</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Room controls placeholder */}
          <button className="px-4 py-1.5 bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium rounded-lg transition-colors">
            Create Room
          </button>
          <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors">
            Join Room
          </button>
          <UserMenu />
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* 3D Canvas */}
        <div className="flex-1 relative">
          <Canvas camera={{ position: [0, 3, 6], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
              castShadow
            />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />

            {/* Your avatar */}
            <Avatar />

            {/* Ground grid */}
            <Grid
              args={[20, 20]}
              cellSize={0.5}
              cellThickness={0.5}
              cellColor="#1a1a2e"
              sectionSize={2}
              sectionThickness={1}
              sectionColor="#2a2a4e"
              fadeDistance={30}
              fadeStrength={1}
              followCamera={false}
              infiniteGrid
            />

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              minDistance={3}
              maxDistance={20}
              minPolarAngle={0.1}
              maxPolarAngle={Math.PI / 2 - 0.1}
            />
            <Environment preset="city" />
          </Canvas>

          {/* Status overlay */}
          <div className="absolute bottom-4 left-4 text-xs text-gray-500">
            <p>WASD to move (coming soon) | Scroll to zoom | Drag to rotate</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-72 border-l border-white/10 bg-[#0a0a0f] flex flex-col">
          {/* Participants section */}
          <div className="p-4 border-b border-white/10">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Participants</h3>
            <div className="space-y-2">
              <ParticipantCard name="You" type="human" isYou />
            </div>
            <p className="text-xs text-gray-600 mt-3">
              Create or join a room to see others
            </p>
          </div>

          {/* Avatar editor placeholder */}
          <div className="flex-1 p-4 overflow-auto">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Avatar Editor</h3>
            <p className="text-xs text-gray-500">
              Click on a body part in the 3D view to edit it, or use the controls below.
            </p>
            <div className="mt-4 space-y-4">
              <EditorSection title="Head" color={DEFAULT_AVATAR.head.color} shape={DEFAULT_AVATAR.head.shape} />
              <EditorSection title="Body" color={DEFAULT_AVATAR.body.color} shape={DEFAULT_AVATAR.body.shape} />
              <EditorSection title="Hands" color={DEFAULT_AVATAR.leftHand.color} shape={DEFAULT_AVATAR.leftHand.shape} />
            </div>
          </div>
        </div>
      </div>

      {/* Chat panel placeholder */}
      <div className="h-48 border-t border-white/10 bg-[#0a0a0f] flex flex-col">
        <div className="flex-1 p-4 overflow-auto">
          <p className="text-gray-500 text-sm">Chat messages will appear here...</p>
        </div>
        <div className="p-4 pt-0">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message... (use @ to mention)"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
            />
            <button className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ParticipantCard({ name, type, isYou = false }: { name: string; type: 'human' | 'agent'; isYou?: boolean }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
      <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-sm font-medium">
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white truncate">
          {name} {isYou && <span className="text-gray-500">(you)</span>}
        </p>
        <p className="text-xs text-gray-500 capitalize">{type}</p>
      </div>
    </div>
  );
}

function EditorSection({ title, color, shape }: { title: string; color: string; shape: string }) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-medium text-gray-300">{title}</h4>
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded border border-white/20"
          style={{ backgroundColor: color }}
        />
        <span className="text-xs text-gray-400 capitalize">{shape}</span>
        <button className="ml-auto text-xs text-pink-400 hover:text-pink-300">Edit</button>
      </div>
    </div>
  );
}
