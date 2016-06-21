import React from 'react';
import { connect } from 'react-redux';
import { requestPushSubscription, requestSubscribeRemove } from '../../actions/pushNotification';

function SubscribePushBtn({ pushManager, pushSubscription, subscriptionId, dispatch }) {
  return (
    <div>
      {!pushManager?
        <p>Push Notifications not supported on your browser.</p> : false
      }
      {pushSubscription?
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(requestSubscribeRemove(pushSubscription, subscriptionId));
          }}
        >
          Unsubscribe
        </button>
        :
        <button
          disabled={!pushManager}
          onClick={(e) => {
            e.preventDefault();
            dispatch(requestPushSubscription(pushManager));
          }}
        >
          Subscribe
        </button>
      }
    </div>
  );
}

SubscribePushBtn.propTypes = {
  pushManager: React.PropTypes.object,
  pushSubscription: React.PropTypes.object,
  subscriptionId: React.PropTypes.number,
  dispatch: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    pushManager: state.pushNotification.pushManager,
    pushSubscription: state.pushNotification.pushSubscription,
    subscriptionId: state.pushNotification.id,
  };
}

export default connect(mapStateToProps)(SubscribePushBtn);
