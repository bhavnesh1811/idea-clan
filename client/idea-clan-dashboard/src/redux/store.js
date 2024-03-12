import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./auth/auth.reducer";
import { courseReducer } from "./courses/course.reducer";
import { lectureReducer } from "./lectures/lecture.reducer";

const rootReducer = combineReducers({
  authReducer,
  courseReducer,
  lectureReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
