/*
  SV-ReportQR – Service Worker für den Offline-Betrieb.
  Copyright (c) 2026 Alexandre Bhar. Alle Rechte vorbehalten. Siehe LICENSE.txt.

  Beim ersten Aufruf mit Internet werden App, Symbole und die beiden Bibliotheken
  gespeichert. Danach startet die App auch ohne Empfang (Keller, Baustelle).
  - App-Dateien: erst aus dem Netz (damit Updates ankommen), ohne Netz aus dem Speicher
  - Bibliotheken von cdnjs: immer aus dem Speicher (die Versionen ändern sich nie)
  Bei einer neuen App-Version CACHE erhöhen, dann wird der alte Speicher gelöscht.
*/
const CACHE = "svqr-1.2.0";
const DATEIEN = [
  "./", "index.html", "manifest.webmanifest", "LICENSE.txt",
  "favicon-32.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png",
  "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(DATEIEN.map(u => c.add(u).catch(() => {})))));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = e.request.url;
  if (url.startsWith("https://cdnjs.cloudflare.com/")){
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(antwort => {
      const kopie = antwort.clone();
      caches.open(CACHE).then(c => c.put(e.request, kopie));
      return antwort;
    })));
    return;
  }
  if (new URL(url).origin !== self.location.origin) return;
  e.respondWith(fetch(e.request).then(antwort => {
    const kopie = antwort.clone();
    caches.open(CACHE).then(c => c.put(e.request, kopie));
    return antwort;
  }).catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match("index.html"))));
});
