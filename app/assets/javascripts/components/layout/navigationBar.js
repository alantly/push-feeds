import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session';

const NavigationBar = function navigationBar({ email, signedIn, onLogoutClick }) {
  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand" id="logo">
              <i className="fa fa-rss fa-lg"></i>
              <span className="fa-tag-text" id="app-title">Push-Feeds</span>
            </Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            {signedIn?
              <li>
                <Link to="/feeds">My Feeds</Link>
              </li> : false
            }
            {signedIn?
              <li>
                <Link to="/" onClick={onLogoutClick}>Logout</Link>
              </li>
            :
              <li>
                <Link to="/login">Login</Link>
              </li>
            }
          </ul>
        </div>
      </nav>
    </div>
  );
};

NavigationBar.propTypes = {
  email: React.PropTypes.string,
  signedIn: React.PropTypes.bool,
  onLogoutClick: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    email: state.session.email,
    signedIn: state.session.signedIn,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onLogoutClick: (e) => {
      e.preventDefault();
      dispatch(logoutUser());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
