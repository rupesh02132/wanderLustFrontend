import {
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILURE,
  } from "./ActionType";
  
  const initialState = {
    create: {
      loading: false,
      data: null,
      error: null,
    },
    paymentLink: null,
    jwt: localStorage.getItem("jwt") || null,
    update: {
      loading: false,
      data: null,
      error: null,
    },
  };
  
  const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
      // Create Payment
      case CREATE_PAYMENT_REQUEST:
        return {
          ...state,
          create: {
            ...state.create,
            loading: true,
            error: null,
          },
          paymentLink: null,
        };
      case CREATE_PAYMENT_SUCCESS:
        return {
          ...state,
          create: {
            loading: false,
            data: action.payload,
            error: null,
          },
          paymentLink: action.payload,
        };
      case CREATE_PAYMENT_FAILURE:
        return {
          ...state,
          create: {
            loading: false,
            data: null,
            error: action.payload,
          },
        };
  
      // Update Payment
      case UPDATE_PAYMENT_REQUEST:
        return {
          ...state,
          update: {
            ...state.update,
            loading: true,
            error: null,
          },
        };
      case UPDATE_PAYMENT_SUCCESS:
        return {
          ...state,
          update: {
            loading: false,
            data: action.payload,
            error: null,
          },
        };
      case UPDATE_PAYMENT_FAILURE:
        return {
          ...state,
          update: {
            loading: false,
            data: null,
            error: action.payload,
          },
        };
  
      default:
        return state;
    }
  };
  
  export default paymentReducer;
  