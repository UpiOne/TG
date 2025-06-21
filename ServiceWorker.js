const cacheName = "FruitMerge-FruitMerge-0.1";
const contentToCache = [
    "Build/f77e18422dc813ffcf361b0d74346e94.loader.js",
    "Build/bb3c964b9fd1d6ec3060c868d12220da.framework.js",
    "Build/fb5db8f987e874fd0c14a578e04d0f95.data",
    "Build/09e96bd341153ecfff299c937dd60c5d.wasm",
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
