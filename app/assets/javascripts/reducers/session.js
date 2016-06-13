import { PROCESS_USER, SIGNED_IN, SIGNED_OUT } from '../actions/session';

const user = function user(state = {
  isProcessing: false,
  signedIn: false,
  email: '',
}, action) {
  switch (action.type) {
    case PROCESS_USER:
      return Object.assign({}, state, {
        isProcessing: true,
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
};

function session(state = {}, action) {
  switch (action.type) {
    case PROCESS_USER:
    case SIGNED_IN:
    case SIGNED_OUT:
      return Object.assign({}, state, user(state.session, action));
    default:
      return state;
  }
}

module.exports = session;
