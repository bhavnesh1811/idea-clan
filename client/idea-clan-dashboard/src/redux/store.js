import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./auth/auth.reducer";

const rootReducer = combineReducers({
  authReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
