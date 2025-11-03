const CACHE_NAME = 'pouchdb-tareas-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/pouchdb@9.0.0/dist/pouchdb.min.js'
];

// Instalación
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  console.log('Service Worker instalado');
});

// Activación
self.addEventListener('activate', event => {
  console.log('Service Worker activo');
});

// Estrategia ONLY CACHE
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request));
});
