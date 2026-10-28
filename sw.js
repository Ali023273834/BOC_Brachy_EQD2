// Offline cache for the BOC Re-irradiation EQD2 app.
// Change VERSION whenever any file changes, so phones pick up the update.
const VERSION = "rert-eqd2-v7";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png",
               "icon-maskable-512.png", "apple-touch-icon.png", "favicon.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  // network first so updates arrive when online; cache when offline
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r;
  }).catch(() => caches.match(e.request).then(m => m || caches.match("index.html"))));
});
