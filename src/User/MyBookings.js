// src/screens/user/MyBookings.js
import { Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';

const MyBookings = ({ bookings }) => {
  return (
    <div className="my-bookings">
      {bookings?.length === 0 ? (
        <Message variant="info">You have no bookings yet.</Message>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Listing</th>
              <th>Dates</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.userBookings?.map(booking => (
              <tr key={booking._id}>
                <td>
                  <Link to={`/listings/${booking.listing?._id}`}>
                    {booking.listing?.title}
                  </Link>
                </td>
                <td>
                  {new Date(booking.checkIn).toLocaleDateString()} - {' '}
                  {new Date(booking.checkOut).toLocaleDateString()}
                </td>
                <td>₹{booking.totalPrice}</td>
                <td>
                  <Badge bg={booking.isPaid ? 'success' : 'warning'}>
                    {booking.isPaid ? 'Confirmed' : 'Pending Payment'}
                  </Badge>
                </td>
                <td>
                  <Button 
                    variant="info" 
                    size="sm" 
                    as={Link} 
                    to={`/bookings/${booking._id}`}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default MyBookings;