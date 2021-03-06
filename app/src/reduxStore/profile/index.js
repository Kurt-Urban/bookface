import { createAction, handleActions } from "redux-actions";
import axios from "../../axios";

import history from "../../history";

const base = "PROFILE_";

const INITAL_STATE = {
  friends: [],
  posts: [],
  photos: [],
  profileId: "",
  email: "",
  firstName: "",
  lastName: "",
  releaseYear: null,
  genre: "",
  title: "",
  profileImg: "",
  bannerImg: "",
  sentRequests: [],
  friendRequests: [],
};

export const fetchedUser = createAction(`${base}FETCHED_USER`);
export const clearedUser = createAction(`${base}CLEARED_USER`);
export const sentFriendReq = createAction(`${base}SENT_FRIEND_REQ`);
export const canceledFriendReq = createAction(`${base}CANCELED_FRIEND_REQ`);
export const acceptedRequest = createAction(`${base}ACCEPTED_REQUEST`);
export const deletedFriend = createAction(`${base}DELETED_FRIEND`);

export const fetchUser = (userId) => async (dispatch) => {
  const config = { headers: { userId } };
  const response = await axios.get("/profile/fetch/user", config);
  dispatch(fetchedUser(response.data));
};

export const clearUser = () => (dispatch) => {
  dispatch(clearedUser(INITAL_STATE));
};

export const sendFriendReq = (ids) => async (dispatch) => {
  await axios.post("/profile/friends/send", ids);
};

export const cancelFriendReq = (ids) => async (dispatch) => {
  await axios.post("/profile/friends/cancel", ids);
};

export const acceptRequest = (ids) => async (dispatch) => {
  await axios.post("/profile/friends/accept", ids);
};

export const deleteFriend = (ids) => async (dispatch) => {
  await axios.post("/profile/friends/delete", ids);
  console.log(ids);
};

export default handleActions(
  {
    [fetchedUser]: (state, { payload }) => ({ ...payload }),
    [clearedUser]: (state, { payload }) => ({ ...state, ...payload }),
  },
  INITAL_STATE
);
