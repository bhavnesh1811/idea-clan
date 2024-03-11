import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./auth/auth.reducer";
import { courseReducer } from "./courses/course.reducer";

const rootReducer = combineReducers({
  authReducer,
  courseReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
