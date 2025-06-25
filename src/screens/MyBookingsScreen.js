import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyBookings } from '../state/booking/Action';
import Loader from '../components/Loader';
import Message from '../components/Message';


const MyBookingsScreen = () => {
  const dispatch = useDispatch();

  const { loading, error  } = useSelector((state) => state.bookings);
  const booking = useSelector((store)=>Array.isArray(store.bookings.booking) ? store.bookings.booking : []);
  console.log("bookings....",booking);
const userId = useSelector((s) => s.auth?.user?.user?._id || '');
console.log("user from my bookings",userId)

  useEffect(() => {
    dispatch(getMyBookings());
   
  }, [dispatch]);



const userBookings =booking.filter((l) => {
  const id = typeof l.user === 'string' ? l.user : l.user?._id;
  return id?.toString() === userId?.toString();
});

console.log("userBookings",userBookings)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        My Bookings
      </h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : userBookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userBookings.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={b.listing?.images?.[0]}
                alt={b.listing?.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold">{b.listing?.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {b.listing?.city}, {b.listing?.country}
                </p>

                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Dates:</span>{' '}
                    {new Date(b.checkIn).toLocaleDateString()} –{' '}
                    {new Date(b.checkOut).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Guests:</span> {b.guests}
                  </p>
                  <p>
                    <span className="font-medium">Payment Method:</span> {b.paymentMethod}
                  </p>
                  <p>
                    <span className="font-medium">Total Price:</span> ₹{b.totalPrice}
                  </p>
                  <p>
                    <span className="font-medium">Token No:</span>  {b._id.slice(0,7)}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{' '}
                    {b.isPaid ? (
                      <span className="text-green-600 font-medium">Confirmed</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">Pending</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsScreen;
