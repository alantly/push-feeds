import React from 'react';

export default function Feed({ url }) {
  return (
    <tr>
      <td>{url}</td>
      <td>
        <button className="btn btn-danger">
          <i className="fa fa-remove" aria-hidden="true"></i>
        </button>
      </td>
    </tr>
  );
}

Feed.propTypes = {
  url: React.PropTypes.string,
};
