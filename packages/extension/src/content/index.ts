// SelfOS Content Script - AI Processing Detection and Overlay System

import { MicroTrainingQuestion, SupportedAIPlatform } from '../types';

class SelfOSContentScript {
  private platform: SupportedAIPlatform | null = null;
  private isProcessing = false;
  private overlayElement: HTMLElement | null = null;
  private processingObserver: MutationObserver | null = null;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    this.detectPlatform();
    this.setupProcessingDetection();
    this.listenForMessages();
    
    console.log(`SelfOS: Initialized on ${this.platform || 'unknown'} platform`);
  }

  private detectPlatform(): void {
    const hostname = window.location.hostname;
    
    if (hostname.includes('chatgpt.com')) {
      this.platform = 'chatgpt';
    } else if (hostname.includes('claude.ai')) {
      this.platform = 'claude';
    } else if (hostname.includes('gemini.google.com')) {
      this.platform = 'gemini';
    } else if (hostname.includes('github.com')) {
      this.platform = 'github-copilot';
    } else if (hostname.includes('notion.so')) {
      this.platform = 'notion-ai';
    }
  }

  private setupProcessingDetection(): void {
    if (!this.platform) return;

    // Platform-specific detection strategies
    switch (this.platform) {
      case 'chatgpt':
        this.setupChatGPTDetection();
        break;
      case 'claude':
        this.setupClaudeDetection();
        break;
      case 'gemini':
        this.setupGeminiDetection();
        break;
      case 'github-copilot':
        this.setupGitHubDetection();
        break;
      case 'notion-ai':
        this.setupNotionDetection();
        break;
    }
  }

  private setupChatGPTDetection(): void {
    // Watch for ChatGPT's typing indicator and loading states
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    this.processingObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            
            // Look for ChatGPT's loading indicators
            if (element.querySelector('[data-testid*="loading"]') ||
                element.querySelector('.result-streaming') ||
                element.classList.contains('result-streaming')) {
              this.onAIProcessingDetected();
            }
          }
        });
      });
    });

    this.processingObserver.observe(targetNode, config);
  }

  private setupClaudeDetection(): void {
    // Claude-specific detection logic
    const config = { childList: true, subtree: true };
    
    this.processingObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            
            // Look for Claude's thinking/processing indicators
            if (element.textContent?.includes('thinking') ||
                element.querySelector('.loading') ||
                element.classList.contains('animate-pulse')) {
              this.onAIProcessingDetected();
            }
          }
        });
      });
    });

    this.processingObserver.observe(document.body, config);
  }

  private setupGeminiDetection(): void {
    // Gemini-specific detection logic
    // Similar pattern to other platforms
    console.log('SelfOS: Gemini detection setup (placeholder)');
  }

  private setupGitHubDetection(): void {
    // GitHub Copilot detection logic
    console.log('SelfOS: GitHub Copilot detection setup (placeholder)');
  }

  private setupNotionDetection(): void {
    // Notion AI detection logic
    console.log('SelfOS: Notion AI detection setup (placeholder)');
  }

  private onAIProcessingDetected(): void {
    if (this.isProcessing) return;
    
    this.isProcessing = true;
    
    // Wait for minimum threshold before showing overlay
    setTimeout(() => {
      if (this.isProcessing) {
        this.showMicroTrainingOverlay();
      }
    }, 8000); // 8 second threshold from requirements
  }

  private onAIProcessingComplete(): void {
    this.isProcessing = false;
    this.hideMicroTrainingOverlay();
  }

  private showMicroTrainingOverlay(): void {
    if (this.overlayElement) return;

    // Create overlay container
    this.overlayElement = document.createElement('div');
    this.overlayElement.id = 'selfos-overlay';
    this.overlayElement.className = 'selfos-overlay selfos-fade-in';
    
    // Create overlay content
    const content = document.createElement('div');
    content.className = 'selfos-card selfos-slide-up max-w-md mx-4';
    
    // Mock question for now
    const mockQuestion: MicroTrainingQuestion = {
      id: 'demo-1',
      text: 'How formal should AI responses be?',
      type: 'multiple-choice',
      options: ['Very formal', 'Conversational', 'Technical'],
      category: 'tone'
    };

    content.innerHTML = `
      <div class="mb-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-600">Quick training</span>
          <button id="selfos-close" class="text-gray-400 hover:text-gray-600">×</button>
        </div>
        <h3 class="font-medium text-gray-900">${mockQuestion.text}</h3>
      </div>
      
      <div class="space-y-2 mb-4">
        ${mockQuestion.options?.map((option, index) => `
          <button class="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors" 
                  data-option="${option}">
            ${option}
          </button>
        `).join('') || ''}
      </div>
      
      <div class="flex justify-between">
        <button id="selfos-skip" class="selfos-button-secondary">Skip</button>
        <div class="text-sm text-gray-500">AI is processing...</div>
      </div>
    `;

    this.overlayElement.appendChild(content);
    document.body.appendChild(this.overlayElement);

    // Add event listeners
    this.setupOverlayEventListeners();

    // Auto-hide after 20 seconds (requirement)
    setTimeout(() => {
      this.hideMicroTrainingOverlay();
    }, 20000);
  }

  private setupOverlayEventListeners(): void {
    if (!this.overlayElement) return;

    // Close button
    const closeBtn = this.overlayElement.querySelector('#selfos-close');
    closeBtn?.addEventListener('click', () => this.hideMicroTrainingOverlay());

    // Skip button
    const skipBtn = this.overlayElement.querySelector('#selfos-skip');
    skipBtn?.addEventListener('click', () => this.hideMicroTrainingOverlay());

    // Option buttons
    const optionButtons = this.overlayElement.querySelectorAll('[data-option]');
    optionButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const option = target.getAttribute('data-option');
        if (option) {
          this.handleMicroTrainingResponse(option);
        }
      });
    });

    // ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.hideMicroTrainingOverlay();
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
  }

  private hideMicroTrainingOverlay(): void {
    if (this.overlayElement) {
      this.overlayElement.remove();
      this.overlayElement = null;
    }
  }

  private handleMicroTrainingResponse(response: string): void {
    // TODO: Save response to local encrypted vault
    console.log('SelfOS: Response captured:', response);
    
    // Send to background script for processing
    chrome.runtime.sendMessage({
      type: 'MICRO_TRAINING_COMPLETE',
      payload: {
        response,
        platform: this.platform,
        timestamp: new Date().toISOString(),
        url: window.location.href
      }
    });

    this.hideMicroTrainingOverlay();
  }

  private listenForMessages(): void {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      switch (message.type) {
        case 'AI_PROCESSING_COMPLETE':
          this.onAIProcessingComplete();
          break;
        default:
          break;
      }
    });
  }
}

// Initialize content script when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SelfOSContentScript();
  });
} else {
  new SelfOSContentScript();
}

// Inject styles for overlay
const style = document.createElement('style');
style.textContent = `
  .selfos-overlay {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background: rgba(0, 0, 0, 0.3) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    z-index: 999999 !important;
    font-family: 'Inter', system-ui, sans-serif !important;
  }
  
  .selfos-card {
    background: white !important;
    border-radius: 12px !important;
    padding: 24px !important;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
    border: 1px solid #f3f4f6 !important;
  }
  
  .selfos-fade-in {
    animation: selfosfadeIn 0.2s ease-in-out !important;
  }
  
  .selfos-slide-up {
    animation: selfosSlideUp 0.3s ease-out !important;
  }
  
  @keyframes selfosSlideUp {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes selfosSlideUp {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);