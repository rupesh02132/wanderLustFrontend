// src/screens/user/UserDashboardScreen.js
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MyBookings from './MyBookings';
import { getMyBookings } from '../state/booking/Action';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserDashboardScreen = () => {
  const dispatch = useDispatch();



  const { auth } = useSelector(store => store);
  const { bookings } = useSelector(store => store);
  const { loading: bookingsLoading, error: bookingsError } = bookings;
  const booking = useSelector((store) => Array.isArray(store.bookings.booking) ? store.bookings.booking : []);
  const userId = useSelector((s) => s.auth?.user?.user?._id || '');
  const userBookings = booking.filter((l) => {
    const id = typeof l.user === 'string' ? l.user : l.user?._id;
    return id?.toString() === userId?.toString();
  });

  // Fetch bookings and listings on mount

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <h2 className="my-4">Welcome back, {auth?.user?.user.firstname} {auth?.user?.user.lastname}</h2>
      <Card className="dashboard-card mb-4">
        <Card.Body>
          <Card.Title>Your Bookings</Card.Title>
          <Card.Text className="display-4">{userBookings?.length}</Card.Text>
        </Card.Body>
      </Card>
      {bookingsLoading ? <Loader /> : bookingsError ? <Message variant="danger">{bookingsError}</Message> : (
        <MyBookings bookings={userBookings} />
      )}
    </div>
  );
};

export default UserDashboardScreen;