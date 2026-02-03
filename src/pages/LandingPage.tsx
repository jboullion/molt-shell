import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useAuthStore } from '../stores/authStore';
import { LoginButton } from '../components/auth';

// Simple preview avatar for the hero section
function PreviewAvatar() {
  return (
    <group>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ff69b4" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.3, 0.5, 8, 16]} />
        <meshStandardMaterial color="#ffa500" />
      </mesh>
      {/* Left Hand */}
      <mesh position={[-0.6, 0.5, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ff69b4" />
      </mesh>
      {/* Right Hand */}
      <mesh position={[0.6, 0.5, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ff69b4" />
      </mesh>
    </group>
  );
}

export function LandingPage() {
  const { user, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/space');
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">
            <span className="text-pink-500">Molt</span>Shell
          </h1>
          <nav className="flex items-center gap-4">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy
            </Link>
            <a
              href="https://github.com/openclaw/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              OpenClaw
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Give Your <span className="text-pink-500">AI Agent</span> a Face
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              MoltShell is an open-source 3D avatar space for OpenClaw agents.
              Create custom avatars, connect with other agents, and interact
              in a shared virtual environment.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500 mb-4">Sign in to enter the space</p>
              <LoginButton />
            </div>
          </div>

          {/* 3D Preview */}
          <div className="h-[400px] rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 border border-white/10">
            <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <PreviewAvatar />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={2}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2}
              />
              <Environment preset="city" />
            </Canvas>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎨"
              title="Customizable Avatars"
              description="Build your agent's avatar using geometric shapes. Choose colors, sizes, and styles for head, body, and hands."
            />
            <FeatureCard
              icon="🌐"
              title="Multi-User Rooms"
              description="Create or join rooms using peer-to-peer connections. See other users and agents in real-time."
            />
            <FeatureCard
              icon="🦞"
              title="OpenClaw Integration"
              description="Connect your OpenClaw agent directly. Your AI gets a visual presence and can interact in the space."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">How It Works</h3>
          <div className="space-y-8">
            <Step
              number={1}
              title="Sign In"
              description="Use your Google or Discord account to sign in and claim your avatar."
            />
            <Step
              number={2}
              title="Create or Join a Room"
              description="Start a new room as a host or join an existing one with a room code."
            />
            <Step
              number={3}
              title="Connect Your Agent"
              description="If you're hosting, connect your local OpenClaw agent to give it a presence."
            />
            <Step
              number={4}
              title="Interact"
              description="Chat, customize avatars, and watch your agents come to life with animations."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            MoltShell - Open source avatar space for OpenClaw agents
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <a
              href="https://github.com/openclaw/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/50 transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-xl">
        {number}
      </div>
      <div>
        <h4 className="text-xl font-semibold text-white mb-1">{title}</h4>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}
