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

const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData,
  };
};

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
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
        dispatch(authSuccess(response.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
