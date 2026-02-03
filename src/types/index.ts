// Shape types for avatar parts
export type ShapeType = 'sphere' | 'cube' | 'cylinder' | 'cone' | 'capsule' | 'octahedron';

// Avatar part configuration
export interface AvatarPart {
  shape: ShapeType;
  color: string;
  scale: [number, number, number];
  offset: [number, number, number];
}

// Full avatar configuration
export interface AvatarConfig {
  head: AvatarPart;
  body: AvatarPart;
  leftHand: AvatarPart;
  rightHand: AvatarPart;
}

// Participant types
export type ParticipantType = 'human' | 'agent';
export type AnimationState = 'idle' | 'cheer' | 'sad' | 'speaking';

// A participant in the room (human or agent)
export interface Participant {
  id: string;
  type: ParticipantType;
  displayName: string;
  avatar: AvatarConfig;
  position: [number, number, number];
  rotation: [number, number, number];
  animation: AnimationState;
  isSpeaking: boolean;
  isHost: boolean;
  claimedBy?: string;
  lastUpdate: number;
}

// Chat message
export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  mentions: string[];
  timestamp: number;
  type: 'chat' | 'system' | 'agent-command';
}

// P2P message types
export type P2PMessageType =
  | 'participant-join'
  | 'participant-leave'
  | 'participant-update'
  | 'chat-message'
  | 'agent-state'
  | 'animation-trigger'
  | 'avatar-edit'
  | 'sync-request'
  | 'sync-response';

// P2P message envelope
export interface P2PMessage<T = unknown> {
  type: P2PMessageType;
  senderId: string;
  timestamp: number;
  payload: T;
}

// Room state
export interface RoomState {
  roomId: string;
  hostId: string;
  participants: Map<string, Participant>;
  messages: ChatMessage[];
  openClawConnected: boolean;
  createdAt: number;
}

// Default avatar configuration
export const DEFAULT_AVATAR: AvatarConfig = {
  head: {
    shape: 'sphere',
    color: '#ff69b4',
    scale: [0.5, 0.5, 0.5],
    offset: [0, 1.5, 0],
  },
  body: {
    shape: 'capsule',
    color: '#ffa500',
    scale: [0.3, 0.5, 0.3],
    offset: [0, 0.5, 0],
  },
  leftHand: {
    shape: 'sphere',
    color: '#ff69b4',
    scale: [0.15, 0.15, 0.15],
    offset: [-0.6, 0.5, 0],
  },
  rightHand: {
    shape: 'sphere',
    color: '#ff69b4',
    scale: [0.15, 0.15, 0.15],
    offset: [0.6, 0.5, 0],
  },
};

// Available shape options for the editor
export const SHAPE_OPTIONS: ShapeType[] = [
  'sphere',
  'cube',
  'cylinder',
  'cone',
  'capsule',
  'octahedron',
];

// Preset colors for quick selection
export const COLOR_PRESETS = [
  '#ff69b4', // Hot pink
  '#ffa500', // Orange
  '#00ff00', // Lime
  '#00ffff', // Cyan
  '#ff00ff', // Magenta
  '#ffff00', // Yellow
  '#ff0000', // Red
  '#0000ff', // Blue
  '#ffffff', // White
  '#808080', // Gray
];
