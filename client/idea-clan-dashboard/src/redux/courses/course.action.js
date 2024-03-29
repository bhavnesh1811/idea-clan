import axios from "axios";
import {
  ADD_COURSE_SUCCESS,
  COURSE_ERROR,
  COURSE_LOADING,
  DELETE_COURSE_SUCCESS,
  EDIT_COURSE_SUCCESS,
  GET_COURSE_SUCCESS,
} from "./course.type";
import { config } from "../../configs/config";

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
    const res = await axios.get(`${BASE_URL}/courses`, config);
    if (res.data.status === 1) {
      dispatch(courseSuccessAction(res.data.data));
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

export const addCourseDetails = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}/courses`, data, config);

    if (res && res?.data) {
      dispatch({
        type: ADD_COURSE_SUCCESS,
        payload: res?.data?.data[0],
      });
    }

    return { message: "success" };
  } catch (error) {
    return { message: "error" };
  }
};
export const editCourseDetails = (courseId, data) => async (dispatch) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/courses/${courseId}`,
      data,
      config
    );

    if (res && res?.data) {
      dispatch({
        type: EDIT_COURSE_SUCCESS,
        payload: { id: courseId, upDatedData: data },
      });
    }

    return { message: "success" };
  } catch (error) {
    return { message: "error" };
  }
};
export const deleteCourseDetails = (courseId) => async (dispatch) => {
  // console.log(courseId);
  try {
    const res = await axios.delete(`${BASE_URL}/courses/${courseId}`, config);

    if (res && res?.data) {
      dispatch({
        type: DELETE_COURSE_SUCCESS,
        payload: { id: courseId },
      });
    }

    return { message: "success" };
  } catch (error) {
    return { message: "error" };
  }
};
