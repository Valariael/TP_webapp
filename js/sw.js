self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
});

var cacheName = 'TP_webapp';
var appShellFiles = [
  '/index.html',
  '/index.js',
  '/manifest.json',
  '/produits.csv',
  '/favicon.ico',
  '/js/app.js',
  '/js/DecoderWorker.js',
  '/js/exif.js',
  '/js/job.js',
  '/js/sw.js',
  '/style.css',
  '/favicon.ico',
  '/images/barcode-scanner.png',
  '/images/icon-cart.png',
  '/images/icon-setup.png',
  '/images/icon-transmit.png',
  '/images/logo.png',
  '/icons/icon-32.png',
  '/icons/icon-64.png',
  '/icons/icon-96.png',
  '/icons/icon-128.png',
  '/icons/icon-168.png',
  '/icons/icon-180.png',
  '/icons/icon-192.png',
  '/icons/icon-256.png',
  '/icons/icon-512.png'
];
