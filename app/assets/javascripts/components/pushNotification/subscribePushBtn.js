import React from 'react';
import { connect } from 'react-redux';
import { requestPushSubscription, requestSubscribeRemove } from '../../actions/pushNotification';

function SubscribePushBtn({ pushManager, pushSubscription, subscriptionId, isProcessing, dispatch }) {
  let subscribeBtn;
  if (isProcessing) {
    subscribeBtn = (
      <div>
        <span className="fa-tag-text">
          <i className="fa fa-spinner fa-pulse fa-lg " aria-hidden="true"></i>
        </span>
        <span>Processing subscription...</span>
      </div>
    );
  } else if (pushSubscription) {
    subscribeBtn = (
      <div>
        <span className="fa-tag-text">
          <i
            className="fa fa-toggle-on fa-lg toggle-btn"
            aria-hidden="true"
            onClick={() => {
              dispatch(requestSubscribeRemove(pushSubscription, subscriptionId));
            }}
          ></i>
        </span>
        <span>Subscribed</span>
      </div>
    );
  } else {
    subscribeBtn = (
      <div>
        <span className="fa-tag-text">
          <i
            className={`fa fa-toggle-off fa-lg ${pushManager? 'toggle-btn': 'toggle-btn-disabled'}`}
            aria-hidden="true"
            onClick={() => {
              if (pushManager) {
                dispatch(requestPushSubscription(pushManager));
              }
            }}
          ></i>
        </span>
        <span>Not Subscribed</span>
      </div>
    );
  }

  return (
    <div>
      {pushManager?
        subscribeBtn
        :
        <div>
          <span className="fa-tag-text">
            <i className="fa fa-warning fa-lg" aria-hidden="true"></i>
          </span>
          <span>Push Notifications are not supported on your browser.</span>
        </div>
      }
    </div>
  );
}

SubscribePushBtn.propTypes = {
  pushManager: React.PropTypes.object,
  pushSubscription: React.PropTypes.object,
  subscriptionId: React.PropTypes.number,
  dispatch: React.PropTypes.func,
  isProcessing: React.PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    pushManager: state.pushNotification.pushManager,
    pushSubscription: state.pushNotification.pushSubscription,
    subscriptionId: state.pushNotification.id,
    isProcessing: state.pushNotification.isProcessing,
  };
}

export default connect(mapStateToProps)(SubscribePushBtn);
