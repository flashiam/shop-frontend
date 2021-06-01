import {
  FETCH_TOKEN,
  FETCH_USER,
  REGISTER_ERROR,
  SET_LOADING,
  USER_AUTHORIZED,
  USER_UNAUTHORIZED,
} from "../actions/types";

const initialState = {
  userRegistered: false,
  userProfile: null,
  tokens: null,
  authLoading: true,
  registerError: null,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_TOKEN:
      return {
        ...state,
        tokens: action.payload,
        userRegistered: true,
        authLoading: false,
      };
    case FETCH_USER:
      return {
        ...state,
        userProfile: action.payload,
        userRegistered: true,
        authLoading: false,
      };
    case USER_AUTHORIZED:
      return {
        ...state,
        userProfile: action.payload.user,
        tokens: action.payload.tokens,
        userRegistered: true,
        authLoading: false,
      };
    case USER_UNAUTHORIZED:
      return {
        ...state,
        userProfile: null,
        tokens: null,
        userRegistered: false,
        authLoading: false,
      };
    case REGISTER_ERROR:
      console.log(action.payload);
      return {
        ...state,
        registerError: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        authLoading: true,
      };
    default:
      return state;
  }
};

export default userReducer;
