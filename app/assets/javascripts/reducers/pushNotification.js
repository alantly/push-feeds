import { REGISTER_PUSH_MANAGER,
  PROCESS_PUSH_SUBSCRIPTION,
  RECEIVE_PUSH_SUBSCRIPTION,
  RECEIVE_REMOVE_SUBSCRIPTION } from '../actions/pushNotification';

function subscription(state, action) {
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
        id: action.id,
      });
    case RECEIVE_REMOVE_SUBSCRIPTION:
      return Object.assign({}, state, {
        isProcessing: false,
        pushSubscription: {},
        id: -1,
      });
    default:
      return state;
  }
}

export default function pushNotification(state = {
  isProcessing: false,
  pushManager: {},
  pushSubscription: {},
  id: -1,
}, action) {
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
