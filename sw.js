const CACHE_NAME = "omni-v1";
const OFFLINE_URL = "/"; 

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([OFFLINE_URL]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
