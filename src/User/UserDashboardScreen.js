// src/screens/user/UserDashboardScreen.js
import { useEffect } from 'react';
import { Row, Col, Card, Tab, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MyBookings from './MyBookings';
import MyListings from './MyListings';
import ProfileSettings from './ProfileSettings';
import { getMyBookings } from '../state/booking/Action';
import { getListingById } from '../state/listing/Action';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProfileScreen from '../screens/ProfileScreen'

const UserDashboardScreen = () => {
  const dispatch = useDispatch();


  const { auth } = useSelector(store=>store);
  const {userInfo}=auth;
console.log("userInfo",userInfo)

  const { bookings} = useSelector(store=>store);
const {loading: bookingsLoading, error: bookingsError}=bookings;

  const { loading: listingsLoading, error: listingsError } = useSelector((state) => state.listings);

 const { listings} = useSelector(store=>store);
 console.log("listing us",listings)



console.log("userinfo auth",auth)
console.log("Booking1",bookings)
  useEffect(() => {
    dispatch(getMyBookings());
    if(userInfo?.isHost) {
      dispatch(getListingById());
    }
  }, [dispatch, userInfo]);

  return (
    <div className="container-fluid">
      <h2 className="my-4">Welcome back, {userInfo?.name}</h2>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Your Bookings</Card.Title>
              <Card.Text className="display-4">{bookings?.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {userInfo?.isHost && (
          <Col md={4}>
            <Card className="dashboard-card">
              <Card.Body>
                <Card.Title>Your Listings</Card.Title>
                <Card.Text className="display-4">{listings?.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
        <Col md={4}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Account Status</Card.Title>
              <Card.Text className="text-success h4">
                {userInfo?.isHost ? 'Verified Host' : 'Traveler Account'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="bookings" className="mb-3">
        <Tab eventKey="bookings" title="My Bookings">
          {bookingsLoading ? <Loader /> : bookingsError ? <Message variant="danger">{bookingsError}</Message> : (
            <MyBookings bookings={bookings} />
          )}
        </Tab>
        
        {userInfo?.isHost && (
          <Tab eventKey="listings" title="My Listings">
            {listingsLoading ? <Loader /> : listingsError ? <Message variant="danger">{listingsError}</Message> : (
              <MyListings listings={listings} />
            )}
          </Tab>
        )}

        <Tab eventKey="profile" title="Profile Settings">
          <ProfileScreen/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default UserDashboardScreen;