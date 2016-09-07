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
      <footer id="footer">
        <div className="container">
          <div className="col-md-offset-5 col-md-1" style={{ marginTop: '20px' }}>
            <a target="_blank" href="https://github.com/alantly/push-feeds">
              <i className="fa fa-github fa-lg" aria-hidden="true"><span className="fa-tag-text">Github</span></i>
            </a>
          </div>
        </div>
      </footer>
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
