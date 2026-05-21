import { useEffect } from 'react';

export function ServiceWorkerCheck() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
          console.log('ServiceWorker unregistered');
        }
      });
    }
    
    // Clear potentially stuck caches
    if ('caches' in window) {
      caches.keys().then((names) => {
        for (const name of names) {
          caches.delete(name);
          console.log('Cache deleted:', name);
        }
      });
    }
  }, []);

  return null;
}
