
import { all } from "axios";
import {
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_FAILURE,
  GET_BOOKING_REQUEST,
  GET_BOOKING_SUCCESS,
  GET_BOOKING_FAILURE,
  GET_HOST_BOOKINGS_REQUEST,
  GET_HOST_BOOKINGS_SUCCESS,
  GET_HOST_BOOKINGS_FAILURE,
  GET_BOOKINGS_BY_ID_REQUEST,
  GET_BOOKINGS_BY_ID_SUCCESS,
  GET_BOOKINGS_BY_ID_FAILURE,
  GET_DELETE_BOOKING_REQUEST,
  GET_DELETE_BOOKING_SUCCESS,
  GET_DELETE_BOOKING_FAILURE,

  GET_ALL_BOOKINGS_REQUEST,
  GET_ALL_BOOKINGS_SUCCESS,
  GET_ALL_BOOKINGS_FAIL,

   GET_BOOKINGS_ID_REQUEST,
    GET_BOOKINGS_ID_SUCCESS,
    GET_BOOKINGS_ID_FAILURE
} from "./ActionType";

const initialState = {
  booking: null,
  allBookings: [],
  loading: false,
  error: null,
  success: false,
  userBookings: [],
  hostBookings: [],
  bookingsByListing: [],
  jwt: localStorage.getItem("jwt") || null,

};

export const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create Booking
    case CREATE_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        booking: action.payload,
      };

    case CREATE_BOOKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    // Get User Bookings
    case GET_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case GET_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userBookings: action.payload,
        booking: action.payload,
      };

    case GET_BOOKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    // Get Host Bookings
    case GET_HOST_BOOKINGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

   case GET_HOST_BOOKINGS_SUCCESS:
  return {
    ...state,
    loading: false,
    error: null,
    success: true,
     hostBookings:action.payload,
  };


    case GET_HOST_BOOKINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };


     case GET_BOOKINGS_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case GET_BOOKINGS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        booking: action.payload,
        error: null,
        success: true,
      };

    case GET_BOOKINGS_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

case GET_DELETE_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      case GET_DELETE_BOOKING_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          allBookings: state.allBookings.filter((booking) => booking._id !== action.payload),
        }
        case GET_DELETE_BOOKING_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        }

// for all booking..
          case GET_ALL_BOOKINGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_ALL_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        allBookings: action.payload,
      };

    case GET_ALL_BOOKINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case GET_BOOKINGS_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_BOOKINGS_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        booking:action.payload,
      };

    case GET_BOOKINGS_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    default:
      return state;
  }
};
