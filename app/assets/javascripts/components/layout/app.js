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
          <div id="footer-text" className="col-md-offset-5 col-md-2">
            <a target="_blank" href="https://github.com/alantly/push-feeds">
              <span className="fa-tag-text"><i className="fa fa-github fa-lg" aria-hidden="true"></i></span>
              Github
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
