import axios from "axios";
import {
  LECTURE_ERROR,
  LECTURE_LOADING,
  EDIT_LECTURE_SUCCESS,
  GET_LECTURE_SUCCESS,
  DELETE_LECTURE_SUCCESS,
} from "./lecture.type";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const lectureLoadingAction = () => {
  return { type: LECTURE_LOADING };
};

const lectureSuccessAction = (payload) => {
  return { type: GET_LECTURE_SUCCESS, payload };
};

const lectureFailureAction = () => {
  return { type: LECTURE_ERROR };
};

export const getAlllectures = () => async (dispatch) => {
  dispatch(lectureLoadingAction());

  try {
    const res = await axios.get(`${BASE_URL}/lectures`, {
      headers: {
        Authorization: sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === 1) {
      dispatch(lectureSuccessAction(res.data.data));
      
    } else {
      dispatch(lectureFailureAction());
      return { status: res.data.status, msg: res.data.message };
    }
  } catch (err) {
    dispatch(lectureFailureAction());
    return { status: 0, msg: err.message };
  }
};

export const editlectureDetails = (lectureId, data) => async (dispatch) => {
  try {
    const res = await axios.patch(`${BASE_URL}/lectures/${lectureId}`, data, {
      headers: {
        Authorization: sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    if (res && res?.data) {
      dispatch({
        type: EDIT_LECTURE_SUCCESS,
        payload: {id:lectureId, upDatedData: data},
      });
    }

    return { message: "success" };
  } catch (error) {
    return { message: "error" };
  }
};

export const deletelectureDetails = (lectureId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/lectures/${lectureId}`, {
      headers: {
        Authorization: sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    if (res && res?.data) {
      dispatch({
        type: DELETE_LECTURE_SUCCESS,
        payload: { id: lectureId},
      });
    }

    return { message: "success" };
  } catch (error) {
    return { message: "error" };
  }
};