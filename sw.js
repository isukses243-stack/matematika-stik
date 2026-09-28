// Service Worker untuk KREASI STIK PINTAR - Dukungan Penuh Akses Offline PWA
const CACHE_NAME = 'stik-pintar-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/style.css',
  './assets/js/audio.js',
  './assets/js/model3d.js',
  './assets/js/story-engine.js',
  './assets/js/math-engine.js',
  './assets/js/cooperative-game.js',
  './assets/js/ifp-games.js',
  './assets/js/stem-kka.js',
  './assets/js/teacher-modul.js',
  './assets/js/app.js',
  './assets/img/koperasi.svg',
  './assets/img/ms-tammy.svg',
  './assets/img/ms-indah.svg',
  './assets/img/siti-beni.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
