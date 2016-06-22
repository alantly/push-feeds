import React from 'react';
import LoginForm from './loginForm';
import RegistrationForm from './registrationForm';

export default function Session() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-offset-2 col-md-4">
          <LoginForm />
        </div>
        <div className="col-md-4">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
