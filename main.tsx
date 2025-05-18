import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Check if service worker is supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Register the service worker with the scope set to root
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Handle PWA install prompt
let deferredPrompt: any;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Store the event so it can be triggered later
  deferredPrompt = e;
});

// Mount the application
createRoot(document.getElementById("root")!).render(<App />);
