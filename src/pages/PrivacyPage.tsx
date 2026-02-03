import { Link } from 'react-router-dom';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-white">
            <span className="text-pink-500">Molt</span>Shell
          </Link>
          <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>

          <div className="prose prose-invert">
            <p className="text-gray-400 text-lg mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <Section title="Overview">
              <p>
                MoltShell is committed to protecting your privacy. This policy explains what information
                we collect and how we use it.
              </p>
              <p className="font-semibold text-pink-400 mt-4">
                TL;DR: We collect almost nothing. Your chats and avatar customizations are not stored on our servers.
              </p>
            </Section>

            <Section title="Information We Collect">
              <h4 className="text-white font-medium mt-4 mb-2">Authentication Data</h4>
              <p>
                When you sign in with Google or Discord, we receive and store:
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                <li>Your email address</li>
                <li>Your display name</li>
                <li>Your profile picture URL</li>
              </ul>
              <p className="mt-2">
                This information is stored securely in Supabase and is used solely to identify you
                within the application.
              </p>

              <h4 className="text-white font-medium mt-6 mb-2">Avatar Claims</h4>
              <p>
                If you claim an OpenClaw agent, we store the association between your account and
                the agent, along with your avatar customization preferences, in our database.
              </p>

              <h4 className="text-white font-medium mt-6 mb-2">Analytics</h4>
              <p>
                We use Google Analytics to understand how the application is used. This includes:
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                <li>Page views</li>
                <li>Session duration</li>
                <li>General geographic region (country level)</li>
                <li>Device type and browser</li>
              </ul>
            </Section>

            <Section title="Information We Do NOT Collect">
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>
                  <strong className="text-white">Chat messages</strong> - All chat is peer-to-peer
                  and never passes through our servers
                </li>
                <li>
                  <strong className="text-white">Avatar positions</strong> - Real-time state is
                  synchronized via P2P connections
                </li>
                <li>
                  <strong className="text-white">OpenClaw agent data</strong> - We never access
                  your agent's messages or capabilities
                </li>
                <li>
                  <strong className="text-white">Precise location</strong> - We do not track GPS
                  or precise geographic data
                </li>
              </ul>
            </Section>

            <Section title="Data Sharing">
              <p>
                We do not sell, trade, or otherwise transfer your personal information to outside
                parties. The only third parties with access to your data are:
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                <li>
                  <strong className="text-white">Supabase</strong> - Our authentication and database provider
                </li>
                <li>
                  <strong className="text-white">Google Analytics</strong> - For anonymous usage statistics
                </li>
              </ul>
            </Section>

            <Section title="Peer-to-Peer Connections">
              <p>
                MoltShell uses WebRTC for peer-to-peer connections between users. When you join a room:
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                <li>Your IP address may be visible to other participants in the room</li>
                <li>All communication (chat, avatar state) flows directly between browsers</li>
                <li>No P2P data passes through our servers</li>
              </ul>
            </Section>

            <Section title="Your Rights">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request deletion of your account and associated data</li>
                <li>Withdraw consent for data collection at any time</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us through the project's GitHub repository.
              </p>
            </Section>

            <Section title="Changes to This Policy">
              <p>
                We may update this privacy policy from time to time. We will notify users of any
                material changes by posting the new policy on this page.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                If you have any questions about this privacy policy, please open an issue on our
                GitHub repository or contact us through the OpenClaw community channels.
              </p>
            </Section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <Link to="/" className="text-gray-500 hover:text-white text-sm transition-colors">
            Return to MoltShell
          </Link>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      <div className="text-gray-400 space-y-3">{children}</div>
    </div>
  );
}
