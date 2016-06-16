import React from 'react';

export default function Feed({ url }) {
  return (
    <tr>
      <td>{url}</td>
    </tr>
  );
}

Feed.propTypes = {
  url: React.PropTypes.string,
};
