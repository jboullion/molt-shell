import { useSessionStore } from '../stores/useSessionStore';

const SHAPES = ['sphere', 'cube', 'cylinder'];
const COLORS = [
  { name: 'Red', value: '#FF6B6B' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Yellow', value: '#FFD93D' },
  { name: 'Green', value: '#6BCF7F' },
  { name: 'Blue', value: '#4ECDC4' },
  { name: 'Purple', value: '#9B59B6' },
  { name: 'Pink', value: '#FF69B4' },
  { name: 'White', value: '#FFFFFF' },
];

export default function AvatarCustomizer() {
  const { avatar, updateAvatar } = useSessionStore();

  if (!avatar) return null;

  const updatePart = (part: 'head' | 'body' | 'hands', key: 'shape' | 'color', value: string) => {
    updateAvatar({
      [part]: { ...avatar[part], [key]: value }
    });
  };

  return (
    <div className="bg-black/50 backdrop-blur-md rounded-lg p-6 mx-4 max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-4">Customize Avatar</h2>
      
      <div className="space-y-6">
        {/* Head */}
        <div>
          <h3 className="text-lg font-bold text-purple-300 mb-2">Head</h3>
          <div className="flex gap-4">
            <div>
              <label className="text-sm text-white/70">Shape</label>
              <div className="flex gap-2 mt-1">
                {SHAPES.map(shape => (
                  <button
                    key={shape}
                    onClick={() => updatePart('head', 'shape', shape)}
                    className={`px-3 py-1 rounded capitalize ${
                      avatar.head.shape === shape
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-700 text-white/70'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-white/70">Color</label>
              <div className="flex gap-2 mt-1">
                {COLORS.map(color => (
                  <button
                    key={color.value}
                    onClick={() => updatePart('head', 'color', color.value)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      avatar.head.color === color.value
                        ? 'border-white'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div>
          <h3 className="text-lg font-bold text-purple-300 mb-2">Body</h3>
          <div className="flex gap-4">
            <div>
              <label className="text-sm text-white/70">Shape</label>
              <div className="flex gap-2 mt-1">
                {SHAPES.map(shape => (
                  <button
                    key={shape}
                    onClick={() => updatePart('body', 'shape', shape)}
                    className={`px-3 py-1 rounded capitalize ${
                      avatar.body.shape === shape
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-700 text-white/70'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-white/70">Color</label>
              <div className="flex gap-2 mt-1">
                {COLORS.map(color => (
                  <button
                    key={color.value}
                    onClick={() => updatePart('body', 'color', color.value)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      avatar.body.color === color.value
                        ? 'border-white'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hands */}
        <div>
          <h3 className="text-lg font-bold text-purple-300 mb-2">Hands</h3>
          <div className="flex gap-4">
            <div>
              <label className="text-sm text-white/70">Shape</label>
              <div className="flex gap-2 mt-1">
                {SHAPES.map(shape => (
                  <button
                    key={shape}
                    onClick={() => updatePart('hands', 'shape', shape)}
                    className={`px-3 py-1 rounded capitalize ${
                      avatar.hands.shape === shape
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-700 text-white/70'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-white/70">Color</label>
              <div className="flex gap-2 mt-1">
                {COLORS.map(color => (
                  <button
                    key={color.value}
                    onClick={() => updatePart('hands', 'color', color.value)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      avatar.hands.color === color.value
                        ? 'border-white'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
