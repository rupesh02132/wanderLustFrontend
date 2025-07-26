import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getListingById } from "../state/listing/Action";
import { createBooking } from "../state/booking/Action";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import ReviewForm from "../components/ReviewForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Carousel from "react-bootstrap/Carousel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getBookingById } from "../state/booking/Action";
import { getAllReviews, deleteReview } from "../state/review/Action";
import { createPayment, updateBookingPayment } from "../state/Payment/Action";

const ListingScreen = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const { id } = useParams();

  const { listings, auth } = useSelector((store) => store);
  const listingData = listings?.listing || {};
  const { loading, error } = listings;

  // console.log("auth", auth.user?.user);
  const { bookings } = useSelector((store) => store);


  console.log("booking", bookings.error);
  const { payment } = useSelector((store) => store);
  console.log("payment", payment);

  //all for review or rating..
  const { reviews } = useSelector((store) => store.review);
  console.log("reviews", reviews);

  const listingId = id;
  const filteredReviews = reviews.filter((r) => r.listing === listingId);
 
  const total = filteredReviews.reduce((sum, r) => sum + r.review, 0);
  const average = filteredReviews.length ? total / filteredReviews.length : 0;
  // console.log(`Average rating for listing ${listingId}:`, average.toFixed(1));

  const handleDeleteReview = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (confirm) {
      console.log("Deleting review with ID:", id);
      dispatch(deleteReview(id));
    }
  };

  useEffect(() => {
    dispatch(getAllReviews());
    dispatch(getListingById(id));
  }, [dispatch, id]);

  useEffect(
    (bookingId) => {
      dispatch(getBookingById(bookingId));
    },
    [dispatch, bookingId]
  );

  console.log("id", id);


  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };


const bookingHandler = async (e) => {
  e.preventDefault();

  if (!checkIn || !checkOut) {
    alert("Please select check-in and check-out dates.");
    return;
  }

  const nights = calculateNights();

  const bookingData = {
    listing: id,
    checkIn: checkIn.toISOString(),
    checkOut: checkOut.toISOString(),
    guests: Number(guests),
    totalPrice: listingData.price * nights,
    paymentMethod,
  };

  try {
    const booking = await dispatch(createBooking(bookingData)); 

    if (booking && booking._id) {
      console.log("Booking created. Creating payment...");
      dispatch(createPayment(booking._id));
      dispatch(updateBookingPayment(booking._id));
    } else {
      console.error("Booking ID not found from response");
    }
  } catch (error) {
    console.error("Failed to create booking or payment:", error);
  }
};


  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* Image Carousel */}
          <div className="mb-8 relative group">
            <Carousel
              interval={null}
              indicators={false}
              prevIcon={
                <FaArrowLeft className="text-white text-2xl p-2 bg-black/30 rounded-full hover:bg-black/50" />
              }
              nextIcon={
                <FaArrowRight className="text-white text-2xl p-2 bg-black/30 rounded-full hover:bg-black/50" />
              }
            >
              {listingData.images?.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      className="w-full h-96 object-cover rounded-xl shadow-lg"
                      src={img}
                      alt={`Slide ${idx}`}
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">
                {listingData.title}
              </h1>

              <div className="flex items-center space-x-4">
                <Rating
                  value={average}
                  text={`${filteredReviews.length} reviews`}
                  className="text-lg"
                />
                <span className="text-gray-600">·</span>
                <span className="text-gray-600">
                  {listingData.city}, {listingData.country}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-600">
                    GUESTS
                  </h3>
                  <p className="text-2xl font-bold">{listingData.guests}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-600">
                    BEDROOMS
                  </h3>
                  <p className="text-2xl font-bold">{listingData.bedrooms}</p>
                </div>
              </div>

              <div className="prose max-w-none text-gray-700">
                {listingData.description}
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="sticky top-8 h-fit">
              <div className="border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    {bookings.error ===
                      "Listing is not available for the selected dates" && (
                      <p className="text-red-500 text-sm mt-2">
                        {bookings.error}
                      </p>
                    )}

                    <span className="text-2xl font-bold">
                      ₹{listingData.price}
                    </span>
                    <span className="text-gray-600 ml-1">/ night</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {calculateNights() > 0 && `${calculateNights()} nights`}
                  </span>
                </div>

                {auth?.jwt ? (
                  <form onSubmit={bookingHandler} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check-in
                        </label>
                        <DatePicker
                          selected={checkIn}
                          onChange={setCheckIn}
                          minDate={new Date()}
                          placeholderText="Select date"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check-out
                        </label>
                        <DatePicker
                          selected={checkOut}
                          onChange={setCheckOut}
                          minDate={checkIn || new Date()}
                          placeholderText="Select date"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {[...Array(listingData.guests || 5).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1} {x === 0 ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Credit Card">Credit Card</option>
                        <option value="UPI">UPI</option>
                        <option value="PayPal">PayPal</option>
                      </select>
                    </div>

                    <button
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      onClick={bookingHandler}
                    >
                      {checkIn && checkOut
                        ? `Book for $${listingData.price * calculateNights()}`
                        : "Select dates to book"}
                    </button>
                  </form>
                ) : (
                  <div className="p-4 bg-yellow-50 rounded-lg text-yellow-700">
                    Please log in to book this listing
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            {auth?.jwt && <ReviewForm listingId={id} />}

            <div className="space-y-8 mt-8">
              {filteredReviews.map((review) => (
                <div key={review._id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="font-medium">
                          {review.user?.firstname?.charAt(0).toUpperCase() ||
                            "U"}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {review.user?.firstname || "User"}
                        </h4>
                        <Rating value={review.review} />
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}

                      {auth &&
                        (auth.user.user._id === review.user?._id ||
                          auth.user.user.role === "admin") && (
                          <Button
                            size="sm"
                            className="ml-2 bg-slate-400"
                            onClick={() => handleDeleteReview(review._id)}
                          >
                            Delete
                          </Button>
                        )}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListingScreen;
