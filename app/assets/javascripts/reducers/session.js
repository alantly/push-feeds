import { PROCESS_USER, SIGNED_IN, SIGNED_OUT, PROCESS_FAIL } from '../actions/session';

function user(state, action) {
  switch (action.type) {
    case PROCESS_USER:
      return Object.assign({}, state, {
        isProcessing: true,
      });
    case PROCESS_FAIL:
      return Object.assign({}, state, {
        isProcessing: false,
      });
    case SIGNED_IN:
      return Object.assign({}, state, {
        isProcessing: false,
        signedIn: true,
        email: action.email,
      });
    case SIGNED_OUT:
      return Object.assign({}, state, {
        isProcessing: false,
        signedIn: false,
        email: '',
      });
    default:
      return state;
  }
}

export default function session(state = {
  isProcessing: false,
  signedIn: false,
  email: '',
}, action) {
  switch (action.type) {
    case PROCESS_USER:
    case PROCESS_FAIL:
    case SIGNED_IN:
    case SIGNED_OUT:
      return Object.assign({}, state, user(state, action));
    default:
      return state;
  }
}
