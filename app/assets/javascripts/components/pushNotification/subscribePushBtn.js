import React from 'react';
import { connect } from 'react-redux';
import { requestPushSubscription } from '../../actions/pushNotification';

function SubscribePushBtn({ pushManager, dispatch }) {
  return (
    <div>
      {!pushManager
        ? <p>Push Notifications not supported on your browser.</p> : false
      }
      <button
        disabled={!pushManager}
        onClick={(e) => {
          e.preventDefault();
          dispatch(requestPushSubscription(pushManager));
        }}
      >
        Subscribe
      </button>
    </div>
  );
}

SubscribePushBtn.propTypes = {
  pushManager: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    pushManager: state.pushNotification.pushManager,
  };
}

export default connect(mapStateToProps)(SubscribePushBtn);
