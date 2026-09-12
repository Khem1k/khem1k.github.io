const CACHE_NAME = 'secret-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './music2.mp3',
  './photo.png',
  './bg1.jpg',
  './bg2.jpg',
  './bg3.jpg',
  './background.jpg',
  './logo192.png',
  './logo512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
