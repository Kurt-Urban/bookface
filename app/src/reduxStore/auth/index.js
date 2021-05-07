import { createAction, handleActions } from "redux-actions";
import axios from "../../axios";
import uuid from "react-uuid";

import history from "../../history";

const base = "AUTH_";

const INITAL_STATE = { isAuthenticated: null, user: { email: "", role: "" } };

export const createdUser = createAction(`${base}CREATED_USER`);
export const loggedIn = createAction(`${base}LOGGEDIN`);
export const loggedOut = createAction(`${base}LOGGEDOUT`);
export const isAuthenticated = createAction(`${base}ISAUTHENTICATED`);

export const createUser = (formValues) => async (dispatch) => {
  const id = `${formValues.firstName}-${formValues.lastName}-${uuid().slice(
    -11
  )}`;
  await axios.post("/user/register", {
    profileId: id,
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    role: "user",
    email: formValues.email,
    password: formValues.password,
    releaseYear: formValues.releaseYear,
    genre: formValues.genre,
    title: formValues.title,
    friends: Array,
    posts: Array,
    photos: Array,
    profileImg: String,
    bannerImg: String,
    sentRequests: Array,
    friendRequests: Array,
  });
  dispatch(createdUser());
};

export const login = (formValues) => async (dispatch) => {
  const response = await axios.post("/user/login", {
    username: formValues.username,
    password: formValues.password,
  });
  dispatch(loggedIn(response.data));
  history.push("/dashboard");
};

export const logout = () => async (dispatch) => {
  const response = await axios.get("/user/logout", { credentials: "include" });
  dispatch(loggedIn(response.data));
  history.push("/");
};

export const authenticate = () => async (dispatch) => {
  const response = await axios.get("/user/auth");
  dispatch(isAuthenticated(response.data));
};

export default handleActions(
  {
    [createdUser]: () => ({ ...INITAL_STATE }),
    [loggedIn]: (state, { payload }) => ({ ...INITAL_STATE, ...payload }),
    [loggedOut]: (state, { payload }) => ({ ...state, ...payload }),
    [isAuthenticated]: (state, { payload }) => ({ ...state, ...payload }),
  },
  INITAL_STATE
);
