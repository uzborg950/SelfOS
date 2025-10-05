// Jest setup file for SelfOS extension tests

import '@testing-library/jest-dom';

// Mock Chrome APIs
global.chrome = {
  runtime: {
    sendMessage: jest.fn(),
    onMessage: {
      addListener: jest.fn()
    },
    onInstalled: {
      addListener: jest.fn()
    }
  },
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn(),
      clear: jest.fn()
    }
  },
  tabs: {
    create: jest.fn()
  }
} as any;

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: 'https://chatgpt.com/',
    hostname: 'chatgpt.com'
  },
  writable: true
});

// Suppress console logs in tests unless explicitly needed
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};