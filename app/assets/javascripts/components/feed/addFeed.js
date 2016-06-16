import React from 'react';
import { connect } from 'react-redux';

const AddFeed = ({ dispatch, id }) => {
  let input;

  return (
    <form
      id={id}
      onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        // dispatch(addTodo(input.value));
        input.value = '';
      }}
    >
      <input
        ref={node => {
          input = node;
        }}
      />
      <button type="submit">
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
