import { deleteReview } from "./Action";
import {
  CREATE_REVIEW_FAILURE,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  DELETE_REVIEW_SUCCESS,
  GET_REVIEW_FAILURE,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  GEt_ALL_REVIEWS_REQUEST,
  GEt_ALL_REVIEWS_SUCCESS,
  GEt_ALL_REVIEWS_FAILURE,
  DELETE_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST

} from "./ActionType";

const initialState = {
  loading: false,
  error: null,
  success: false,
  review: null,
  reviews: [],
};

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        review: action.payload,
      };
    case CREATE_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case GET_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case GET_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        review: action.payload,
      };
    case GET_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };


    case GEt_ALL_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
      case GEt_ALL_REVIEWS_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          success: true,
          reviews: action.payload,
        };
      case GEt_ALL_REVIEWS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          success: false,
        };

        case DELETE_REVIEW_REQUEST:
          return {
            ...state,
            loading: true,
            error: null,
            success: false,
          };
       case DELETE_REVIEW_SUCCESS:
  return {
    ...state,
    successDelete: true,
    reviews: state.reviews.filter((r) => r._id !== action.payload),
  };
        case DELETE_REVIEW_FAILURE:
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