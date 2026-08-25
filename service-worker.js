const CACHE_NAME = 'health-assistant-v13';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/logo-32.png',
  '/assets/logo-180.png',
  '/assets/logo-192.png',
  '/assets/logo-512.png',
  '/css/app.css',
  '/js/subpage.js',
  '/js/sheet.js',
  '/js/dialog.js',
  '/js/food-subpage.js',
  '/js/record-subpage.js',
  '/js/ledger-subpage.js',
  '/js/healthConnectSync.js',
  '/js/recipe.js',
  '/js/ai.js',
  '/js/couple.js',
  '/js/sync.js'
];

const OPTIONAL_STATIC_ASSETS = [
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'
];

const STATIC_DESTINATIONS = new Set([
  'style',
  'script',
  'image',
  'font'
]);

function isBlockedRequest(request, url) {
  if (request.method !== 'GET') return true;

  const hostname = url.hostname.toLowerCase();
  const pathname = url.pathname.toLowerCase();

  if (
    hostname === 'dashscope.aliyuncs.com' ||
    hostname.endsWith('.supabase.co') ||
    hostname.endsWith('.workers.dev')
  ) {
    return true;
  }

  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/functions/') ||
    pathname.startsWith('/cdn-cgi/') ||
    pathname.startsWith('/rest/v1/') ||
    pathname.startsWith('/auth/v1/') ||
    pathname.startsWith('/graphql/v1/') ||
    pathname.startsWith('/storage/v1/') ||
    pathname.startsWith('/functions/v1/') ||
    pathname.includes('/health_sync')
  ) {
    return true;
  }

  return request.headers.has('authorization') || request.headers.has('apikey');
}

function isCacheableStaticRequest(request, url) {
  const isSameOrigin = url.origin === self.location.origin;
  const isAppShell =
    isSameOrigin &&
    request.mode === 'navigate' &&
    (url.pathname === '/' || url.pathname === '/index.html');

  const isSameOriginStatic =
    isSameOrigin && STATIC_DESTINATIONS.has(request.destination);

  const isAllowedCdnStatic =
    url.hostname === 'cdn.jsdelivr.net' &&
    (request.destination === 'script' || request.destination === 'style');

  return isAppShell || isSameOriginStatic || isAllowedCdnStatic;
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(STATIC_ASSETS);
      await Promise.allSettled(
        OPTIONAL_STATIC_ASSETS.map((asset) => cache.add(asset))
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter(
            (cacheName) =>
              cacheName.startsWith('health-assistant-') &&
              cacheName !== CACHE_NAME
          )
          .map((cacheName) => caches.delete(cacheName))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (isBlockedRequest(request, url)) return;
  if (!isCacheableStaticRequest(request, url)) return;

  const isNavigation = request.mode === 'navigate';

  if (isNavigation) {
    // Network-first for HTML pages: always fetch latest when online
    event.respondWith(
      fetch(request).then((networkResponse) => {
        if (networkResponse.ok || networkResponse.type === 'opaque') {
          const responseToCache = networkResponse.clone();
          event.waitUntil(
            caches.open(CACHE_NAME).then((cache) =>
              cache.put(request, responseToCache)
            )
          );
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
          return cachedResponse || caches.match('/index.html', { ignoreSearch: true });
        });
      })
    );
    return;
  }

  // Cache-first for static assets (JS, CSS, images, fonts)
  // ignoreSearch:true so ?v=xxx version query params still hit the cached file
  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request).then((networkResponse) => {
        if (!networkResponse.ok && networkResponse.type !== 'opaque') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        event.waitUntil(
          caches.open(CACHE_NAME).then((cache) =>
            cache.put(request, responseToCache)
          )
        );

        return networkResponse;
      });
    })
  );
});
