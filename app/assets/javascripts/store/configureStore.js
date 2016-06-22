import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

export default function configureStore(browserHistory, preloadedState) {
  const routeMiddleware = routerMiddleware(browserHistory);
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunkMiddleware, routeMiddleware),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
        window.devToolsExtension() : f => f
    )
  );
  return store;
}
