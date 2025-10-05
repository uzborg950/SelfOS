// Core application types for SelfOS extension

export interface MicroTrainingResponse {
  id: string;
  timestamp: string;
  question: string;
  response: string | string[];
  context: AIContext;
  metadata: ResponseMetadata;
}

export interface AIContext {
  aiPlatform: SupportedAIPlatform;
  taskType: string;
  url: string;
  sessionId: string;
}

export interface ResponseMetadata {
  responseTime: number;
  confidence: number;
  tags: string[];
}

export type SupportedAIPlatform = 
  | 'chatgpt' 
  | 'claude' 
  | 'gemini' 
  | 'github-copilot' 
  | 'notion-ai';

export interface MicroTrainingQuestion {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  category: string;
  context?: string;
}

export type QuestionType = 
  | 'preference' 
  | 'tone' 
  | 'focus' 
  | 'domain-specific' 
  | 'multiple-choice' 
  | 'text-input';

export interface UserPreferences {
  frequency: 'high' | 'medium' | 'low';
  categories: string[];
  aiPlatforms: SupportedAIPlatform[];
  skipThreshold: number;
}

export interface SyncStatus {
  lastSync: string;
  pending: number;
  status: 'synced' | 'pending' | 'error' | 'offline';
  error?: string;
}

// Chrome extension specific types
export interface ExtensionMessage {
  type: MessageType;
  payload?: unknown;
}

export type MessageType = 
  | 'AI_PROCESSING_DETECTED'
  | 'AI_PROCESSING_COMPLETE'
  | 'MICRO_TRAINING_COMPLETE'
  | 'SYNC_STATUS_UPDATE'
  | 'USER_PREFERENCES_UPDATE';

// Store types
export interface AppState {
  isActive: boolean;
  currentPlatform: SupportedAIPlatform | null;
  showOverlay: boolean;
  currentQuestion: MicroTrainingQuestion | null;
  responses: MicroTrainingResponse[];
  syncStatus: SyncStatus;
  userPreferences: UserPreferences;
}