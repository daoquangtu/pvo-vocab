self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('pvo-v1').then(cache => 
      cache.addAll(['/'])
    ).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/')))
  );
});