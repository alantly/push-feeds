import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/layout/app';
import Landing from './components/landing/landing';
import Session from './components/session/session';
import Feeds from './components/feed/feeds';
import Rekt from './components/error/rekt';

export default function getRoutes(store) {
  // client route authorization
  const requireLogin = (nextState, replace) => {
    const { session: { signedIn } } = store.getState();
    if (!signedIn) {
      replace('/');
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="login" component={Session} />
      <Route onEnter={requireLogin}>
        <Route path="feeds" component={Feeds} />
      </Route>
      <Route path="*" component={Rekt} />
    </Route>
  );
}
