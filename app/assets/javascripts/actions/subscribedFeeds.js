import { query } from '../helpers/push_feeds';

export const REQUEST_FEEDS = 'REQUEST_FEEDS';
export const RECEIVED_FEEDS = 'RECEIVED_FEEDS';

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

function fetchFeedsFromServer(request) {
  return dispatch => {
    dispatch(requestFeeds());
    return query(request)
      .then(json => {
        dispatch(receivedFeeds(json));
      });
  };
}

export function getSubscribedFeeds() {
  const request = {
    path: '/feeds',
    method: 'GET',
  };
  return (dispatch, getState) => dispatch(fetchFeedsFromServer(request));
}
