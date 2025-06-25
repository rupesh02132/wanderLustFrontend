import {
  GET_RATING_FAILURE,
  GET_RATING_REQUEST,
  GET_RATING_SUCCESS,
  CREATE_RATING_FAILURE,
  CREATE_RATING_REQUEST,
  CREATE_RATING_SUCCESS,
} from "./ActionType";

const initialState = {
  loading: false,
  error: null,
  success: false,
  rating: null,
};

export const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RATING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case CREATE_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        rating: action.payload,
      };
    case CREATE_RATING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case GET_RATING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case GET_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        rating: action.payload,
      };
    case GET_RATING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};  