import React from 'react';
import { connect } from 'react-redux';
import { clearErrors } from '../../actions/serverError';

function ErrorAlert({ errors, dispatch }) {
  return (
    <div className="container">
      {errors.length !== 0?
        <div className="alert alert-danger">
          <div className="row">
            <div className="col-md-offset-11 col-md-1 text-right">
              <i
                id="error-btn"
                className="fa fa-remove fa-lg"
                aria-hidden="true"
                onClick={() => dispatch(clearErrors())}
              />
            </div>
          </div>
          <div className="row">
            <ul style={{ listStyleType: 'circle' }}>
              {errors.map(error =>
                <li key={error.key}>
                  {error.msg}
                </li>
              )}
            </ul>
          </div>
        </div> : false
      }
    </div>
  );
}

ErrorAlert.propTypes = {
  errors: React.PropTypes.array.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(ErrorAlert);
