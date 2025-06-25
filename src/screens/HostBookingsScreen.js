import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getHostBookings } from '../state/booking/Action';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HostBookingsScreen = () => {
  const dispatch = useDispatch();

  
  const { hostBookings = [], loading, error } = useSelector(
    (state) => state.bookings
  );
console.log("hostBookings", hostBookings);
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
      ) : hostBookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Listing</th>
              <th>Guest</th>
              <th>Dates</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {hostBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.listing?.title}</td>
                <td>{booking.user?.name}</td>
                <td>
                  {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                  {new Date(booking.checkOut).toLocaleDateString()}
                </td>
                <td>${booking.totalPrice}</td>
                <td>{booking.isPaid ? 'Paid' : 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default HostBookingsScreen;
