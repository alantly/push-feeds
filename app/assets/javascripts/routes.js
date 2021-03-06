import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/layout/app';
import Landing from './components/about/about';
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
      <IndexRoute onLeave={clearServerErrorMsgs} component={SubscribedFeeds} />
      <Route path="login" onLeave={clearServerErrorMsgs} component={Session} />
      <Route path="about" component={Landing} />
      <Route path="*" component={Rekt} />
    </Route>
  );
}
