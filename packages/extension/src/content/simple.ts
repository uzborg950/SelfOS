// Simple test content script
console.log('SelfOS Content: Script loaded on', window.location.hostname);

// Simple test overlay
if (window.location.hostname.includes('chatgpt.com')) {
  console.log('SelfOS Content: ChatGPT detected');
}