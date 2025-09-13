import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  type AnyAction,
} from "redux";
import { thunk, type ThunkDispatch } from "redux-thunk";
import authReducer from "../reducers/auth/authReducer";
import userReducer from "../reducers/user/userReducer";
import projectReducer from "../reducers/project/projectReducer";
import chatReducer from "../reducers/chat/chatReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  project: projectReducer,
  chat: chatReducer,
});

// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// Định nghĩa kiểu cho State và Action
type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

// Tạo store với middleware thunk
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// Export kiểu dispatch để dùng trong component
export type { RootState, AppDispatch };
