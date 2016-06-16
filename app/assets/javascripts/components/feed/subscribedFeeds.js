import React from 'react';
import { connect } from 'react-redux';
import FeedsTable from './feedsTable';

function SubscribedFeeds({ user, feeds }) {
  return (
    <div className="container">
      <h2>
        Hello {user}
      </h2>
      <FeedsTable feeds={feeds} />
    </div>
  );
}

SubscribedFeeds.propTypes = {
  user: React.PropTypes.string,
  feeds: React.PropTypes.array,
};

function mapStateToProps(state) {
  return {
    user: state.session.email,
    feeds: state.subscribedFeeds.items,
  };
}

export default connect(mapStateToProps)(SubscribedFeeds);
