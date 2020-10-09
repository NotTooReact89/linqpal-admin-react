import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getUsersRequest: [],
  getUsersSuccess: ['users'],
  getUsersFailure: ['getUsersError'],
  userReset: [],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  fetching: false,
  users: [],
  getUsersError: null,
};

/* ------------- Reducers ------------- */

const getUsersRequest = (state) => ({
  ...state,
  fetching: true,
  getUsersError: null,
});

const getUsersSuccess = (state, action) => {
  const { users } = action;

  return {
    ...state,
    users,
    fetching: false,
    getUsersError: null,
  };
};

const getUsersFailure = (state, { getUsersError }) => ({
  ...state,
  fetching: false,
  getUsersError,
});

const userReset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_USERS_REQUEST]: getUsersRequest,
  [Types.GET_USERS_SUCCESS]: getUsersSuccess,
  [Types.GET_USERS_FAILURE]: getUsersFailure,
  [Types.USER_RESET]: userReset,
});

/* ------------- Selectors ------------- */

export const getUsers = (state: State) => state.user.users;
export const getUsersFetching = (state: State) => state.user.fetching;
