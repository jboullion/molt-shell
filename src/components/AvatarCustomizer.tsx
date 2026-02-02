import { useState } from 'react';
import { useSessionStore } from '../stores/useSessionStore';

const SHAPES = ['sphere', 'cube', 'cylinder'];
const PRESET_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DFE6E9', '#74B9FF', '#A29BFE', '#FD79A8', '#FDCB6E'
];

export function AvatarCustomizer() {
  const { avatar, updateAvatar } = useSessionStore();
  const [isOpen, setIsOpen] = useState(false);

  if (!avatar) return null;

  const handleUpdate = (part: 'head' | 'body' | 'hands', key: 'shape' | 'color', value: string) => {
    updateAvatar({
      [part]: { ...avatar[part], [key]: value }
    });
  };

  return (
    <div className="absolute top-4 right-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-molt-700 hover:bg-molt-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
      >
        {isOpen ? 'Close' : 'Customize Avatar'}
      </button>

      {isOpen && (
        <div className="mt-2 bg-molt-800/95 backdrop-blur-lg border border-molt-600/30 rounded-xl p-6 w-80">
          <h3 className="text-lg font-bold text-white mb-4">Customize Avatar</h3>

          {/* Head */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-molt-300 mb-2">Head</label>
            <div className="flex gap-2 mb-2">
              {SHAPES.map((shape) => (
                <button
                  key={shape}
                  onClick={() => handleUpdate('head', 'shape', shape)}
                  className={`px-3 py-1 rounded-lg capitalize ${
                    avatar.head.shape === shape
                      ? 'bg-molt-500 text-white'
                      : 'bg-molt-700 text-molt-300 hover:bg-molt-600'
                  }`}
                >
                  {shape}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => handleUpdate('head', 'color', color)}
                  className={`w-10 h-10 rounded-lg border-2 ${
                    avatar.head.color === color ? 'border-white' : 'border-molt-600'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-molt-300 mb-2">Body</label>
            <div className="flex gap-2 mb-2">
              {SHAPES.map((shape) => (
                <button
                  key={shape}
                  onClick={() => handleUpdate('body', 'shape', shape)}
                  className={`px-3 py-1 rounded-lg capitalize ${
                    avatar.body.shape === shape
                      ? 'bg-molt-500 text-white'
                      : 'bg-molt-700 text-molt-300 hover:bg-molt-600'
                  }`}
                >
                  {shape}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => handleUpdate('body', 'color', color)}
                  className={`w-10 h-10 rounded-lg border-2 ${
                    avatar.body.color === color ? 'border-white' : 'border-molt-600'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Hands */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-molt-300 mb-2">Hands</label>
            <div className="flex gap-2 mb-2">
              {SHAPES.map((shape) => (
                <button
                  key={shape}
                  onClick={() => handleUpdate('hands', 'shape', shape)}
                  className={`px-3 py-1 rounded-lg capitalize ${
                    avatar.hands.shape === shape
                      ? 'bg-molt-500 text-white'
                      : 'bg-molt-700 text-molt-300 hover:bg-molt-600'
                  }`}
                >
                  {shape}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => handleUpdate('hands', 'color', color)}
                  className={`w-10 h-10 rounded-lg border-2 ${
                    avatar.hands.color === color ? 'border-white' : 'border-molt-600'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
