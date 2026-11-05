// BRONTO PWA Service Worker v1.0.0
const CACHE_NAME = 'bronto-cache-v1.0.0';

// Recursos críticos para caché inicial (App Shell)
const PRECACHE_ASSETS = [
  '/',
  '/offline',
  '/catalogo',
  '/servicios',
  '/cotizar',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/favicon.ico',
];

// Instalación: Pre-caché de recursos esenciales
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        // Registro no bloqueante si algún asset no responde en instalación
        console.warn('[BRONTO SW] Precache parcial:', err);
      });
    }).then(() => {
      // Activar inmediatamente la nueva versión para evitar que el usuario quede atrapado
      return self.skipWaiting();
    })
  );
});

// Activación: Limpieza de versiones obsoletas de caché
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[BRONTO SW] Eliminando caché obsoleta:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Estrategia de Fetch:
// - Para navegación HTML: Network First con fallback a Cache y luego /offline
// - Para assets estáticos: Stale While Revalidate
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Solo peticiones GET
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Evitar interceptar extensiones o APIs externas no deseadas
  if (url.origin !== self.location.origin) return;

  // Peticiones de navegación (páginas HTML)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Guardar copia fresca en caché
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Si no hay red, consultar caché
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            // Si la página no está en caché, servir la página offline personalizada
            return caches.match('/offline');
          });
        })
    );
    return;
  }

  // Peticiones de recursos estáticos (_next, imágenes locales, iconos)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
