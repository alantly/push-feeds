import { push } from 'react-router-redux';
import { updateServer } from '../helpers/push_feeds';

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
  return (dispatch, getState) => dispatch(updateServer(request, () => {
    dispatch(processUser());
  }, (json) => {
    dispatch(signedIn(json.email));
    dispatch(push('/feeds'));
  }));
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
  return (dispatch, getState) => dispatch(updateServer(request, () => {
    dispatch(processUser());
  }, (json) => {
    dispatch(signedIn(json.email));
    dispatch(push('/feeds'));
  }));
}

export function logoutUser() {
  const request = {
    path: '/users/sign_out.json',
    method: 'DELETE',
  };
  return (dispatch, getState) => dispatch(updateServer(request, () => {
    dispatch(processUser());
  }, (json) => {
    dispatch(signedOut());
    dispatch(push('/'));
  }));
}
