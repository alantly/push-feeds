import React from 'react';
import { connect } from 'react-redux';

function Header({ user }) {
  return (
    <div>
      <h3>
        Hello {user}
      </h3>
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
