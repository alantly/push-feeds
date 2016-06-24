import { query } from '../helpers/push_feeds';

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

function createGetFeedsRequest() {
  return {
    path: '/feeds',
    method: 'GET',
  };
}

export function getSubscribedFeeds() {
  const request = createGetFeedsRequest();
  return (dispatch, getState) => {
    dispatch(requestFeeds());
    query(request).then((json) => {
      dispatch(receivedFeeds(json));
    }).catch((error) => {
      debugger;
    });
  };
}

function createAddFeedRequest(url) {
  return {
    path: '/feeds/subscribe',
    method: 'POST',
    body: {
      feed: {
        url,
      },
    },
  };
}

export function requestToAddFeed(url) {
  const request = createAddFeedRequest(url);
  return (dispatch, getState) => {
    dispatch(processAddFeed());
    query(request).then((json) => {
      dispatch(addFeed(json.id, json.url));
    }).catch((error) => {
      debugger;
    });
  };
}

function createDeleteFeedRequest(id) {
  return {
    path: `/feeds/${id}`,
    method: 'DELETE',
  };
}

export function requestToDeleteFeed(id) {
  const request = createDeleteFeedRequest(id);
  return (dispatch, getState) => {
    dispatch(processDeleteFeed(id));
    query(request).then((json) => {
      dispatch(deleteFeed(id));
    }).catch((error) => {
      debugger;
    });
  };
}
