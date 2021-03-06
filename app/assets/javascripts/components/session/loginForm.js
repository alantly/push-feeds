import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/session';

const LoginForm = ({ dispatch }) => {
  let emailInput;
  let passwordInput;

  return (
    <div>
      <h2 className="text-center">Login</h2>
      <form
        id="loginForm"
        onSubmit={e => {
          e.preventDefault();
          if (!emailInput.value.trim() || !passwordInput.value) {
            return;
          }
          dispatch(loginUser(emailInput.value, passwordInput.value));
          passwordInput.value = emailInput.value = '';
        }}
      >
        <div className="form-group input-group">
          <span className="input-group-addon">
            <i className="fa fa-user" aria-hidden="true" />
          </span>
          <input
            className="form-control"
            type="text"
            name="email"
            placeholder="Email Address"
            ref={node => {
              emailInput = node;
            }}
          />
        </div>
        <div className="form-group input-group">
          <span className="input-group-addon">
            <i className="fa fa-lock" aria-hidden="true" />
          </span>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            ref={node => {
              passwordInput = node;
            }}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">Login</button>
        </div>
        <div className="form-group text-center">
          <p>Login will link browser subscription to user. Current feeds will be replaced with user&rsquo;s subscribed feeds.</p>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(LoginForm);
