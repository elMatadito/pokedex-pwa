var staticContent = [
  "/",
  "/index.html",
  "assets/css/main.css",
  "assets/images/loading.png",
];
var expectedCaches = ["pokedex-pwa"];

self.addEventListener("install", function install(event) {
  console.log("Instalando Service Worker");
  event.waitUntil(
    (async () => {
      var cache = await caches.open("pokedex-pwa");

      await cache.addAll(staticContent);

      if (self.skipWaiting) {
        self.skipWaiting();
        console.log("skipWaiting()");
      }
    })()
  );
});

self.addEventListener("activate", (event) => {
  console.log("activate");
  event.waitUntil(
    (async () => {
      // activate right now
      await self.clients.claim();
      // remove caches beginning "pokedex-static-" that aren't in expectedCaches
      var cacheNames = await caches.keys();
      console.log("cacheNames", cacheNames);
      for (var cacheName of cacheNames) {
        if (!/^pokedex-pwa/.test(cacheName)) {
          continue;
        }
        if (expectedCaches.indexOf(cacheName) == -1) {
          console.log("deleting", cacheName);
          await caches.delete(cacheName);
        }
      }
    })()
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then((r) => r || fetch(event.request))
  );
});
