import React from 'react';
import NavigationBar from './navigationBar';

export default function App({ children }) {
  return (
    <div>
      <NavigationBar />
      {children}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.object,
};
