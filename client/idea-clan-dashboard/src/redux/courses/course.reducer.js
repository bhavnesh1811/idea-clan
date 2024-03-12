import {
  ADD_COURSE_SUCCESS,
  COURSE_ERROR,
  COURSE_LOADING,
  DELETE_COURSE_SUCCESS,
  EDIT_COURSE_SUCCESS,
  GET_COURSE_SUCCESS,
} from "./course.type";

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
    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        courses: [...state.courses,payload]
      };
    case EDIT_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.map((course) => {
          if (course?._id === payload.id) {
            return { ...course, ...payload.upDatedData };
          }
          return course;
        }),
      };
    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.filter((course) => course._id !== payload.id),
      };

    default:
      return state;
  }
};
