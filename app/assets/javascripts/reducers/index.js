import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import session from './session';
import subscribedFeeds from './subscribedFeeds';
import pushNotification from './pushNotification';

const rootReducer = combineReducers({
  session,
  subscribedFeeds,
  pushNotification,
  routing: routerReducer,
});

export default rootReducer;
