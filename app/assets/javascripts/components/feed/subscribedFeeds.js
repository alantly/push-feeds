import React from 'react';
import FeedsTable from './feedsTable';
import Header from './header';

export default function SubscribedFeeds() {
  return (
    <div className="container">
      <Header />
      <FeedsTable />
    </div>
  );
}
