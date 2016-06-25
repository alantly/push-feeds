import React from 'react';
import { connect } from 'react-redux';
import { requestToAddFeed } from '../../actions/subscribedFeeds';

const AddFeed = ({ dispatch, id, isAdding }) => {
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
      disabled={isAdding}
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
      <button
        type="submit"
        className="btn btn-primary"
        disabled={isAdding}
      >
        {isAdding
          ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
          : <i className="fa fa-plus" aria-hidden="true"></i>
        }
      </button>
    </form>
  );
};

AddFeed.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  id: React.PropTypes.string,
  isAdding: React.PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isAdding: state.subscribedFeeds.isAdding,
  };
}

export default connect(mapStateToProps)(AddFeed);
