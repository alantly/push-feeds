import { query } from '../helpers/push_feeds';
import { showErrors } from './serverError';

export const REQUEST_FEEDS = 'REQUEST_FEEDS';
export const REQUEST_FEEDS_FAIL = 'REQUEST_FEEDS_FAIL';
export const RECEIVED_FEEDS = 'RECEIVED_FEEDS';
export const ADD_FEED = 'ADD_FEED';
export const DELETE_FEED = 'DELETE_FEED';
export const PROCESS_ADD_FEED = 'PROCESS_ADD_FEED';
export const PROCESS_ADD_FAIL = 'PROCESS_ADD_FAIL';
export const PROCESS_DELETE_FEED = 'PROCESS_DELETE_FEED';
export const PROCESS_DELETE_FAIL = 'PROCESS_DELETE_FAIL';
export const CLEAR_FEEDS = 'CLEAR_FEEDS';

function requestFeeds() {
  return {
    type: REQUEST_FEEDS,
  };
}

function requestFeedsFail() {
  return {
    type: REQUEST_FEEDS_FAIL,
  };
}

function receivedFeeds(feeds) {
  return {
    type: RECEIVED_FEEDS,
    feeds,
  };
}

function processAddFeed() {
  return {
    type: PROCESS_ADD_FEED,
  };
}

function processAddFail() {
  return {
    type: PROCESS_ADD_FAIL,
  };
}

function processDeleteFeed(id) {
  return {
    type: PROCESS_DELETE_FEED,
    id,
  };
}

function processDeleteFail(id) {
  return {
    type: PROCESS_DELETE_FAIL,
    id,
  };
}

function addFeed(feed) {
  return {
    type: ADD_FEED,
    feed,
  };
}

function deleteFeed(id) {
  return {
    type: DELETE_FEED,
    id,
  };
}

export function clearFeeds() {
  return {
    type: CLEAR_FEEDS,
  };
}

function createGetFeedsRequest(clientId) {
  return {
    path: `/feeds?cid=${clientId}`,
    method: 'GET',
  };
}

export function getSubscribedFeeds() {
  return (dispatch, getState) => {
    const request = createGetFeedsRequest(getState().pushNotification.id);
    dispatch(requestFeeds());
    query(request).then((json) => {
      dispatch(receivedFeeds(json));
    }).catch((error) => {
      dispatch(requestFeedsFail());
      dispatch(showErrors([{ msg: 'Unable to load feed subscriptions.' }]));
    });
  };
}

function createAddFeedRequest(url, clientId) {
  return {
    path: '/feeds/subscribe',
    method: 'POST',
    body: {
      cid: clientId,
      feed: {
        url,
      },
    },
  };
}

export function requestToAddFeed(url) {
  return (dispatch, getState) => {
    const request = createAddFeedRequest(url, getState().pushNotification.id);
    dispatch(processAddFeed());
    query(request).then((json) => {
      dispatch(addFeed(json));
    }).catch((err) => {
      dispatch(processAddFail());
      dispatch(showErrors([{ msg: err.error }]));
    });
  };
}

function createDeleteFeedRequest(id, clientId) {
  return {
    path: `/feeds/${id}?cid=${clientId}`,
    method: 'DELETE',
  };
}

export function requestToDeleteFeed(id) {
  return (dispatch, getState) => {
    const request = createDeleteFeedRequest(id, getState().pushNotification.id);
    dispatch(processDeleteFeed(id));
    query(request).then((json) => {
      dispatch(deleteFeed(id));
    }).catch((error) => {
      dispatch(processDeleteFail(id));
      dispatch(showErrors([{ msg: 'Unable to delete. Please try again later.' }]));
    });
  };
}
