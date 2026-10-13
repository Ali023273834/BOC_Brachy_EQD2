/* GYN Brachy EQD2 — offline service worker
   © 2026 Medical Physicist Ali Eid. All rights reserved.
   Change CACHE_VERSION whenever you upload a new version of any file,
   so installed apps pick up the update. */
const CACHE_VERSION = 'gyn-eqd2-v1.0.2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './jspdf.umd.min.js',
  './jspdf.plugin.autotable.min.js',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png'
];

// Cache each file on its own, so one missing file never blocks installation.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(c => Promise.allSettled(APP_SHELL.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Page: network first so updates arrive; cached copy when offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(CACHE_VERSION).then(c => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Fonts and the PDF library fallback: cache after first use.
  if (['fonts.googleapis.com', 'fonts.gstatic.com', 'cdnjs.cloudflare.com'].includes(url.hostname)) {
    event.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone(); caches.open(CACHE_VERSION).then(c => c.put(req, copy)); return res;
      }))
    );
    return;
  }

  // App files: cache first, then network.
  if (url.origin === self.location.origin) {
    event.respondWith(caches.match(req).then(hit => hit || fetch(req)));
  }
});
