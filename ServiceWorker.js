const cacheName = "FruitMerge-FruitMerge-0.1";
const contentToCache = [
    "Build/c891a59a54932eabcd75e9291cb66391.loader.js",
    "Build/8b5579ee6f6ef0f27c5971a99dac63e8.framework.js",
    "Build/125f78e547a9d32a648325bbced2ccc8.data",
    "Build/355c2c67d844c06b530962521ac95b07.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
