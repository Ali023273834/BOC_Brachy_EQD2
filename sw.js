/* GYN Brachy EQD2 — offline service worker
   © 2026 Medical Physicist Ali Eid. All rights reserved.
   Change CACHE_VERSION whenever you upload a new version of any file,
   so installed apps pick up the update. */
const CACHE_VERSION = 'gyn-eqd2-v1.0.1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './vendor/jspdf.umd.min.js',
  './vendor/jspdf.plugin.autotable.min.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(c => c.addAll(APP_SHELL)).then(() => self.skipWaiting()));
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

  // Page navigations: network first so updates arrive, cached copy when offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(CACHE_VERSION).then(c => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Google Fonts: cache after first use so the typography also works offline.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone(); caches.open(CACHE_VERSION).then(c => c.put(req, copy)); return res;
      }).catch(() => hit))
    );
    return;
  }

  // App files: cache first.
  if (url.origin === self.location.origin) {
    event.respondWith(caches.match(req).then(hit => hit || fetch(req)));
  }
});
