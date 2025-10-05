// SelfOS Background Service Worker - Chrome Extension Manifest v3

interface MessagePayload {
  response?: string;
  platform?: string;
  timestamp?: string;
  url?: string;
}

interface ExtensionMessage {
  type: string;
  payload?: MessagePayload;
}

class SelfOSBackground {
  constructor() {
    this.initialize();
  }

  private initialize(): void {
    this.setupMessageListeners();
    this.setupInstallListener();
    console.log('SelfOS: Background service worker initialized');
  }

  private setupMessageListeners(): void {
    chrome.runtime.onMessage.addListener(
      (message: ExtensionMessage, sender, sendResponse) => {
        this.handleMessage(message, sender, sendResponse);
        return true; // Keep message channel open for async response
      }
    );
  }

  private setupInstallListener(): void {
    chrome.runtime.onInstalled.addListener((details) => {
      if (details.reason === 'install') {
        this.onFirstInstall();
      } else if (details.reason === 'update') {
        this.onUpdate(details.previousVersion);
      }
    });
  }

  private onFirstInstall(): void {
    console.log('SelfOS: First installation detected');
    
    // Initialize default settings
    chrome.storage.local.set({
      userPreferences: {
        frequency: 'medium',
        categories: ['tone', 'focus'],
        aiPlatforms: ['chatgpt', 'claude'],
        skipThreshold: 10
      },
      responses: [],
      syncStatus: {
        lastSync: '',
        pending: 0,
        status: 'offline'
      }
    });

    // Open welcome page (future implementation)
    // chrome.tabs.create({ url: 'https://selfos.app/welcome' });
  }

  private onUpdate(previousVersion?: string): void {
    console.log(`SelfOS: Updated from version ${previousVersion}`);
    // Handle migration logic if needed
  }

  private async handleMessage(
    message: ExtensionMessage, 
    sender: chrome.runtime.MessageSender, 
    sendResponse: (response?: unknown) => void
  ): Promise<void> {
    try {
      switch (message.type) {
        case 'MICRO_TRAINING_COMPLETE':
          await this.handleMicroTrainingComplete(message.payload);
          sendResponse({ success: true });
          break;
          
        case 'GET_SYNC_STATUS':
          const syncStatus = await this.getSyncStatus();
          sendResponse({ syncStatus });
          break;
          
        case 'TRIGGER_SYNC':
          await this.triggerSync();
          sendResponse({ success: true });
          break;
          
        case 'GET_USER_PREFERENCES':
          const preferences = await this.getUserPreferences();
          sendResponse({ preferences });
          break;
          
        case 'UPDATE_USER_PREFERENCES':
          await this.updateUserPreferences(message.payload);
          sendResponse({ success: true });
          break;
          
        default:
          console.warn(`SelfOS: Unknown message type: ${message.type}`);
          sendResponse({ error: 'Unknown message type' });
      }
    } catch (error) {
      console.error('SelfOS: Error handling message:', error);
      sendResponse({ error: 'Internal error' });
    }
  }

  private async handleMicroTrainingComplete(payload?: MessagePayload): Promise<void> {
    if (!payload) return;

    const response = {
      id: this.generateUUID(),
      timestamp: payload.timestamp || new Date().toISOString(),
      question: 'How formal should AI responses be?', // TODO: Get from context
      response: payload.response || '',
      context: {
        aiPlatform: payload.platform || 'unknown',
        taskType: 'unknown',
        url: payload.url || '',
        sessionId: this.generateSessionId()
      },
      metadata: {
        responseTime: 0, // TODO: Calculate actual response time
        confidence: 1,
        tags: []
      }
    };

    // Save to local storage
    const result = await chrome.storage.local.get(['responses']);
    const responses = result.responses || [];
    responses.push(response);
    
    await chrome.storage.local.set({ responses });

    // Update sync status
    await this.updateSyncStatus('pending', responses.length);

    console.log('SelfOS: Micro-training response saved:', response);
  }

  private async getSyncStatus(): Promise<unknown> {
    const result = await chrome.storage.local.get(['syncStatus']);
    return result.syncStatus || {
      lastSync: '',
      pending: 0,
      status: 'offline'
    };
  }

  private async triggerSync(): Promise<void> {
    // TODO: Implement actual sync to webapp backend
    console.log('SelfOS: Sync triggered (placeholder implementation)');
    
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await this.updateSyncStatus('synced', 0);
  }

  private async getUserPreferences(): Promise<unknown> {
    const result = await chrome.storage.local.get(['userPreferences']);
    return result.userPreferences;
  }

  private async updateUserPreferences(preferences?: unknown): Promise<void> {
    if (!preferences) return;
    await chrome.storage.local.set({ userPreferences: preferences });
  }

  private async updateSyncStatus(status: string, pending: number): Promise<void> {
    const syncStatus = {
      lastSync: status === 'synced' ? new Date().toISOString() : '',
      pending,
      status
    };
    
    await chrome.storage.local.set({ syncStatus });
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Initialize background service worker
new SelfOSBackground();