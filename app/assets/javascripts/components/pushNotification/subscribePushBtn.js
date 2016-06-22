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
        <i
          className="fa fa-toggle-on fa-lg toggle-btn"
          aria-hidden="true"
          onClick={() => {
            dispatch(requestSubscribeRemove(pushSubscription, subscriptionId));
          }}
        >
          <span className="toggle-btn-tag">Subscribed!</span>
        </i>
        :
        <i
          className={`fa fa-toggle-off fa-lg ${pushManager? 'toggle-btn': 'toggle-btn-disabled'}`}
          aria-hidden="true"
          onClick={() => {
            if (pushManager) {
              dispatch(requestPushSubscription(pushManager));
            }
          }}
        >
          <span className="toggle-btn-tag">Not Subscribed</span>
        </i>
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
