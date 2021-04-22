import { createAction, handleActions } from "redux-actions";
import axios from "../../axios";

import history from "../../history";

const base = "AUTH_";

const INITAL_STATE = {};

export const createdUser = createAction(`${base}_CREATED_USER`);

export const createUser = (formValues) => async (dispatch) => {
  const response = await axios.post("/auth/register", {
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    email: formValues.email,
    password: formValues.password,
    releaseYear: formValues.releaseYear,
    genre: formValues.genre,
    title: formValues.title,
  });
  console.log(response.data);
  dispatch(createdUser());
};

export default handleActions(
  {
    [createdUser]: () => ({ ...INITAL_STATE }),
  },
  INITAL_STATE
);
