import { api } from "../../config/apiConfig";
import {
  CREATE_PAYMENT_FAILURE,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
} from "./ActionType";

// Create Payment
export const createPayment = (Id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PAYMENT_REQUEST });

    const {
      auth: { jwt },
    } = getState();

    if (!jwt) {
      throw new Error("User is not logged in");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    const { data } = await api.post(`/api/payment/listing/${Id}`, {}, config);

    dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data });

    if (data.payment_link_url) {
      window.location.href = data.payment_link_url;
    }
  } catch (error) {
    dispatch({
      type: CREATE_PAYMENT_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
  }
};


// Update Payment
// updateBookingPayment Action (Fix URL params)
export const updateBookingPayment = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PAYMENT_REQUEST });

  try {
    const { payment_id, booking_id } = reqData;

    console.log("🔁 Updating payment with:", { payment_id, booking_id });

    const { data } = await api.get(
      `/api/payment/update?payment_id=${payment_id}&booking_id=${booking_id}`
    );

    dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data });

    console.log("✅ Payment updated:", data);
  } catch (error) {
    const errorMsg = error?.response?.data?.message || error.message;
    console.error("Payment update failed:", errorMsg);

    dispatch({
      type: UPDATE_PAYMENT_FAILURE,
      payload: errorMsg,
    });
  }
};


