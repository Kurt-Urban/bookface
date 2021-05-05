import { combineReducers } from "redux";
import authReducer from "./auth";
import profileReducer from "./profile";
import usersReducer from "./users";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  users: usersReducer,
});

export default rootReducer;
