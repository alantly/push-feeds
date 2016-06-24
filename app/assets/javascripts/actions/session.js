import { push } from 'react-router-redux';
import { query } from '../helpers/push_feeds';

export const PROCESS_USER = 'PROCESS_USER';
export const SIGNED_IN = 'SIGNED_IN';
export const SIGNED_OUT = 'SIGNED_OUT';

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
      debugger;
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
      debugger;
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
    }).catch((error) => {
      debugger;
    });
  };
}
