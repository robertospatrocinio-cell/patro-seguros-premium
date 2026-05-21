import { useEffect } from 'react';

export function ServiceWorkerCheck() {
  useEffect(() => {
    // Check if we already did the cleanup in this session
    if (sessionStorage.getItem('cleanup_done')) return;

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }
    
    if ('caches' in window) {
      caches.keys().then((names) => {
        for (const name of names) {
          caches.delete(name);
        }
      });
    }

    sessionStorage.setItem('cleanup_done', 'true');
  }, []);

  return null;
}
