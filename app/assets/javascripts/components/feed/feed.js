import React from 'react';

export default function Feed({ url, onDeleteClick }) {
  return (
    <tr>
      <td>{url}</td>
      <td>
        <button className="btn btn-danger" onClick={onDeleteClick}>
          <i className="fa fa-remove" aria-hidden="true"></i>
        </button>
      </td>
    </tr>
  );
}

Feed.propTypes = {
  url: React.PropTypes.string,
  onDeleteClick: React.PropTypes.func,
};
