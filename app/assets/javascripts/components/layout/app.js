import React from 'react';
import NavigationBar from './navigationBar';

export default function App({ children, location }) {
  return (
    <div>
      <NavigationBar {...location} />
      {children}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.object,
  location: React.PropTypes.object,
};
