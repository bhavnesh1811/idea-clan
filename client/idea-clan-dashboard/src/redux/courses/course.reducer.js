import {
  COURSE_ERROR,
  COURSE_LOADING,
  GET_COURSE_SUCCESS,
} from "./course.type";

// console.log(localStorage.getItem("token"));
const initalState = {
  course_loading: false,
  course_error: false,
  courses: [],
};

export const courseReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case COURSE_LOADING:
      return { ...state, course_loading: true, course_error: false };
    case GET_COURSE_SUCCESS:
      return {
        ...state,
        course_loading: false,
        course_error: false,
        courses: payload,
      };
    case COURSE_ERROR:
      return {
        ...state,
        course_loading: false,
        course_error: true,
      };

    default:
      return state;
  }
};
