import React from 'react';
import { connect } from 'react-redux';
import Feed from './feed';
import { requestToDeleteFeed } from '../../actions/subscribedFeeds';

function FeedsTable({ feeds, onDeleteClick }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Subscribed Feed</th>
          <th>Feed Endpoint</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {feeds.map(feed =>
          <Feed
            key={feed.id}
            onDeleteClick={() => onDeleteClick(feed.id)}
            {...feed}
          />
        )}
      </tbody>
    </table>
  );
}

FeedsTable.propTypes = {
  feeds: React.PropTypes.array,
  onDeleteClick: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    feeds: state.subscribedFeeds.items,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onDeleteClick: (id) => {
      dispatch(requestToDeleteFeed(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedsTable);
