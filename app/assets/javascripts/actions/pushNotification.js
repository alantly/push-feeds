import { query } from '../helpers/push_feeds';

export const REGISTER_PUSH_MANAGER = 'REGISTER_PUSH_MANAGER';
export const PROCESS_PUSH_SUBSCRIPTION = 'PROCESS_PUSH_SUBSCRIPTION';
export const RECEIVE_PUSH_SUBSCRIPTION = 'RECEIVE_PUSH_SUBSCRIPTION';
export const RECEIVE_REMOVE_SUBSCRIPTION = 'RECEIVE_REMOVE_SUBSCRIPTION';

export function registerPushManager(pushManager) {
  return {
    type: REGISTER_PUSH_MANAGER,
    pushManager,
  };
}

function processPushSubscription() {
  return {
    type: PROCESS_PUSH_SUBSCRIPTION,
  };
}

export function receivePushSubscription(pushSubscription, id) {
  return {
    type: RECEIVE_PUSH_SUBSCRIPTION,
    pushSubscription,
    id,
  };
}

function receiveRemoveSubscription() {
  return {
    type: RECEIVE_PUSH_SUBSCRIPTION,
  };
}

function createSubscription(request, subscription) {
  return dispatch => query(request).then((json) => {
    dispatch(receivePushSubscription(subscription, json.id));
  });
}

export function requestPushSubscription(pushManager) {
  return (dispatch, getState) => {
    dispatch(processPushSubscription());
    pushManager.subscribe({ userVisibleOnly: true }).then((subscription) => {
      const request = {
        path: '/clients',
        method: 'POST',
        body: {
          client: subscription,
        },
      };
      dispatch(createSubscription(request, subscription));
    });
  };
}

function removeSubscription(request) {
  return dispatch => query(request).then(() => {
    dispatch(receiveRemoveSubscription());
  });
}

export function requestSubscribeRemove(subscription, subscriptionId) {
  return (dispatch, getState) => {
    dispatch(processPushSubscription());
    subscription.unsubscribe().then(() => {
      const request = {
        path: `/clients/${subscriptionId}`,
        method: 'DELETE',
      };
      dispatch(removeSubscription(request));
    });
  };
}

// Setup initial subscription

function getEndpointKey(endpoint) {
  const result = endpoint.split('/');
  return result[result.length - 1];
}

function getServerPushSubscription(pushSubscription) {
  const request = {
    path: `/clients?endpoint=${getEndpointKey(pushSubscription.endpoint)}`,
    method: 'GET',
  };
  return query(request);
}

export function registerPushSubscription(serviceWorkerRegistration) {
  return (dispatch) => {
    const pushManager = serviceWorkerRegistration.pushManager;
    dispatch(registerPushManager(pushManager));
    pushManager.getSubscription().then((pushSubscription) => {
      if (pushSubscription) {
        console.log('Subscription exists!');
        dispatch(processPushSubscription());
        getServerPushSubscription(pushSubscription).then((json) => {
          if (json) {
            dispatch(receivePushSubscription(pushSubscription, json.id));
          } else {
            pushSubscription.unsubscribe();
          }
        });
      }
    });
  };
}
