import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import session from './session';
import subscribedFeeds from './subscribedFeeds';
import pushNotification from './pushNotification';
import serverError from './serverError';

const rootReducer = combineReducers({
  session,
  subscribedFeeds,
  pushNotification,
  serverError,
  routing: routerReducer,
});

export default rootReducer;
