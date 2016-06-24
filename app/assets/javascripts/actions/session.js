import { push } from 'react-router-redux';
import { query } from '../helpers/push_feeds';

export const PROCESS_USER = 'PROCESS_USER';
export const SIGNED_IN = 'SIGNED_IN';
export const SIGNED_OUT = 'SIGNED_OUT';
export const SESSION_ERRORS = 'SESSION_ERRORS';

function processUser() {
  return {
    type: PROCESS_USER,
  };
}

export function signedIn(email) {
  return {
    type: SIGNED_IN,
    email,
  };
}

function signedOut() {
  return {
    type: SIGNED_OUT,
  };
}

function sessionError(errors) {
  return {
    type: SESSION_ERRORS,
    errors,
  };
}

function parseRegistrationErrorResponse(errors) {
  let errorMsgs = [];
  if (errors.email) {
    errorMsgs = errorMsgs.concat(errors.email.map((msg) => `Email ${msg}`));
  }
  if (errors.password) {
    errorMsgs = errorMsgs.concat(errors.password.map((msg) => `Password ${msg}`));
  }
  if (errors.password_confirmation) {
    errorMsgs = errorMsgs.concat(errors.password_confirmation.map((msg) => `Password Confirmation ${msg}`));
  }
  return errorMsgs;
}

function parseLoginErrorResponse(errors) {
  return [errors];
}

function createRegisterRequest(email, password, confirmPassword) {
  return {
    path: '/users.json',
    method: 'POST',
    body: {
      user: {
        email,
        password,
        password_confirmation: confirmPassword,
      },
    },
  };
}

export function registerUser(email, password, confirmPassword) {
  const request = createRegisterRequest(email, password, confirmPassword);
  return (dispatch, getState) => {
    dispatch(processUser());
    query(request).then((json) => {
      dispatch(signedIn(json.email));
      dispatch(push('/feeds'));
    }).catch((error) => {
      dispatch(sessionError(parseRegistrationErrorResponse(error.errors)));
    });
  };
}

function createLoginRequest(email, password) {
  return {
    path: '/users/sign_in.json',
    method: 'POST',
    body: {
      user: {
        email,
        password,
      },
    },
  };
}

export function loginUser(email, password) {
  const request = createLoginRequest(email, password);
  return (dispatch, getState) => {
    dispatch(processUser());
    query(request).then((json) => {
      dispatch(signedIn(json.email));
      dispatch(push('/feeds'));
    }).catch((error) => {
      dispatch(sessionError(parseLoginErrorResponse(error.error)));
    });
  };
}

function createLogoutRequest() {
  return {
    path: '/users/sign_out.json',
    method: 'DELETE',
  };
}

export function logoutUser() {
  const request = createLogoutRequest();
  return (dispatch, getState) => {
    dispatch(processUser());
    query(request).then((json) => {
      dispatch(signedOut());
      dispatch(push('/'));
    });
  };
}
