import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['params'],
  storeUserDetails: ['name', 'username', 'accessToken'],
  loginFailure: ['loginError'],
  logout: [],
  loginReset: [],
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const userDetailsInitialState = {
  username: '',
  name: '',
};
const accessDetailsInitialState = {
  loginError: null,
  isLoggingIn: false,
  accessToken: '',
};

export const INITIAL_STATE = {
  userDetails: userDetailsInitialState,
  access: accessDetailsInitialState,
};

/* ------------- Reducers ------------- */

const loginRequest = (state) => ({
  ...state,
  access: {
    ...state.access,
    isLoggingIn: true,
    loginError: null,
  },
});

const loginSuccess = (state, action) => {
  const { name, username, accessToken } = action;

  return {
    ...state,
    access: {
      ...state.access,
      accessToken,
      isLoggingIn: false,
      loginError: null,
    },
    userDetails: {
      ...state.userDetails,
      name,
      username,
    },
  };
};

const loginFailure = (state, { loginError, errorId = null }) => ({
  ...state,
  access: {
    ...state.access,
    isLoggingIn: false,
    loginError,
  },
  userDetails: userDetailsInitialState,
});

const logout = (state) => state;

const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.STORE_USER_DETAILS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
  [Types.LOGIN_RESET]: reset,
});

/* ------------- Selectors ------------- */

export const isLoggingIn = (state: State) => {
  return state.login.access.isLoggingIn;
};

export const isLoggedIn = (state: State) =>
  state.login.userDetails.username !== '';
export const getName = (state: State) => state.login.userDetails.name;
export const getLoginError = (state: State) => state.login.access.loginError;

export const getAccessToken = (state: State) => state.login.access.accessToken;
