import { createAction, handleActions } from "redux-actions";
import axios from "../../axios";

import history from "../../history";

const base = "UPLOAD_";

const INITAL_STATE = [];

export const submittedPost = createAction(`${base}SUBMITTED_POST`);
export const deletedPost = createAction(`${base}DELETED_POST`);

export const submitPost = (formData) => async (dispatch) => {
  await axios.post("/upload/post", formData);
  dispatch(submittedPost());
};

export const deletePost = (post) => async (dispatch) => {
  const [postId, postImg] = post;
  await axios.delete("/upload/delete", { data: { postId, postImg } });
  dispatch(deletedPost());
};

export default handleActions(
  {
    [submittedPost]: () => [],
    [deletePost]: () => [],
  },
  INITAL_STATE
);
