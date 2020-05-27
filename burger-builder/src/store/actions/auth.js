import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  // localStorage.removeItem('token');
  // localStorage.removeItem('expirationDate');
  // localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expirationTime => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime,
  }
};

export const auth = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignup
  }
};

export const setAuthRedirect = redirectPath => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT,
    redirectPath,
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      return dispatch(logout());
    }
    const expirationDate = localStorage.getItem('expirationDate');
    if (!expirationDate || new Date(expirationDate) < new Date()) {
      return dispatch(logout());
    }
    const userId = localStorage.getItem('userId');
    dispatch(authSuccess(token, userId));
    dispatch(checkAuthTimeout((new Date(expirationDate) - new Date()) / 1000));
  };
};
