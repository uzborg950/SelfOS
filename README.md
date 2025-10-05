# SelfOS

SelfOS is a personal context and identity layer designed to train AI agents incrementally through short, meaningful interactions.

## Project Structure

```
SelfOS/
├── packages/
│   ├── extension/          # Browser extension (React + TypeScript)
│   └── webapp/            # Companion web application (Next.js)
├── docs/                  # Project documentation
└── package.json          # Root workspace configuration
```

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation
```bash
# Install dependencies for all packages
npm install

# Start extension development
npm run extension:dev

# Start webapp development (coming soon)
npm run webapp:dev
```

### Available Scripts

#### Root Level
- `npm run dev` - Start extension development mode
- `npm run build:all` - Build all packages
- `npm run lint` - Lint all packages
- `npm run test` - Run tests for all packages

#### Extension Specific
- `npm run extension:dev` - Start extension in development mode
- `npm run extension:build` - Build extension for production

#### Webapp Specific
- `npm run webapp:dev` - Start webapp development server
- `npm run webapp:build` - Build webapp for production

## Architecture

### Browser Extension
- **Framework:** React 18+ with TypeScript
- **Build Tool:** Webpack 5+ with Manifest V3 support
- **Styling:** Tailwind CSS with SelfOS design system
- **State Management:** Zustand
- **Testing:** Jest + React Testing Library

### Companion Webapp
- **Framework:** Next.js 13+ with TypeScript
- **Styling:** Tailwind CSS with SelfOS design system
- **Visualization:** D3.js for knowledge graphs
- **State Management:** SWR for server state
- **Testing:** Jest + Cypress for E2E

## Contributing

1. Follow the established code style (ESLint + Prettier)
2. Write tests for new features
3. Update documentation as needed
4. Follow conventional commit messages

## License

MIT