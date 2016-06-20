import { query } from '../helpers/push_feeds';

export function registerServiceWorker(serviceWorker) {
  if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    return navigator.serviceWorker.register(serviceWorker);
  }
  throw new Error('ServiceWorkers not supported');
}

function getEndpointKey(endpoint) {
  const result = endpoint.split('/');
  return result[result.length - 1];
}

function getServerPushSubscription(pushSubscription) {
  debugger;
  const request = {
    path: `/clients?endpoint=${getEndpointKey(pushSubscription.endpoint)}`,
    method: 'GET',
  };
  return query(request);
}

export function registerPushSubscription(store) {
  return (serviceWorkerRegistration) => {
    const pushManager = serviceWorkerRegistration.pushManager;
    // redux store pushManager into store
    pushManager.getSubscription().then((pushSubscription) => {
      if (pushSubscription) {
        console.log('Subscription exists!');
        getServerPushSubscription(pushSubscription).then((json) => {
          // redux store client key
          // redux store pushSubscription
        }).catch((error) => pushSubscription.unsubscribe());
      }
    });
  };
}
