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

export function signedIn(json) {
  return {
    type: SIGNED_IN,
    email: json.email,
  };
}

function signedOut() {
  return {
    type: SIGNED_OUT,
  };
}

function createSession(request) {
  return dispatch => {
    dispatch(processUser());
    return query(request)
      .then(json => {
        dispatch(signedIn(json));
        dispatch(push('/feeds'));
      });
  };
}

function destroySession(request) {
  return dispatch => {
    dispatch(processUser());
    return query(request)
    .then(() => {
      dispatch(signedOut());
      dispatch(push('/'));
    });
  };
}

export function registerUser(email, password, confirmPassword) {
  const request = {
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
  return (dispatch, getState) => dispatch(createSession(request));
}

export function loginUser(email, password) {
  const request = {
    path: '/users/sign_in.json',
    method: 'POST',
    body: {
      user: {
        email,
        password,
      },
    },
  };
  return (dispatch, getState) => dispatch(createSession(request));
}

export function logoutUser() {
  const request = {
    path: '/users/sign_out.json',
    method: 'DELETE',
  };
  return (dispatch, getState) => dispatch(destroySession(request));
}
