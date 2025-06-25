import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getBookingsBy_Id } from "../state/booking/Action";

const BookingDetailsScreen = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();

  const { booking, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    if (bookingId) {
      dispatch(getBookingsBy_Id(bookingId));
    }
  }, [dispatch, bookingId]);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Booking Details</h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {booking && (
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Listing Info</h2>
            <p><span className="font-medium">Title:</span> {booking.listing?.title}</p>
            <p><span className="font-medium">Location:</span> {booking.listing?.address}</p>
            <p><span className="font-medium">City:</span> {booking.listing?.city}, {booking.listing?.country}</p>
            <p><span className="font-medium">Price Per Night:</span> ₹{booking.listing?.price}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700">Booking Info</h2>
            <p><span className="font-medium">Check-in:</span> {new Date(booking.checkIn).toLocaleDateString()}</p>
            <p><span className="font-medium">Check-out:</span> {new Date(booking.checkOut).toLocaleDateString()}</p>
            <p><span className="font-medium">Guests:</span> {booking.guests}</p>
            <p><span className="font-medium">Payment Method:</span> {booking.paymentMethod}</p>
            <p><span className="font-medium">Total Price:</span> ₹{booking.totalPrice}</p>
            <p><span className="font-medium">Paid:</span> {booking.isPaid ? "Yes" : "No"}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700">Booked By</h2>
            <p><span className="font-medium">Name:</span> {booking.user?.firstname} {booking.user?.lastname}</p>
            <p><span className="font-medium">Email:</span> {booking.user?.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetailsScreen;
