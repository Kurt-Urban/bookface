import { createAction, handleActions } from "redux-actions";
import axios from "../../axios";

import history from "../../history";

const base = "UPLOAD_";

const INITAL_STATE = [];

export const submittedPost = createAction(`${base}_SUBMITTED_POST`);
export const fetchedPosts = createAction(`${base}_FETCHED_POST`);

export const submitPost = (formData) => async (dispatch) => {
  await axios.post("/upload/post", formData);
  // const data = JSON.parse(formData.get("post"));
  // dispatch(submittedPost(data));
};

export const fetchPosts = (ID) => async (dispatch) => {
  const response = await axios.get("/upload/fetch/posts", { params: { ID } });
  dispatch(fetchedPosts(response.data.posts));
};

export default handleActions(
  {
    [submittedPost]: () => [],
    [fetchedPosts]: (state, { payload }) => [...INITAL_STATE, ...payload],
  },
  INITAL_STATE
);
