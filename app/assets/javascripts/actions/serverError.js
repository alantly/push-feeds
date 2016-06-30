export const SERVER_ERROR = 'SERVER_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export function serverError(errors) {
  return {
    type: SERVER_ERROR,
    errors,
  };
}

export function clearErrors() {
  return {
    type: CLEAR_ERRORS,
  };
}

let errorKeys = 0;
function addKeysToErrors(errors) {
  return errors.map((error) => Object.assign({}, error, { key: errorKeys++ }));
}

export function showErrors(errors) {
  const updatedErrors = addKeysToErrors(errors);
  return dispatch => {
    dispatch(serverError(updatedErrors));
  };
}
