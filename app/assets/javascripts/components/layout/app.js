import React from 'react';
import { connect } from 'react-redux';
import NavigationBar from './navigationBar';
import ErrorAlert from '../error/errorAlert';

function App({ children, location, errors }) {
  return (
    <div>
      <NavigationBar {...location} />
      <ErrorAlert errors={errors} />
      {children}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.object,
  location: React.PropTypes.object,
  errors: React.PropTypes.array,
};

function mapStateToProps(state) {
  return {
    errors: state.serverError.errors,
  };
}

export default connect(mapStateToProps)(App);
