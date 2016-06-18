import React from 'react';
import { connect } from 'react-redux';
import { requestToAddFeed } from '../../actions/subscribedFeeds';

const AddFeed = ({ dispatch, id }) => {
  let inputUrl;

  return (
    <form
      id={id}
      className="form-inline"
      onSubmit={e => {
        e.preventDefault();
        if (!inputUrl.value.trim()) {
          return;
        }
        dispatch(requestToAddFeed(inputUrl.value));
        inputUrl.value = '';
      }}
    >
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Feed URL"
          type="url"
          ref={node => {
            inputUrl = node;
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Feed Subscription
      </button>
    </form>
  );
};

AddFeed.propTypes = {
  dispatch: React.PropTypes.func,
  id: React.PropTypes.string,
};

export default connect()(AddFeed);
