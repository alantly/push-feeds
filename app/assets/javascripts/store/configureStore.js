import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

export default function configureStore(browserHistory, preloadedState) {
  const routeMiddleware = routerMiddleware(browserHistory);
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, routeMiddleware)
  );
  return store;
}
