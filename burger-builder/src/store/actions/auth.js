import * as actionTypes from './actionTypes';
import Axios from 'axios';

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const SIGNUP_ENDPOINT =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
const SIGNIN_ENDPOINT =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime*1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    const AUTH_ENDPOINT = isSignup ? SIGNUP_ENDPOINT : SIGNIN_ENDPOINT;

    Axios.post(AUTH_ENDPOINT, authData, { params: { key: API_KEY } })
      .then(response => {
        console.log(response);
        const expirationDate = new Date(
          Date.now() + response.data.expiresIn * 1000
        );
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        console.log({ err });
        dispatch(authFail(err.response.data.error));
      });
  };
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
    if (!token) return dispatch(logout());
    const expirationDate = localStorage.getItem('expirationDate');
    if (!expirationDate || new Date(expirationDate) < new Date()) 
      return dispatch(logout());
    const userId = localStorage.getItem('userId');
    dispatch(authSuccess(token, userId));
    dispatch(
      checkAuthTimeout(
        (new Date(expirationDate) - new Date())/1000
      )
    );
  };
};
