import * as APIUtil from "../util/user_api_util";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const RECEIVE_SEARCH_USERS = "RECEIVE_SEARCH_USERS";
export const REMOVE_SEARCH_USERS = "REMOVE_SEARCH_USERS";

const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
});

const receiveUser = ({user}) => ({
  type: RECEIVE_USER,
  user
});

const receiveUserErrors = (errors) => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

const receiveSearchUsers = (users) => ({
  type: RECEIVE_SEARCH_USERS,
  users
});

export const removeSearchUsers = () => ({
  type: REMOVE_SEARCH_USERS
})

export const fetchUsers = (userIds) => dispatch => (
  APIUtil.fetchUsers(userIds)
    .then(
      (resp) => dispatch(receiveUsers( resp.data.users )),
      (errors) => dispatch(receiveUserErrors(errors.responseJSON))
    )
);

export const searchUsers = (searchText) => dispatch => (
  APIUtil.searchUsers(searchText)
    .then(
      (resp) => dispatch(receiveSearchUsers( resp.data )),
      (errors) => dispatch(receiveUserErrors(errors.responseJSON))
    )
);

export const updateUser = (formData, userId) => dispatch => (
  APIUtil.updateUser(formData, userId)
    .then (
      (payload) =>  dispatch(receiveUser({ user: payload.data.user })) ,
      (errors) =>  dispatch(receiveUserErrors(errors.responseJSON))
    )
);
