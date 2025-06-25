import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_REQUEST,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from "./ActionType";

const initialState = {
  
  isLoading: false,
  error: null,
  jwt: null,
  user: null,
  users: [],
  success: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case GET_ALL_USERS_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: false,
      };

case REGISTER_SUCCESS:
  return {
    ...state,
    jwt: action.payload,
    isLoading: false,
    error: null,
    success: true,
  };
    case LOGIN_SUCCESS:
      return {
        ...state,
        jwt: action.payload.jwt,
         user: action.payload.user,
        isLoading: false,
        error: null,
        success: true,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
    
        isLoading: false,
        error: null,
       users: action.payload,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case GET_ALL_USERS_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
      };

    case LOGOUT_SUCCESS:
      return {
        user: null,
        jwt: null,
        users: [],
        isLoading: false,
        error: null,
        success: false,
      };

    default:
      return state;
  }
};
