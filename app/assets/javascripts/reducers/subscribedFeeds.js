import { REQUEST_FEEDS, RECEIVED_FEEDS } from '../actions/feeds';

function feeds(state = {
  isFetching: false,
  items: [],
}, action) {
  switch (action.type) {
    case REQUEST_FEEDS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVED_FEEDS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.feeds,
      });
    default:
      return state;
  }
}

function subscribedFeeds(state = {}, action) {
  switch (action.type) {
    case REQUEST_FEEDS:
    case RECEIVED_FEEDS:
      return Object.assign({}, state, feeds(state.subscribedFeeds, action));
    default:
      return state;
  }
}

export default subscribedFeeds;
