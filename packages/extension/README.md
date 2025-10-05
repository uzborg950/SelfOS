# SelfOS Browser Extension

## Overview
The SelfOS browser extension detects AI processing across supported platforms and displays micro-training overlays to capture user preferences and context.

## Supported Platforms
- ChatGPT (chatgpt.com)
- Claude (claude.ai)
- Gemini (gemini.google.com)
- GitHub Copilot (github.com)
- Notion AI (notion.so)

## Development Setup

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
# From the extension directory
npm install

# Start development build with watching
npm run dev

# Build for production
npm run build
```

### Loading in Browser
1. Open Chrome/Edge and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `dist` folder

## Project Structure
```
src/
├── popup/           # Extension popup interface
├── content/         # Content scripts for AI platform detection
├── background/      # Service worker for message handling
├── components/      # Reusable React components
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── styles/         # Global styles and Tailwind config
```

## Architecture

### Content Script
- Detects AI processing on supported platforms
- Shows micro-training overlays during wait times
- Captures user responses and context

### Background Script
- Handles message passing between components
- Manages local encrypted storage
- Coordinates sync with webapp backend

### Popup Interface
- Shows sync status and progress
- Provides quick access to preferences
- Displays training statistics

## Key Features

### AI Detection
- Platform-specific DOM monitoring
- Minimum 8-second threshold before overlay
- Automatic dismissal when processing completes

### Micro-Training Overlay
- Non-blocking centered display
- Quick multiple-choice or text responses
- Keyboard navigation support
- Auto-hide after 20 seconds

### Local Storage
- AES-256-GCM encryption at rest
- Offline-first operation
- Incremental sync capability

## Testing
```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Check test coverage
npm test -- --coverage
```

## Building
```bash
# Development build
npm run dev

# Production build
npm run build

# Clean build artifacts
npm run clean
```

## Code Quality
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check
```

## Extension Permissions

### Required Permissions
- `storage` - Local encrypted data storage
- `activeTab` - Access to current tab for overlay injection
- `scripting` - Content script injection
- `background` - Service worker functionality

### Host Permissions
- ChatGPT, Claude, Gemini, GitHub, Notion domains

## Privacy & Security

### Data Handling
- All data encrypted locally with AES-256-GCM
- No data transmitted without explicit user consent
- User maintains complete control over data export/deletion

### Security Features
- Content Security Policy enforcement
- Secure communication with webapp backend
- No tracking without opt-in consent

## Contributing

### Code Style
- Follow ESLint configuration
- Use Prettier for formatting
- Write tests for new features
- Update documentation as needed

### Commit Guidelines
- Use conventional commit messages
- Include relevant issue numbers
- Keep commits focused and atomic

## Troubleshooting

### Common Issues
1. **Extension not loading**: Check manifest.json syntax
2. **Content script not working**: Verify host permissions
3. **Build failures**: Ensure Node.js version compatibility
4. **Type errors**: Run `npm run type-check` for details

### Debug Mode
Enable developer mode and check browser console for SelfOS logs.