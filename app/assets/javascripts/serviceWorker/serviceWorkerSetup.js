export function registerServiceWorker(serviceWorker) {
  if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    return navigator.serviceWorker.register(serviceWorker);
  }
  throw new Error('ServiceWorkers not supported');
}
