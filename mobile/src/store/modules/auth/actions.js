export function signInRequest(idUser) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { idUser },
  };
}

export function signInSuccess(id) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { id },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
