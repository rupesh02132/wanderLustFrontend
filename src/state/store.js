import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { authReducer } from "../state/auth/Reducer";
import { listingReducer } from "../state/listing/Reducer";
import { bookingReducer } from "../state/booking/Reducer";
import { reviewReducer } from "../state/review/Reducer";
import { ratingReducer } from "../state/rating/Reducer";
import  paymentReducer  from "../state/Payment/Reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    listings: listingReducer,
    bookings: bookingReducer,
    review:reviewReducer,
    rating:ratingReducer,
    payment:paymentReducer,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

