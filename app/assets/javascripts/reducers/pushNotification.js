import { REGISTER_PUSH_MANAGER,
  PROCESS_PUSH_SUBSCRIPTION,
  RECEIVE_PUSH_SUBSCRIPTION,
  RECEIVE_REMOVE_SUBSCRIPTION } from '../actions/session';

function subscription(state = {
  isProcessing: false,
  pushManager: null,
  pushSubscription: null,
  endpoint: '',
}, action) {
  switch (action.type) {
    case REGISTER_PUSH_MANAGER:
      return Object.assign({}, state, {
        pushManager: action.pushManager,
      });
    case PROCESS_PUSH_SUBSCRIPTION:
      return Object.assign({}, state, {
        isProcessing: true,
      });
    case RECEIVE_PUSH_SUBSCRIPTION:
      return Object.assign({}, state, {
        isProcessing: false,
        pushSubscription: action.pushSubscription,
        endpoint: action.endpoint,
      });
    case RECEIVE_REMOVE_SUBSCRIPTION:
      return Object.assign({}, state, {
        isProcessing: false,
        pushSubscription: null,
        endpoint: '',
      });
    default:
      return state;
  }
}

export default function pushNotification(state = {}, action) {
  switch (action.type) {
    case REGISTER_PUSH_MANAGER:
    case PROCESS_PUSH_SUBSCRIPTION:
    case RECEIVE_PUSH_SUBSCRIPTION:
    case RECEIVE_REMOVE_SUBSCRIPTION:
      return Object.assign({}, state, subscription(state, action));
    default:
      return state;
  }
}
