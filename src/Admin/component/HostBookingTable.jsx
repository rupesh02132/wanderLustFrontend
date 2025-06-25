import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getHostBookings } from '../../state/booking/Action';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const HostBookingTable = () => {
  const dispatch = useDispatch();

  const { userBookings, loading, error,allBookings } = useSelector((store) => store.bookings || {});
console.log("userBookings",userBookings)
console.log("Allbooking",allBookings)


const {bookings}=useSelector(store=>store);
console.log("bookings from host",bookings)
  useEffect(() => {
    dispatch(getHostBookings());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Host Bookings
      </h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : allBookings?.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Email</th>
              <th>Token No</th>
              <th>Dates</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.user?.email}</td>
                {booking.isPaid?<td>{booking._id.slice(0,7)}</td>:<td className='text-red-500'>Not Paid</td> }
                <td>
                  {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                  {new Date(booking.checkOut).toLocaleDateString()}
                </td>
                <td>₹{booking.totalPrice}</td>
                <td>{booking.isPaid ? 'Paid' : 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default HostBookingTable;
