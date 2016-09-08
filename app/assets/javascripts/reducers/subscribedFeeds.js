import {
  REQUEST_FEEDS,
  REQUEST_FEEDS_FAIL,
  RECEIVED_FEEDS,
  ADD_FEED,
  DELETE_FEED,
  PROCESS_ADD_FEED,
  PROCESS_ADD_FAIL,
  PROCESS_DELETE_FEED,
  PROCESS_DELETE_FAIL,
  CLEAR_FEEDS } from '../actions/subscribedFeeds';

function feed(item, action) {
  switch (action.type) {
    case ADD_FEED:
      return Object.assign({}, action.feed, {
        isProcessingDelete: false,
      });
    case PROCESS_DELETE_FEED:
      if (item.id !== action.id) {
        return item;
      }
      return Object.assign({}, item, {
        isProcessingDelete: true,
      });
    case PROCESS_DELETE_FAIL:
      if (item.id !== action.id) {
        return item;
      }
      return Object.assign({}, item, {
        isProcessingDelete: false,
      });
    default:
      return item;
  }
}

function feeds(state, action) {
  switch (action.type) {
    case REQUEST_FEEDS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case REQUEST_FEEDS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
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
    case PROCESS_ADD_FAIL:
      return Object.assign({}, state, {
        isAdding: false,
      });
    case ADD_FEED:
      return Object.assign({}, state, {
        isAdding: false,
        items: [...state.items, feed(undefined, action)],
      });
    case PROCESS_DELETE_FAIL:
    case PROCESS_DELETE_FEED:
      return Object.assign({}, state, {
        items: state.items.map((item) => feed(item, action)),
      });
    case DELETE_FEED:
      return Object.assign({}, state, {
        items: state.items.filter((item) => item.id !== action.id),
      });
    case CLEAR_FEEDS:
      return Object.assign({}, state, {
        items: [],
      });
    default:
      return state;
  }
}

export default function subscribedFeeds(state = {
  isFetching: false,
  isAdding: false,
  items: [],
}, action) {
  switch (action.type) {
    case REQUEST_FEEDS:
    case REQUEST_FEEDS_FAIL:
    case RECEIVED_FEEDS:
    case PROCESS_ADD_FEED:
    case PROCESS_ADD_FAIL:
    case PROCESS_DELETE_FEED:
    case PROCESS_DELETE_FAIL:
    case ADD_FEED:
    case DELETE_FEED:
    case CLEAR_FEEDS:
      return Object.assign({}, state, feeds(state, action));
    default:
      return state;
  }
}
