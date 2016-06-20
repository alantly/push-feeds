import { query } from '../helpers/push_feeds';

export function registerServiceWorker(serviceWorker) {
  if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    return navigator.serviceWorker.register(serviceWorker);
  }
  throw new Error('ServiceWorkers not supported');
}

export function getPushSubscriptionLocal(serviceWorkerRegistration) {
  return serviceWorkerRegistration.pushManager.getSubscription();
}

function getEndpointKey(endpoint) {
  const result = endpoint.split('/');
  return result[result.length - 1];
}

export function syncServerPushSubscription(pushSubscription) {
  debugger
  if (pushSubscription) {
    console.log('Subscription exists!');
    const request = {
      path: `/clients?endpoint=${getEndpointKey(pushSubscription.endpoint)}`,
      method: 'GET',
    };
    query(request).then((json) => {
      console.log(json);
    }).catch((error) => {
      console.log('Not found in server: Unsubscribing!');
      pushSubscription.unsubscribe();
    })
  } else {
    console.log('No existing Subscription.');
  }
}
