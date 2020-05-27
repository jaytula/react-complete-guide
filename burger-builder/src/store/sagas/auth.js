import { put, delay } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/index";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const SIGNUP_ENDPOINT =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
const SIGNIN_ENDPOINT =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  const AUTH_ENDPOINT = action.isSignup ? SIGNUP_ENDPOINT : SIGNIN_ENDPOINT;

  try {
    const response = yield axios.post(AUTH_ENDPOINT, authData, {
      params: { key: API_KEY },
    });
    const expirationDate = yield new Date(
      Date.now() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
    return;
  }
  const expirationDate = yield localStorage.getItem("expirationDate");
  if (!expirationDate || new Date(expirationDate) < new Date()) {
    yield put(actions.logout());
    return;
  }
  const userId = localStorage.getItem("userId");
  yield put(actions.authSuccess(token, userId));
  yield put(
    actions.checkAuthTimeout((new Date(expirationDate) - new Date()) / 1000)
  );
}
