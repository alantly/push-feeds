import { SERVER_ERROR, CLEAR_ERRORS } from '../actions/serverError';

export default function serverError(state = {
  errors: [],
}, action) {
  switch (action.type) {
    case SERVER_ERROR:
      return Object.assign({}, state, { errors: action.errors });
    case CLEAR_ERRORS:
      return Object.assign({}, state, { errors: [] });
    default:
      return state;
  }
}
