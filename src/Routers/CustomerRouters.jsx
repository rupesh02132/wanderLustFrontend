import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HostScreen from '../screens/HostScreen'
import HostBookingsScreen from '../screens/HostBookingsScreen'
import HomeScreen from '../screens/HomeScreen'
import ListingFormScreen from '../screens/ListingFormScreen'
import ListingScreen from '../screens/ListingScreen'
import LoginScreen from '../screens/LoginScreen'
import MyBookingsScreen from '../screens/MyBookingsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import RegisterScreen from '../screens/RegisterScreen'
import UserDashboardScreen from '../User/UserDashboardScreen'
import PaymentSuccess from '../Payment/PaymentSuccess'
import BookingDetailsScreen from '../screens/BookingDetailsScreen'
import UserProfile from '../screens/UserProfile.jsx'
import Map from '../screens/MapScreen'
import MapScreen from '../screens/MapScreen'

const CustomerRouters = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="py-3 flex-grow-1">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/host" element={<HostScreen />} />
            <Route path="/host/listings/new" element={<ListingFormScreen />} />
            <Route path="/host/listings/:id/edit" element={<ListingFormScreen />} />
            <Route path="/my-bookings" element={<MyBookingsScreen />} />
            <Route path="/host/bookings" element={<HostBookingsScreen />} />
            <Route path="/listings/:id" element={<ListingScreen />} />
            <Route path='/bookings/:bookingId' element={<BookingDetailsScreen/>} />
            <Route path='/Dashboard' element={<UserDashboardScreen/>} />
            <Route path='/payment/:bookingId' element={<PaymentSuccess/>} />

            <Route path='/map' element={<Map/>} />
             <Route path="/map/:id" element={<MapScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
      </div>
  )
}

export default CustomerRouters
