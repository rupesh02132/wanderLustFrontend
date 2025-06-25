
import { api } from "../../config/apiConfig";

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
  GET_DELETE_BOOKING_SUCCESS,
  GET_DELETE_BOOKING_FAILURE,
  GET_DELETE_BOOKING_REQUEST,

  GET_ALL_BOOKINGS_REQUEST,
  GET_ALL_BOOKINGS_SUCCESS,
  GET_ALL_BOOKINGS_FAIL,
  GET_BOOKINGS_ID_REQUEST,
  GET_BOOKINGS_ID_SUCCESS,
  GET_BOOKINGS_ID_FAILURE

} from "./ActionType";
export const createBooking = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_BOOKING_REQUEST });

  try {
    // Assuming reqData contains all necessary booking info (including Id if needed)
    const { data } = await api.post('/api/bookings/createbooking', reqData);

    const bookingId = data._id || data.id;
    
    if (bookingId && reqData?.navigate) {
      reqData.navigate(`/payment/${bookingId}`);
    }

    console.log('Booking created:', data);
    
    // Update booking in store
    dispatch({ type: CREATE_BOOKING_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error('Booking error:', error.response?.data || error.message);
    dispatch({
      type: CREATE_BOOKING_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};



export const getMyBookings = () => async (dispatch) => {
  dispatch({ type: GET_BOOKING_REQUEST });
  try {
    const response = await api.get(`/api/bookings/mybookings`);
    dispatch({ type: GET_BOOKING_SUCCESS, payload: response.data }); 
    console.log("response my bookings", response);
  } catch (error) {
    dispatch({ type: GET_BOOKING_FAILURE, payload: error.message });
  }
};


export const getBookingById = (bookingId) => async (dispatch) => {
  console.log("bookingId", bookingId);

  
 try {
    dispatch({ type: GET_BOOKINGS_BY_ID_REQUEST });
    const {data} = await api.get(`/api/bookings/${bookingId}`);
    dispatch({ type: GET_BOOKINGS_BY_ID_SUCCESS, payload: data });
    console.log("Bookings for listing...:",data);
  } catch (error) {
    dispatch({
      type: GET_BOOKINGS_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const getBookingsBy_Id = (booking_id) => async (dispatch) => {
  console.log("booking_id", booking_id);
  try {
    dispatch({ type: GET_BOOKINGS_ID_REQUEST });
    const {data} = await api.get(`/api/bookings/booking/${booking_id}`);
    dispatch({ type: GET_BOOKINGS_ID_SUCCESS, payload: data });
    console.log("Bookings for listing...:",data);
  } catch (error) {
    dispatch({
      type: GET_BOOKINGS_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
}


   

export const getHostBookings = () => async (dispatch) => {
  dispatch({ type:GET_HOST_BOOKINGS_REQUEST });
  
  try {
    const response = await api.get(`/api/bookings/host`);
    dispatch({ type: GET_HOST_BOOKINGS_SUCCESS, payload: response.data }); 
    console.log("response host bookings", response);
  } catch (error) {
    dispatch({ type:GET_HOST_BOOKINGS_FAILURE, payload: error.message });
  }
 
};

export const deleteBooking = (bookingId) => async (dispatch) => {
  dispatch({ type: GET_DELETE_BOOKING_REQUEST });
  try {
    await api.delete(`/api/bookings/${bookingId}`);
    dispatch({ type: GET_DELETE_BOOKING_SUCCESS, payload: bookingId });
  } catch (error) {
    dispatch({ type: GET_DELETE_BOOKING_FAILURE,  payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, });
  }
};



export const getAllBookings = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_BOOKINGS_REQUEST });

    const { data } = await api.get("/api/bookings/all");

    dispatch({
      type: GET_ALL_BOOKINGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_BOOKINGS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};