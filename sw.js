var cacheName = 'TP_webapp';
var appShellFiles = [
  './index.html',
  './manifest.json',
  './produits.csv',
  './favicon.ico',
  './js/app.js',
  './js/DecoderWorker.js',
  './js/exif.js',
  './js/job.js',
  './style.css',
  './images/barcode-scanner.png',
  './images/icon-cart.png',
  './images/icon-setup.png',
  './images/icon-transmit.png',
  './images/logo.png',
  './icons/icon-32.png',
  './icons/icon-64.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-168.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-256.png',
  './icons/icon-512.png'
];
var editableFiles = [
  './index.html',
  './styles.css',
  './app.js',
  './produits.csv'
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(appShellFiles);
    })
  );
});

self.addEventListener('fetch', function(evt) {

    var fichier = evt.request.url.substr(evt.request.url.lastIndexOf('/')+1);
    
    // if requested on an updatable content, load it from the network and cache it
    if (editableFiles.some(function(uc) { return evt.request.url.indexOf(uc) >= 0; })) {
        evt.respondWith(
            caches.open(cacheName).then(function(cache) {
                console.log("[Service worker] Trying to fetch from network", fichier);
                return fetch(evt.request)
                    .then(function (response) {
                    // If the response was OK, clone it and store it in the cache.
                    if (response.status === 200) {
                        console.log("[Service worker] --> Network available, caching latest version", fichier);
                        cache.put(evt.request.url, response.clone());
                    }
                    return response;
                }).catch(function (err) {
                    // Network request failed, try to get it from the cache.
                    console.log("[Service worker] --> Network unavailable, using cached version", fichier);
                    return cache.match(evt.request);
                });
            }));
        return;
    }
    
    // otherwise load from cache by default, or fetch it if not present (and update cache)
    console.log("[Service worker] --> Loading from cache (if present)", fichier);
    evt.respondWith(
        caches.open(cacheName).then(function(cache) {
            return cache.match(evt.request)
                .then(function(response) {
                    return response || fetch(evt.request);
            })
        })
    );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
        if(cacheName.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
