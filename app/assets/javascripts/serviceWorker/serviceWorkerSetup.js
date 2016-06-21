import { query } from '../helpers/push_feeds';
import { registerPushManager, receivePushSubscription } from '../actions/pushNotification';

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
    store.dispatch(registerPushManager(pushManager));
    pushManager.getSubscription().then((pushSubscription) => {
      if (pushSubscription) {
        console.log('Subscription exists!');
        getServerPushSubscription(pushSubscription).then((json) => {
          store.dispatch(receivePushSubscription(pushSubscription, json.endpoint));
        }).catch((error) => pushSubscription.unsubscribe());
      }
    });
  };
}
