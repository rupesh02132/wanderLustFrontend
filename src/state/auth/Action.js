import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import { api } from "../../config/apiConfig";

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

// Register Actions
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  console.log("userData", userData);
  dispatch(registerRequest());
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/signup`,
      userData
    );

    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    console.log("user", user);
    dispatch(registerSuccess(user));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(registerFailure(errorMessage));
  }
};

// Login Actions
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });
const loginSuccess = (jwt, user) => ({
  type: LOGIN_SUCCESS,
  payload: { jwt, user },
});

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await api.post("/api/auth/login", userData);
    const { jwt, user } = data;

    localStorage.setItem("jwt", jwt);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch(loginSuccess(jwt, user));
    dispatch(getUser(jwt, user)); 
  } catch (err) {
    const msg = err.response?.data?.message || err.message;
    dispatch(loginFailure(msg));
  }
};

// Get User Actions
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser =
  (jwt = localStorage.getItem("jwt")) =>
  async (dispatch) => {
    dispatch(getUserRequest());

    if (!jwt) {
      dispatch(getUserFailure("No JWT token found"));
      return;
    }

    try {
      const { data } = await api.get("/api/auth/profile", {
        headers: { Authorization: `Bearer ${jwt}` }, // now jwt is a string
      });
      dispatch(getUserSuccess(data));
      console.log("data", data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      dispatch(getUserFailure(msg));
    }
  };

export const getAllUser = () => async (dispatch) => {
  dispatch({ type: GET_ALL_USERS_REQUEST });
  try {
    const response = await api.get("/api/auth/users");
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_ALL_USERS_FAILURE, payload: error.message });
  }
};

// Logout Action
export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT_SUCCESS, payload: null });
  localStorage.clear();
};

export const updateUserProfile = (user) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST});
  try {
    const response = await api.put(`api/auth/updateProfile`, user );
    const updatedUser = response.data;
    dispatch({ type: UPDATE_USER_SUCCESS, payload: updatedUser });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: UPDATE_USER_FAILURE, payload: errorMessage });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    await api.delete(`/api/auth/${userId}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload:userId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
