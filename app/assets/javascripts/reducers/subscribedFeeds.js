import {
  REQUEST_FEEDS,
  RECEIVED_FEEDS,
  ADD_FEED,
  DELETE_FEED,
  PROCESS_ADD_FEED,
  PROCESS_DELETE_FEED } from '../actions/subscribedFeeds';

function feed(item, action) {
  switch (action.type) {
    case ADD_FEED:
      return {
        id: action.id,
        url: action.text,
        isProcessingDelete: false,
      };
    case PROCESS_DELETE_FEED:
      if (item.id !== action.id) {
        return item;
      }
      return Object.assign({}, item, {
        isProcessingDelete: true,
      });
    default:
      return item;
  }
}

function feeds(state = {
  isFetching: false,
  isAdding: false,
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
    case PROCESS_ADD_FEED:
      return Object.assign({}, state, {
        isAdding: true,
      });
    case ADD_FEED:
      return Object.assign({}, state, {
        isAdding: false,
        items: [...state.items, feed(undefined, action)],
      });
    case PROCESS_DELETE_FEED:
      return Object.assign({}, state, {
        items: state.items.map((item) => feed(item, action)),
      });
    case DELETE_FEED:
      return Object.assign({}, state, {
        items: state.items.filter((item) => item.id !== action.id && item.isProcessingDelete),
      });
    default:
      return state;
  }
}

function subscribedFeeds(state = {}, action) {
  switch (action.type) {
    case REQUEST_FEEDS:
    case RECEIVED_FEEDS:
    case PROCESS_ADD_FEED:
    case PROCESS_DELETE_FEED:
    case ADD_FEED:
    case DELETE_FEED:
      return Object.assign({}, state, feeds(state.subscribedFeeds, action));
    default:
      return state;
  }
}

export default subscribedFeeds;
