import { createAction, handleActions } from "redux-actions";
import axios from "../../axios";

import history from "../../history";

const base = "AUTH_";

const INITAL_STATE = {};

export const createdUser = createAction(`${base}_CREATED_USER`);
export const loggedIn = createAction(`${base}_LOGGEDIN`);

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
  await axios.post("/user/login", {
    username: formValues.username,
    password: formValues.password,
  });
  console.log(formValues);
  dispatch(loggedIn());
};

export default handleActions(
  {
    [createdUser]: () => ({ ...INITAL_STATE }),
  },
  INITAL_STATE
);
