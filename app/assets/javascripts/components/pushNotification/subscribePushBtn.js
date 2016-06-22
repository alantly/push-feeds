import React from 'react';
import { connect } from 'react-redux';
import { requestPushSubscription, requestSubscribeRemove } from '../../actions/pushNotification';

function SubscribePushBtn({ pushManager, pushSubscription, subscriptionId, dispatch }) {
  let subscribeBtn;
  if (pushSubscription) {
    subscribeBtn = (
      <i
        className="fa fa-toggle-on fa-lg toggle-btn"
        aria-hidden="true"
        onClick={() => {
          dispatch(requestSubscribeRemove(pushSubscription, subscriptionId));
        }}
      >
        <span className="fa-tag-text">Subscribed!</span>
      </i>
    );
  } else {
    subscribeBtn = (
      <i
        className={`fa fa-toggle-off fa-lg ${pushManager? 'toggle-btn': 'toggle-btn-disabled'}`}
        aria-hidden="true"
        onClick={() => {
          if (pushManager) {
            dispatch(requestPushSubscription(pushManager));
          }
        }}
      >
        <span className="fa-tag-text">Not Subscribed</span>
      </i>
    );
  }

  return (
    <div>
      {pushManager?
        subscribeBtn
        :
        <i className="fa fa-warning fa-lg" aria-hidden="true">
          <span className="fa-tag-text">Push Notifications are not supported on your browser.</span>
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
