import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/layout/app';
import Landing from './components/landing/landing';
import Session from './components/session/session';
import SubscribedFeeds from './components/feed/subscribedFeeds';
import Rekt from './components/error/rekt';
import { clearErrors } from './actions/serverError';

export default function getRoutes(store) {
  const clearServerErrorMsgs = () => {
    store.dispatch(clearErrors());
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={SubscribedFeeds} />
      <Route path="login" onLeave={clearServerErrorMsgs} component={Session} />
      <Route path="description" component={Landing} />
      <Route path="*" component={Rekt} />
    </Route>
  );
}
