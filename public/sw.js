// Service Worker — Route-based caching strategies for Patro Seguros
const CACHE_VERSION = 'patro-v2';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const PAGE_CACHE = `pages-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;

// Max items per cache
const MAX_PAGES = 50;
const MAX_IMAGES = 80;

// Install: pre-cache critical shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll([
        '/',
        '/fonts/inter-latin.woff2',
        '/fonts/poppins-latin.woff2',
      ])
    )
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => !k.includes(CACHE_VERSION))
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Helpers
function isNavigationRequest(request) {
  return request.mode === 'navigate' || (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));
}

function isImageRequest(request) {
  return request.destination === 'image';
}

function isStaticAsset(url) {
  return /\.(js|css|woff2?|ttf)(\?|$)/i.test(url.pathname);
}

// Route classification
function getPageType(url) {
  const path = url.pathname;
  if (path === '/' || path === '') return 'home';
  if (path === '/faq') return 'faq';
  if (/^\/(seguro|plano|consorcio|previdencia|landing)/i.test(path)) return 'seguro';
  if (/^\/(cotacao|contato|indique|depoimentos)/i.test(path)) return 'dynamic';
  return 'content'; // blog, sobre, parceiros, etc.
}

// Strategies
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => cached);
  return cached || fetchPromise;
}

async function cacheFirst(request, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) {
    const dateHeader = cached.headers.get('sw-date');
    if (dateHeader && (Date.now() - parseInt(dateHeader)) < maxAge) {
      return cached;
    }
  }
  try {
    const response = await fetch(request);
    if (response.ok) {
      const headers = new Headers(response.headers);
      headers.set('sw-date', Date.now().toString());
      const clone = new Response(await response.clone().blob(), { status: response.status, statusText: response.statusText, headers });
      cache.put(request, clone);
    }
    return response;
  } catch (e) {
    return cached || new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (e) {
    const cached = await cache.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

// Main fetch handler
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET, external origins, and analytics
  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  // Static assets: cache-first, long TTL (1 week)
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE, 7 * 24 * 60 * 60 * 1000));
    return;
  }

  // Images: cache-first, 3 days
  if (isImageRequest(request)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE, 3 * 24 * 60 * 60 * 1000));
    return;
  }

  // Navigation (HTML pages)
  if (isNavigationRequest(request)) {
    const pageType = getPageType(url);

    switch (pageType) {
      case 'home':
        // Home: stale-while-revalidate (fast repeat, always fresh eventually)
        event.respondWith(staleWhileRevalidate(request, PAGE_CACHE));
        break;
      case 'seguro':
        // Seguros: cache-first 24h (content changes rarely)
        event.respondWith(cacheFirst(request, PAGE_CACHE, 24 * 60 * 60 * 1000));
        break;
      case 'faq':
        // FAQ: network-first (may update frequently, but has fallback)
        event.respondWith(networkFirst(request, PAGE_CACHE));
        break;
      case 'dynamic':
        // Cotação/Contato: always network
        event.respondWith(networkFirst(request, PAGE_CACHE));
        break;
      default:
        // Blog, Sobre, etc: stale-while-revalidate
        event.respondWith(staleWhileRevalidate(request, PAGE_CACHE));
        break;
    }
    return;
  }
});