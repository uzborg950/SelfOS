import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './Popup';
import '../styles/global.css';

// Initialize the popup React app
const container = document.getElementById('popup-root');
if (container) {
  const root = createRoot(container);
  root.render(<Popup />);
} else {
  console.error('SelfOS: Could not find popup-root element');
}