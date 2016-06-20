import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, push } from 'react-router-redux';
import configureStore from './store/configureStore';
import getRoutes from './routes';
import { signedIn } from './actions/session';
import { registerServiceWorker,
  getPushSubscriptionLocal,
  syncServerPushSubscription } from './serviceWorker/serviceWorkerSetup';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

module.exports = function setUpPushNotifications(serviceWorkerPath) {
  registerServiceWorker(serviceWorkerPath)
    .then(getPushSubscriptionLocal)
    .then(syncServerPushSubscription)
    .catch((error) => console.log(error));
};

window.landingPageApp = () => {
  render(
    <Provider store={store}>
      <Router history={history} routes={getRoutes(store)} />
    </Provider>,
    document.getElementById('root')
  );
};

window.setRoute = (path) => {
  store.dispatch(push(path));
};

window.setSession = (user) => {
  if (user) {
    store.dispatch(signedIn(user));
  }
};
