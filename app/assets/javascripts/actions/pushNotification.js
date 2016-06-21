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

export function receivePushSubscription(pushSubscription, endpoint) {
  return {
    type: RECEIVE_PUSH_SUBSCRIPTION,
    pushSubscription,
    endpoint,
  };
}

function createSubscription(request, subscription) {
  return dispatch => {
    dispatch(processPushSubscription());
    return query(request).then((json) => {
      dispatch(receivePushSubscription(subscription, json.endpoint));
    });
  };
}

function createServerSubscription(subscription) {
  const request = {
    path: '/clients',
    method: 'POST',
    body: {
      client: subscription,
    },
  };
  return (dispatch, getState) => dispatch(createSubscription(request, subscription));
}

export function requestPushSubscription(pushManager) {
  return pushManager.getSubscription().then(createServerSubscription);
}
