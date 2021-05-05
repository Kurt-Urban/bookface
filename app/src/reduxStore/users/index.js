import { createAction, handleActions } from "redux-actions";
import axios from "../../axios";

import history from "../../history";

const base = "USERS_";

const INITAL_STATE = [];

export const fetchedUsers = createAction(`${base}FETCHED_USERS`);

export const fetchUsers = () => async (dispatch) => {
  const response = await axios.get("/profile/fetch/users");
  dispatch(fetchedUsers(response.data));
};

export default handleActions(
  {
    [fetchedUsers]: (state, { payload }) => [...INITAL_STATE, ...payload],
  },
  INITAL_STATE
);
