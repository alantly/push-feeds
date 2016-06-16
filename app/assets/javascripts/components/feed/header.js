import React from 'react';
import { connect } from 'react-redux';

function Header({ user }) {
  return (
    <div className="row">
      <h2>
        Hello {user}
      </h2>
    </div>
  );
}

Header.propTypes = {
  user: React.PropTypes.string,
};

function mapStateToProps(state) {
  return {
    user: state.session.email,
  };
}

export default connect(mapStateToProps)(Header);
