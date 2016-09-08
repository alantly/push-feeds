import React from 'react';

export default function Feed({ name, url, onDeleteClick, isProcessingDelete }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{url}</td>
      <td>
        <button className="btn btn-danger" onClick={onDeleteClick} disabled={isProcessingDelete}>
          {isProcessingDelete
            ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
            : <i className="fa fa-remove" aria-hidden="true"></i>
          }
        </button>
      </td>
    </tr>
  );
}

Feed.propTypes = {
  name: React.PropTypes.string,
  url: React.PropTypes.string,
  onDeleteClick: React.PropTypes.func,
  isProcessingDelete: React.PropTypes.bool,
};
