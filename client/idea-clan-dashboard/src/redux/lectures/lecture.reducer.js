import {
  LECTURE_ERROR,
  LECTURE_LOADING,
  EDIT_LECTURE_SUCCESS,
  GET_LECTURE_SUCCESS,
  DELETE_LECTURE_SUCCESS,
  ADD_LECTURE_SUCCESS,
} from "./lecture.type";

// console.log(localStorage.getItem("token"));
const initalState = {
  lecture_loading: false,
  lecture_error: false,
  lectures: [],
};

export const lectureReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case LECTURE_LOADING:
      return { ...state, lecture_loading: true, lecture_error: false };
    case GET_LECTURE_SUCCESS:
      return {
        ...state,
        lecture_loading: false,
        lecture_error: false,
        lectures: payload,
      };
    case LECTURE_ERROR:
      return {
        ...state,
        lecture_loading: false,
        lecture_error: true,
      };
      case ADD_LECTURE_SUCCESS:
      return {
        ...state,
        lectures: [...state.lectures,payload]
      };
    case EDIT_LECTURE_SUCCESS:
      return {
        ...state,
        lectures: state.lectures.map((lecture) => {
          if (lecture?._id === payload.id) {
            return {...lecture,...payload.upDatedData};
          }
          return lecture;
        }),
      };
      case DELETE_LECTURE_SUCCESS:
        return {
          ...state,
          lectures: state.lectures.filter((lecture) => lecture._id !== payload.id),
        };
  

    default:
      return state;
  }
};
