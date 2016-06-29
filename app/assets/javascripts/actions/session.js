import { push } from 'react-router-redux';
import { query } from '../helpers/push_feeds';
import { serverError } from './serverError';
import { getSubscribedFeeds, clearFeeds } from './subscribedFeeds';

export const PROCESS_USER = 'PROCESS_USER';
export const PROCESS_FAIL = 'PROCESS_FAIL';
export const SIGNED_IN = 'SIGNED_IN';
export const SIGNED_OUT = 'SIGNED_OUT';

function processUser() {
  return {
    type: PROCESS_USER,
  };
}

function processFail() {
  return {
    type: PROCESS_FAIL,
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

let errorKeys = 0;
function parseRegistrationErrorResponse(errors) {
  let errorMsgs = [];
  if (errors.email) {
    errorMsgs = errorMsgs.concat(errors.email.map((msg) => ({
      msg: `Email ${msg}`,
      key: errorKeys++,
    })));
  }
  if (errors.password) {
    errorMsgs = errorMsgs.concat(errors.password.map((msg) => ({
      msg: `Password ${msg}`,
      key: errorKeys++,
    })));
  }
  if (errors.password_confirmation) {
    errorMsgs = errorMsgs.concat(errors.password_confirmation.map((msg) => ({
      msg: `Password Confirmation ${msg}`,
      key: errorKeys++,
    })));
  }
  return errorMsgs;
}

function parseLoginErrorResponse(error) {
  return [{ msg: error, key: errorKeys++ }];
}

function createRegisterRequest(email, password, confirmPassword, clientId) {
  return {
    path: '/users.json',
    method: 'POST',
    body: {
      cid: clientId,
      user: {
        email,
        password,
        password_confirmation: confirmPassword,
      },
    },
  };
}

export function registerUser(email, password, confirmPassword) {
  return (dispatch, getState) => {
    const request = createRegisterRequest(email, password, confirmPassword, getState().pushNotification.id);
    dispatch(processUser());
    query(request).then((json) => {
      dispatch(signedIn(json.email));
      dispatch(push('/'));
    }).catch((error) => {
      dispatch(processFail());
      dispatch(serverError(parseRegistrationErrorResponse(error.errors)));
    });
  };
}

function createLoginRequest(email, password, clientId) {
  return {
    path: '/users/sign_in.json',
    method: 'POST',
    body: {
      cid: clientId,
      user: {
        email,
        password,
      },
    },
  };
}

export function loginUser(email, password) {
  return (dispatch, getState) => {
    const request = createLoginRequest(email, password, getState().pushNotification.id);
    dispatch(processUser());
    query(request).then((json) => {
      dispatch(signedIn(json.email));
      dispatch(getSubscribedFeeds());
      dispatch(push('/'));
    }).catch((error) => {
      dispatch(processFail());
      dispatch(serverError(parseLoginErrorResponse(error.error)));
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
      if (!getState().pushNotification.pushSubscription) {
        dispatch(clearFeeds());
      }
      dispatch(push('/'));
    }).catch(err => dispatch(processFail()));
  };
}
