import React from 'react';
import { connect } from 'react-redux';
import Feed from './feed';

function FeedsTable({ feeds }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Your Feed Subscriptions</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {feeds.map(feed =>
          <Feed
            key={feed.id}
            {...feed}
          />
        )}
      </tbody>
    </table>
  );
}

FeedsTable.propTypes = {
  feeds: React.PropTypes.array,
};

function mapStateToProps(state) {
  return {
    feeds: state.subscribedFeeds.items,
  };
}

export default connect(mapStateToProps)(FeedsTable);