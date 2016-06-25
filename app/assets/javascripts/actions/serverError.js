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
