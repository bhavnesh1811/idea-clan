import {
  LOGOUT,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_SUCCESS,
} from "./auth.type";

// console.log(localStorage.getItem("token"));
const initalState = {
  isAuth: sessionStorage.getItem("isAuth") || false,
  token: sessionStorage.getItem("token") || "",
  name: sessionStorage.getItem("name") || "",
  email: sessionStorage.getItem("email") || "",
  role: sessionStorage.getItem("role") || "",
  isLoading: false,
  isError: false,
};

export const authReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case USER_LOGIN_SUCCESS:
      // console.log(payload)
      sessionStorage.setItem("token", payload.token);
      sessionStorage.setItem("isAuth", true);
      sessionStorage.setItem("email", payload.email);
      sessionStorage.setItem("name", payload.name);
      sessionStorage.setItem("role", payload.role);
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload.token,
        name: payload.name,
        email: payload.email,
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
      };
    case USER_LOGIN_FAILURE:
      return { ...state, isLoading: false, isError: true, isAuth: false };
    case LOGOUT: {
      return {
        isAuth: false,
        token: "",
        name: "",
        email: "",
        isLoading: false,
        isError: false,
      };
    }
    default:
      return state;
  }
};
