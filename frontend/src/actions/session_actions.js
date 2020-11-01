import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const REMOVE_SESSION_ERRORS = 'REMOVE_SESSION_ERRORS';

const receiveCurrentUser = ({user, userRelationships}) => ({
  type: RECEIVE_CURRENT_USER,
  user,
  userRelationships,
});
const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const removeSessionErrors = () => ({
  type: REMOVE_SESSION_ERRORS
});

export const login = user => dispatch => (
  APIUtil.login(user)
    .then(
      (payload) => dispatch( receiveCurrentUser({ 
        user: payload.data.user,
        userRelationships: payload.data.userRelationships
      }) ),
      (errors) => dispatch( receiveSessionErrors(errors.responseJSON) )
    )
);

export const logout = () => dispatch => (
  APIUtil.logout()
    .then(
      () => dispatch( logoutCurrentUser() ),
      (errors) => dispatch( receiveSessionErrors(errors.responseJSON) )
    )
);

export const signup = (user) => dispatch => (
  APIUtil.signup(user)
    .then(
      (payload) => dispatch( receiveCurrentUser({ user: payload.data }) ),
      (errors) => dispatch( receiveSessionErrors(errors.responseJSON) )
    )
)
