import { updateServer } from '../helpers/push_feeds';

export const REQUEST_FEEDS = 'REQUEST_FEEDS';
export const RECEIVED_FEEDS = 'RECEIVED_FEEDS';
export const ADD_FEED = 'ADD_FEED';
export const DELETE_FEED = 'DELETE_FEED';
export const PROCESS_ADD_FEED = 'PROCESS_ADD_FEED';
export const PROCESS_DELETE_FEED = 'PROCESS_DELETE_FEED';

function requestFeeds() {
  return {
    type: REQUEST_FEEDS,
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

function processDeleteFeed(id) {
  return {
    type: PROCESS_DELETE_FEED,
    id,
  };
}

function addFeed(id, url) {
  return {
    type: ADD_FEED,
    id,
    url,
  };
}

function deleteFeed(id) {
  return {
    type: DELETE_FEED,
    id,
  };
}

export function getSubscribedFeeds() {
  const request = {
    path: '/feeds',
    method: 'GET',
  };
  return (dispatch, getState) => dispatch(updateServer(request, () => {
    dispatch(requestFeeds());
  }, (json) => {
    dispatch(receivedFeeds(json));
  }));
}

export function requestToAddFeed(url) {
  const request = {
    path: '/feeds/subscribe',
    method: 'POST',
    body: {
      feed: {
        url,
      },
    },
  };
  return (dispatch, getState) => dispatch(updateServer(request, () => {
    dispatch(processAddFeed());
  }, (json) => {
    dispatch(addFeed(json.id, json.url));
  }));
}

export function requestToDeleteFeed(id) {
  const request = {
    path: `/feeds/${id}`,
    method: 'DELETE',
  };
  return (dispatch, getState) => dispatch(updateServer(request, () => {
    dispatch(processDeleteFeed(id));
  }, () => {
    dispatch(deleteFeed(id));
  }));
}
