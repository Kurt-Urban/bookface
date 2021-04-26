import { createAction, handleActions } from "redux-actions";
import axios from "../../axios";

import history from "../../history";

const base = "AUTH_";

const INITAL_STATE = { isAuthenticated: false, user: { email: "", role: "" } };

export const createdUser = createAction(`${base}_CREATED_USER`);
export const loggedIn = createAction(`${base}_LOGGEDIN`);
export const loggedOut = createAction(`${base}_LOGGEDOUT`);
export const isAuthenticated = createAction(`${base}_ISAUTHENTICATED`);

export const createUser = (formValues) => async (dispatch) => {
  await axios.post("/user/register", {
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    role: "user",
    email: formValues.email,
    password: formValues.password,
    releaseYear: formValues.releaseYear,
    genre: formValues.genre,
    title: formValues.title,
  });
  dispatch(createdUser());
};

export const login = (formValues) => async (dispatch) => {
  const response = await axios.post("/user/login", {
    username: formValues.username,
    password: formValues.password,
  });
  dispatch(loggedIn(response.data));
};

export const logout = () => async (dispatch) => {
  const response = await axios.get("/user/logout", { credentials: "include" });
  dispatch(loggedIn(response.data));
};

export const authenticate = () => async (dispatch) => {
  const response = await axios.get("/user/authenticated");
  console.log(response.data);
  dispatch(isAuthenticated());
};

export default handleActions(
  {
    [createdUser]: () => ({ ...INITAL_STATE }),
    [loggedIn]: (state, { payload }) => ({ ...INITAL_STATE, ...payload }),
    [loggedOut]: (state, { payload }) => ({ ...state, ...payload }),
  },
  INITAL_STATE
);
