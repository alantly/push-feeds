import React from 'react';
import FeedsTable from './feedsTable';
import Header from './header';
import AddFeed from './addFeed';
import SubscribePushBtn from '../pushNotification/subscribePushBtn';

export default function SubscribedFeeds() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <Header />
        </div>
        <div className="col-md-6 text-right">
          <AddFeed id="add-feed" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <FeedsTable />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <SubscribePushBtn />
        </div>
      </div>
    </div>
  );
}
