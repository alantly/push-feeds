import { push } from 'react-router-redux';

const PROCESS_USER = 'PROCESS_USER';
const SIGNED_IN = 'SIGNED_IN';
const SIGNED_OUT = 'SIGNED_OUT';

function processUser() {
  return {
    type: PROCESS_USER,
  };
}

function signedIn(json) {
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
      .then(response => response.json())
      .then(json => {
        dispatch(signedIn(json));
        dispatch(push('/packages'));
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

function registerUser(email, password, confirmPassword) {
  const request = {
    path: '/user',
    method: 'POST',
    body: {
      email,
      password,
      confirmPassword,
    },
  };
  return (dispatch, getState) => dispatch(createSession(request));
}

function loginUser(email, password) {
  const request = {
    path: '/session',
    method: 'POST',
    body: {
      email,
      password,
    },
  };
  return (dispatch, getState) => dispatch(createSession(request));
}

function logoutUser() {
  const request = {
    path: '/session',
    method: 'DELETE',
  };
  return (dispatch, getState) => dispatch(destroySession(request));
}
