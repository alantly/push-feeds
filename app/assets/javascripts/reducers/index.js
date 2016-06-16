import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import session from './session';
import subscribedFeeds from './subscribedFeeds';

const rootReducer = combineReducers({
  session,
  subscribedFeeds,
  routing: routerReducer,
});

export default rootReducer;
