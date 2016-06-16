import React from 'react';
import FeedsTable from './feedsTable';
import Header from './header';
import AddFeed from './addFeed';

export default function SubscribedFeeds() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <Header />
        </div>
        <div className="col-md-6 text-right">
          <AddFeed id="addFeed" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <FeedsTable />
        </div>
      </div>
    </div>
  );
}
