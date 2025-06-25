import { Alert, AlertTitle, CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookingsBy_Id,getAllBookings} from "../state/booking/Action";
import { updateBookingPayment } from "../state/Payment/Action";

const PaymentSuccess = () => {

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const paymentId = searchParams.get("razorpay_payment_id");
  const paymentStatus = searchParams.get("razorpay_payment_link_status");


  const { payment} = useSelector((store) => store);
  console.log("paymetn",payment);


  const { bookings } = useSelector((store) => store);
  const booking = bookings.booking;
  const { loading, error } = bookings;

  console.log("bookingss",booking)

const { bookingId } = useParams();

useEffect(() => {
  if (paymentId && bookingId && paymentStatus === "paid") {
    dispatch(updateBookingPayment({ payment_id: paymentId, booking_id: bookingId }));
   
  }
   dispatch(getBookingsBy_Id(bookingId));
   dispatch(getAllBookings());
}, [ dispatch, paymentId, paymentStatus, bookingId]);



  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert severity="error">Error: {error}</Alert>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No booking found.</p>
      </div>
    );
  }

  const listing = booking?.listing || {};

  const host = booking?.host || {}; 

  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        <Alert variant="filled" severity="success" sx={{ mb: 6 }}>
          <AlertTitle>Payment Success</AlertTitle>
          Your booking was placed successfully.
        </Alert>

        <Grid container spacing={4}>
          {/* Booking Overview */}
          <Grid item xs={12} className="shadow-md hover:shadow-2xl p-4">
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <div className="flex items-center gap-4">
                  <img
                    src={listing.images?.[0] || "https://via.placeholder.com/150"}
                    alt="Listing"
                    className="w-20 h-20 object-cover object-top"
                  />
                  <div className="space-y-1">
                    <p className="font-semibold text-xl">{listing.title || "No Title"}</p>
                    <p className="text-sm opacity-70">Location:<span className="font-medium"> {listing.city}, {listing.country}</span> {listing.address}</p>
                    <div className="flex gap-4">
                      <p className="text-sm">Check-in: {new Date(booking?.checkIn).toLocaleDateString()}</p>
                      <p className="text-sm">Check-out: {new Date(booking?.checkOut).toLocaleDateString()}</p>
                    </div>
                    <p className="text-lg font-bold">Total Price: ₹{booking?.totalPrice}</p>
                    <p className="text-xs opacity-60">Booked on: {new Date(booking?.createdAt).toLocaleDateString()}</p>
                    <p className="text-sm text-green-700 font-medium">Payment Status: {booking?.isPaid ? "Paid" : "Unpaid"}</p>
                    <p className="text-sm text-green-700 font-medium">Payment ID: {booking?.isPaid ? <p className=" text-red-500">{booking?.paymentDetails?.paymentId}</p> : " "}</p>
                  </div>
                </div>
              </Grid>
            </Grid>

            {/* Booking Details */}
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold mb-2">Booking Details</h3>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <p className="text-sm">Guests: {booking?.guests}</p>
                </Grid>
                <Grid item xs={4}>
                  <p className="text-sm">Nights: {Math.abs(new Date(booking?.checkOut) - new Date(booking?.checkIn))/(1000 * 60 * 60 * 24)}
</p>
                </Grid>
                <Grid item xs={4}>
                  <p className="text-sm">Status: {booking.paymentDetails?.status}</p>
                </Grid>
              </Grid>
            </div>
          </Grid>

          {/* Host Info */}
          <Grid item xs={12} className="p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Host Information</h3>
            <div className="flex items-center gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src={host.avatar || "https://p7.hiclipart.com/preview/282/256/961/user-profile-avatar-computer-icons-google-account.jpg"}
                alt="Host"
              />
              <div>
                <p className="font-semibold">{booking.user.firstname} {booking.user.lastname}</p>
                <p className="text-sm text-gray-600">Contact: {booking.user.phone || "N/A"}</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PaymentSuccess;
