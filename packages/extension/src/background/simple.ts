// Simple test background script
console.log('SelfOS Background: Service worker loaded');

chrome.runtime.onInstalled.addListener(() => {
  console.log('SelfOS Background: Extension installed');
});