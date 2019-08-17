'use strict'

// Update cache names any time any of the cached files change.
const VERSION = '1.1.14'
const CACHE_NAME = 'static-cache-v' + VERSION

// Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/scripts/app.js',
  '/scripts/audio.js',
  '/scripts/beatTaker.js',
  '/scripts/tempo.js',
  '/icons/favicon.ico',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/css/main.css',
]

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install')
  // Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page')
      return cache.addAll(FILES_TO_CACHE)
    })
  )

  self.skipWaiting()
})

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate')
  // Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key)
          return caches.delete(key)
        }
      }))
    })
  )

  self.clients.claim()
})

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url)
  // Add fetch event handler here.
  evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request)
          })
          .catch((error) => {
          })      
    })
  )
})

self.addEventListener("message", function(event) {
  event.source.postMessage(VERSION)
})
