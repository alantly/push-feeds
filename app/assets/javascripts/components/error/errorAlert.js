import React from 'react';

export default function ErrorAlert({ errors }) {
  return (
    <div>
    {errors.length !== 0?
      <div className="alert alert-danger">
        <ul style={{ listStyleType: 'circle' }}>
          {errors.map(error =>
            <li key={error.key} >
              {error.msg}
            </li>
          )}
        </ul>
      </div> : false
    }
    </div>
  );
}

ErrorAlert.propTypes = {
  errors: React.PropTypes.array.isRequired,
};
