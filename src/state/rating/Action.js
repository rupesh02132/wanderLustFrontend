import { api } from "../../config/apiConfig.js";

import {
  GET_RATING_FAILURE,
  GET_RATING_REQUEST,
  GET_RATING_SUCCESS,
  CREATE_RATING_FAILURE,
  CREATE_RATING_REQUEST,
  CREATE_RATING_SUCCESS,
} from "./ActionType";

export const createRating = (listingId, rating) => async (dispatch) => {
  dispatch({ type: CREATE_RATING_REQUEST, payload: null });
  try {
    const { data } = await api.post(`/api/reviews/${listingId}`, { rating });
    dispatch({ type: CREATE_RATING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_RATING_FAILURE, payload: error.message });
  }
};

export const getRating = (listingId) => async (dispatch) => {
  dispatch({ type: GET_RATING_REQUEST, payload: null });
  try {
    const { data } = await api.get(`/api/reviews/${listingId}`);
    dispatch({ type: GET_RATING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_RATING_FAILURE, payload: error.message });
  }
};