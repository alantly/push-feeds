var React = require('react');
var ReactDOM = require('react-dom')

function Landing() {
  return (
    <div className="container">
      <h1>Hello Home</h1>
    </div>
  );
};

window.landingPageApp = function() {
  ReactDOM.render(<Landing />, document.getElementById('root'));
};
