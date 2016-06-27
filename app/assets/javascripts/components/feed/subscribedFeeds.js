import React from 'react';
import FeedsTable from './feedsTable';
import AddFeed from './addFeed';
import SubscribePushBtn from '../pushNotification/subscribePushBtn';

export default function SubscribedFeeds() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 text-left">
          <SubscribePushBtn />
        </div>
        <div className="col-md-6 text-right">
          <AddFeed />
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
