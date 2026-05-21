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

    // Force reload if we find signs of being stuck (legacy reasons)
    const lastCleanup = localStorage.getItem('last_cleanup_v2');
    if (!lastCleanup) {
      localStorage.setItem('last_cleanup_v2', Date.now().toString());
      console.log('Forcing clean reload to unfreeze application');
      window.location.reload();
    }
  }, []);

  return null;
}
