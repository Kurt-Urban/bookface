import { createAction, handleActions } from "redux-actions";
import axios from "../../axios";

import history from "../../history";

const base = "UPLOAD_";

const INITAL_STATE = [];

export const submittedPost = createAction(`${base}SUBMITTED_POST`);

export const submitPost = (formData) => async (dispatch) => {
  await axios.post("/upload/post", formData);
  // const data = JSON.parse(formData.get("post"));
  dispatch(submittedPost());
};

export default handleActions(
  {
    [submittedPost]: () => [],
  },
  INITAL_STATE
);
