import axios from "axios";
import { COURSE_ERROR, COURSE_LOADING, GET_COURSE_SUCCESS } from "./course.type";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const courseLoadingAction = () => {
  return { type: COURSE_LOADING };
};

const courseSuccessAction = (payload) => {
  return { type: GET_COURSE_SUCCESS, payload };
};

const courseFailureAction = () => {
  return { type: COURSE_ERROR };
};

export const getAllCourses = () => async (dispatch) => {
  dispatch(courseLoadingAction());

  try {
    const res = await axios.get(`${BASE_URL}/courses`,{
      headers:{
        Authorization:sessionStorage.getItem("token"),
        "Content-Type":"application/json"
      }
    });
    console.log(res);
    if (res.data.status === 1) {
      dispatch(
        courseSuccessAction(res.data.data)
      );
      return { status: res.data.status, msg: res.data.message };
    } else {
      dispatch(courseFailureAction());
      return { status: res.data.status, msg: res.data.message };
    }
  } catch (err) {
    dispatch(courseFailureAction());
    return { status: 0, msg: err.message };
  }
};

