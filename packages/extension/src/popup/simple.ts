// Simple popup entry point
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('popup-root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; width: 300px;">
        <h1 style="color: #4A90E2; margin: 0 0 10px 0;">SelfOS</h1>
        <p style="margin: 0 0 15px 0; color: #666;">Extension loaded successfully!</p>
        <button style="background: #4A90E2; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
          Test Button
        </button>
      </div>
    `;
    
    const button = root.querySelector('button');
    if (button) {
      button.addEventListener('click', () => {
        alert('SelfOS extension is working!');
      });
    }
  }
});