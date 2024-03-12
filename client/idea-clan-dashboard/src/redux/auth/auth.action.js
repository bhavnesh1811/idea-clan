import axios from "axios";

import {
  LOGOUT,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_SUCCESS,
} from "./auth.type";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const loginRequestAction = () => {
  return { type: USER_LOGIN_REQUEST };
};

const loginSuccessAction = (payload) => {
  return { type: USER_LOGIN_SUCCESS, payload };
};
const signUpSuccessAction = () => {
  return { type: USER_SIGNUP_SUCCESS };
};
const logOutSuccessAction = () => {
  return { type: LOGOUT };
};

const loginFailureAction = () => {
  return { type: USER_LOGIN_FAILURE };
};

export const logOutUser = () => (dispatch) => {
  dispatch(logOutSuccessAction());
};

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequestAction());

  try {
    const res = await axios.post(`${BASE_URL}/users/login`, userData);
    console.log(res);
    if (res.data.status === 1) {
      dispatch(
        loginSuccessAction({
          token: res.data.token,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
        })
      );
      return { status: res.data.status, msg: res.data.message };
    } else {
      dispatch(loginFailureAction());
      return { status: res.data.status, msg: res.data.message };
    }
  } catch (err) {
    dispatch(loginFailureAction());
    return { status: 0, msg: err.message };
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch(loginRequestAction());

  try {
    const res = await axios.post(`${BASE_URL}/users/register`, userData);

    if (res.data.status === 1) {
      dispatch(signUpSuccessAction());
      return { status: res.data.status, msg: res.data.message };
    } else {
      dispatch(loginFailureAction());
      return { status: res.data.status, msg: res.data.message };
    }
  } catch (err) {
    dispatch(loginFailureAction());
    return { status: 0, msg: err.message };
  }
};
