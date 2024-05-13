import type { AuthType } from "./authReducer";
import authReducer from "./authReducer";

export interface StateType {
  auth: AuthType;
}

const combineReducer = {
  auth: authReducer,
};

export default combineReducer;
